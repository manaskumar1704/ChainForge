// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    // A simple number variable to keep track of the next token ID.
    uint256 private _nextTokenId;

    // The constructor sets the name and symbol for your NFT collection.
    constructor() ERC721("MyNFT", "MNFT") {}

    // The main function to create a new NFT.
    function safeMint(string memory tokenURI) public {
        uint256 newItemId = _nextTokenId;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _nextTokenId++;
    }
}