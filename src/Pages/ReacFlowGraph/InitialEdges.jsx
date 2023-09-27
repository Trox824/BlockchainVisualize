// initialEdges.js

export const generateInitialEdges = (UniqueTransactions) =>
  UniqueTransactions.map((EdgeData) => ({
    id: EdgeData.from + "to" + EdgeData.to,
    position: { x: 10, y: 0 },
    source: EdgeData.from,
    target: EdgeData.to,
    animated: true,
  }));
