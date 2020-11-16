import React, { useState, useEffect } from "react";

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    generateEmoji(entries);
  }, [entries]);

  const generateEmoji = (entries) => {
    fetch(
      `https://3cl05dqgbg.execute-api.ap-southeast-1.amazonaws.com/prod/rank?rank=${entries}`
    )
      .then((response) => response.json())
      .then((data) => setEmoji(data.input))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
      <div className="white f3">{`Rank Badge: ${emoji}`}</div>
    </div>
  );
};

export default Rank;
