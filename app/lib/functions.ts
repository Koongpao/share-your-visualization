// export const CapitalizeWords = (str: string) => {
//     return str
//       .toLowerCase()
//       .split("_")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };

export const CapitalizeWords = (str: string): string => {
  const separator = str.includes("_") ? "_" : " ";
  return str
    .toLowerCase()
    .split(separator)
    .map((word) => {
      if (!word) {
        return "";
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
