import * as React from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: Function | T) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item =
        typeof window !== 'undefined' &&
        JSON.parse(window.localStorage.getItem(key)!);

      return item ? item : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = <T>(value: Function | T) => {
    try {
      const valueToStore: any =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
