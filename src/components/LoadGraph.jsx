import React, { FC, useEffect } from "react";

import Graph from "graphology";
import "@react-sigma/core/lib/react-sigma.min.css";
import {
  SigmaContainer,
  ControlsContainer,
  ZoomControl,
  SearchControl,
  FullScreenControl,
  useSigma,
  useRegisterEvents,
} from "@react-sigma/core";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
export const LoadGraph = () => {
  const graph = new Graph();

  graph.addNode("A", { x: 0, y: 0, label: "Node A", size: 15 });
  graph.addNode("B", { x: 5, y: 1, label: "Node B", size: 15 });
  graph.addNode("C", { x: 5, y: 2, label: "Node C", size: 15 });
  graph.addNode("D", { x: 5, y: 3, label: "Node D", size: 15 });
  graph.addNode("E", { x: 5, y: -1, label: "Node E", size: 15 });
  graph.addNode("F", { x: 5, y: -2, label: "Node F", size: 15 });
  graph.addNode("G", { x: 5, y: -3, label: "Node G", size: 15 });

  return (
    <SigmaContainer
      className="rounded-xl h-full w-full flex justify-center items-center flex-col"
      graph={graph}
    >
      <ControlsContainer className="" position={"bottom-right"}>
        <ZoomControl className="flex items-center justify-center" />
        <FullScreenControl />
      </ControlsContainer>
    </SigmaContainer>
  );
};
