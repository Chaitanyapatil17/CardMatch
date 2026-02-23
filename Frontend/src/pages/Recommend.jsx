import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recommendCards } from "../services/api";

export default function Recommend() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    income: "",
    creditScore: "",
    shopping: "",
    fuel: "",
    dining: "",
    travel: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const userData = {
      income: Number(formData.income),
      creditScore: Number(formData.creditScore),
      goal: "cashback",
      spending: {
        shopping: Number(formData.shopping),
        fuel: Number(formData.fuel),
        dining: Number(formData.dining),
        travel: Number(formData.travel)
      }
    };

    try {
      setLoading(true);
      const res = await recommendCards(userData);
      setResults(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-5xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Get Your Recommendation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="number" name="income" placeholder="Income" onChange={handleChange} className="border p-2 w-full" />
          <input type="number" name="creditScore" placeholder="Credit Score" onChange={handleChange} className="border p-2 w-full" />
          <input type="number" name="shopping" placeholder="Shopping Spend" onChange={handleChange} className="border p-2 w-full" />
          <input type="number" name="fuel" placeholder="Fuel Spend" onChange={handleChange} className="border p-2 w-full" />
          <input type="number" name="dining" placeholder="Dining Spend" onChange={handleChange} className="border p-2 w-full" />
          <input type="number" name="travel" placeholder="Travel Spend" onChange={handleChange} className="border p-2 w-full" />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Get Recommendation"}
          </button>

        </form>

        <div className="mt-8 space-y-4">
          {results.map((card, index) => (
            <div
              key={index}
              className="p-4 border rounded cursor-pointer"
              onClick={() => navigate(`/cards/${card.cardId}`)}
            >
              <h3 className="font-bold">{card.name}</h3>
              <p>{card.bank}</p>
              <p>₹{card.estimatedMonthlyCashback}/month</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}