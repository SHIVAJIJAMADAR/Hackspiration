import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

// 🔴 Replace with your deployed App ID
export const APP_ID = 1002;

const peraWallet = new PeraWalletConnect();

// LocalNet Algod Client
const algod = new algosdk.Algodv2(
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "http://localhost",
  4001
);

// -------------------------
// Connect Wallet
// -------------------------
export async function connectWallet(): Promise<string> {
  const accounts = await peraWallet.connect();
  return accounts[0];
}

// -------------------------
// Withdraw Funds
// -------------------------
export async function withdrawFunds() {
  try {
    const sender = await connectWallet();

    const params = await algod.getTransactionParams().do();

    const txn = algosdk.makeApplicationNoOpTxnFromObject({
      sender,
      appIndex: APP_ID,
      suggestedParams: params,
    });

    // ✅ Correct Pera Signing Format
    const signedTxn = await peraWallet.signTransaction([
      [{ txn, signers: [sender] }]
    ]);

const response: any = await algod.sendRawTransaction(signedTxn).do();
console.log("Withdraw Success TX:", response.txId);


  } catch (error) {
    console.error("Withdraw Error:", error);
  }
}
