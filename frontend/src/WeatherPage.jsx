import {useParameterizedQuery} from "@/services/queries.jsx";
import WeatherWidget from "@/components/widget/WeatherWidget.jsx";
import {Button} from "@/components/button/Button.jsx";
import {useState} from "react";
import {DateTime} from "luxon";

const WeatherPage = () => {
    const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/public/weather/location`;
    const [mode, setMode] = useState({
        showCurrent: true,
        showForecast: false,
        showAtmosphere: false,
        showRow: false,
        allowToggle: false,
    });
    const lat = 28.608227;
    const lon= -80.604282;
    const queryData
        = useParameterizedQuery({
        url: `${baseUrl}?lat=${lat}&lon=${lon}`,
        params: `params-lat=${lat}&lon=${lon}`,
        cacheKey: "weather",
    });
    const currentForcastData = queryData?.data?.daily[0];
    const dailyForcastData = queryData?.data?.daily;
    const timezone = queryData?.data?.timezone;
    const now = DateTime.now().setZone(timezone);
    const hour = now.hour;
    const isDaytime = hour >= 6 && hour < 18;

    return (
        <div className="container flex flex-column justify-center align-center padding-4" data-height="full" data-type="wide">
            <div className="flex flex-wrap justify-center align-end">
                <div className={`${isDaytime ? "sun" : "moon"} margin-block-2`} />
                <h1 className="margin-inline-4 ff-base">Weather Widget</h1>
            </div>
            <div className="modes margin-block-8">
                <Button
                    className="btn btn--primary"
                    onClick={() =>
                        setMode(prevState => ({
                            ...prevState,
                            showCurrent: !prevState.showCurrent
                        }))
                    }
                    disabled={mode.allowToggle}
                >
                    Current
                </Button>

                <Button
                    className="btn btn--primary"
                    onClick={() =>
                        setMode(prevState => ({
                            ...prevState,
                            showForecast: !prevState.showForecast
                        }))
                    }
                    disabled={mode.allowToggle}
                >
                    Weekly
                </Button>

                <Button
                    className="btn btn--primary"
                    onClick={() =>
                        setMode(prevState => ({
                            ...prevState,
                            showAtmosphere: !prevState.showAtmosphere
                        }))
                    }
                    disabled={mode?.showForecast && !mode?.showCurrent}
                >
                    Atmosphere
                </Button>
                <Button
                    className="btn btn--primary"
                    onClick={() =>
                        setMode(prevState => ({
                            ...prevState,
                            showAtmosphere: true,
                            showRow: !prevState.showRow
                        }))
                    }
                >
                    Row
                </Button>
                <Button
                    className="btn btn--primary"
                    onClick={() =>
                        setMode(prevState => ({
                            ...prevState,
                            showForecast: false,
                            allowToggle: !prevState.allowToggle
                        }))
                    }
                >
                    Toggle
                </Button>
            </div>
            <WeatherWidget
                data={
                    {
                        location: "STARBASE, TX Pad A / B",
                        current: currentForcastData,
                        daily: dailyForcastData,
                        timezone: timezone,
                        style: { size: "medium" }
                    }
                } {...mode}
            />
        </div>
    );
}

export default WeatherPage