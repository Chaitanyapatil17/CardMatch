import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recommendCards, addFavorite, removeFavorite } from "../services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";

export default function Home() {

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
  const [compareCards, setCompareCards] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

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
      setCompareCards([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (cardId) => {

    const isFav = favorites.includes(cardId);

    try {

      if (isFav) {
        await removeFavorite(cardId);
        setFavorites(favorites.filter(id => id !== cardId));
      } else {
        await addFavorite(cardId);
        setFavorites([...favorites, cardId]);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleCompare = (card, checked) => {

    if (checked) {

      if (compareCards.length >= 3) {
        alert("You can compare maximum 3 cards");
        return;
      }

      setCompareCards([...compareCards, card]);

    } else {

      setCompareCards(
        compareCards.filter(c => c.cardId !== card.cardId)
      );

    }
  };

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          CardMatch – Smart Credit Card Advisor
        </h1>

        <div className="flex gap-10 flex-wrap">

          {/* Form */}
          <Card className="w-[450px] shadow-md">

            <CardHeader>
              <CardTitle>Enter Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <Label>Monthly Income</Label>
              <Input name="income" onChange={handleChange} />

              <Label>Credit Score</Label>
              <Input name="creditScore" onChange={handleChange} />

              <Label>Shopping Spend</Label>
              <Input name="shopping" onChange={handleChange} />

              <Label>Fuel Spend</Label>
              <Input name="fuel" onChange={handleChange} />

              <Label>Dining Spend</Label>
              <Input name="dining" onChange={handleChange} />

              <Label>Travel Spend</Label>
              <Input name="travel" onChange={handleChange} />

              <Button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {loading ? "Analyzing..." : "Get Recommendation"}
              </Button>

            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4 w-[420px]">

            {loading && (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {!loading && results.length === 0 && (
              <p className="text-gray-500">
                No recommendations yet.
              </p>
            )}

            {!loading && results.map((card, index) => (

              <Card
                key={card.cardId || index}
                className="shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => {
                  if (card.cardId) {
                    navigate(`/cards/${card.cardId}`);
                  }
                }}
              >

                <CardHeader>

                  <div className="flex justify-between items-center">

                    <CardTitle>{card.name}</CardTitle>

                    <div className="flex items-center gap-3">

                      <Heart
                        className={`cursor-pointer ${
                          favorites.includes(card.cardId)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(card.cardId);
                        }}
                      />

                      <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          handleCompare(card, e.target.checked)
                        }
                      />

                    </div>

                  </div>

                  {index === 0 && (
                    <Badge className="bg-green-600 w-fit">
                      Best Choice
                    </Badge>
                  )}

                  <p className="text-sm text-gray-500">
                    {card.bank}
                  </p>

                </CardHeader>

                <CardContent>

                  <p className="text-green-600 font-bold text-lg">
                    ₹{card.estimatedMonthlyCashback || 0}/month
                  </p>

                  <Separator className="my-3" />

                  <Progress value={card.score || 0} />

                  <p className="text-sm mt-1">
                    Score: {card.score || 0}
                  </p>

                </CardContent>

              </Card>
            ))}
          </div>
        </div>

        {/* ✅ COMPARE TABLE RESTORED */}
        {compareCards.length > 0 && (

          <Card className="mt-10">

            <CardHeader>
              <CardTitle>Compare Cards</CardTitle>
            </CardHeader>

            <CardContent>

              <table className="w-full border">

                <thead>
                  <tr className="border bg-gray-100">
                    <th className="p-2 text-left">Feature</th>
                    {compareCards.map((card, index) => (
                      <th key={index} className="p-2">
                        {card.name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>

                  <tr className="border">
                    <td className="p-2 font-medium">Bank</td>
                    {compareCards.map((card, i) => (
                      <td key={i} className="p-2">{card.bank}</td>
                    ))}
                  </tr>

                  <tr className="border">
                    <td className="p-2 font-medium">Cashback / Month</td>
                    {compareCards.map((card, i) => (
                      <td key={i} className="p-2 text-green-600">
                        ₹{card.estimatedMonthlyCashback || 0}
                      </td>
                    ))}
                  </tr>

                  <tr className="border">
                    <td className="p-2 font-medium">Score</td>
                    {compareCards.map((card, i) => (
                      <td key={i} className="p-2">
                        {card.score || 0}
                      </td>
                    ))}
                  </tr>

                  <tr className="border">
                    <td className="p-2 font-medium">Annual Fee</td>
                    {compareCards.map((card, i) => (
                      <td key={i} className="p-2">
                        ₹{card.annualFee || 0}
                      </td>
                    ))}
                  </tr>

                </tbody>

              </table>

            </CardContent>

          </Card>
        )}

      </div>
    </div>
  );
}