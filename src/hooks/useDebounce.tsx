import { useEffect, useState } from "react";


export default function useDebounce<T>(value : T, delay :number){
    const [debouncedValue, setdebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setdebouncedValue(value);
        },delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}