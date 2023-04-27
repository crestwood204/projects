type Props = {
  tensPlace: number;
  onClick: () => void;
};

const CardGroup = ({ tensPlace, onClick }: Props) => {
  return (
    <button onClick={onClick}>
      Problems {tensPlace - 9}-{tensPlace}
    </button>
  );
};

export default CardGroup;
