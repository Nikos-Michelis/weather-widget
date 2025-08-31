import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp, faDroplet, faWind} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/components/button/Button.jsx";
import TempToggle from "@/components/button/TempToggle.jsx";
import useOptions from "@/hooks/useOptions.jsx";

const WeatherWidget = (
    {
        data,
        showCurrent = false,
        showForecast = false,
        showAtmosphere= true,
        showRow = false,
        allowToggle = false,
    }) => {
    const [toggle, setToggle] = useState()
    const [options, setOptions] = useOptions({ unit: "C" });
    const unit = options.unit;
    const handleDayDisplay = (dt) => {
        const date = new Date(dt * 1000);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            timeZone: data?.timezone
        });
    };
    const convertTemperature = (tempInCelsius) => {
        return unit === "C" ? tempInCelsius : handleFahrenheitConversion(tempInCelsius);
    };
    const handleFahrenheitConversion = (data) => {
        return (9 / 5 * data) + 32;
    };

    return (
        <>
            <div className={`weather weather--${showRow ? "large" :data?.style?.size}`}>
                <div className="weather__temp-toggle">
                    <TempToggle unit={unit} setOptions={setOptions}/>
                </div>
                {(showCurrent || allowToggle) &&
                    <div className={`weather__container ${showRow && "weather__container--wrap"}`}>
                        <div className={`weather__details weather__details--col ${showRow && "weather__details--half"}`}>
                            <div className="weather__detail-box">
                                <h3 className="weather__title">{data?.location}</h3>
                            </div>
                            <img
                                className="weather__image-icon weather__image-icon--large"
                                src={`https://openweathermap.org/img/wn/${data?.current?.weather?.[0]?.icon}@2x.png`}
                                alt={data?.current?.weather?.[0]?.description}/>
                            <div className="weather__detail-box weather__detail-box--col">
                                <h1 className="weather__title--large">{Math.round(convertTemperature(data?.current?.temp?.day || data?.current?.temp))}&deg;<span>{unit}</span></h1>
                                <p className="weather__text">{data?.current?.weather[0]?.description}</p>
                            </div>
                        </div>
                        {(showAtmosphere || allowToggle) &&
                            <div className={`weather__details ${showRow && "weather__details--half"}`}>
                                {showAtmosphere &&
                                    <div className="weather__detail-box">
                                        <FontAwesomeIcon icon={faDroplet} className="weather__icon--medium weather__icon--humidity"/>
                                        <div className="weather__detail-item">
                                            <p className="weather__value">{data?.current?.humidity} <span>%</span></p>
                                            <p className="weather__text">humidity</p>
                                        </div>
                                    </div>
                                }
                                {allowToggle &&
                                    <div className="weather__detail-box">
                                        <Button
                                            onClick={() => setToggle(!toggle)}
                                            className="btn--transparent hover scale-small clr-dark-cosmos-300">
                                            <FontAwesomeIcon icon={toggle ? faAngleUp : faAngleDown} />
                                        </Button>
                                    </div>
                                }
                                {showAtmosphere &&
                                    <div className="weather__detail-box">
                                        <FontAwesomeIcon icon={faWind} className="weather__icon--medium weather__icon--wind"/>
                                        <div className="weather__detail-item">
                                            <p className="weather__value">{Math.round(data?.current?.wind_speed)} <span>Km/H</span></p>
                                            <p className="weather__text">wind speed</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
                <div className={`weather__container weather__container--responsive height-fade ${ (allowToggle && toggle || showForecast) ? "show md" : ""} `}>
                    {
                        data?.daily && data?.daily.length > 0 ? (
                            data?.daily.slice(0, data?.daily.length - 1).map((item, index) => (
                                <div key={index} className="weather__details weather__details--forcast">
                                    <p className="fv-sm-caps">{handleDayDisplay(item?.dt)}</p>
                                    <img
                                        className="weather__image-icon weather__image-icon--medium"
                                        src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`}
                                        alt={item.weather?.[0]?.description}/>
                                    <div className="weather__detail-box weather__detail-box--col">
                                        <span className="margin-inline-1 fw-bold">{Math.round(convertTemperature(item?.temp?.max))}&deg;</span>
                                        <span className="margin-inline-1">{Math.round(convertTemperature(item?.temp?.min))}&deg;</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <div>Weather data currently unavailable...</div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default WeatherWidget;