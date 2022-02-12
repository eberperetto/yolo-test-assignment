// Validates crypto code, where it should be at least 3 chars long
// as must have at least a letter and possibly 1 number in it
export const validateBaseSymbol = (baseSymbol: string): boolean => {
  return !!baseSymbol.match("([A-Z]+[0-9]?){3,}");
};
