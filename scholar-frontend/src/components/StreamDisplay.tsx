import { useEffect, useState } from "react";

interface StreamDisplayProps {
  startTime: number;
  duration: number;
  totalAllowance: number;
  withdrawnAmount: number;
}

export default function StreamDisplay({
  startTime,
  duration,
  totalAllowance,
  withdrawnAmount,
}: StreamDisplayProps) {
  const [liveBalance, setLiveBalance] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - startTime;

      let vested = 0;

      if (elapsed >= duration) vested = totalAllowance;
      else if (elapsed > 0) vested = (totalAllowance * elapsed) / duration;

      const available = vested - withdrawnAmount;
      setLiveBalance(Math.max(available, 0));
    }, 200);

    return () => clearInterval(interval);
  }, [startTime, duration, totalAllowance, withdrawnAmount]);

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid teal",
        width: "400px",
        marginTop: "20px",
      }}
    >
      <h3>Streaming Allowance</h3>

      <h1 style={{ color: "green" }}>
        {(liveBalance / 1_000_000).toFixed(6)} ALGO
      </h1>

      <p>
        Rate: {(totalAllowance / duration / 1_000_000).toFixed(6)} ALGO/sec
      </p>
    </div>
  );
}
