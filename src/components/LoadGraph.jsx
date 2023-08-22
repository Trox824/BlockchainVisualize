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

const GraphDefault = () => {
  const sigma = useSigma();
  const { positions, assign } = useLayoutCircular();
  const loadGraph = useLoadGraph();
  const graph = new Graph();

  useEffect(() => {
    graph.addNode(uniqueId(), {
      x: 0,
      y: 0,
      label: uniqueId(),
      color: "#123456",
      size: 20,
    });
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
    <SigmaContainer className="rounded-xl">
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
