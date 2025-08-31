import {useEffect, useState} from "react";

function useOptions(defaultOptions) {
    const getStoredOptions = () => {
        const stored = localStorage.getItem("options");
        return stored ? JSON.parse(stored) : defaultOptions;
    };

    const [options, setOptions] = useState(getStoredOptions);

    useEffect(() => {
        localStorage.setItem("options", JSON.stringify(options));
    }, [options]);

    return [options, setOptions];
}

export default useOptions;