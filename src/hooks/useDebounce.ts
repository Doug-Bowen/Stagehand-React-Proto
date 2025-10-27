/*
    Modified from source found here: https://github.com/gragland/usehooks

    useDebounce handles debouncing behavior, i.e., withholding a state change until
    a predetermined delay has elapsed. This is useful for things such as inputs where
    it is desired to not query an API with each keystroke.
 */
import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}

export default useDebounce;
