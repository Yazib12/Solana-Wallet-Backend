const { Connection, PublicKey } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID, u64 } = require('@solana/spl-token');

async function getNFTBalances(walletAddress, tokenAddress) {
    try {
        // Initialize a connection to the Solana cluster
        const connection = new Connection('https://api.mainnet-beta.solana.com');

        // Fetch token accounts owned by the wallet address
        const tokenAccounts = await connection.getTokenAccountsByOwner(
            new PublicKey(walletAddress),
            { programId: TOKEN_PROGRAM_ID }
        );

        // Filter the token accounts to find NFTs
        const nftTokenAccounts = tokenAccounts.value.filter((tokenAccount) => {
            const { account: { data: accountData } } = tokenAccount;
            return accountData.length === 0;
        });

        // Get the list of NFT token addresses
        const nftTokenAddresses = nftTokenAccounts.map((tokenAccount) => {
            return tokenAccount.pubkey.toBase58();
        });

        return nftTokenAddresses;
    } catch (error) {
        console.error('Error fetching NFT balances:', error);
        return [];
    }
}

// Example usage
const walletAddress = 'FJw7NoDrWFK3zM5X7jfRWZUrQ3uHE2RZQS4KZ9M1GCEJ'; // Replace with the actual wallet address
const nftTokenAddress = '2g7bPNAsDJCfjN5ySYLbpmRYLfm5817ansjBhoLGKBL6'; // Replace with the actual NFT token address
getNFTBalances(walletAddress, nftTokenAddress)
    .then((nftBalances) => {
        if (nftBalances.length > 0) {
            console.log(`NFT Balances for ${walletAddress}:`);
            nftBalances.forEach((nftTokenAddress) => {
                console.log(`NFT Token Address: ${nftTokenAddress}`);
            });
        } else {
            console.log(`No NFTs found for ${walletAddress}`);
        }
    })
    .catch((error) => {
        console.error(error);
    });

    
    // Nft Balances || Express EndPoint Code

/* const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID, u64 } = require('@solana/spl-token');

const app = express();
const port = process.env.PORT || 3001;

app.get('/nft-balances/:walletAddress/:nftTokenAddress', async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;
    const nftTokenAddress = req.params.nftTokenAddress;

    // Initialize a connection to the Solana cluster
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    // Fetch token accounts owned by the wallet address
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(walletAddress),
      { programId: TOKEN_PROGRAM_ID }
    );

    // Filter the token accounts to find NFTs
    const nftTokenAccounts = tokenAccounts.value.filter((tokenAccount) => {
      const { account: { data: accountData } } = tokenAccount;
      return accountData.length === 0;
    });

    // Get the list of NFT token addresses
    const nftTokenAddresses = nftTokenAccounts.map((tokenAccount) => {
      return tokenAccount.pubkey.toBase58();
    });

    if (nftTokenAddresses.includes(nftTokenAddress)) {
      res.json({ nftBalances: nftTokenAddresses });
    } else {
      res.json({ nftBalances: [] });
    }
  } catch (error) {
    console.error('Error fetching NFT balances:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

 */