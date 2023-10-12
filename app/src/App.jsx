import React, { useState, useEffect } from "react";
import "./App.css";
import AddRecipe from "./components/Addrecipe";
import Home from "./components/Home";

function App() {
  const [recipes, setRecipes] = useState(getFromStorage());
  const [showAddRecipe, setShowAddRecipe] = useState(false);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  function getFromStorage() {
    const savedValues = localStorage.getItem("recipeCards");
    if (savedValues) {
      const storedTitles = JSON.parse(savedValues);
      return storedTitles;
    }
    return [];
  }
  function submitFunc(boolean) {
    setShowAddRecipe(boolean);
  }

  return (
    <div className="app">
      <nav>
        <ul>
          <div className="Add">
            <button
              id="Add"
              onClick={() => setShowAddRecipe(true)}
              className={showAddRecipe ? "active" : ""}
            >
              Add Recipe
            </button>
          </div>
          <div className="Home">
            <button
              id="Home"
              onClick={() => setShowAddRecipe(false)}
              className={!showAddRecipe ? "active" : ""}
            >
              Home
            </button>
          </div>
        </ul>
      </nav>
      {showAddRecipe ? (
        <AddRecipe addRecipe={addRecipe} submitFunc={submitFunc} />
      ) : (
        <Home recipes={recipes} />
      )}
    </div>
  );
}

export default App;
