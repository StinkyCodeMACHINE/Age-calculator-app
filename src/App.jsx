import react, { useState, useEffect } from "react";

function App() {
  const [inputValues, setInputValues] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [invalidated, setInvalidated] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [calculated, setCalculated] = useState(false);

  const [dates, setDates] = useState({
    birthDate: null,
    currentDate: null,
  });

  useEffect(() => {
    async function dostuff() {
      await setDates((oldDates) => ({
        ...oldDates,
        birthDate: new Date(
          Number(inputValues.year),
          Number(inputValues.month)-1,
          Number(inputValues.day),
        ),
      }));
      await setCalculated(false)
    } 

    calculated && dostuff();
      
  }, [calculated]);

  return (
    <main className="main-container">
      <h1 class="sr-only">Equilibrium</h1>
      <form>
        <div className="date-input-container">
          <div style={invalidated.day ? { color: "var(--light-red)" } : {}}>
            Day
          </div>
          <input
            type="text"
            onChange={async (e) => {
              await setInputValues((oldInputValues) => ({
                ...oldInputValues,
                day: e.target.value,
              }));
              await setInvalidated((oldInvalidated) => ({
                ...oldInvalidated,
                day: "",
              }));
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={inputValues.day}
            placeholder="DD"
            maxLength="2"
            style={
              invalidated.day ? { border: "1px solid var(--light-red)" } : {}
            }
          />
          {invalidated.day && (
            <div className="invalidated-message">{invalidated.day}</div>
          )}
        </div>
        <div className="date-input-container">
          <div style={invalidated.month ? { color: "var(--light-red)" } : {}}>
            Month
          </div>
          <input
            type="text"
            onChange={async (e) => {
              await setInputValues((oldInputValues) => ({
                ...oldInputValues,
                month: e.target.value,
              }));
              await setInvalidated((oldInvalidated) => ({
                ...oldInvalidated,
                month: "",
              }));
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={inputValues.month}
            placeholder="MM"
            maxLength="2"
            style={
              invalidated.month ? { border: "1px solid var(--light-red)" } : {}
            }
          />
          {invalidated.month && (
            <div className="invalidated-message">{invalidated.month}</div>
          )}
        </div>
        <div className="date-input-container">
          <div style={invalidated.year ? { color: "var(--light-red)" } : {}}>
            Year
          </div>
          <input
            type="text"
            onChange={async (e) => {
              await setInputValues((oldInputValues) => ({
                ...oldInputValues,
                year: e.target.value,
              }));
              await setInvalidated((oldInvalidated) => ({
                ...oldInvalidated,
                year: "",
              }));
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={inputValues.year}
            placeholder="YYYY"
            maxLength="4"
            style={
              invalidated.year ? { border: "1px solid var(--light-red)" } : {}
            }
          />
          {invalidated.year && (
            <div className="invalidated-message">{invalidated.year}</div>
          )}
        </div>
        <img
          onClick={async (e) => {
            e.preventDefault();
            const currentDate = new Date();
            await setDates((oldDates) => ({
              ...oldDates,
              currentDate: currentDate,
            }));
            let newInvalidated = { day: "", month: "", year: "" };
            if (
              !inputValues.day ||
              !inputValues.month ||
              !inputValues.year ||
              (inputValues.month === "02" && Number(inputValues.day) > 29) ||
              (inputValues.month === "04" && Number(inputValues.day) > 30) ||
              (inputValues.month === "06" && Number(inputValues.day) > 30) ||
              (inputValues.month === "09" && Number(inputValues.day) > 30) ||
              (inputValues.month === "11" && Number(inputValues.day) > 30) ||
              Number(inputValues.day) > 31 ||
              inputValues.month > 12 ||
              inputValues.year > currentDate.getFullYear()
            ) {
              newInvalidated.day = !inputValues.day
                ? "The field is required"
                : (inputValues.month === "02" &&
                    Number(inputValues.day) > 29) ||
                  (inputValues.month === "04" &&
                    Number(inputValues.day) > 30) ||
                  (inputValues.month === "06" &&
                    Number(inputValues.day) > 30) ||
                  (inputValues.month === "09" &&
                    Number(inputValues.day) > 30) ||
                  (inputValues.month === "11" &&
                    Number(inputValues.day) > 30) ||
                  Number(inputValues.day) > 31
                ? "Must be a valid day"
                : "";
              newInvalidated.month = !inputValues.month
                ? "The field is required"
                : inputValues.month > 12 && "Must be a valid month";
              newInvalidated.year = !inputValues.year
                ? "The field is required"
                : inputValues.year > currentDate.getFullYear() &&
                  "Must be in the past";
              await setInvalidated(newInvalidated);
            } else {
              await setCalculated(true);
            }
          }}
          className="arrow-button"
          src="/assets/images/icon-arrow.svg"
          alt="some sort of arrow i dunno"
        />
      </form>
      <div className="bottom-subcontainer">
        <div className="age-stat">
          <span>
            {dates.birthDate
              ? Math.abs(
                  dates.currentDate.getFullYear() -
                    dates.birthDate.getFullYear()
                )
              : "--"}
          </span>
          years
        </div>
        <div className="age-stat">
          <span>
            {dates.birthDate
              ? Math.abs(
                  dates.currentDate.getMonth() - dates.birthDate.getMonth()
                )
              : "--"}
          </span>
          months
        </div>
        <div className="age-stat">
          <span>
            {dates.birthDate
              ? Math.abs(
                  dates.currentDate.getDate() - dates.birthDate.getDate()
                )
              : "--"}
          </span>
          days
        </div>
      </div>
    </main>
  );
}

export default App;
