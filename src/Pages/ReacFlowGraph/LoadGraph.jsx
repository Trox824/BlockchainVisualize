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

const LayoutFlow = () => {
  const { AllNodes, UniqueTransactions } = UseNodeContext();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedTab, setSelectedTab] = useState("vertical");
  const nodeTypes = useMemo(() => ({ CustomNode: CustomNode }), []);
  const { getLayoutedElements } = useLayoutedElements();

  useEffect(() => {
    if (selectedTab === "vertical") {
      getLayoutedElements({
        "elk.algorithm": "layered",
        "elk.direction": "DOWN",
      });
    } else if (selectedTab === "horizontal") {
      getLayoutedElements({
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
      });
    } else if (selectedTab === "force") {
      getLayoutedElements({
        "elk.algorithm": "org.eclipse.elk.force",
      });
    }
  }, [selectedTab, setSelectedTab]);

  useEffect(() => {
    const initialNodes = generateInitialNodes(AllNodes);
    setNodes(initialNodes);
    const initialEdges = generateInitialEdges(UniqueTransactions);
    setEdges(initialEdges);
  }, [AllNodes, UniqueTransactions]);

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
          <Tabs value={selectedTab} onSelectionChange={setSelectedTab}>
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
