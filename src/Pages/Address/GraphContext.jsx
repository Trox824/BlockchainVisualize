import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const NodeContext = createContext("");
const ShowAddressContext = createContext(true);

const NodeContextProvider = ({ children }) => {
  const [NodeID, SetNodeID] = useState(["All", ""]);
  const [ShowAddress, SetShowAddress] = useState(true);
  const [AllNodes, SetAllNode] = useState([]);
  const [UniqueTransactions, SetuniqueTransactions] = useState([]);

  return (
    <NodeContext.Provider
      value={{
        NodeID,
        SetNodeID,
        AllNodes,
        SetAllNode,
        ShowAddress,
        SetShowAddress,
        UniqueTransactions,
        SetuniqueTransactions,
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
