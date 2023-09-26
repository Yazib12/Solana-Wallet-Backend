const { Connection, PublicKey, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// Connection to the Solana network
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Generate a new wallet keypair
const walletKeypair = Keypair.generate();

// Function to create a token account
async function createTokenAccount(tokenMintAddress) {
  const token = new Token(connection, new PublicKey(tokenMintAddress), TOKEN_PROGRAM_ID, walletKeypair);

  const tokenAccount = await token.createAccount(walletKeypair.publicKey);
  return tokenAccount;
}

// Create a SOL (native token) account
async function createSolAccount() {
  const lamports = 10 * 1000000000; // 10 SOL (10 billion lamports)
  const transaction = SystemProgram.createAccount({
    fromPubkey: walletKeypair.publicKey,
    newAccountPubkey: walletKeypair.publicKey,
    lamports,
    space: 0,
    programId: TOKEN_PROGRAM_ID,
  });

  const signature = await sendAndConfirmTransaction(connection, transaction, [walletKeypair]);
  return walletKeypair.publicKey.toBase58();
}

// Example usage
(async () => {
  try {
    console.log(`Your Solana Wallet Address: ${walletKeypair.publicKey.toBase58()}`);

    // Create token accounts for SPL tokens (replace with actual token mint addresses)
    const tokenMintAddress1 = 'TOKEN_MINT_ADDRESS_1';
    const tokenMintAddress2 = 'TOKEN_MINT_ADDRESS_2';

    const tokenAccount1 = await createTokenAccount(tokenMintAddress1);
    const tokenAccount2 = await createTokenAccount(tokenMintAddress2);

    console.log('Token Accounts Created:');
    console.log(`Token Account 1: ${tokenAccount1.toBase58()}`);
    console.log(`Token Account 2: ${tokenAccount2.toBase58()}`);

    // Create a SOL (native token) account
    const solAccount = await createSolAccount();
    console.log(`SOL Account: ${solAccount}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
