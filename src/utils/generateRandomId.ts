export const generateRandomId = (): string => {
  return (
    Date.now().toString(36) + // timestamp for time-based uniqueness
    Math.random().toString(36).substring(2, 8) // random string
  );
};
