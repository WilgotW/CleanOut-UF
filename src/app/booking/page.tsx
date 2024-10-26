"use client";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { sv } from "date-fns/locale/sv"; // Import Swedish locale from date-fns
import { setDate } from "date-fns";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Popup from "../components/Popup";

registerLocale("sv", sv);
interface Plan {
  title: string;
  desc: string;
  selected: boolean;
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([
    {
      title: "Vanlig",
      desc: "Lorem ipsum",
      selected: false,
    },
    {
      title: "Biltvätt 2",
      desc: "Lorem ipsum",
      selected: false,
    },
    {
      title: "Biltvätt 3",
      desc: "Lorem ipsum",
      selected: false,
    },
  ]);

  const phoneNumberPattern = /^(07[03]|\+467[03])\d{1}[-\s]?\d{3}[-\s]?\d{3}$/;

  function handlePhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (phoneNumberPattern.test(value)) {
      setError(false);
    } else {
      setError(true);
    }
    setPhoneNumber(value);
  }

  function selectPlan(title: string) {
    let newList: Plan[] = [...plans];
    newList.forEach((plan) => {
      if (plan.title === title) {
        setSelectedPlan(plan.title);
        plan.selected = true;
      } else {
        plan.selected = false;
      }
    });
    setPlans(newList);
  }

  async function sendBookingMail(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    ev.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/mail/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          selectedPlan,
          selectedDate,
          selectedTime,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setBookingStatus("Bokning skickad!");
        resetStates();
      } else {
        setBookingStatus("Bokning misslyckades");
      }
    } catch (err) {
      console.error(err);
      setBookingStatus("An error occurred when booking");
    }
    setLoading(false);
    setShowPopup(true);
  }

  function resetStates() {
    setName("");
    setEmail("");
    selectPlan("");
    setSelectedPlan("");
    setPhoneNumber("");
  }

  useEffect(() => {
    const states = [
      selectedPlan,
      selectedDate,
      selectedTime,
      name,
      phoneNumber,
      email,
    ];
    const allTrue = states.every((item) => item);
    setAllFieldsFilled(allTrue);
  }, [selectedPlan, selectedDate, selectedTime, name, phoneNumber, email]);

  return (
    <div className="w-full h-full flex justify-center p-5">
      {showPopup && (
        <Popup
          title="Bokning skickad!"
          message="Du har bokat en biltvätt, ..."
          hidePopup={() => setShowPopup(false)}
        />
      )}
      <div className="max-w-[800px]">
        <div className="mb-6">
          <h1 className="text-2xl font-noto-serif font-extrabold">
            Boka en biltvätt!
          </h1>
          <span className="text-gray-500">
            Välj den biltvätt som passar dig.
          </span>
        </div>

        <div
          className={`flex flex-col md:flex-row w-full gap-3 justify-between`}
        >
          {plans.map((plan) => (
            <div
              key={plan.title}
              onClick={() => selectPlan(plan.title)}
              className={`${
                plan.selected && "bg-[#1976d2] text-white "
              } h-30 w-full rounded-md shadow-md hover:shadow-xl transition-colors duration-300 p-2 md:p-3 cursor-pointer select-none`}
            >
              <h2 className="font-noto-serif font-extrabold select-none">
                {plan.title}
              </h2>
              <span className="text-sm m-0 leading-none select-none">
                {plan.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="flex pt-5 gap-2 pb-5">
          <div className="flex flex-col w-full gap-2">
            <label>Datum</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
              locale="sv"
              className="w-full border rounded-md"
              popperClassName="higher-z-index"
              popperPlacement="bottom-end"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>tid</label>
            <DatePicker
              selected={selectedTime}
              onChange={(time: Date | null) => setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              locale="sv"
              timeCaption="Tid"
              dateFormat="HH:mm"
              className="w-full border rounded-md"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label>Namn</label>
              <TextField
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                id="username"
                label="Ditt namn"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Telefonnummer</label>
              <TextField
                id="swedish-phone-number"
                label="Telefonnummer"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneNumber}
                placeholder="070 XXX XXXX eller 073-XXX-XXXX"
                error={error}
                helperText={error ? "Ogiltigt telefonnummer" : ""}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Mail adress</label>
              <TextField
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                id="username"
                label="Mail"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-2">
              <LoadingButton
                onClick={(ev) => sendBookingMail(ev)}
                className="w-full"
                variant="contained"
                endIcon={<SendIcon />}
                loading={loading}
                disabled={!allFieldsFilled}
              >
                Skicka bokning
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
