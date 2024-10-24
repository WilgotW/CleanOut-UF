"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { sv } from "date-fns/locale/sv"; // Import Swedish locale from date-fns

registerLocale("sv", sv);
interface Plan {
  title: string;
  desc: string;
  selected: boolean;
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
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

  const phoneNumberPattern = /^7(0|3)\d\s?\d{3}\s?\d{3}$/;

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
    newList.forEach((plan) =>
      plan.title === title ? (plan.selected = true) : (plan.selected = false)
    );
    setPlans(newList);
  }

  return (
    <div className="w-full flex justify-center p-5 ">
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
                placeholder="70X XXX XXX or 73X XXX XXX"
                error={error}
                helperText={error ? "Ogiltigt svenskt telefonnummer" : ""}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Mail adress (frivilligt)</label>
              <TextField
                id="username"
                label="Mail"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button className="w-full" variant="contained">
                Skicka bokning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
