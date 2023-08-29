import React, { useEffect, useState } from "react";
import "../style.css";
import {
  SigmaContainer,
  useSigma,
  useLoadGraph,
  ControlsContainer,
  ZoomControl,
  FullScreenControl,
  useRegisterEvents,
} from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import {
  useWorkerLayoutForceAtlas2,
  LayoutForceAtlas2Control,
} from "@react-sigma/layout-forceatlas2";

import { uniqueId } from "lodash";

import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";

const colorPalette = [
  "#3F2021", // DARK BROWN
  "#B04A5A", // DEEP CARMINE PINK
  "#BA5B3F", // COPPER RUST
  "#CB9576", // COPPER RUST
  "#7FA0AC", // BLUE GRAY
  "#EEE5D3", // ISABELLINE
];

const truncateLabel = (label) => {
  return (
    label.substring(0, 4) +
    "..." +
    label.substring(label.length - 4, label.length)
  );
};

const GraphDefault = () => {
  const sigma = useSigma();
  const { positions, assign } = useLayoutCircular();
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    const order = 50;
    const probability = 0.1;

    // Create the graph
    const nodeIds = []; // Store generated node IDs

    for (let i = 0; i < order; i++) {
      const node_id = uniqueId();
      graph.addNode(node_id, {
        label: "TWKeF4kETmaa6jHr3sX3bt2iRp9aitX9mJ",
        size: 10,
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
    console.log(positions());
  }, []);

  return null;
};

const GraphEvents = () => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState(null);
  
  useEffect(() => {
    // Register the events
    registerEvents({
      enterNode: (event) => {
        const pos = sigma.viewportToGraph(event);
        sigma.getGraph().setNodeAttribute(event.node, "label", truncateLabel(pos.label));
        sigma.getGraph()
      },
      leaveNode: (event) => console.log("leaveNode", event.node),
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
};
export const FA2Graph = () => {
  const Fa2 = () => {
    const { start, kill } = useWorkerLayoutForceAtlas2({
      settings: { slowDown: 10 },
    });

    useEffect(() => {
      // start FA2
      start();
      return () => {
        // Kill FA2 on unmount
        kill();
      };
    }, [start, kill]);

    return null;
  };

  return (
    <SigmaContainer className="relative w-full h-full bg-white rounded-xl">
      <GraphDefault />
      <GraphEvents />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
        <LayoutForceAtlas2Control settings={{ settings: { slowDown: 10 } }} />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default FA2Graph;
