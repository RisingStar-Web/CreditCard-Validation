import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MasterImage from "../../assets/master.png";
import VisaImage from "../../assets/visa.png";
import { MONTH, YEAR } from "../../utils";

function validateMasterCardNumber(cardNumber) {
  return /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/.test(cardNumber);
}

function validateVisaCardNumber(cardNumber) {
  return /^4[0-9]{2,}$/.test(cardNumber);
}

export default function Card() {
  const [cardType, setCardType] = useState("master");
  const [validCard, setValidCard] = useState(false);
  const selectedCardStyle = (selectedCard) => {
    if (cardType === selectedCard) return "shadow-xl w-16";
  };
  const [month, setMonth] = useState({ value: "", error: "" });
  const [year, setYear] = useState({ value: "", error: "" });
  const [cvv, setCVV] = useState({ value: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [number, setNumber] = useState({ value: "", error: "" });

  const onChangeMonth = (e) => {
    const value = e.target.value;
    if (value === "") setMonth({ value, error: "Month is required" });
    else setMonth({ value: e.target.value, error: "" });
  };
  const onChangeYear = (e) => {
    const value = e.target.value;
    const today = new Date();
    if (value === "") setYear({ value, error: "Year is required" });
    else {
      if (parseInt(value) <= today.getFullYear()) {
        setYear({ value, error: "Year must be future!" });
      } else setYear({ value, error: "" });
    }
  };
  const onChangeCVV = (e) => {
    const value = e.target.value;

    if (value.length < 3) setCVV({ value, error: "Must be 3 digital number" });
    else if (value.length === 3) setCVV({ value, error: "" });
    if (value === "") setCVV({ value, error: "CVV is required" });
  };
  const onChangeName = (e) => {
    const value = e.target.value;
    if (value === "") setName({ value, error: "Name is required" });
    else if (
      /[ `!@#$%^&*()_+\-={};':"\\|,.<>?~]/.test(value) ||
      /^\s+$/.test(value)
    ) {
      setName({ value, error: "No symbol, No space" });
    } else setName({ value, error: "" });
  };
  const onChangeNumber = (e) => {
    if (/^\d+$/.test(e.target.value) && e.target.value.length === 16) {
      const value = e.target.value;
      if (cardType === "master" && validateMasterCardNumber(value)) {
        setNumber({ value, error: "" });
      } else if (cardType === "visa" && validateVisaCardNumber(value)) {
        setNumber({ value, error: "" });
      } else if (cardType === "master" && !validateMasterCardNumber(value)) {
        setNumber({
          value,
          error: "Sorry, this number is not valid master card number.",
        });
      } else if (cardType === "visa" && !validateVisaCardNumber(value)) {
        setNumber({
          value,
          error: "Sorry, this number is not valid visa card number.",
        });
      }
    }
    if (e.target.value.length < 16) {
      setNumber({ value: e.target.value, error: "Must be 16 digit number" });
    }
    if (e.target.value === "") {
      setNumber({ value: "", error: "Card number is required" });
    }
  };

  useEffect(() => {
    if (
      name.value !== "" &&
      number.error === "" &&
      number.value !== "" &&
      name.error === "" &&
      month.value !== "" &&
      month.error === "" &&
      year.value !== "" &&
      year.error === "" &&
      cvv.value !== "" &&
      cvv.error === ""
    ) {
      setValidCard(true);
    }
  }, [name, number, month, year, cvv]);

  useEffect(() => {
    setName({ value: "", error: "" });
    setNumber({ value: "", error: "" });
    setMonth({ value: "", error: "" });
    setYear({ value: "", error: "" });
    setCVV({ value: "", error: "" });
  }, [cardType]);

  return (
    <div className="md:w-1/2 lg:w-1/3 w-full ">
      <h1 className="font-bold text-lg mb-4">Payment</h1>
      <div className="shadow-xl rounded-xl">
        <div className="flex px-9 py-6 flex-col gap-3 bg-[#FAFAFC]">
          <p className="text-base">We only accept Master and Visa</p>
          <div className="flex gap-3 items-center">
            <button onClick={() => setCardType("master")}>
              <img
                src={MasterImage}
                className={selectedCardStyle("master")}
                alt="master"
                width="50"
              />
            </button>
            <button onClick={() => setCardType("visa")}>
              <img
                src={VisaImage}
                className={selectedCardStyle("visa")}
                alt="visa"
                width="50"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-9 py-6">
          <TextField
            error={name.error.length > 0}
            required
            id="outlined-error"
            label="Name on Card"
            defaultValue="Hello World"
            value={name.value}
            onChange={onChangeName}
            helperText={name.error}
          />
          <TextField
            error={number.error.length > 0}
            required
            id="outlined-error"
            label="Card Number"
            defaultValue="Hello World"
            value={number.value}
            onChange={onChangeNumber}
            helperText={number.error}
          />
          <div className="flex gap-6 flex-col lg:flex 2xl:flex-row xl:items-center justify-center">
            <div className="flex gap-3">
              <FormControl
                className="w-1/2"
                sx={{ minWidth: 130 }}
                error={month.error.length > 0}
              >
                <InputLabel id="demo-simple-select-error-label">
                  Month
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-error-label"
                  id="demo-simple-select-error"
                  value={month.value}
                  label="Month"
                  onChange={onChangeMonth}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {MONTH.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {month.error && <FormHelperText>{month.error}</FormHelperText>}
              </FormControl>
              <FormControl
                className="w-1/2"
                sx={{ minWidth: 130 }}
                error={year.error.length > 0}
              >
                <InputLabel id="demo-simple-select-error-label">
                  Year
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-error-label"
                  id="demo-simple-select-error"
                  value={year.value}
                  label="Year"
                  onChange={onChangeYear}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {YEAR.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {year.error && <FormHelperText>{year.error}</FormHelperText>}
              </FormControl>
            </div>
            <TextField
              error={cvv.error.length > 0}
              required
              id="outlined-error"
              label="CSC/CVV"
              defaultValue="Hello World"
              helperText={cvv.error}
              type="number"
              value={cvv.value}
              onChange={onChangeCVV}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 items-center mt-10">
        <button className="border border-[#4790A1] text-[#4790A1] px-14 py-3">
          Back
        </button>
        <button
          className={`${
            validCard ? "bg-[#127C95]" : "bg-[#C8CDD2]"
          } text-white px-14 py-3 ${validCard && "hover:bg-[#3C727E]"}`}
          disabled={!validCard}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
