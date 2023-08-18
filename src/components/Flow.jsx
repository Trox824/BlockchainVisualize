import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
const nodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Hello" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "World" },
  },
];
const edges = [{ id: "1-2", source: "1", target: "2" }];
function Flow() {
  return (
    <div class="rounded-xl w-full h-96 bg-white">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
