const tests = [
  {
    hand: "10H JH QH KH AH".split(" "),
    handType: "royal_straight",
    cardValues: [14, 13, 12, 11, 10],
  },
  {
    hand: "2H 3H 4H 5H 6H".split(" "),
    handType: "straight_flush",
    cardValues: [6, 5, 4, 3, 2],
  },
  {
    hand: "2H 2H 2H 2H 3C",
    handType: "four_of_a_kind",
    cardValues: [2, 3],
  },
  {
    hand: "3H 3C 3H 2C 2C",
    handType: "full_house",
    cardValues: [3, 2],
  },
  {
    hand: "AH 5H JH 2H 4H",
    handType: "flush",
    cardValues: [14, 11, 5, 4, 2],
  },
  {
    hand: "2H 3C 4C 5H 6C".split(" "),
    handType: "straight",
    cardValues: [6, 5, 4, 3, 2],
  },
  {
    hand: "2H 2H 2H 3C 4C",
    handType: "three_of_a_kind",
    cardValues: [2, 4, 3],
  },
];

export default tests;
