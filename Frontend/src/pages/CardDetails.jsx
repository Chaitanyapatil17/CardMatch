import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCardDetails } from "../services/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export default function CardDetails() {

  const { id } = useParams();

  const [card, setCard] = useState(null);

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {

    try {

      const res = await getCardDetails(id);

      setCard(res.data);

    } catch (error) {
      console.error(error);
    }

  };

  if (!card) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto p-6">

        <Card>

          <CardHeader>

            <CardTitle className="text-2xl">
              {card.name}
            </CardTitle>

            <Badge>
              {card.bank}
            </Badge>

          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <strong>Annual Fee:</strong>
              ₹{card.annualFee}
            </div>

            <div>
              <strong>Min Income:</strong>
              ₹{card.minIncome}
            </div>

            <div>
              <strong>Reward Type:</strong>
              {card.rewardType}
            </div>

            <div>

              <strong>Cashback:</strong>

              <ul>
                <li>
                  Shopping: {card.cashback.shopping}%
                </li>

                <li>
                  Fuel: {card.cashback.fuel}%
                </li>

                <li>
                  Dining: {card.cashback.dining}%
                </li>

                <li>
                  Travel: {card.cashback.travel}%
                </li>
              </ul>

            </div>

            <div>

              <strong>Benefits:</strong>

              <ul>
                {card.benefits.map((b, i) => (
                  <li key={i}>
                    ✓ {b}
                  </li>
                ))}
              </ul>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>

  );

}