
const TempToggle = ({ unit, setOptions }) => {
    const UNIT_CELSIUS = "C"
    const UNIT_FAHRENHEIT = "F"
    return (
        <div className="temp-toggle">
            <button
                className={`temp-toggle__btn ${unit === UNIT_FAHRENHEIT ? "temp-toggle__btn--active" : ""}`}
                onClick={() => setOptions({ unit: UNIT_FAHRENHEIT })}
            >
                &deg;F
            </button>
            <button
                className={`temp-toggle__btn ${unit  === UNIT_CELSIUS ? "temp-toggle__btn--active" : ""}`}
                onClick={() => setOptions({ unit: UNIT_CELSIUS })}
            >
                &deg;C
            </button>
        </div>
    );
};

export default TempToggle;
