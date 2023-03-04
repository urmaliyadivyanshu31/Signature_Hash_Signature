const { keccak256, solidityPackedKeccak256, getBytes, getBytesCopy } = require("ethers");

const main = () => {
    require("dotenv").config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
  
    const message = "The Merge";
    const signMessage = web3.eth.accounts.sign(message, PRIVATE_KEY);
    const messageSigner = web3.eth.accounts.recover(message, signMessage.signature);
    const signatureHashBytes = getBytesCopy(signMessage.signature).toString();
    try {
      console.log("Success! The message: "+message+" was signed with the signature: "+signMessage.signature);
      console.log("The signer was: " +messageSigner);
    //   console.log(signatureHashBytes);

    } catch (err) {
      console.log("Something went wrong while verifying your message signature: "+err);
    }
  };
  
  main();
