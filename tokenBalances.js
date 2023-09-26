const { Connection, PublicKey } = require('@solana/web3.js');
const { AccountLayout, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// Token address for USDC
const contractAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
// EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
async function getTokenBalance(walletAddress) {
  try {
    // Initialize a connection to the Solana Mainnet Beta cluster
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    // Fetch token accounts owned by the wallet address
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(walletAddress),
      { programId: TOKEN_PROGRAM_ID }
    );

    let TokenBalance = BigInt(0); // Initialize the USDC balance as a BigInt

    // Iterate through token accounts and sum USDC balances
    for (const tokenAccount of tokenAccounts.value) {
      const { account: { data: accountData } } = tokenAccount;
      const { mint, amount } = AccountLayout.decode(accountData);
      
      if (mint.equals(new PublicKey(contractAddress))) {
        TokenBalance += BigInt(amount);
      }
    }

    console.log(`USDC Balance for Wallet Address ${walletAddress}: ${TokenBalance}`);
  } catch (error) {
    console.error('Error fetching USDC balance:', error);
  }
}

// Example usage: Replace with the actual wallet address
const walletAddress = '5dT7SJWz9kLFF5jA9czkSwwMeUhHj76mhF1jtvdbAoSL';
// botU1zmaQoP7BrNEr3VJ3BapMJDWnf5WUZJQFuc5cAu
getTokenBalance(walletAddress);


 
/* Spl Token Balances || Express Code  */
/* 
const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const { AccountLayout, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());

// Token address for USDC
const contractAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// Create a function to fetch USDC token balance
async function getTokenBalance(walletAddress) {
  try {
    // Initialize a connection to the Solana Mainnet Beta cluster
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    // Fetch token accounts owned by the wallet address
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(walletAddress),
      { programId: TOKEN_PROGRAM_ID }
    );

    let tokenBalance = BigInt(0); // Initialize the USDC balance as a BigInt

    // Iterate through token accounts and sum USDC balances
    for (const tokenAccount of tokenAccounts.value) {
      const { account: { data: accountData } } = tokenAccount;
      const { mint, amount } = AccountLayout.decode(accountData);

      if (mint.equals(new PublicKey(contractAddress))) {
        tokenBalance += BigInt(amount);
      }
    }

    return tokenBalance.toString();
  } catch (error) {
    console.error('Error fetching USDC balance:', error);
    return 'Error';
  }
}

// Route to fetch USDC token balance
app.get('/usdc-balance/:walletAddress', async (req, res) => {
  const walletAddress = req.params.walletAddress;

  const balance = await getTokenBalance(walletAddress);
  if (balance === 'Error') {
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    res.json({ usdcBalance: balance });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

*/


