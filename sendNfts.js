const { Connection, PublicKey, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction, } = require('@solana/web3.js');


const { Token, TOKEN_PROGRAM_ID, u64 } = require('@solana/spl-token');

// Connection to the Solana network
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Sender's wallet keypair (private and public key)
const senderPrivateKey = 'YOUR_SENDER_PRIVATE_KEY'; // Replace with the sender's private key
const senderWallet = Keypair.fromSecretKey(Buffer.from(senderPrivateKey, 'base64'));

// Recipient's wallet address
const recipientAddress = 'RECIPIENT_WALLET_ADDRESS'; // Replace with the recipient's Solana wallet address

// NFT token address
const nftTokenAddress = 'NFT_TOKEN_ADDRESS'; // Replace with the NFT token address

// Create a function to send an NFT to another address
async function sendNFT(senderWallet, recipientAddress, nftTokenAddress) {
    try {
        // Initialize the NFT token
        const token = new Token(connection, new PublicKey(nftTokenAddress), TOKEN_PROGRAM_ID, senderWallet);

        // Check the sender's NFT balance
        const senderTokenAccount = await token.getAccountInfo(senderWallet.publicKey);
        if (!senderTokenAccount || senderTokenAccount.amount.equals(new u64(0))) {
            throw new Error('Sender does not have any NFTs to send.');
        }

        // Create a transaction to transfer the NFT
        const transaction = new Transaction().add(
            Token.createTransferInstruction(
                TOKEN_PROGRAM_ID,
                senderTokenAccount.address,
                new PublicKey(recipientAddress),
                senderWallet.publicKey,
                [],
                1 // Number of NFTs to transfer (usually 1 for NFTs)
            )
        );

        // Sign and send the transaction
        const signature = await sendAndConfirmTransaction(connection, transaction, [senderWallet]);
        console.log(`NFT Sent. Transaction Signature: ${signature}`);
    } catch (error) {
        console.error('Error sending NFT:', error);
    }
}

// Example usage
sendNFT(senderWallet, recipientAddress, nftTokenAddress);


/* Nft Send || Express End Point Code */


/* 

const express = require('express');
const { Connection, PublicKey, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID, u64 } = require('@solana/spl-token');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

// Connection to the Solana network
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Sender's wallet keypair (private and public key)
const senderPrivateKey = 'YOUR_SENDER_PRIVATE_KEY'; // Replace with the sender's private key
const senderWallet = Keypair.fromSecretKey(Buffer.from(senderPrivateKey, 'base64'));

// Recipient's wallet address
const recipientAddress = 'RECIPIENT_WALLET_ADDRESS'; // Replace with the recipient's Solana wallet address

// NFT token address
const nftTokenAddress = 'NFT_TOKEN_ADDRESS'; // Replace with the NFT token address

// Create a function to send an NFT to another address
async function sendNFT(senderWallet, recipientAddress, nftTokenAddress) {
  try {
    // Initialize the NFT token
    const token = new Token(connection, new PublicKey(nftTokenAddress), TOKEN_PROGRAM_ID, senderWallet);

    // Check the sender's NFT balance
    const senderTokenAccount = await token.getAccountInfo(senderWallet.publicKey);
    if (!senderTokenAccount || senderTokenAccount.amount.equals(new u64(0))) {
      throw new Error('Sender does not have any NFTs to send.');
    }

    // Create a transaction to transfer the NFT
    const transaction = new Transaction().add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        senderTokenAccount.address,
        new PublicKey(recipientAddress),
        senderWallet.publicKey,
        [],
        1 // Number of NFTs to transfer (usually 1 for NFTs)
      )
    );

    // Sign and send the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [senderWallet]);
    console.log(`NFT Sent. Transaction Signature: ${signature}`);
  } catch (error) {
    console.error('Error sending NFT:', error);
  }
}

// Route to send NFT
app.post('/send-nft', (req, res) => {
  sendNFT(senderWallet, recipientAddress, nftTokenAddress)
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

*/