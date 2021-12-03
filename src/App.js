import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import allbocksimage from "./assets/bundle.png";
import { ethers } from "ethers";
import { useState } from "react";
import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return (
      <Button onClick={connectWalletHandler} className="connect-wallet-button">
        Connect Wallet
      </Button>
    );
  };

  const mint_single = (_cid) => {};

  const mint_bundle = (_cids) => {};

  const blockCard = (_name, _description, _image, _cid) => {
    return (
      <Card style={{ width: "18rem" }} className="Card m-3">
        <Card.Img variant="top" src={_image} />
        <Card.Body>
          <Card.Title>{_name}</Card.Title>
          <Card.Text>{_description}</Card.Text>
          <Button variant="primary" onClick={mint_single(_cid)}>
            Mint
          </Button>
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
          <Button
            variant="primary"
            onClick={mint_bundle([
              "QmfPaUSE3MeGnGEXs5GJL6dWqTkb1adA4fcYJAY6xjCd24",
              "QmTyTuQydutsEnDe9R8Wzksk4g7hzmBnAbinzMihVuMTWz",
              "QmeF8W19JKQyokNF6SvQ5UpF8LT7PREEFp9iPHGJdkrJRw",
              "QmUnAKqMScoAa3vXyvsjo4ne9X5S4EathzJnaggKPfAKgT",
            ])}
          >
            Mint
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="mt-5" />
        <p>Welcome to ColoredBlocks.</p>
        <div>{currentAccount ? <div></div> : connectWalletButton()}</div>
        <div className="mt-5" />
        <Container fluid className="Container">
          <Row className="justify-content-md-center">
            <Col className="col-md-auto">
              {blockCard(
                "Blue block",
                "This block feels blue",
                "https://ipfs.io/ipfs/QmS3PSjpZiCNAQyymGN3rqKt2Rx39F6YuKiTKu6BodZ8UD?filename=1.png",
                "QmfPaUSE3MeGnGEXs5GJL6dWqTkb1adA4fcYJAY6xjCd24"
              )}
            </Col>
            <Col className="col-md-auto">
              {blockCard(
                "Orangey block",
                "Kinda orange. Kinda Red.",
                "https://ipfs.io/ipfs/QmQerLcGoB98xZ3iLkyTqbLbbYtRhch9jCaFoyaeKW8J3C?filename=2.png",
                "QmTyTuQydutsEnDe9R8Wzksk4g7hzmBnAbinzMihVuMTWz"
              )}
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="col-md-auto">
              {blockCard(
                "Fresh block",
                "This block smells like mint",
                "https://ipfs.io/ipfs/QmXaHQZ1tQYs9chyRe9MXBoh33LC8C2usVT8Uwq56ET9Nz?filename=3.png",
                "QmeF8W19JKQyokNF6SvQ5UpF8LT7PREEFp9iPHGJdkrJRw"
              )}
            </Col>
            <Col className="col-md-auto">
              {blockCard(
                "Yelo block",
                "YOOO THIS IS YELLOOO",
                "https://ipfs.io/ipfs/Qmd4rhDW6gMNdpWfCYWkmcGVSJV3Kr8PzMexuLJA6bTSzy?filename=4.png",
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
      </header>
    </div>
  );
}

export default App;
