const problem38 = () => {
  // const LARGEST_POSSIBLE_PANDIGITAL = "987654321";
  const pandigitalNumbers = [];

  let currNum = 1;

  while (currNum < 10000) {
    // get 9 digit product
    const concatenatedProduct = getNineDigitConcatenatedProduct(currNum);

    if (isPandigital(concatenatedProduct)) {
      // console.log(currNum, concatenatedProduct);
      pandigitalNumbers.push(currNum);
    }

    currNum++;
  }

  return getNineDigitConcatenatedProduct(Math.max(...pandigitalNumbers));
};

export default problem38;

const getNineDigitConcatenatedProduct = (n: number) => {
  let product = "";

  let i = 1;
  while (product.length < 9) {
    product += i * n;
    i++;
  }

  if (product.length === 9) {
    return product;
  } else {
    return "000000000";
  }
};

const isPandigital = (str: string) => {
  const pandigital = "123456789";
  return str.split("").sort().join("") === pandigital;
};
