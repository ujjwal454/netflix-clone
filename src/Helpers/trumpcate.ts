export const trumpcate = (str: string, num: number) => {
  if (str.length > num) {
    return str.slice(0, num) + "....";
  } else {
    return str;
  }
};
