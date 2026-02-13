from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from algosdk.v2client import indexer

# ✅ NEW Gemini SDK
from google import genai

# ================================
# CONFIG
# ================================

INDEXER_URL = "https://testnet-idx.algonode.cloud"

# 🔑 Paste your REAL Gemini API Key here
GEMINI_API_KEY = "AIzaSyAV4Fd08BrIRjrpHabpaAZ00nYFkxewJbI"

# Create Gemini Client
client = genai.Client(api_key=GEMINI_API_KEY)

# ================================
# FASTAPI APP
# ================================

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================================
# ROOT ENDPOINT
# ================================

@app.get("/")
def home():
    return {"status": "ScholarStream AI Mentor Backend Running 🚀"}

# ================================
# AI ANALYSIS ENDPOINT
# ================================

@app.get("/analyze")
def analyze(address: str):

    try:
        # ================================
        # CONNECT TO INDEXER
        # ================================
        idx_client = indexer.IndexerClient("", INDEXER_URL)

        # Fetch last 10 transactions
        txns = idx_client.search_transactions_by_address(
            address=address,
            limit=10
        )

        txn_list = txns.get("transactions", [])
        formatted_txns = []

        # Extract payment transactions only
        for txn in txn_list:
            pay = txn.get("payment-transaction")
            if pay:
                formatted_txns.append({
                    "amount_microalgo": pay.get("amount", 0),
                    "receiver": pay.get("receiver", "")
                })

        # No transactions case
        if not formatted_txns:
            return {"advice": "😴 No spending history found yet. Try making a transaction first!"}

        # ================================
        # GEMINI PROMPT
        # ================================
        prompt = f"""
You are ScholarStream's AI Financial Mentor.

These are the student's recent blockchain spending transactions:

{formatted_txns}

Task:
- Roast the student lightly if spending is high
- Give 2–3 lines of financial advice
- Be funny and strict like a mentor

Output should be short and impactful.
"""

        # ================================
        # ✅ CORRECT GEMINI MODEL (FIXED)
        # ================================
        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt
        )

        return {"advice": response.text}

    except Exception as e:
        return {"advice": f"❌ Error analyzing spending: {str(e)}"}
