import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Progress() {
  const { user } = useAuth();
  const [weight, setWeight] = useState("");
  const [history, setHistory] = useState([]);
  const [goal, setGoal] = useState("");

  /* 🔹 Fetch profile goal */
useEffect(() => {
  if (!user || !db) return;

  const fetchProfile = async () => {
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setGoal(snap.data().goal || "");
      }
    } catch (err) {
      console.warn("Profile fetch skipped:", err.message);
    }
  };

  fetchProfile();
}, [user]);


  /* 🔹 Fetch progress history */
 useEffect(() => {
  if (!user || !db) return;

  const q = query(
    collection(db, "users", user.uid, "progress"),
    orderBy("date", "asc")
  );

  const unsub = onSnapshot(
    q,
    (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate().toLocaleDateString(),
      }));
      setHistory(data);
    },
    (error) => {
      console.warn("Progress listener error:", error.message);
    }
  );

  return unsub;
}, [user]);

  /* 🔹 Add new weight */
  const addEntry = async () => {
    if (!weight || !user) return;

    await addDoc(collection(db, "users", user.uid, "progress"), {
      weight: Number(weight),
      date: Timestamp.now(),
    });

    setWeight("");
  };

  /* 🔹 Calculations */
  const latest = history.at(-1)?.weight || "--";
  const change =
    history.length > 1
      ? (latest - history[0].weight).toFixed(1)
      : "0";

  const weeklyChange =
    history.length > 7
      ? (latest - history.at(-8).weight).toFixed(1)
      : "--";

  const monthlyChange =
    history.length > 30
      ? (latest - history.at(-31).weight).toFixed(1)
      : "--";

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold mb-6">
          Progress Tracker
        </h2>

        {/* 🔹 Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card title="Current Weight" value={`${latest} kg`} />
          <Card
            title="Total Change"
            value={`${change} kg`}
            color={change < 0 ? "green" : "red"}
          />
          <Card title="Weekly Change" value={`${weeklyChange} kg`} />
          <Card title="Monthly Change" value={`${monthlyChange} kg`} />
        </div>

        {/* 🔹 Goal */}
        {goal && (
          <div className="bg-gray-900 p-4 rounded-xl mb-6">
            Goal: <span className="font-semibold">{goal}</span>
          </div>
        )}

        {/* 🔹 Add Entry */}
        <div className="flex gap-4 mb-6">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (kg)"
            className="flex-1 p-3 rounded-xl bg-gray-800 outline-none"
          />
          <button
            onClick={addEntry}
            className="bg-green-600 hover:bg-green-700 px-6 rounded-xl font-semibold"
          >
            Add
          </button>
        </div>

        {/* 🔹 Chart */}
      {/* 🔹 Chart */}
<div className="bg-gray-900 p-6 rounded-2xl mb-8">
  <div className="w-full h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={history}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#22c55e"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>


        {/* 🔹 History */}
        <ul className="space-y-3">
          {history.map((h) => (
            <li
              key={h.id}
              className="bg-gray-900 p-4 rounded-xl flex justify-between"
            >
              <span>{h.date}</span>
              <span className="font-semibold">
                {h.weight} kg
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 🔹 Small Card Component */
function Card({ title, value, color }) {
  return (
    <div className="bg-gray-900 p-5 rounded-2xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3
        className={`text-2xl font-bold mt-1 ${
          color === "green"
            ? "text-green-500"
            : color === "red"
            ? "text-red-500"
            : ""
        }`}
      >
        {value}
      </h3>
    </div>
  );
}
