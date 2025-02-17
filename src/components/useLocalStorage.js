import { useState, useEffect } from "react";

function getValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);

  return initial || defaultValue;
}
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    return getValue(key, defaultValue);
  });
  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export default useLocalStorage;
