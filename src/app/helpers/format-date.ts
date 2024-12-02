export const formatDate = (timestamp: number | string): string => {
  if (typeof timestamp === "number") {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return timestamp;
};
