import { initializeKeypair } from "./initializeKeypair";
import * as web3 from "@solana/web3.js";
import {
  burnTokens,
  createNewMint,
  createTokenAccount,
  mintTokens,
  transferTokens,
} from "./utils";

const main = async () => {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const user = await initializeKeypair(connection);

  console.log("PublicKey:", user.publicKey.toBase58());

  // Now that you have all 3 functions ready, let's put it together
  // createNewMint
  const mint = await createNewMint(
    connection,
    user, // We'll pay the fees
    user.publicKey, // We're the mint authority
    user.publicKey, // And the freeze authority >:)
    2 // Only two decimals!
  );

  // createTokenAccount
  const tokenAccount = await createTokenAccount(
    connection,
    user,
    mint,
    user.publicKey // Associating our address with the token account
  );

  // mintTokens
  // Mint 100 tokens to our address
  await mintTokens(
    connection,
    user,
    mint,
    tokenAccount.address,
    user.publicKey,
    100
  );

  const receiver = web3.Keypair.generate().publicKey;
  const receiverTokenAccount = await createTokenAccount(
    connection,
    user,
    mint,
    receiver
  );

  await transferTokens(
    connection,
    user,
    tokenAccount.address,
    receiverTokenAccount.address,
    user.publicKey,
    50
  );

  await burnTokens(connection, user, tokenAccount.address, mint, user, 25);
};

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
