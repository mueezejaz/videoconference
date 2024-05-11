import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Switcher = ({ sideone, sidetwo, side, setside }) => {
  return (
    <div className="w-full h-[3.6rem] relative">
      <div className="w-full h-[90%]">
        <div
          onClick={() => {
            setside(true);
          }}
          className="w-[50%] cursor-pointer h-full absolute top-0 left-0 flex items-center justify-center"
        >
          <h2 className="text-lg text-text font-semibold">{sideone}</h2>
        </div>
        <div
          onClick={() => {
            setside(false);
          }}
          className="w-[50%] cursor-pointer h-full absolute top-0 right-0 flex items-center justify-center"
        >
          <h2 className="text-lg text-text font-semibold">{sidetwo}</h2>
        </div>
      </div>

      <div className="w-full relative h-[10%]">
        <AnimatePresence>
          {side ? (
            <motion.div
              key={12}
              initial={{ width: "0%" }}
              transition={{
                type: "spring",
                opacity: { duration: 0.5 },
              }}
              animate={{ width: "50%" }}
              exit={{ width: "0%" }}
              className="h-full bg-mainbg rounded-r-lg absolute top-0 left-0"
            ></motion.div>
          ) : (
            <motion.div
              key={2}
              initial={{ width: "0%" }}
              transition={{
                type: "spring",
                opacity: { duration: 0.5 },
              }}
              animate={{ width: "50%" }}
              exit={{ width: "0%" }}
              className="h-full bg-mainbg rounded-l-lg absolute top-0 right-0"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Switcher;
