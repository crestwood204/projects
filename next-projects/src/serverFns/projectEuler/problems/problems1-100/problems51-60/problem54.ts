import {
  Card,
  Face,
  Suit,
  FaceTypeMap,
  handTypeMap,
} from "@/serverFns/projectEuler/helpers/problem54/models";
import { readFile } from "fs/promises";
import path from "path";

const problem54 = async () => {
  try {
    const directory = path.join(
      process.cwd(),
      "src/serverFns/projectEuler/extraFiles/problem54_poker.txt"
    );
    const file = await readFile(directory, "utf8");
    const pokerRounds = file.split("\n");

    let roundsWonByPlayer1 = 0;

    for (let i = 0; i < pokerRounds.length; i++) {
      const pokerRound = pokerRounds[i].split(" ");
      const firstPokerHand = pokerHandToCards(pokerRound.slice(0, 5));
      const secondPokerHand = pokerHandToCards(pokerRound.slice(5));

      const winner = determineWinner(firstPokerHand, secondPokerHand);

      if (winner === 1) {
        roundsWonByPlayer1++;
      }
    }

    return roundsWonByPlayer1;
    // console.log(
    //   determineHandType(pokerHandToCards("2H 3C 4C 5H 6C".split(" ")))
    // );
  } catch (e: any) {
    console.error(e);
  }
};

export default problem54;

const determineWinner = (p1Hand: Card[], p2Hand: Card[]): 1 | 2 => {
  const { handType: p1HandType, cardValues: p1CardValues } =
    determineHandType(p1Hand);
  const { handType: p2HandType, cardValues: p2CardValues } =
    determineHandType(p2Hand);

  if (handTypeMap[p1HandType] > handTypeMap[p2HandType]) {
    return 1;
  } else if (handTypeMap[p1HandType] === handTypeMap[p2HandType]) {
    // walk through high cards
    for (let i = 0; i < p1CardValues.length; i++) {
      const currValue = p1CardValues[i];
      const opposingValue = p2CardValues[i];

      if (currValue > opposingValue) {
        return 1;
      } else if (currValue < opposingValue) {
        return 2;
      }
    }
    throw new Error("tie");
  } else {
    return 2;
  }
};

const sortHand = (hand: Card[]) => {
  return hand.sort(
    (cardA, cardB) => FaceTypeMap[cardA.face] - FaceTypeMap[cardB.face]
  );
};

const determineHandType = (
  hand: Card[]
): { handType: keyof typeof handTypeMap; cardValues: number[] } => {
  const sortedHand = sortHand(hand);

  const cardFaces = sortedHand.map((card) => card.face);
  const cardSuits = sortedHand.map((card) => card.suit);
  const cardFaceToCountMap = sortedHand.reduce((acc, card) => {
    if (acc.hasOwnProperty(card.face)) {
      acc[card.face] += 1;
    } else {
      acc[card.face] = 1;
    }
    return acc;
  }, {} as Record<Face, number>);

  const cardCountsToFaceValueMap: Record<number, number[]> = Object.entries(
    cardFaceToCountMap
  ).reduce((acc, [face, value]) => {
    if (acc.hasOwnProperty(value)) {
      acc[value].push(FaceTypeMap[face as Face]);
    } else {
      acc[value] = [FaceTypeMap[face as Face]];
    }
    return acc;
  }, {} as Record<number, number[]>);

  const cardCounts = Object.values(cardFaceToCountMap);
  const cardValues = sortedHand.map((card) => FaceTypeMap[card.face]);

  const isStraight = () => {
    let currVal = cardValues[0];
    for (let i = 1; i < cardValues.length; i++) {
      const cardValue = cardValues[i];
      if (cardValue !== currVal + 1) {
        return false;
      } else {
        currVal++;
      }
    }
    return true;
  };

  const isFlush = () => {
    return cardSuits.every((suit) => suit === cardSuits[0]);
  };

  if (
    (["T", "J", "Q", "K", "A"] as Face[]).every((face) =>
      cardFaces.includes(face)
    ) &&
    isFlush()
  ) {
    return { handType: "royal_flush", cardValues: cardValues.reverse() };
  } else if (isStraight() && isFlush()) {
    return { handType: "straight_flush", cardValues: cardValues.reverse() };
  } else if (cardCounts.includes(4)) {
    return {
      handType: "four_of_a_kind",
      cardValues: [
        ...cardCountsToFaceValueMap[4],
        ...cardCountsToFaceValueMap[1],
      ],
    };
  } else if (cardCounts.includes(3) && cardCounts.includes(2)) {
    return {
      handType: "full_house",
      cardValues: [
        ...cardCountsToFaceValueMap[3],
        ...cardCountsToFaceValueMap[2],
      ],
    };
  } else if (isFlush()) {
    return { handType: "flush", cardValues: cardValues.reverse() };
  } else if (isStraight()) {
    return { handType: "straight", cardValues: cardValues.reverse() };
  } else if (cardCounts.includes(3)) {
    return {
      handType: "three_of_a_kind",
      cardValues: [
        ...cardCountsToFaceValueMap[3],
        ...cardCountsToFaceValueMap[1].sort().reverse(),
      ],
    };
  } else if (cardCounts.includes(2)) {
    // remove a 2 and see if it has another 2
    const indexOf2 = cardCounts.indexOf(2);
    cardCounts.splice(indexOf2, 1, 0); // replace the 2 with a 0.
    if (cardCounts.includes(2)) {
      return {
        handType: "two_pair",
        cardValues: [
          ...cardCountsToFaceValueMap[2].sort().reverse(),
          ...cardCountsToFaceValueMap[1].sort().reverse(),
        ],
      };
    } else {
      return {
        handType: "one_pair",
        cardValues: [
          ...cardCountsToFaceValueMap[2],
          ...cardCountsToFaceValueMap[1].sort().reverse(),
        ],
      };
    }
  } else {
    return { handType: "high_card", cardValues: cardValues.reverse() };
  }
};

const pokerHandToCards = (hand: string[]) =>
  hand.map(
    (card): Card => ({
      face: card[0] as Face,
      suit: card[1] as Suit,
    })
  );
