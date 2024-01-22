export const getDateFormat = (): string => {
  return `${new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};
