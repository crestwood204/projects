import addTwoLargeNumbers from "./addTwoLargeNumbers";

const multiplyTwoLargeNumbers = (n1: string, n2: string): string => {
  let n1Smaller = parseInt(n1) < parseInt(n2);

  let smallerNumber = "";
  let largerNumber = "";

  if (n1Smaller) {
    smallerNumber = n1;
    largerNumber = n2;
  } else {
    smallerNumber = n2;
    largerNumber = n1;
  }

  let total = "0";

  for (let i = 1; i <= parseInt(smallerNumber); i++) {
    if (i !== 1 && (i - 1) * 2 <= parseInt(smallerNumber)) {
      total = addTwoLargeNumbers(total, total);
      i = (i - 1) * 2;
    } else {
      total = addTwoLargeNumbers(total, largerNumber);
    }
  }

  return total;
};

export default multiplyTwoLargeNumbers;
