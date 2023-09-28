import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const NodeContext = createContext("");
const ShowAddressContext = createContext(true);

const NodeContextProvider = ({ children }) => {
  const [NodeID, SetNodeID] = useState(["All", ""]);
  const [ShowAddress, SetShowAddress] = useState(true);
  const [AllNodes, SetAllNode] = useState([]);
  const [UniqueTransactions, SetuniqueTransactions] = useState([]);
  useEffect(() => {
    const fetchNodesData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/addresses/" + NodeID[0]
        );
        const { response: addresses } = response.data;
        SetAllNode(addresses);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchNodesData();

    const fetchUniqueTransactionsData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/uniqueTransactions/" + NodeID[0]
        );
        const { response: uniqueTransactions } = response.data;
        SetuniqueTransactions(uniqueTransactions);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchUniqueTransactionsData();
  }, [NodeID]);
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
