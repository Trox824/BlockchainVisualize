export const truncateLabel = (label) => {
  return (
    label.substring(0, 4) +
    "..." +
    label.substring(label.length - 4, label.length)
  );
};
export default truncateLabel;
