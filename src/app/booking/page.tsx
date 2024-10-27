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
  price: number;
  desc: string;
  selected: boolean;
}
interface CarType {
  name: string;
  price: number;
  selected: boolean;
}
interface ExtraOption {
  name: string;
  price: number;
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
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [plans, setPlans] = useState<Plan[]>([
    {
      title: "Interior",
      price: 1000,
      desc: "Ge bilens utsida en snabb uppfräschning.",
      selected: false,
    },
    {
      title: "Utsida",
      price: 1500,
      desc: "Fräscha upp insidan av din bil med en grundlig inredningstvätt",
      selected: false,
    },
    {
      title: "Insida ut",
      price: 2500,
      desc: "fullständig behandling både in- och utvändigt",
      selected: false,
    },
  ]);
  const [selectedCarType, setSelectedCarType] = useState<string>("coupe/sudan");
  const [carTypes, setCarTypes] = useState<CarType[]>([
    {
      name: "coupe/sudan",
      price: 0,
      selected: true,
    },
    {
      name: "truck/liten suv",
      price: 200,
      selected: false,
    },
    {
      name: "Stor suv",
      price: 400,
      selected: false,
    },
    {
      name: "Skåpbil",
      price: 600,
      selected: false,
    },
  ]);
  const [extraOptions, setExtraOptions] = useState<ExtraOption[]>([
    {
      name: "Tvätt av barnstol",
      price: 100,
      selected: false,
    },
    {
      name: "djurhår borttagning",
      price: 150,
      selected: false,
    },
    {
      name: "Däckbyte",
      price: 100,
      selected: false,
    },
  ]);

  const phoneNumberPattern = /^(07[03]|\+467[03])\d{1}[-\s]?\d{3}[-\s]?\d{3}$/;

  function selectCar(name: string) {
    let newList: CarType[] = [...carTypes];
    newList.forEach((car) => {
      if (car.name === name) {
        setSelectedCarType(car.name);
        car.selected = true;
      } else {
        car.selected = false;
      }
    });
    setCarTypes(newList);
  }

  function extraSelect(name: string) {
    setExtraOptions((prevOptions) =>
      prevOptions.map((extra) =>
        extra.name === name ? { ...extra, selected: !extra.selected } : extra
      )
    );
  }

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

  useEffect(() => {
    let carTypePrice = 0,
      planTypePrice = 0,
      extraPrices = 0;
    if (selectedCarType) {
      carTypePrice = carTypes.find(
        (car) => car.name === selectedCarType
      )!.price;
    }
    if (selectedPlan) {
      planTypePrice = plans.find((plan) => plan.title === selectedPlan)!.price;
    }
    if (extraOptions) {
      extraOptions.forEach((extra) =>
        extra.selected ? (extraPrices += extra.price) : (extraPrices += 0)
      );
    }
    setTotalPrice(carTypePrice + planTypePrice + extraPrices);
  }, [selectedCarType, selectedPlan, extraOptions]);

  async function sendBookingMail(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    ev.preventDefault();
    setLoading(true);

    try {
      const joinedExtras = extraOptions.map((item) => item.name).join(", ");
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
          selectedCarType,
          joinedExtras,
          totalPrice,
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
    <div
      className={`
      } w-full h-full flex justify-center p-5`}
    >
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
                {plan.title} ({plan.price}kr)
              </h2>
              <span className="text-xs m-0 leading-none select-none">
                {plan.desc}
              </span>
            </div>
          ))}
        </div>
        <div>
          {plans.map((plan) => (
            <>
              {plan.selected && (
                <div className="pt-5 flex flex-col gap-1 text-md">
                  <hr />
                  Välj bil:
                  {carTypes.map((car) => (
                    <label className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={selectedCarType === car.name}
                        onChange={() => selectCar(car.name)}
                      />
                      {car.name} {car.price > 0 && "+" + car.price + "kr"}
                    </label>
                  ))}
                  <hr />
                  <div>
                    Extra:
                    {extraOptions.map((extra) => (
                      <label className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={extra.selected}
                          onChange={() => extraSelect(extra.name)}
                        />
                        {extra.name}
                        {extra.price > 0 && "+" + extra.price + "kr"}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <h2 className="pt-5">
          Total pris: <b>{totalPrice}kr</b>
        </h2>
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
