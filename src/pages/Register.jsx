import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-6 rounded-xl text-white w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          className="w-full mb-3 p-2 bg-gray-800 rounded text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}/>
        <input
          type="password"
          className="w-full mb-3 p-2 bg-gray-800 rounded text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}/>
        <button
          onClick={handleRegister}
          className="bg-green-600 w-full py-2 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}
