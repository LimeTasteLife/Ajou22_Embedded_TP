// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */
contract APIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;
    bool public auth;

    bytes32 private jobId;
    uint256 private fee;

    mapping(bytes32 => bool) authRequestResults;
    mapping(address => uint[]) authUserRequests;

    //string constant Urls = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
    string constant authBaseUrls = "http://13.125.46.61/auth?nickname=";

    //event RequestUSD(bytes32 indexed requestId, uint256 USD);
    event RequestAuth(bytes32 indexed requestId, bool auth);

    /**
     * @notice Initialize the link token and target oracle
     *
     * Rinkeby Testnet details:
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 (Chainlink DevRel)
     * jobId: c1c5e92880894eb6b27d3cae19670aa3
     *
     */
    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "c1c5e92880894eb6b27d3cae19670aa3";
        fee = (1 * 0.1 * 10 ** 18) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    function authSubmitRequest(
        string memory url
    ) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add("get", url);
        req.add("path", "auth");

        return sendChainlinkRequest(req, fee);
    }

    function fulfill(
        bytes32 _requestId,
        bool _auth
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestAuth(_requestId, _auth);
        auth = _auth;
        authRequestResults[_requestId] = _auth;
    }

    function authCreateRequest(string memory _nickname) public returns (uint) {
        string memory url = string(abi.encodePacked(authBaseUrls, _nickname));
        uint requestId = uint(authSubmitRequest(string(url)));

        authUserRequests[msg.sender].push(requestId);
        return requestId;
    }

    function getAuthRequestResult(uint _requestId) public view returns (bool) {
        return authRequestResults[bytes32(_requestId)];
    }

    function getAuthRequestIds() public view returns (uint[] memory) {
        return authUserRequests[msg.sender];
    }
}
