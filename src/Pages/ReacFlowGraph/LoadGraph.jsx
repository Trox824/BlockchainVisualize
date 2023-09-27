import { useEffect, useState, useCallback, useMemo, memo } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import { Tabs, Tab } from "@nextui-org/react";
import Button from "@mui/material/Button";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Panel,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
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
import { generateInitialNodes } from "./initialNodes"; // Import the initialNodes function
import { generateInitialEdges } from "./initialEdges"; // Import the initialEdges function
import CustomNode from "./CustomNode";

const elk = new ELK();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": 100,
    "elk.spacing.nodeNode": 80,
  };

  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: "root",
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges(),
    };

    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, []);

  return { getLayoutedElements };
};

// const nodeTypes = { CustomNode: CustomNode };
const LayoutFlow = () => {
  const [AllNodes, SetAllNode] = useState([]);
  const [UniqueTransactions, SetuniqueTransactions] = useState([]);
  const { NodeID, SetNodeID } = UseNodeContext();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedTab, setSelectedTab] = useState("vertical");
  const { fitView } = useReactFlow();
  const nodeTypes = useMemo(() => ({ CustomNode: CustomNode }), []);
  const { getLayoutedElements } = useLayoutedElements();
  const handleTabChange = (newSelected) => {
    setSelectedTab(newSelected);
    if (newSelected === "vertical") {
      getLayoutedElements({
        "elk.algorithm": "layered",
        "elk.direction": "DOWN",
      });
    } else if (newSelected === "horizontal") {
      getLayoutedElements({
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
      });
    } else if (newSelected === "force") {
      getLayoutedElements({
        "elk.algorithm": "org.eclipse.elk.force",
      });
    }
    fitView; // Call the function immediately
  };
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
  }, [NodeID]); // Added NodeID to the dependency array
  useEffect(() => {
    const initialNodes = generateInitialNodes(AllNodes);
    setNodes(initialNodes);
    const initialEdges = generateInitialEdges(UniqueTransactions);
    setEdges(initialEdges);
  }, [AllNodes, UniqueTransactions, NodeID]);
  return (
    <div className="relative w-full h-full bg-white rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Panel position="top-right">
          <Tabs value={selectedTab} onSelectionChange={handleTabChange}>
            <Tab key="vertical" title="Vertical" />
            <Tab key="horizontal" title="Horizontal" />
            <Tab key="force" title="Force Layout" />
          </Tabs>
        </Panel>

        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
export const LoadGraph = () => {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
};
export default LoadGraph;
