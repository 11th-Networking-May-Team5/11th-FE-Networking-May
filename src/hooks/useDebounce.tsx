import React from 'react';

interface UseDebounceProps {
  value: string;
  delay?: number;
}

/**
 * Debounce a value
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
const useDebounce = ({ value, delay = 500 }: UseDebounceProps) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  //
  //
  //
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
