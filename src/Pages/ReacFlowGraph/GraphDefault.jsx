import { useEffect, useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  Panel,
  useNodesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { truncateLabel } from "../Address/truncateLabel";
import axios from "axios";
import {
  NodeContext,
  NodeContextProvider,
  UseNodeContext,
} from "../Address/GraphContext";

export const GraphDefault = () => {
  const [Nodes, SetNodeIDs] = useState([]);
  const [UniqueTransactions, SetuniqueTransactions] = useState([]);
  const { NodeID, SetNodeID } = UseNodeContext();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  useEffect(() => {
    const fetchNodesData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/addresses");
        const { response: addresses } = response.data;
        SetNodeIDs(addresses);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchNodesData();
  }, []);

  useEffect(() => {
    // Generate initialNodes when Nodes change
    const initialNodes = Nodes.map((nodeData) => ({
      id: nodeData.addressId,
      position: { x: 10, y: 0 },
      data: {
        label: truncateLabel(nodeData.addressId),
        truncated_label: nodeData.addressId,
        type: nodeData.type,
      },
      selected: false,
    }));
    setNodes(initialNodes);
  }, [Nodes]);

  useEffect(() => {
    const fetchUniqueTransactionsData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/uniqueTransactions"
        );
        const { response: uniqueTransactions } = response.data;
        SetuniqueTransactions(uniqueTransactions);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
    fetchUniqueTransactionsData();
  }, []);

  return (
    <div className="relative w-full h-full bg-white rounded-xl">
      <ReactFlow nodes={nodes} onNodesChange={onNodesChange}>
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
export default GraphDefault;
