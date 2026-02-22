import { useEffect, useState } from "react";
import { getHistory } from "../services/historyApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function History() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true); // loading state added

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {

      setLoading(true); // start loading

      const res = await getHistory();

      setHistory(res.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false); // stop loading

    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Center container */}
      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Recommendation History
        </h1>

        {/* Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* No history message */}
        {!loading && history.length === 0 && (
          <p className="text-gray-500">
            No history found.
          </p>
        )}

        {/* History cards */}
        {!loading && (
          <div className="space-y-6">

            {history.map((item, index) => (

              <Card key={index} className="shadow-md">

                <CardHeader>

                  <CardTitle className="flex justify-between items-center">

                    <span>
                      Income: ₹{item.userProfile.income}
                    </span>

                    <Badge variant="secondary">
                      Credit Score: {item.userProfile.creditScore}
                    </Badge>

                  </CardTitle>

                  <p className="text-sm text-gray-500">
                    Goal: {item.userProfile.goal}
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>

                </CardHeader>

                <CardContent>

                  <p className="font-semibold mb-3">
                    Recommended Cards:
                  </p>

                  <div className="space-y-2">

                    {item.recommendedCards.map((card, i) => (

                      <div
                        key={i}
                        className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition"
                      >

                        <div>
                          <p className="font-medium">
                            {card.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {card.bank}
                          </p>
                        </div>

                        <div className="text-right">

                          <p className="text-sm">
                            Score: {card.score}
                          </p>

                          <p className="text-green-600 font-semibold">
                            ₹{card.estimatedMonthlyCashback}/mo
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}