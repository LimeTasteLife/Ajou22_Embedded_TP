// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */
contract WinnerGet is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    string public winner;
    string public finalUrl;
    bytes32 private jobId;
    uint256 private fee;

    //mapping(bytes32 => uint) requestResults;
    //mapping(address => uint[]) userRequests;

    mapping(bytes32 => string) winnerRequestResults;
    mapping(address => uint[]) winnerUserRequests;

    //string constant Urls = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";

    string constant winnerBaseUrls = "http://13.125.46.61/result?gameId=";

    //event RequestUSD(bytes32 indexed requestId, uint256 USD);
    event RequestWinner(bytes32 indexed requestId, string winner);

    /**
     * @notice Initialize the link token and target oracle
     *
     * Rinkeby Testnet details:
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 (Chainlink DevRel)
     * jobId: 7d80a6386ef543a3abb52817f6707e3b
     *
     */
    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = (1 * 0.1 * 10 ** 18) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    function winnerSubmitRequest(
        string memory url
    ) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add("get", url);
        req.add("path", "winner");

        return sendChainlinkRequest(req, fee);
    }

    function fulfill(
        bytes32 _requestId,
        string memory _winner
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestWinner(_requestId, _winner); // 변경필요
        winner = _winner;
        winnerRequestResults[_requestId] = _winner;
    }

    function winnerCreateRequest(uint _gameId) public returns (uint) {
        string memory strGameId = Strings.toString(_gameId);
        string memory url = string(abi.encodePacked(winnerBaseUrls, strGameId));
        finalUrl = url;
        uint requestId = uint(winnerSubmitRequest(string(url)));

        winnerUserRequests[msg.sender].push(requestId);
        return requestId;
    }

    /*
    function winnerCreateRequest() public returns(uint) {
        //string memory strGameId = Strings.toString(_gameId);
        //string memory url = string(abi.encodePacked(winnerBaseUrls, strGameId));
        //finalUrl = url;
        uint requestId = uint(winnerSubmitRequest(string(winnerBaseUrls)));

        winnerUserRequests[msg.sender].push(requestId);
        return requestId;
    }
    */

    function getWinnerRequestResult(
        uint _requestId
    ) public view returns (string memory) {
        return winnerRequestResults[bytes32(_requestId)];
    }

    function getWinnerRequestIds() public view returns (uint[] memory) {
        return winnerUserRequests[msg.sender];
    }
}
