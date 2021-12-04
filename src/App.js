import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import allbocksimage from "./assets/bundle.png";
import block1image from "./assets/1.png";
import block2image from "./assets/2.png";
import block3image from "./assets/3.png";
import block4image from "./assets/4.png";
import RainbowText from "react-rainbow-text";
import { useState } from "react";
import metadataFile from "./contracts/ColoredBlocks_flat.json";
import { ethers } from "ethers";

import "./App.css";

const contractInfo = {
  abi: metadataFile,
  address: "0x7eAcF891c53de2Fd78BcF7EE3437F5593697fa58",
};

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
  contractInfo.address,
  contractInfo.abi,
  provider
);

function App() {
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload();
    }
  });
  const [currentAccount, setCurrentAccount] = useState(null);

  const [currentTokensMinted, setCurrentTokensMinted] = useState(null);
  const [currentTokensSupply, setCurrentTokensSupply] = useState(null);

  const switchNetworkMumbai = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Mumbai",
                rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                nativeCurrency: {
                  name: "Matic",
                  symbol: "Matic",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
              },
            ],
          });
        } catch (error) {
          alert(error.message);
        }
      }
    }
  };

  const connectWalletHandler = async () => {
    await switchNetworkMumbai();
    await switchNetworkMumbai();
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      setCurrentTokensMinted(await getTokensMinted());
      setCurrentTokensSupply(await getTokensSupply());
    } catch (error) {}
  };

  const mint_single = async (_cid) => {
    const signerContract = contract.connect(provider.getSigner());

    const options = {
      value: ethers.utils.parseEther("0.01"),
      gasPrice: ethers.utils.parseUnits("10", "gwei"),
      gasLimit: 5000000,
    };
    await signerContract.mint_single(currentAccount, _cid, options);
  };

  const mint_bundle = async (_cids) => {
    const signerContract = contract.connect(provider.getSigner());

    const options = {
      value: ethers.utils.parseEther("0.04"),
      gasPrice: ethers.utils.parseUnits("10", "gwei"),
      gasLimit: 5000000,
    };
    await signerContract.mint_bundle(currentAccount, _cids, options);
  };

  const getTokensMinted = async () => {
    let tokensMinted = await contract.tokensMinted();
    return tokensMinted;
  };

  const getTokensSupply = async () => {
    let tokensMinted = await contract.maxTokenSupply();
    return tokensMinted;
  };

  const connectWalletButton = () => {
    return (
      <Button onClick={connectWalletHandler} className="connect-wallet-button">
        Connect Wallet
      </Button>
    );
  };

  const blockCard = (_name, _description, _image, _cid) => {
    return (
      <Card style={{ width: "18rem" }} className="Card m-3">
        <Card.Img variant="top" src={_image} />
        <Card.Body>
          <Card.Title>{_name}</Card.Title>
          <Card.Text>{_description}</Card.Text>
          {currentAccount ? (
            <Button
              variant="primary"
              onClick={async () => {
                await mint_single(_cid);
              }}
            >
              Mint {currentTokensMinted + "/" + currentTokensSupply}
            </Button>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    );
  };

  const bundleCard = (_name, _description, _image, _cid) => {
    return (
      <Card style={{ width: "18rem" }} className="Card m-3">
        <Card.Img variant="top" src={_image} />
        <Card.Body>
          <Card.Title>{_name}</Card.Title>
          <Card.Text>{_description}</Card.Text>
          {currentAccount ? (
            <Button
              variant="primary"
              onClick={async () => {
                await mint_bundle([
                  "QmfPaUSE3MeGnGEXs5GJL6dWqTkb1adA4fcYJAY6xjCd24",
                  "QmTyTuQydutsEnDe9R8Wzksk4g7hzmBnAbinzMihVuMTWz",
                  "QmeF8W19JKQyokNF6SvQ5UpF8LT7PREEFp9iPHGJdkrJRw",
                  "QmUnAKqMScoAa3vXyvsjo4ne9X5S4EathzJnaggKPfAKgT",
                ]);
              }}
            >
              Mint {currentTokensMinted + "/" + currentTokensSupply}
            </Button>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <h1>
              Welcome to&nbsp;
              <RainbowText lightness={0.75} saturation={0.5}>
                ColoredBlocks
              </RainbowText>
            </h1>
          </Row>
          <Row>
            <h4>
              Contract address&nbsp;
              <RainbowText lightness={0.75} saturation={0.5}>
                {contract.address}
              </RainbowText>
            </h4>
          </Row>
        </Container>
      </header>
      <div>
        {currentAccount ? (
          <div className="mt-3 mb-3">
            <h4>
              You can view your NFTs on{" "}
              <a href={"https://testnets.opensea.io/" + currentAccount}>
                OpenSea Testnet
              </a>
            </h4>
          </div>
        ) : (
          connectWalletButton()
        )}
      </div>
      <div className="mt-5" />
      <Container fluid className="Container">
        <Row className="justify-content-md-center">
          <Col className="col-md-auto">
            {blockCard(
              "Blue block",
              "This block feels blue",
              block1image,
              "QmfPaUSE3MeGnGEXs5GJL6dWqTkb1adA4fcYJAY6xjCd24"
            )}
          </Col>
          <Col className="col-md-auto">
            {blockCard(
              "Orangey block",
              "Kinda orange. Kinda Red.",
              block2image,
              "QmTyTuQydutsEnDe9R8Wzksk4g7hzmBnAbinzMihVuMTWz"
            )}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="col-md-auto">
            {blockCard(
              "Fresh block",
              "This block smells like mint",
              block3image,
              "QmeF8W19JKQyokNF6SvQ5UpF8LT7PREEFp9iPHGJdkrJRw"
            )}
          </Col>
          <Col className="col-md-auto">
            {blockCard(
              "Yelo block",
              "YOOO THIS IS YELLOOO",
              block4image,
              "QmUnAKqMScoAa3vXyvsjo4ne9X5S4EathzJnaggKPfAKgT"
            )}
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          {bundleCard(
            "Special bundle",
            "All blocks kinda rocks",
            allbocksimage
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
