import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFavorites, removeFavorite } from "../services/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Favorites() {

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {

    try {

      setLoading(true);

      const res = await getFavorites();

      setFavorites(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleRemove = async (cardId) => {

    try {

      await removeFavorite(cardId);

      setFavorites(
        favorites.filter(f => f.cardId._id !== cardId)
      );

    } catch (error) {
      console.error(error);
    }

  };

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          ⭐ Your Favorite Cards
        </h1>

        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!loading && favorites.length === 0 && (
          <p className="text-gray-500">
            No favorite cards yet.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {!loading && favorites.map((fav) => {

            const card = fav.cardId;

            return (

              <Card
                key={card._id}
                className="shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() =>
                  navigate(`/cards/${card._id}`)
                }
              >

                <CardHeader>

                  <div className="flex justify-between items-center">

                    <CardTitle>
                      {card.name}
                    </CardTitle>

                    <Heart
                      className="text-red-500 fill-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(card._id);
                      }}
                    />

                  </div>

                  <p className="text-sm text-gray-500">
                    {card.bank}
                  </p>

                </CardHeader>

                <CardContent className="space-y-2">

                  <p>
                    Annual Fee: ₹{card.annualFee}
                  </p>

                  <p>
                    Min Income: ₹{card.minIncome}
                  </p>

                  <p>
                    Reward Type: {card.rewardType}
                  </p>

                </CardContent>

              </Card>

            );

          })}

        </div>

      </div>

    </div>

  );

}