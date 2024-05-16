import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const useLocalhost = (prefix) => {
  const preprefix = "videoconference";
  const prefixvalue = preprefix + prefix;
  function getandsetvaluetolocalstorage() {
    let localstoragevalue = localStorage.getItem(prefixvalue);
    if (localstoragevalue != null || localstoragevalue != undefined) {
      localstoragevalue = JSON.parse(localstoragevalue);
    } else {
      const uuid = uuidv4();
      localstoragevalue = uuid.substring(0, 8);
      localstoragevalue = localstoragevalue.replace(/(.{4})/g, "$1-");
      localstoragevalue = localstoragevalue.slice(0, -1); // remove the last dash
      localStorage.setItem(prefixvalue, JSON.stringify(localstoragevalue));
    }
    return localstoragevalue;
  }
  let value = getandsetvaluetolocalstorage();
  return value;
};

export default useLocalhost;
