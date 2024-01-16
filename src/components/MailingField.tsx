import React, { useState, useRef } from "react";
import "./MailingField.css";
import Chip from "./Chip";

import { dummyData } from "./DummyData";

interface MailingFieldProps {
  onAdd: (email: string) => void;
}

const MailingField: React.FC<MailingFieldProps> = ({ onAdd }) => {
  const [email, setEmail] = useState("");
  const [chips, setChips] = useState<{ label: string; image: string }[]>([]);
  const [filteredData, setFilteredData] = useState<
    { label: string; email: string; image: string }[]
  >(dummyData);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    const filtered = dummyData.filter(
      (item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !chips.some((chip) => chip.label === item.label)
    );
    setFilteredData(filtered);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      event.preventDefault();
      if (email.trim() !== "") {
        const matchingItem = dummyData.find(
          (item) => item.label.toLowerCase() === email.trim().toLowerCase()
        );

        if (matchingItem && !chips.some((chip) => chip.label === matchingItem.label)) {
          setChips([...chips, { label: matchingItem.label, image: matchingItem.image }]);
          onAdd(matchingItem.label);
          setEmail("");
          setFilteredData(
            filteredData.filter((item) => item.label !== matchingItem.label)
          );
        }
      }
    } else if (event.key === "Backspace" && email === "") {
      const lastChip = chips[chips.length - 1];
      setChips(chips.slice(0, -1));
      setFilteredData([
        ...filteredData,
        { label: lastChip.label, email: "", image: lastChip.image },
      ]);
    }
  };

  const handleChipRemove = (index: number) => {
    const removedChip = chips[index];
    const newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);
    setFilteredData([
      ...filteredData,
      { label: removedChip.label, email: "", image: removedChip.image },
    ]);
  };

  const handleItemClick = (item: {
    label: string;
    email: string;
    image: string;
  }) => {
    setChips([...chips, { label: item.label, image: item.image }]);
    onAdd(item.label);
    setFilteredData(
      filteredData.filter((dataItem) => dataItem.label !== item.label)
    );
    setEmail("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container">
      <div className="input-container">
      <div className="chips-container">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            email={chip.label}
            image={chip.image}
            functionApp={() => handleChipRemove(index)}
          />
        ))}
      </div>
      <input
        type="text"
        value={email}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter Name of the User"
        className="input"
        ref={inputRef}
      />

      {filteredData.length > 0 && (
        <div className="item-list">
          {filteredData.map((item) => (
            <div
              className="item"
              key={item.label}
              onClick={() => handleItemClick(item)}
            >
              <img className="imageIcon" src={item.image} alt="Icon" />
              <div className="label">{item.label}</div>
              <div className="email">{item.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default MailingField;
