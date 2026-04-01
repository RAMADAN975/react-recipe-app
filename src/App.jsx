import React, { useState, useEffect } from "react";
import "./App.css";
import sandwitch from "./assets/images/sandwitch.jpg";

// 🔹 Component عام للأقسام
const Section = ({ title, children }) => (
  <section className="mb-4">
    <h2 className="section-title">{title}</h2>
    {children}
  </section>
);

// 🔹 Component المكونات
const Ingredients = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// 🔹 Component الخطوات
const Instructions = ({ steps }) => (
  <ol>
    {steps.map((step, index) => (
      <li key={index}>{step}</li>
    ))}
  </ol>
);

const App = () => {
  const [favorites, setFavorites] = useState([]);

  // تحميل من LocalStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    if (saved) setFavorites(saved);
  }, []);

  // حفظ في LocalStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = () => {
    if (favorites.includes("omelette")) {
      setFavorites(favorites.filter((f) => f !== "omelette"));
    } else {
      setFavorites([...favorites, "omelette"]);
    }
  };

  const ingredients = [
    "2-3 large eggs",
    "Salt, to taste",
    "Pepper, to taste",
    "1 tablespoon butter",
    "Optional: cheese, vegetables"
  ];

  const steps = [
    "Beat the eggs with salt and pepper",
    "Heat the pan with butter",
    "Pour eggs and cook evenly",
    "Fold and serve"
  ];

  return (
    <div className="container-fluid py-5 d-flex justify-content-center main-wrapper">
      <div className="recipe-card bg-white p-4 p-md-5 shadow-sm rounded-4">

        <img src={sandwitch} className="img-fluid rounded-4 mb-4" alt="Omelette" />

        <h1 className="title-font mb-3">Simple Omelette Recipe</h1>

        <button onClick={toggleFavorite} className="btn btn-outline-danger mb-3">
          {favorites.includes("omelette") ? "❤️ Favorited" : "🤍 Add to Favorite"}
        </button>

        <p className="description mb-4">
          Easy and quick dish perfect for any meal.
        </p>

        <Section title="Preparation time">
          <ul>
            <li><strong>Total:</strong> 10 minutes</li>
            <li><strong>Preparation:</strong> 5 minutes</li>
            <li><strong>Cooking:</strong> 5 minutes</li>
          </ul>
        </Section>

        <Section title="Ingredients">
          <Ingredients items={ingredients} />
        </Section>

        <hr />

        <Section title="Instructions">
          <Instructions steps={steps} />
        </Section>

        <hr />

        <Section title="Nutrition">
          <table className="table">
            <tbody>
              <tr><td>Calories</td><td className="fw-bold color-primary">277kcal</td></tr>
              <tr><td>Protein</td><td className="fw-bold color-primary">20g</td></tr>
              <tr><td>Fat</td><td className="fw-bold color-primary">22g</td></tr>
            </tbody>
          </table>
        </Section>

      </div>
    </div>
  );
};

export default App;