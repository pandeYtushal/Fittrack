import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {
  const { user } = useAuth();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // If user is not ready yet
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setHeight(data.height || "");
          setWeight(data.weight || "");
          setGoal(data.goal || "");
        }
      } catch (err) {
        console.error("Firestore fetch error:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;

    setMessage("");
    setError("");

    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        height,
        weight,
        goal,
      });

      setMessage("Profile saved successfully");
    } catch (err) {
      console.error("Firestore save error:", err);
      setError("Failed to save profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center p-4">
      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        <p className="text-gray-400 mb-4">{user?.email}</p>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-2 rounded mb-3 text-sm">
            {error}
          </p>
        )}

        <input type="number"placeholder="Height (cm)" value={height}onChange={(e) => setHeight(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-gray-800 outline-none"/>

        <input type="number"placeholder="Weight (kg)"value={weight}onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-gray-800 outline-none"/>

        <select value={goal}onChange={(e) => setGoal(e.target.value)} className="w-full p-3 mb-4 rounded bg-gray-800 outline-none" >
          <option value="">Select Goal</option>
          <option value="Lose Fat">Lose Fat</option>
          <option value="Build Muscle">Build Muscle</option>
          <option value="Maintain">Maintain</option>
        </select>

        <button onClick={saveProfile}className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold transition">
          Save Profile
        </button>

        {message && (
          <p className="text-green-500 text-sm mt-3">{message}</p>
        )}
      </div>
    </div>
  );
}
