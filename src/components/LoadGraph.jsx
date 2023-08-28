import React, { useEffect, useState } from "react";
import "../style.css";
import {
  SigmaContainer,
  useSigma,
  useLoadGraph,
  ControlsContainer,
  ZoomControl,
  FullScreenControl,
} from "@react-sigma/core";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import {
  useWorkerLayoutForceAtlas2,
  LayoutForceAtlas2Control,
} from "@react-sigma/layout-forceatlas2";

import { uniqueId } from "lodash";

import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";

const Node_1 = {
  address: "TWKeF4kETmaa6jHr3sX3bt2iRp9aitX9mJ",
  To_address: 7,
  from_address: 123,
  current_balance: 185,
  Transactions: 1129,
  Maximum_txn_amount: 330000,
  Total_received: 4794991.1506,
  Total_sent: 4794806.1506,
};
const Node_2 = {
  address: "TCGkiziszuaVxK3KpNRT7ZjgazMy2qCpfj",
  To_address: 12,
  from_address: 502,
  current_balance: 185,
  Transactions: 1129,
  Maximum_txn_amount: 330000,
  Total_received: 4794991.1506,
  Total_sent: 4794806.1506,
};
const colorPalette = [
  "#3F2021", // DARK BROWN
  "#B04A5A", // DEEP CARMINE PINK
  "#BA5B3F", // COPPER RUST
  "#CB9576", // COPPER RUST
  "#7FA0AC", // BLUE GRAY
  "#EEE5D3", // ISABELLINE
];
const GraphDefault = () => {
  const sigma = useSigma();
  const { positions, assign } = useLayoutCircular();
  const loadGraph = useLoadGraph();
  const graph = new Graph();

  useEffect(() => {
    const order = 50;
    const probability = 0.1;
 
    // Create the graph
    const nodeIds = []; // Store generated node IDs

    for (let i = 0; i < order; i++) {
      const node_id = uniqueId();
      graph.addNode(node_id, {
        label: "asdasdasdas",
        size: 10,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        x: 0,
        y: 0,
      });
      nodeIds.push(node_id); // Store the generated node ID
    }

    // Create directed edges between nodes using their IDs
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
  }, [assign, loadGraph, graph]);
 
  return null;
};

export const FA2Graph = () => {
  const Fa2 = () => {
    const { start, kill } = useWorkerLayoutForceAtlas2({
      settings: { slowDown: 10 },
    });

    useEffect(() => {
      start();
      return () => {
        kill();
      };
    }, [start, kill]);

    return null;
  };

  return (
    <SigmaContainer className="relative w-full h-full bg-white rounded-xl">
      <GraphDefault />
      <Fa2 />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
        <LayoutForceAtlas2Control settings={{ settings: { slowDown: 10 } }} />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default FA2Graph;
