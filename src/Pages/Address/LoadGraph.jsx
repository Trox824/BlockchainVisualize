import React from "react";
import "./style.css";
import {
  SigmaContainer,
  ControlsContainer,
  ZoomControl,
  FullScreenControl,
} from "@react-sigma/core";
import {
  useWorkerLayoutForceAtlas2,
  LayoutForceAtlas2Control,
} from "@react-sigma/layout-forceatlas2";
import "@react-sigma/core/lib/react-sigma.min.css";
import { GraphDefault } from "./GraphDefault";
import GraphEvent from "./GraphEvent";
export const FA2Graph = () => {
  return (
    <SigmaContainer className="relative w-full h-full bg-white rounded-xl">
      <GraphDefault />
      <GraphEvent />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
        <FullScreenControl />
        <LayoutForceAtlas2Control settings={{ settings: { slowDown: 10 } }} />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default FA2Graph;
