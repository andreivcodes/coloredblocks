import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import allbocksimage from "./assets/all blocks.png";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="mt-5" />
        <p>Welcome to ColoredBlocks.</p>

        <Container fluid className="Container">
          <Row className="justify-content-md-center">
            <Col className="col-md-auto">
              <Card style={{ width: "18rem" }} className="Card m-3">
                <Card.Img
                  variant="top"
                  src="https://ipfs.io/ipfs/Qmb7cU3vX3x98pZMh8tRtpvzyGtjeANFShJ4Q3qnRcMSje?filename=1.png"
                />
                <Card.Body>
                  <Card.Title>Blue block</Card.Title>
                  <Card.Text>This block feels blue</Card.Text>
                  <Button variant="primary">Mint</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-md-auto">
              <Card style={{ width: "18rem" }} className="Card m-3">
                <Card.Img
                  variant="top"
                  src="https://ipfs.io/ipfs/QmdxiPKd5u4eMXdBNW137cAEVdxW9c8jxBhdF45afFYD8H?filename=2.png"
                />
                <Card.Body>
                  <Card.Title>Orangey block</Card.Title>
                  <Card.Text>Kinda orange. Kinda Red.</Card.Text>
                  <Button variant="primary">Mint</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="col-md-auto">
              <Card style={{ width: "18rem" }} className="Card m-3">
                <Card.Img
                  variant="top"
                  src="https://ipfs.io/ipfs/QmexTGKUoUeitQYK1nd3VtrZ8KX8FQksdeJPNrQ62hTmJg?filename=3.png"
                />
                <Card.Body>
                  <Card.Title>Fresh block</Card.Title>
                  <Card.Text>This block smells like mint</Card.Text>
                  <Button variant="primary">Mint</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-md-auto">
              <Card style={{ width: "18rem" }} className="Card m-3">
                <Card.Img
                  variant="top"
                  src="https://ipfs.io/ipfs/QmTmcmvJHoE7KNSFTVbUsDmCcWjUgmR38Fwj963DJ8JRBU?filename=4.png"
                />
                <Card.Body>
                  <Card.Title>Yelo block</Card.Title>
                  <Card.Text>YOOO THIS IS YELLOOO</Card.Text>
                  <Button variant="primary">Mint</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Card style={{ width: "18rem" }} className="Card m-3">
              <Card.Img variant="top" src={allbocksimage} />
              <Card.Body>
                <Card.Title>Special bundle</Card.Title>
                <Card.Text>All blocks kinda rocks</Card.Text>
                <Button variant="primary">Mint</Button>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default App;
