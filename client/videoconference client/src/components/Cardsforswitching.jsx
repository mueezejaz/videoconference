import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Cardsforswitching = ({ children, setside, side }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {side ? (
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            transition={{
              x: {
                duration: 1,
                type: "spring",
              },
            }}
            exit={{ x: -500 }}
            key={1}
            className="w-full h-full absolute"
          >
            {childrenArray[0]}
          </motion.div>
        ) : (
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{
              x: {
                duration: 1,
                type: "spring",
              },
            }}
            exit={{ x: 500 }}
            key={2}
            className="w-full h-full absolute"
          >
            {childrenArray[1]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cardsforswitching;
