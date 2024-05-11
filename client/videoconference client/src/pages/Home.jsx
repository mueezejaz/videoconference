import React, { useState } from "react";
import Switcher from "../components/Switcher";
import Cardsforswitching from "../components/Cardsforswitching";

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
        <Cardsforswitching setside={setside} side={side}>
          <h1>1</h1>
          <h1>2</h1>
        </Cardsforswitching>
      </div>
    </div>
  );
};

export default Home;
