import { diets } from "../firebase/diets";
import DietCard from "../components/DietCard";

export default function Diet() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-3xl text-orange-500 md:text-4xl font-bold text-center mb-12">
          Diet Plans
        </h1>

        {/* Diet Grid */}
        <div className="grid gap-8 text-white sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {diets.map((diet) => (
            <DietCard key={diet.id} diet={diet} />
          ))}
        </div>
      </div>
    </section>
  );
}
