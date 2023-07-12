import { initializeKeypair } from "./initializeKeypair";
import * as web3 from "@solana/web3.js";

const main = async () => {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const user = await initializeKeypair(connection);

  // Step 1: Create a mint
  // Create mint: https://solana-labs.github.io/solana-program-library/token/js/functions/createMint.html
  // Let's create a createNewMint function in src/utils.ts
  // We can create a mint by using the method createMint: Hint => Refer to the solana-labs spl github docs above

  // Step 2: Find ATA of user
  // Create mint: https://solana-labs.github.io/solana-program-library/token/js/functions/getOrCreateAssociatedTokenAccount.html
  // Create a createTokenAccount function in src/utils.ts
  // We can get or create an ata by using the method getOrCreateAssociatedTokenAccount: Hint => Refer to the solana-labs spl github docs above

  // Step 3: Mint our token to the user ATA
  // Create mint: https://solana-labs.github.io/solana-program-library/token/js/functions/mintTo.html
  // Create a mintTokens function in src/utils.ts
  // We can issue new token via the mint by using the method mintTo: Hint => Refer to the solana-labs spl github docs above
  // For the mintTo method, you need the mintInfo which you can retrieve via the method getMint

  // Now that you have all 3 functions ready, let's put it together
  // createNewMint
  // createTokenAccount
  // mintTokens

  // Bonus Challenge!
  // Figure out how to transfer and burn tokens
  // Hint: use the transfer method and the burn method
  // Transfer: https://solana-labs.github.io/solana-program-library/token/js/functions/transfer.html
  // Burn: https://solana-labs.github.io/solana-program-library/token/js/functions/burn.html
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
