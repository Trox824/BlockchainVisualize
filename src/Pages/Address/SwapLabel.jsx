
export const SwapLabel = (node,sigma) => {
  let temp_label = sigma.getGraph().getNodeAttribute(node, "truncated_label");
  
  sigma
    .getGraph()
    .setNodeAttribute(
      node,
      "truncated_label",
      sigma.getGraph().getNodeAttribute(node, "label")
    );
  sigma.getGraph().setNodeAttribute(node, "label", temp_label);
  return null;
};
export default SwapLabel;
