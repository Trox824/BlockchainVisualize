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
import { SwapLabel } from "./SwapLabel";
import { uniqueId } from "lodash";
import { truncateLabel } from "./truncateLabel";
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
  useEffect(() => {
    const graph = new Graph();
    const order = 50;
    const probability = 0.1;

    // Create the graph
    const nodeIds = []; // Store generated node IDs

    for (let i = 0; i < order; i++) {
      const node_id = uniqueId();
      graph.addNode(node_id, {
        truncated_label: "TWKeF4kETmaa6jHr3sX3bt2iRp9aitX9mJ",
        label: truncateLabel("TWKeF4kETmaa6jHr3sX3bt2iRp9aitX9mJ"),
        size: 15,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        x: 0,
        y: 0,
      });
      nodeIds.push(node_id);
      // Store the generated node ID
    }

    for (let i = 0; i < order; i++) {
      for (let j = i + 1; j < order; j++) {
        if (Math.random() < probability)
          graph.addDirectedEdge(nodeIds[i], nodeIds[j]);
        if (Math.random() < probability)
          graph.addDirectedEdge(nodeIds[j], nodeIds[i]);
      }
    }
    loadGraph(graph);
    assign();
    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
    });
  }, [assign, loadGraph, registerEvents]);
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
            newData.size = 15;
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
