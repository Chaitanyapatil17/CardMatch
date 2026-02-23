import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto p-6 text-center py-24">

        <h1 className="text-4xl font-bold mb-6">
          Welcome to Your Smart Credit Card Advisor
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Analyze your spending habits and discover the most rewarding
          credit cards tailored specifically for your lifestyle.
        </p>

        <button
          onClick={() => navigate("/recommend")}
          className="px-8 py-4 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition"
        >
          Start Recommendation
        </button>

      </div>

    </div>
  );
}