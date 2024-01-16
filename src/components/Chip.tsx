import React from "react";
import "./Chip.css";

interface ChipProps {
  email: string;
  image: string;
  functionApp: () => void;
}

const Chip: React.FC<ChipProps> = ({ email, image, functionApp }) => {
  return (
    <div className="chip-container">
      <img className="imageIcon" src={image} />
      <span className="chip-text">{email}</span>
      <button className="close-button" onClick={functionApp}>
        X
      </button>
    </div>
  );
};

export default Chip;