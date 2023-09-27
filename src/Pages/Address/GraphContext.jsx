import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const NodeContext = createContext("");
const ShowAddressContext = createContext(true);

const NodeContextProvider = ({ children }) => {
  const [NodeID, SetNodeID] = useState(["All", ""]);
  const [ShowAddress, SetShowAddress] = useState(true);

  return (
    <NodeContext.Provider
      value={{
        NodeID,
        SetNodeID,
        ShowAddress,
        SetShowAddress,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

const UseNodeContext = () => {
  return useContext(NodeContext);
};

export { NodeContextProvider, UseNodeContext, NodeContext };
