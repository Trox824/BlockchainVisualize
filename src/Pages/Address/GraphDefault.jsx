import { useEffect, useState } from "react";
import {
  useSigma,
  useLoadGraph,
  useRegisterEvents,
  useSetSettings,
} from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { random, uniqueId } from "lodash";
import { truncateLabel } from "./truncateLabel";
import axios from "axios";
import {
  NodeContext,
  NodeContextProvider,
  UseNodeContext,
} from "../Address/GraphContext";
const colorPalette = [
  "#3F2021", // DARK BROWN
  "#B04A5A", // DEEP CARMINE PINK
  "#BA5B3F", // COPPER RUST
  "#CB9576", // COPPER RUST
  "#7FA0AC", // BLUE GRAY
  "#EEE5D3", // ISABELLINE
];

export const GraphDefault = () => {
  const sigma = useSigma();
  const { positions, assign } = useLayoutCircular();
  const loadGraph = useLoadGraph();
  const registerEvents = useRegisterEvents();
  const setSettings = useSetSettings();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [Nodes, SetNodeIDs] = useState([]);
  const [UniqueTransactions, SetuniqueTransactions] = useState([]);
  const { NodeID, SetNodeID } = UseNodeContext();
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

  useEffect(() => {
    const graph = new Graph();
    const order = 50;
    // Create the graph
    const nodeIds = []; // Store generated node IDs

    for (let i = 0; i < Nodes.length; i++) {
      //set default node
      if (i === 0) SetNodeID([Nodes[i].addressId, Nodes[i].type]);
      graph.addNode(Nodes[i].addressId, {
        nodeType: Nodes[i].type,
        truncated_label: Nodes[i].addressId,
        label: truncateLabel(Nodes[i].addressId),
        size: 15,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        x: 0,
        y: 0,
      });
    }
    for (let i = 0; i < UniqueTransactions.length; i++) {
      graph.addDirectedEdge(
        UniqueTransactions[i].from,
        UniqueTransactions[i].to
      );
    }
    loadGraph(graph);
    assign();
    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
    });
  }, [assign, loadGraph, registerEvents, Nodes, UniqueTransactions]);
  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();

        const newData = { ...data, highlighted: data.highlighted || false };

        if (hoveredNode) {
          if (
            node === hoveredNode ||
            graph.neighbors(hoveredNode).includes(node)
          ) {
            newData.highlighted = true;

            newData.label = newData.truncated_label;
            newData.size = 18;
          } else {
            newData.color = "#E2E2E2";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode, setSettings, sigma]);

  return null;
};
export default GraphDefault;
