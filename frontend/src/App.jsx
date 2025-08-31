import {ErrorBoundary} from "react-error-boundary";
import {GetFallbackComponent} from "@/components/fallback/GetFallbackComponent.jsx";
import WeatherPage from "@/WeatherPage.jsx";

function App() {
    return (
        <>
            <ErrorBoundary FallbackComponent={GetFallbackComponent}>
                <WeatherPage/>
            </ErrorBoundary>
        </>
    );
}

export default App
