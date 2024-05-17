import React, { useContext, createContext } from "react";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketConnectionProvider = ({ children }) => {
  const socket = "useSocket() "; // Initialize socket connection or pass appropriate value

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketConnectionProvider;
