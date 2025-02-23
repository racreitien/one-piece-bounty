export const capitalize = (str: string): string => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return capitalized;
};
