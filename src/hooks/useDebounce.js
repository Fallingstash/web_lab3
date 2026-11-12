import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // запустили таймер
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };

    }, [value, delay]); // Эффект срабатывает каждый раз, когда меняется value

    return debouncedValue;
}