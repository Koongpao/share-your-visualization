// export const CapitalizeWords = (str: string) => {
//     return str
//       .toLowerCase()
//       .split("_")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };
import { ChangeEvent } from "react";

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
//Capitalize Words

export const handleTab = (
  e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFunction: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e.key === "Tab") {
    e.preventDefault();
    setFunction((prev: string) => prev + "\t");
  }
};
//Let Input to be able to type tab, instead of default event (skipping to next input)

export const handleOnChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFunction: React.Dispatch<React.SetStateAction<string>>,
  maxChar: number
) => {
  if (e.target.value.length <= maxChar) {
    setFunction(e.target.value);
  }
};
//Handle on input field change (not exceeding maxChar)