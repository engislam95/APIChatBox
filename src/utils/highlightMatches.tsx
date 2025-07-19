export const highlightMatches = (text: string, search: string) => {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <mark key={index} className="bg-secondary  rounded px-1">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};
