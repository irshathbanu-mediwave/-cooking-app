import React, { useState, useEffect } from "react";

function Home({ recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleImageClick = (index) => {
    setSelectedRecipe(recipes[index]);
    setPopupOpen(true);
  };

  const clearSelectedRecipe = () => {
    setSelectedRecipe(null);
    setPopupOpen(false);
  };

  const toggleStepChecked = (stepId) => {
    if (selectedRecipe) {
      const updatedSteps = { ...checkedSteps };
      updatedSteps[stepId] = !updatedSteps[stepId];
      setCheckedSteps(updatedSteps);
    }
  };

  useEffect(() => {
    if (selectedRecipe) {
      const savedCheckedSteps =
        JSON.parse(localStorage.getItem(`checkedSteps_${selectedRecipe.id}`)) ||
        {};
      setCheckedSteps(savedCheckedSteps);
    }
  }, [selectedRecipe]);

  useEffect(() => {
    if (selectedRecipe) {
      localStorage.setItem(
        `checkedSteps_${selectedRecipe.id}`,
        JSON.stringify(checkedSteps)
      );
    }
  }, [selectedRecipe, checkedSteps]);

  return (
    <div className="home">
      <div className="recipe-container">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="recipe-card"
            onClick={() => handleImageClick(index)}
          >
            <h3>{recipe.name}</h3>
            <img src={recipe.imageUrl} alt={recipe.name} />
          </div>
        ))}
      </div>
      <div className="click-popup">
        {selectedRecipe !== null && isPopupOpen && (
          <div className="recipe-popup">
            <div className="recipe-details-popup">
              <h3>{selectedRecipe.name}</h3>
              {selectedRecipe.steps.map((step, stepIndex) => (
                <label key={step.id}>
                  <input
                    type="checkbox"
                    checked={checkedSteps[step.id] || false}
                    onChange={() => toggleStepChecked(step.id)}
                  />
                  <span
                    style={{
                      textDecoration: checkedSteps[step.id]
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {step.step}
                  </span>
                </label>
              ))}
              <img
                className="popup-img"
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.name}
              />
            </div>
            <button className="close" onClick={clearSelectedRecipe}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
