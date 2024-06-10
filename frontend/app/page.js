"use client";
// pages/index.js
import { useState } from "react";

export default function Home() {
  const [features, setFeatures] = useState({
    sepalLength: "",
    sepalWidth: "",
    petalLength: "",
    petalWidth: "",
  });
  const [prediction, setPrediction] = useState(null);
  const specie = {
    0: "Iris-setosa",
    1: "Iris-versicolor",
    2: "Iris-virginica",
  };
  const handleChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features: Object.values(features).map(Number) }),
    });
    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mt-4">
        Iris Flower Prediction
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2 ">
        <input
          type="number"
          name="sepalLength"
          placeholder="Sepal Length"
          value={features.sepalLength}
          onChange={handleChange}
          required
          className="p-4 w-96 text-black border-2"
        />
        <input
          type="number"
          name="sepalWidth"
          placeholder="Sepal Width"
          value={features.sepalWidth}
          onChange={handleChange}
          required
          className="p-4 w-96 text-black border-2"
        />
        <input
          type="number"
          name="petalLength"
          placeholder="Petal Length"
          value={features.petalLength}
          onChange={handleChange}
          required
          className="p-4 w-96 text-black border-2"
        />
        <input
          type="number"
          name="petalWidth"
          placeholder="Petal Width"
          value={features.petalWidth}
          onChange={handleChange}
          required
          className="p-4 w-96 text-black border-2"
        />
        <button
          className="w-96 text-white font-bold text-xl bg-blue-600 mb-8 text-center py-3"
          type="submit"
        >
          Predict
        </button>
      </form>
      {prediction !== null && (
        <h2 className="mb-4 text-green-400 text-xl font-bold">
          Prediction: {specie[`${prediction}`]}
        </h2>
      )}
    </div>
  );
}
