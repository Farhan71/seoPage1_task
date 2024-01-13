import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SingleCard from "../SingleCard/SingleCard";

const Cards = ({dataFileName, stageName, flagColor}) => {
  const [cards, setCards] = useState([]);
  const styles = {
    borderRadius: "50% / 100% 100% 0 0", width:"24px", height:"12px", background:flagColor, transform:"rotate(-90deg)"
  }
  useEffect(()=> {
    fetch(`${dataFileName}.json`)
    .then((res) => res.json())
    .then((data) => {
      setCards(data);
    });
  },[dataFileName])

  return (
    <div className="bg-[#F2F4F7] m-4 p-4">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center">
        {flagColor && <div style={styles}></div>}
        <h1 className="text-sm font-bold text-gray-800">
          {stageName}
        </h1>
        </div>

        <span className="bg-[#E8EEF3] font-bold px-2 py-0.5 rounded">0</span>
      </div>
        <div className="max-w-72 max-h-screen overflow-y-scroll">
          {
            cards.map(card => <SingleCard key={card.id} card={card}></SingleCard> )
          }
        </div>
    </div>
  )
}
Cards.propTypes = {
  dataFileName: PropTypes.string.isRequired,
  stageName: PropTypes.string.isRequired,
  flagColor: PropTypes.string
};

export default Cards