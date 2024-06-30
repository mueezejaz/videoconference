import React, { useEffect, useState } from "react";
const useLocalhost = (prefix, initialValue) => {
  const preprefix = "videoConference";
  const pefixValuee = preprefix + prefix;
  const [value, setValue] = useState(() => {
    let localStoredValue = localStorage.getItem(pefixValuee);
    if (localStoredValue != null || localStoredValue != undefined) {
      console.log(JSON.parse(localStoredValue));
      return JSON.parse(localStoredValue);
    } else {
      if (typeof initialValue === "function") {
        return initialValue();
      } else {
        return initialValue;
      }
    }
  });
  useEffect(() => {
    localStorage.setItem(pefixValuee, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

export default useLocalhost;
