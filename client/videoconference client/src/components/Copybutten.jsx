import React from "react";
import { Button } from "./ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
const Copybutten = ({ inputRef, setcopy, copy, className }) => {
  const handleCopy = () => {
    console.log(inputRef);
    const inputText = inputRef.current.value;
    const textarea = document.createElement("textarea");
    textarea.value = inputText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setcopy(true);
    setTimeout(() => {
      setcopy(false);
    }, 2000);
  };
  return (
    <>
      <Button
        type="button"
        size="sm"
        className={`px-3 flex-col ${className}`}
        onClick={() => {
          handleCopy(inputRef, setcopy);
        }}
      >
        {copy ? (
          <>
            <IoIosCheckmarkCircle className=" text-[#3bc23b] w-6 h-6" />
            <span className="text-text">Copyed</span>
          </>
        ) : (
          <>
            <IoCopy className=" w-6 h-6" />
            <span className="text-text ">Copy</span>
          </>
        )}
      </Button>
    </>
  );
};

export { Copybutten };
