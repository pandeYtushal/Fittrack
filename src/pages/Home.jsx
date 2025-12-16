import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Train Smarter. <br />
            <span className="text-green-500">Eat Better.</span> <br />
            Track Progress.
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            FitTrack helps you plan workouts, manage diet, calculate calories,
            and track your fitness journey — all in one place.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/workouts"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition">
              Start Workout
            </Link>

            <Link
              to="/diet"
              className="border border-gray-700 hover:bg-gray-800 px-6 py-3 rounded-xl font-semibold transition">
              Diet Plans
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Fitness Tools
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {/* BMI */}
          <Link to="/bmi"className="bg-gray-900 hover:bg-gray-800 p-6 rounded-2xl transition border border-gray-800">
            <h3 className="text-xl font-bold mb-2">BMI Calculator</h3>
            <p className="text-gray-400 text-sm">
              Check your Body Mass Index instantly.
            </p>
          </Link>

          {/* Calories */}
          <Link to="/calories"className="bg-gray-900 hover:bg-gray-800 p-6 rounded-2xl transition border border-gray-800">
            <h3 className="text-xl font-bold mb-2">Calorie Calculator</h3>
            <p className="text-gray-400 text-sm">
              Calculate daily calorie needs based on food intake.
            </p>
          </Link>

          {/* Progress */}
          <Link to="/progress"className="bg-gray-900 hover:bg-gray-800 p-6 rounded-2xl transition border border-gray-800">
            <h3 className="text-xl font-bold mb-2">Progress Tracker</h3>
            <p className="text-gray-400 text-sm">
              Track weight, calories, and fitness progress.
            </p>
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Workout Plans</h3>
            <p className="text-gray-400">
              Push, Pull, Legs routines designed for muscle growth.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Diet Guidance</h3>
            <p className="text-gray-400">
              Bulking and cutting meal plans for your fitness goals.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
            <p className="text-gray-400">
              Track weight, calories, and stay consistent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
