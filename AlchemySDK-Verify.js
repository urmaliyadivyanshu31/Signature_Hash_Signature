const main = async () => {
    require("dotenv").config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { ethers } = require("ethers");
    const { hashMessage } = require("@ethersproject/hash");
    const { Network, initializeAlchemy } = require("alchemy-sdk");
    const settings = {
        apiKey: API_URL,
        Network: Network.ETH_GOERLI,
    };
    const alchemy = new Alchemy(settings);
    const ethersAlchemyProvider = alchemy.config.getProvider();

    const message = "The Merge";
    const walletInst = new ethers.Wallet(PRIVATE_KEY, ethersAlchemyProvider);
    const signMessage = walletInst.signMessage(message);

    const messageSigner = signMessage.then((value) => {
        const verifySigner = ethers.utils.recoverAddress(hashMessage(message),value);
        return verifySigner;
      });

    try {
      console.log("Success! The message: " +message+" was signed with the signature: " +await signMessage);
      console.log("The signer was: " +await messageSigner);
    } catch (err) {
      console.log("Something went wrong while verifying your message signature: " + err);
    }
  };
  
  main();
