import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardDetails } from "../services/api";
import styled from "styled-components";

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
      <div className="p-10 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <PageWrapper>
      <StyledWrapper>
        <div className="card">
          <div className="bg" />
          <div className="blob" />

          <div className="content">
            <h2>{card.name}</h2>
            <span className="bank">{card.bank}</span>

            <div className="info">
              <p><strong>Annual Fee:</strong> ₹{card.annualFee}</p>
              <p><strong>Min Income:</strong> ₹{card.minIncome}</p>
              <p><strong>Reward Type:</strong> {card.rewardType}</p>
            </div>

            <div className="section">
              <h4>Cashback</h4>
              <ul>
                <li>Shopping: {card.cashback.shopping}%</li>
                <li>Fuel: {card.cashback.fuel}%</li>
                <li>Dining: {card.cashback.dining}%</li>
                <li>Travel: {card.cashback.travel}%</li>
              </ul>
            </div>

            <div className="section">
              <h4>Benefits</h4>
              <ul>
                {card.benefits.map((b, i) => (
                  <li key={i}>✓ {b}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </StyledWrapper>
    </PageWrapper>
  );
}

/* PAGE BACKGROUND */
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
`;

/* PREMIUM GLASS CARD */
const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 420px;
    padding: 40px 30px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  }

  .bg {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(25px);
    border-radius: 20px;
    z-index: 1;
  }

  .blob {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(45deg, #6366f1, #a855f7);
    opacity: 0.6;
    filter: blur(80px);
    transform: translate(-50%, -50%);
    animation: blobMove 8s infinite alternate ease-in-out;
    z-index: 0;
  }

  @keyframes blobMove {
    0% { transform: translate(-50%, -50%) scale(1); }
    100% { transform: translate(-40%, -60%) scale(1.2); }
  }

  .content {
    position: relative;
    z-index: 2;
    color: white;
  }

  h2 {
    font-size: 26px;
    margin-bottom: 8px;
  }

  .bank {
    font-size: 14px;
    opacity: 0.8;
  }

  .info {
    margin-top: 20px;
    line-height: 1.8;
  }

  .section {
    margin-top: 20px;
  }

  .section h4 {
    margin-bottom: 8px;
    font-size: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 4px;
  }

  ul {
    padding-left: 18px;
    line-height: 1.8;
  }

  li {
    font-size: 14px;
  }
`;