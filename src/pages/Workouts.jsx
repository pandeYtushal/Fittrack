import { workouts } from "../firebase/workout";
import WorkoutCard from "../components/WorkoutCard";

export default function Workouts() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-3xl text-green-500 md:text-4xl font-bold text-center mb-12">
          Workout Plans
        </h1>

        {/* Workout Grid */}
        <div className="grid gap-8 text-white sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
