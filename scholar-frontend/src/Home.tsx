import React, { useState } from "react";
import { useWallet } from "@txnlab/use-wallet-react";

import ConnectWallet from "./components/ConnectWallet";
import Transact from "./components/Transact";
import MentorTab from "./components/MentorTab";
import StreamDisplay from "./components/StreamDisplay";

export default function Home() {
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [openDemoModal, setOpenDemoModal] = useState(false);

  const { activeAddress } = useWallet();

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      {/* Header */}
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
        🎓 ScholarStream
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        Real-time student allowance streaming + AI financial mentor.
      </p>

      {/* Wallet Buttons */}
      <button
        style={{
          padding: "12px 20px",
          background: "teal",
          color: "white",
          marginRight: "15px",
          cursor: "pointer",
        }}
        onClick={() => setOpenWalletModal(true)}
      >
        Connect Wallet
      </button>

      {activeAddress && (
        <button
          style={{
            padding: "12px 20px",
            background: "teal",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => setOpenDemoModal(true)}
        >
          Transactions Demo
        </button>
      )}

      {/* Wallet Modal */}
      <ConnectWallet
        openModal={openWalletModal}
        closeModal={() => setOpenWalletModal(false)}
      />

      {/* Transaction Modal */}
      <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />

      {/* Wallet Address */}
      {activeAddress && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          Connected Wallet: {activeAddress}
        </p>
      )}

      {/* Streaming Section */}
      {activeAddress && (
        <>
          <h2 style={{ marginTop: "50px" }}>📡 Live Streaming Allowance</h2>

          <StreamDisplay
            startTime={Math.floor(Date.now() / 1000) - 60}
            duration={3600}
            totalAllowance={5000000}
            withdrawnAmount={0}
          />
        </>
      )}

      {/* Mentor Section */}
      {activeAddress && (
        <>
          <h2 style={{ marginTop: "50px" }}>
            🤖 ScholarStream Financial Mentor
          </h2>
          <MentorTab />
        </>
      )}
    </div>
  );
}
