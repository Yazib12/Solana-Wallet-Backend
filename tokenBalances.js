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

    console.log(`USDC Balance for Wallet Address ${walletAddress}: ${TokenBalance} USDC`);
  } catch (error) {
    console.error('Error fetching USDC balance:', error);
  }
}

// Example usage: Replace with the actual wallet address
const walletAddress = '5dT7SJWz9kLFF5jA9czkSwwMeUhHj76mhF1jtvdbAoSL';
// botU1zmaQoP7BrNEr3VJ3BapMJDWnf5WUZJQFuc5cAu
getTokenBalance(walletAddress);


 



/* const { Connection, PublicKey } = require('@solana/web3.js');

// Use the Solana Mainnet Beta RPC URL
const rpcUrl = 'https://api.mainnet-beta.solana.com';
const walletAddress = 'r1RNBu4Grexhe9AsK1cakgyzh93uxmXzeKk7jApVhKf';
const tokenAddress = '5fTwKZP2AK39LtFN9Ayppu6hdCVKfMGVm79F2EgHCtsi'; // Address of the SPL token you want to check

async function getTokenBalance() {
  try {
    // Initialize a connection to the Solana Mainnet Beta cluster
    const connection = new Connection(rpcUrl);

    // Fetch token accounts owned by the wallet address
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(walletAddress),
      { programId: new PublicKey(tokenAddress) }
    );

    let tokenBalance = BigInt(0);

    // Iterate through token accounts and sum token balances
    for (const accountInfo of tokenAccounts.value) {
      const { data, amount } = accountInfo.account;
      tokenBalance += BigInt(amount);

      // Additional processing for token-specific data if needed
      // const tokenData = decodeTokenData(data);
      // ...
    }

    console.log(`Token Balance for ${walletAddress}: ${tokenBalance.toString()}`);
  } catch (error) {
    console.error('Error fetching token balance:', error);
  }
}

getTokenBalance();
 */


/* const Moralis = require("moralis").default;
const { SolNetwork } = require("@moralisweb3/common-sol-utils");

const runApp = async () => {
  await Moralis.start({
    apiKey: "YOUR_API_KEY",
    // ...and any other configuration
  });

  const address = "BWeBmN8zYDXgx2tnGj72cA533GZEWAVeqR9Eu29txaen";

  const network = SolNetwork.MAINNET;

  const response = await Moralis.SolApi.account.getSPL({
    address,
    network,
  });

  console.log(response.toJSON());
};

runApp(); */