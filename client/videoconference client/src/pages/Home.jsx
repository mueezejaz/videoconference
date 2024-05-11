import React, { useState } from "react";
import Switcher from "../components/Switcher";

const Home = () => {
  const [side, setside] = useState(true);
  console.log(side);
  return (
    <div className="bg-mainbg flex items-center justify-center w-screen h-screen">
      <div className="bg-secondbg overflow-hidden w-[20rem] h-[25rem] rounded-md">
        <Switcher
          sideone="Join Room"
          sidetwo="Create Room"
          setside={setside}
          side={side}
        />
      </div>
    </div>
  );
};

export default Home;
