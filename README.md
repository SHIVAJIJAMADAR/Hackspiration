# 🎓 ScholarStream

> Real-time student allowance streaming + AI financial mentor built on Algorand.

---

## 🚀 Problem Statement
Today Students are not financially unstable because they lack money.They are unstable because the system is poorly designed.
Today, allowances and stipends are distributed in lump sums. A student receives an entire month’s funds on Day 1 and is expected to self-regulate spending for the next 30 days.
But expenses do not occur monthly — they occur daily.
Food, transport, rent, and subscriptions are continuous. Income is not.
Due to natural behavioral bias like hyperbolic discounting, students prioritize immediate spending over future security. The result is predictable: heavy spending in the first week and financial stress in the last.
This “feast and famine” cycle is not a failure of discipline. It is a failure of financial architecture.


---

## 💡 Our Solution

ScholarStream is a decentralized financial streaming platform that:
Instead of receiving the entire allowance at once, funds are released gradually over time. The student can only withdraw the amount that has been unlocked based on elapsed time. This ensures that spending naturally aligns with the duration of the allowance period.
The system uses a smart contract to calculate how much money has vested at any given moment. Since the available balance depends on blockchain time, overspending becomes impossible by design.
In addition, ScholarStream integrates programmable delegation, allowing automated withdrawals under predefined rules. An AI-powered financial mentor analyzes transaction history and provides real-time insights on spending behavior.
By combining real-time finance, smart contracts, and AI guidance, ScholarStream creates a balanced system that promotes autonomy, discipline, and financial awareness.


---

## 🏗 Architecture Overview
Frontend (React + Vite)
↓
Wallet (Pera Connect)
↓
Algorand Smart Contract (ARC4)
↓
AI Backend (Python)

---

## 🔗 Tech Stack

### 🧠 Blockchain
- Algorand
- ARC4 Smart Contracts
- AlgoKit
- TEAL (compiled)
- Box Storage

### 💻 Frontend
- React (TypeScript)
- Vite
- Pera Wallet Connect
- Algorand SDK

### 🤖 Backend (AI Mentor)
- Python
- Financial recommendation logic
- Budget pattern analysis

---

## 🔐 Smart Contract Features

### ✔ Create Stream
- Parent sets:
  - Beneficiary
  - Total allowance
  - Duration

### ✔ Real-Time Vesting Logic
- Funds unlock gradually over time
- On-chain timestamp based

### ✔ Withdraw
- Student withdraws only vested amount
- Prevents early draining

### ✔ Delegated Withdraw
- Authorized withdrawal support

---

## 🧠 AI Financial Mentor (Backend)

The AI module:
- Analyzes student spending
- Provides financial guidance
- Suggests budgeting improvements
- Can be extended to ML-based models

---

## 📂 Project Structure(65% complete)
scholar-stream/ → Smart Contracts
scholar-frontend/ → React dApp 
scholar-ai-backend/ → AI logic module

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repo

```bash
1)git clone https://github.com/SHIVAJIJAMADAR/Hackspiration.git
2)cd Hackspiration
3)algokit localnet start
4)cd scholar-stream/projects/scholar-stream
5)algokit project run build
6)algokit project deploy localnet
7)cd scholar-frontend
npm install
npm run dev
Visit:http://localhost:5173
------------------------------------------------------------
Progress Status-
| Component          | Status            |
| ------------------ | ----------------- |
| Smart Contract     | ✅ 100% Functional |
| Wallet Integration | ✅ Working         |
| Frontend UI        | ✅ Basic MVP       |
| AI Backend         | ⚙️ Prototype      |
| Full Integration   | 🔄 In Progress    |
-----------------------------------------------------------
Why ScholarStream is Unique-
1)Real-time allowance streaming
2)Trustless vesting
3)AI-based mentoring
4)Built fully on Algorand
5)Clean modular architecture

Future Work-
1) Yield While Streaming (DeFi Integration)
2) Emergency Buffer Unlock (Controlled Flexibility)

TeamName-Nexus

Team-
Shivaji Jamadar(UserName-SHIVAJIJAMADAR)
Vedant Divate(UserName-TheSleeper25)
Nandan Kabra(UserName-n-a-n-d-a-n)
Prajwal Gidde(UserName-Prajwal-Gidde)






