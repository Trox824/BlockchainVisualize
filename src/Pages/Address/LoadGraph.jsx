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
import { truncateLabel } from "./truncateLabel";
import axios from "axios";
import {
  NodeContext,
  NodeContextProvider,
  UseNodeContext,
} from "../Address/NodeContext";
const colorPalette = [
  "#3F2021", // DARK BROWN
  "#B04A5A", // DEEP CARMINE PINK
  "#BA5B3F", // COPPER RUST
  "#CB9576", // COPPER RUST
  "#7FA0AC", // BLUE GRAY
  "#EEE5D3", // ISABELLINE
];
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
