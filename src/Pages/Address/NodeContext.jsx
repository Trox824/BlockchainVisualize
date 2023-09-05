import { createContext, useContext, useState, useEffect } from "react";
const NodeContext = createContext("");
const ShowAddressContext = createContext(true);
const NodeContextProvider = ({ children }) => {
  const [NodeID, SetNodeID] = useState("");
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
