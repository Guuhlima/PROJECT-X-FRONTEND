export const getCssVariable = (variableName: string, fallback = "") => {
  if (typeof window === "undefined") return fallback;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  return value || fallback;
};

export const adjustColorOpacity = (color: string, opacity: number) => {
  if (!color) return color;

  if (color.startsWith("#")) {
    let hex = color.slice(1);

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const red = Number.parseInt(hex.slice(0, 2), 16);
    const green = Number.parseInt(hex.slice(2, 4), 16);
    const blue = Number.parseInt(hex.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }

  const rgbMatch = color.match(/\d+(\.\d+)?/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    const [red, green, blue] = rgbMatch;
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }

  return color;
};