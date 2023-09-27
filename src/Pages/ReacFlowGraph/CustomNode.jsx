import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import Button from "@mui/material/Button";
import { truncateLabel } from "../Address/truncateLabel";
// import { Tooltip, Button } from "@nextui-org/react";
import { Box, Tooltip } from "@mui/material";
import {
  NodeContext,
  NodeContextProvider,
  UseNodeContext,
} from "../Address/GraphContext";
const CustomNode = ({ data }) => {
  const { NodeID, SetNodeID } = UseNodeContext();
  const [hover, setHover] = useState(false);
  let textcolor = null;
  if (data.type == "eoa") {
    textcolor = "success";
  } else {
    textcolor = "warning";
  }
  if (NodeID[0] === data.label) {
    textcolor = "error";
  }
  return (
    <Button
      onClick={() => {
        SetNodeID([data.label, data.type]);
      }}
      color={textcolor}
    >
      <Tooltip title={data.type}>
        <Box
          className={`px-4 py-2 shadow-md rounded-full bg-white border-2 border-stone-400 ease-in-out duration-300 ${
            hover ? "border-solid" : ""
          }`}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Box
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "inherit",
            }}
            className={`ml-2 flex justify-center items-center`}
          >
            <div className="text-sm">
              {hover ? data.label : truncateLabel(data.label)}
            </div>
          </Box>

          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
        </Box>
      </Tooltip>
    </Button>
  );
};

export default memo(CustomNode);
