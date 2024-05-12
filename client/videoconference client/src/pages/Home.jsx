import React, { useState } from "react";
import Switcher from "../components/Switcher";
import { Button } from "../components/ui/button.jsx";
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
          <JoinroomForm />
          <Creatroom />
        </Cardsforswitching>
      </div>
    </div>
  );
};

const JoinroomForm = () => {
  return (
    <div>
      <h1>Joinroom</h1>
      <Button>Click me</Button>
    </div>
  );
};

const Creatroom = () => {
  return (
    <div>
      <h1>Creatroom</h1>
    </div>
  );
};

export default Home;
