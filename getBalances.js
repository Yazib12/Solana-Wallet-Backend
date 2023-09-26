/* const { Connection, PublicKey } = require('@solana/web3.js');

// Initialize a connection to the Solana cluster
const connection = new Connection('https://api.mainnet-beta.solana.com');

async function getBalance(walletAddress) {
  try {
    // Parse the wallet address into a PublicKey
    const publicKey = new PublicKey(walletAddress);

    // Fetch the balance of the wallet
    const balance = await connection.getBalance(publicKey);

    // Convert lamports to SOL
    const solBalance = balance / 10 ** 9; // 1 SOL = 1,000,000,000 lamports

    return solBalance;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return null;
  }
}

// Example usage
const walletAddress = '8k4jj8emWN2G2GyCCcN8YkcU26LUU2srqWwp1xX9ZApB';
getBalance(walletAddress)
  .then((balance) => {
    if (balance !== null) {
      console.log(`Balance of ${walletAddress}: ${balance} SOL`);
    }
  })
  .catch((error) => {
    console.error(error);
  });
 */

const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');

const app = express();
const port = 3000; // You can use any port you prefer

// Initialize a connection to the Solana cluster
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Define an endpoint for getting the balance
app.get('/balance/:walletAddress', async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;

    // Parse the wallet address into a PublicKey
    const publicKey = new PublicKey(walletAddress);

    // Fetch the balance of the wallet
    const balance = await connection.getBalance(publicKey);

    // Convert lamports to SOL
    const solBalance = balance / 10 ** 9; // 1 SOL = 1,000,000,000 lamports

    res.json({ balance: solBalance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
