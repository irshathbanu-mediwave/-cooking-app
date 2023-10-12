import React, { useState } from "react";

const Heart = () => {
  const [filled, setFilled] = useState(false);
  const toggleHeart = () => {
    setFilled(!filled);
  };
  return (
    <div className={`heart ${filled ? "filled" : ""}`} onClick={toggleHeart}>
      <div className="heart-shape"></div>
    </div>
  );
};
export default Heart;
