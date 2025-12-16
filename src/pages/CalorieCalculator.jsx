import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/*
 Units:
 g     -> per 100g
 ml    -> per 100ml
 piece -> per piece
 scoop -> per scoop
*/

const defaultFoods = [
  { id: 1, name: "Rice (Cooked)", calories: 130, protein: 2.7, unit: "g" },
  { id: 2, name: "Chicken Breast", calories: 165, protein: 31, unit: "g" },
  { id: 3, name: "Paneer", calories: 265, protein: 18, unit: "g" },
  { id: 4, name: "Egg (Boiled)", calories: 78, protein: 6, unit: "piece" },
  { id: 5, name: "Roti / Chapati", calories: 120, protein: 3, unit: "piece" },
  { id: 6, name: "Banana", calories: 105, protein: 1.3, unit: "piece" },
  { id: 7, name: "Milk", calories: 42, protein: 3.4, unit: "ml" },
  { id: 8, name: "Whey Protein", calories: 120, protein: 24, unit: "scoop" },
];

export default function FoodCalorieCalculator() {
  const [foods, setFoods] = useState(
    JSON.parse(localStorage.getItem("foods")) || defaultFoods
  );
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const [dailyGoal, setDailyGoal] = useState(
    Number(localStorage.getItem("goal")) || 2000
  );
  const [proteinGoal, setProteinGoal] = useState(
    Number(localStorage.getItem("proteinGoal")) || 120
  );

  const [selectedFood, setSelectedFood] = useState(foods[0]);
  const [quantity, setQuantity] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [customFood, setCustomFood] = useState({
    name: "",
    calories: "",
    protein: "",
    unit: "g",
  });
  const [editingFoodId, setEditingFoodId] = useState(null);

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("goal", dailyGoal);
    localStorage.setItem("proteinGoal", proteinGoal);
  }, [foods, items, dailyGoal, proteinGoal]);

  //Calculations
  const calcCalories = () => {
    if (!quantity) return 0;
    return selectedFood.unit === "g" || selectedFood.unit === "ml"
      ? Math.round((selectedFood.calories * quantity) / 100)
      : Math.round(selectedFood.calories * quantity);
  };

  const calcProtein = () => {
    if (!quantity) return 0;
    return selectedFood.unit === "g" || selectedFood.unit === "ml"
      ? Number(((selectedFood.protein * quantity) / 100).toFixed(1))
      : Number((selectedFood.protein * quantity).toFixed(1));
  };

  //Add eaten food
  const addFood = () => {
    const calories = calcCalories();
    const protein = calcProtein();
    if (!calories) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        food: selectedFood.name,
        calories,
        protein,
        date: new Date().toDateString(),
      },
    ]);
    setQuantity("");
  };

  // Delete eaten food
  const deleteFoodItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  // Delete custom food
  const deleteCustomFood = (id) => {
    setFoods(foods.filter((f) => f.id !== id));
    if (selectedFood.id === id) setSelectedFood(foods[0]);
  };

  //Edit custom food
  const startEditFood = (food) => {
    setCustomFood({
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      unit: food.unit,
    });
    setEditingFoodId(food.id);
  };

  const saveCustomFood = () => {
    if (!customFood.name || !customFood.calories || !customFood.protein) return;

    if (editingFoodId) {
      setFoods(
        foods.map((f) =>
          f.id === editingFoodId ? { ...f, ...customFood } : f
        )
      );
      setEditingFoodId(null);
    } else {
      setFoods([
        ...foods,
        { id: Date.now(), ...customFood, isCustom: true },
      ]);
    }

    setCustomFood({ name: "", calories: "", protein: "", unit: "g" });
  };

  //Daily totals
  const today = new Date().toDateString();
  const todayCalories = items
    .filter((i) => i.date === today)
    .reduce((s, i) => s + i.calories, 0);

  const todayProtein = items
    .filter((i) => i.date === today)
    .reduce((s, i) => s + i.protein, 0);

  const calorieProgress = Math.min((todayCalories / dailyGoal) * 100, 100);
  const proteinProgress = Math.min((todayProtein / proteinGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Food & Protein Tracker</h2>
        <Link to="/" className="bg-gray-800 px-4 py-2 rounded-xl">
          Home
        </Link>
      </div>

      {/* Goals */}
      <div className="max-w-3xl mx-auto bg-gray-900 p-5 rounded-2xl mb-6">
        <p className="font-semibold mb-2">Daily Calories</p>
        <input
          type="number"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 mb-2"
        />
        <div className="h-4 bg-gray-800 rounded-full mb-2">
          <div
            className="h-4 bg-green-500 rounded-full"
            style={{ width: `${calorieProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-400">
          {todayCalories} / {dailyGoal} kcal
        </p>

        <p className="font-semibold mt-6 mb-2">Daily Protein (g)</p>
        <input
          type="number"
          value={proteinGoal}
          onChange={(e) => setProteinGoal(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 mb-2"
        />
        <div className="h-4 bg-gray-800 rounded-full mb-2">
          <div
            className="h-4 bg-blue-500 rounded-full"
            style={{ width: `${proteinProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-400">
          {todayProtein.toFixed(1)} / {proteinGoal} g protein
        </p>
      </div>

      {/* Food Dropdown */}
      <div className="max-w-3xl mx-auto bg-gray-900 p-5 rounded-2xl mb-6">
        <div className="relative mb-3">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-gray-800 p-3 rounded flex justify-between"
          >
            <span>{selectedFood.name}</span>
            <span>⬇</span>
          </button>

          {showDropdown && (
            <div className="absolute z-10 w-full bg-gray-900 border border-gray-700 rounded mt-1 max-h-60 overflow-y-auto">
              {foods.map((food) => (
                <div
                  key={food.id}
                  className="flex justify-between px-3 py-2 hover:bg-gray-800"
                >
                  <span
                    onClick={() => {
                      setSelectedFood(food);
                      setShowDropdown(false);
                    }}
                    className="cursor-pointer"
                  >
                    {food.name}
                  </span>

                  {food.isCustom && (
                    <div className="flex gap-2">
                      <button onClick={() => startEditFood(food)} className="text-blue-400 text-sm">
                        Edit
                      </button>
                      <button onClick={() => deleteCustomFood(food.id)} className="text-red-400 text-sm">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          onWheel={(e) => e.target.blur()}
          placeholder={`Quantity (${selectedFood.unit})`}
          className="w-full p-3 rounded bg-gray-800 mb-3"
        />

        <button
          onClick={addFood}
          className="w-full bg-green-600 py-3 rounded-xl"
        >
          Add Food
        </button>
      </div>

      {/* Today's Intake */}
      <div className="max-w-3xl mx-auto mb-6">
        {items
          .filter((i) => i.date === today)
          .map((i) => (
            <div
              key={i.id}
              className="bg-gray-900 p-4 rounded-xl flex justify-between mb-2"
            >
              <span>{i.food}</span>
              <div className="flex gap-4">
                <span className="text-green-400">
                  {i.calories} kcal | {i.protein} g
                </span>
                <button onClick={() => deleteFoodItem(i.id)}>❌</button>
              </div>
            </div>
          ))}
      </div>

      {/* Custom Food */}
      <div className="max-w-3xl mx-auto bg-gray-900 p-5 rounded-2xl">
        <h3 className="font-semibold mb-3">
          {editingFoodId ? "Edit Custom Food" : "Add Custom Food"}
        </h3>

        <input
          placeholder="Food name"
          value={customFood.name}
          onChange={(e) =>
            setCustomFood({ ...customFood, name: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-800 mb-2"
        />

        <input
          type="number"
          placeholder="Calories"
          value={customFood.calories}
          onChange={(e) =>
            setCustomFood({ ...customFood, calories: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-800 mb-2"
        />

        <input
          type="number"
          placeholder="Protein (g)"
          value={customFood.protein}
          onChange={(e) =>
            setCustomFood({ ...customFood, protein: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-800 mb-2"
        />

        <select
          value={customFood.unit}
          onChange={(e) =>
            setCustomFood({ ...customFood, unit: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-800 mb-3"
        >
          <option value="g">grams</option>
          <option value="piece">piece</option>
          <option value="ml">ml</option>
          <option value="scoop">scoop</option>
        </select>

        <button
          onClick={saveCustomFood}
          className="w-full bg-blue-600 py-3 rounded-xl"
        >
          {editingFoodId ? "Update Food" : "Add Custom Food"}
        </button>
      </div>
    </div>
  );
}
