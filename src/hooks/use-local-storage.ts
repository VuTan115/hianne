import { useEffect, useState } from 'react';

function getStorageValue<T>(key: string, initialValue: T) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : initialValue;
    return initial;
  }
}

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, initialValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
