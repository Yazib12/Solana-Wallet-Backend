import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

const splTokenTransfer = async () => {
    // Connect to cluster
    const connection = new Connection('https://api.mainnet-beta.solana.com'); // Use clusterApiUrl function

    // Generate a new wallet keypair and airdrop SOL
    const fromWallet = Keypair.generate();
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);

    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);

    // Generate a new wallet to receive newly minted token
    const toWallet = Keypair.generate();

    // Create a new token mint
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);

    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, toWallet, mint, toWallet.publicKey); // Use toWallet for the destination wallet

    // Mint 1 new token to the "fromTokenAccount" account we just created
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount,
        fromWallet.publicKey,
        1000000000
    );
    console.log('Mint transaction:', signature);

    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount,
        toTokenAccount,
        fromWallet.publicKey,
        50
    );
    console.log('Transfer transaction:', signature);
};

splTokenTransfer();



/* Transfer Spl Tokens || Epress Code EndPoints */
/* 
const express = require('express');
const { Connection, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } = require('@solana/spl-token');

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

// Create a function for SPL token transfer
const splTokenTransfer = async (req, res) => {
  try {
    // Connect to cluster
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    // Generate a new wallet keypair and airdrop SOL
    const fromWallet = Keypair.generate();
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);

    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);

    // Generate a new wallet to receive newly minted token
    const toWallet = Keypair.generate();

    // Create a new token mint
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);

    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      fromWallet.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, toWallet, mint, toWallet.publicKey);

    // Mint 1 new token to the "fromTokenAccount" account we just created
    let signature = await mintTo(
      connection,
      fromWallet,
      mint,
      fromTokenAccount,
      fromWallet.publicKey,
      1000000000
    );
    console.log('Mint transaction:', signature);

    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
      connection,
      fromWallet,
      fromTokenAccount,
      toTokenAccount,
      fromWallet.publicKey,
      50
    );
    console.log('Transfer transaction:', signature);

    res.json({ success: true, mintSignature: signature });
  } catch (error) {
    console.error('Error transferring SPL tokens:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Route to perform SPL token transfer
app.post('/spl-token-transfer', splTokenTransfer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

*/