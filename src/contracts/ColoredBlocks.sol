//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ColoredBlocks is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdsCounter;

    bool public saleIsActive = false;
    uint256 public maxTokenSupply;
    uint256 public mintPrice;
    string public baseURI;

    address[3] private _payees;
    uint256[3] private _shares;

    event PaymentReleased(address to, uint256 amount);

    constructor() ERC721("ColoredBlocks", "CB") {
        _payees[0] = 0xAC52d109200475C5860fE4dD8a61F3b2b2ad3E2E; //u
        _payees[1] = 0x9A0151327f2cBc038508Aa920F7a22Cf636f6FC9; //v
        _payees[2] = 0x9Fb441Db984820aE238cD5354D98F4e282baD1F5; //a

        _shares[0] = 3333;
        _shares[1] = 3333;
        _shares[2] = 3333;

        maxTokenSupply = 10;
        mintPrice = 1 ether;

        baseURI = "https://ipfs.io/ipfs/";
    }

    function withdraw(uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");

        uint256 totalShares = 10000;
        for (uint256 i = 0; i < 3; i++) {
            uint256 payment = (amount * _shares[i]) / totalShares;

            Address.sendValue(payable(_payees[i]), payment);
            emit PaymentReleased(_payees[i], payment);
        }
    }

    function _mint(address recipient, string memory tokenURI) private {
        _tokenIdsCounter.increment();

        uint256 newItemId = _tokenIdsCounter.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
    }

    function mint_single(address recipient, string memory tokenURI)
        public
        payable
    {
        require(saleIsActive, "Sale must be active.");
        require(
            _tokenIdsCounter.current() < maxTokenSupply,
            "All tokens already minted."
        );
        require(msg.value >= mintPrice, "Not enough ETH sent; check price!");

        _mint(recipient, tokenURI);
    }

    function mint_bundle(address recipient, string[4] memory tokenURIs)
        public
        payable
    {
        require(saleIsActive, "Sale must be active.");
        require(
            _tokenIdsCounter.current() + 4 < maxTokenSupply,
            "All tokens already minted."
        );
        require(
            msg.value >= mintPrice * 4,
            "Not enough ETH sent; check price!"
        );

        _mint(recipient, tokenURIs[0]);
        _mint(recipient, tokenURIs[1]);
        _mint(recipient, tokenURIs[2]);
        _mint(recipient, tokenURIs[3]);
    }

    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
    }

    function setMaxTokenSupply(uint256 maxDragonSupply) public onlyOwner {
        maxTokenSupply = maxDragonSupply;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        baseURI = newBaseURI;
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function tokensMinted() public view returns (uint256) {
        return _tokenIdsCounter.current();
    }
}
