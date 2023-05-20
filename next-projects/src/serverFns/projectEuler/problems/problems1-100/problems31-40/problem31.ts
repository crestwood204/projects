const problem31 = () => {
  const twoPoundsInPence = 200;

  let numWays = 0;
  const britishCurrency: number[] = [200, 100, 50, 20, 10, 5, 2, 1];

  for (let i = 0; i <= twoPoundsInPence / 200; i++) {
    for (let j = 0; j <= twoPoundsInPence / 100; j++) {
      for (let k = 0; k <= twoPoundsInPence / 50; k++) {
        for (let l = 0; l <= twoPoundsInPence / 20; l++) {
          for (let m = 0; m <= twoPoundsInPence / 10; m++) {
            for (let n = 0; n <= twoPoundsInPence / 5; n++) {
              // if all are 0, then still add one b/c 200 is made from 200 1 pence coins.

              let currValue = twoPoundsInPence;
              const values = [i, j, k, l, m, n];

              for (let p = 0; p < values.length; p++) {
                const coinValue = britishCurrency[p];
                currValue -= coinValue * values[p];

                // great! that means we can pad the rest of value with 1p
                if (currValue < 0) {
                  // oh no! we've gone over the limit. we don't want to try anymore values with this combination
                  switch (p) {
                    case 1: // j
                      j++;
                      k = l = m = n = 1000; // set to a number higher than possible to break this loop
                      break;
                    case 2: // k
                      k++;
                      l = m = n = 1000; // set to a number higher than possible to break this loop
                      break;
                    case 3: // l
                      l++;
                      m = n = 1000; // set to a number higher than possible to break this loop
                      break;
                    case 4: // m
                      m++;
                      n = 1000; // set to a number higher than possible to break this loop
                      break;
                  }
                }
              }
              if (currValue >= 0) {
                numWays++; // for all 1 pence coins
                numWays += Math.floor(currValue / 2); // how many combinations of this many 2's and the rest filled with 1's
              }
            }
          }
        }
      }
    }
  }

  return numWays;
};

export default problem31;
