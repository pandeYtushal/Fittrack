export default function DietCard({ diet }) {
  return (
    <div
className="w-full max-w-sm bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl
                 shadow-lg hover:shadow-2xl hover:-translate-y-1
                 transition-all duration-300">
      <h2 className="text-xl font-bold mb-1">{diet.title}</h2>

      <p className="text-sm text-gray-400 mb-4">
        {diet.goal}
      </p>

      <ul className="space-y-2 text-sm">
        {diet.meals.map((meal, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span>{meal}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
