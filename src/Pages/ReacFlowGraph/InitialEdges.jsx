// initialEdges.js
import { UseNodeContext } from "../Address/GraphContext";
export const generateInitialEdges = (UniqueTransactions) =>
  UniqueTransactions.map((EdgeData) => ({
    id: EdgeData.hash,
    position: { x: 10, y: 0 },
    source: EdgeData.from,
    target: EdgeData.to,
    animated: true,
    label: EdgeData.total + " USDT " + EdgeData.count + " txn",
  }));
