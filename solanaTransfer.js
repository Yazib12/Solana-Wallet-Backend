const { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');

// Replace these with your wallet's configuration
const walletSecretKey = '';
const recipientAddress = '';

async function sendSolanaTokens() {
  try {
    // Initialize a connection to the Solana network
    const connection = new Connection('https://api.mainnet-beta.solana.com');

    // Create a new Solana wallet from a secret key or mnemonic phrase
    const wallet = new Wallet(walletSecretKey);

    // Get your wallet's public key
    const walletPublicKey = wallet.publicKey;

    // Fetch your wallet's balance
    const balance = await connection.getBalance(walletPublicKey);
    console.log(`Wallet Balance: ${balance / 10 ** 9} SOL`);

    // Create a new transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: walletPublicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: 1000000, // Amount to send in lamports (1 SOL = 1000000000 lamports)
      })
    );

    // Sign the transaction with your wallet's keypair
    transaction.sign(wallet);

    // Send the transaction and confirm it
    const signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);

    console.log(`Transaction confirmed. Signature: ${signature}`);
  } catch (error) {
    console.error('Error sending Solana tokens:', error);
  }
}

sendSolanaTokens();


/* Solana Transfer || Express Code  Send Solana  */

/* 
const express = require('express');
const { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');
const { Wallet } = require('@project-serum/sol-wallet-adapter');

const app = express();
const port = process.env.PORT || 3003;

// Replace these with your wallet's configuration
const walletSecretKey = '';
const recipientAddress = '';

app.use(express.json());

// Initialize a connection to the Solana network
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Create a new Solana wallet from a secret key or mnemonic phrase
const wallet = new Wallet(walletSecretKey);

// Route to send Solana tokens
app.post('/send-solana', async (req, res) => {
  try {
    // Get your wallet's public key
    const walletPublicKey = wallet.publicKey;

    // Fetch your wallet's balance
    const balance = await connection.getBalance(walletPublicKey);
    console.log(`Wallet Balance: ${balance / 10 ** 9} SOL`);

    // Create a new transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: walletPublicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: 1000000, // Amount to send in lamports (1 SOL = 1000000000 lamports)
      })
    );

    // Sign the transaction with your wallet's keypair
    transaction.sign(wallet);

    // Send the transaction and confirm it
    const signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);

    console.log(`Transaction confirmed. Signature: ${signature}`);
    
    res.json({ success: true, signature });
  } catch (error) {
    console.error('Error sending Solana tokens:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

*/