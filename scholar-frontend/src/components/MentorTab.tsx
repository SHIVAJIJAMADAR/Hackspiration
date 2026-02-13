import { useState } from "react";
import { useWallet } from "@txnlab/use-wallet-react";

export default function MentorTab() {
  const { activeAddress } = useWallet();

  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState("");

  // Backend API URL
  const BACKEND_URL = "http://127.0.0.1:8000/analyze";

  // Call AI Backend
  const analyzeSpending = async () => {
    if (!activeAddress) {
      alert("⚠️ Please connect your wallet first!");
      return;
    }

    setLoading(true);
    setAdvice("");

    try {
      const response = await fetch(
        `${BACKEND_URL}?address=${activeAddress}`
      );

      const data = await response.json();
      setAdvice(data.advice);
    } catch (error) {
      setAdvice("❌ Backend not reachable. Please start FastAPI server.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-base-100 shadow-xl rounded-2xl p-6 space-y-4">

      {/* Title */}
      <h2 className="text-3xl font-bold flex items-center gap-2">
        🤖 ScholarStream Financial Mentor
      </h2>

      <p className="text-gray-500">
        Your AI mentor analyzes your spending habits directly from blockchain
        transactions.
      </p>

      {/* Analyze Button */}
      <button
        onClick={analyzeSpending}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Analyzing..." : "Analyze My Spending"}
      </button>

      {/* Response Bubble */}
      {advice && (
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-info text-lg">
            {advice}
          </div>
        </div>
      )}

      {/* Wallet Address */}
      {activeAddress && (
        <div className="text-sm text-gray-400 break-all">
          Connected Wallet: <b>{activeAddress}</b>
        </div>
      )}
    </div>
  );
}
