import { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (!weight || !height) return;
    const h = height / 100;
    const bmiValue = (weight / (h * h)).toFixed(1);
    setBmi(bmiValue);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl w-96">
        <h2 className="text-2xl font-bold mb-8 text-center">BMI Calculator</h2>

        {/* Weight Input */}
        <div className="relative mb-6">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onWheel={(e) => e.target.blur()}
            className="peer w-full bg-gray-800 text-white p-4 rounded-xl outline-none"
          />
          <label
            className={`absolute left-4 transition-all text-gray-400 pointer-events-none
            ${
              weight
                ? "-top-2 text-sm bg-gray-900 px-1 text-green-400"
                : "top-4"
            }`}
          >
            Weight (kg)
          </label>
        </div>

        {/* Height Input */}
        <div className="relative mb-6">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onWheel={(e) => e.target.blur()}
            className="peer w-full bg-gray-800 text-white p-4 rounded-xl outline-none"
          />
          <label
            className={`absolute left-4 transition-all text-gray-400 pointer-events-none
            ${
              height
                ? "-top-2 text-sm bg-gray-900 px-1 text-green-400"
                : "top-4"
            }`}
          >
            Height (cm)
          </label>
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
        >
          Calculate BMI
        </button>

        {bmi && (
          <p className="mt-6 text-center text-lg">
            Your BMI:{" "}
            <span className="font-bold text-green-400">{bmi}</span>
          </p>
        )}
      </div>
    </div>
  );
}
