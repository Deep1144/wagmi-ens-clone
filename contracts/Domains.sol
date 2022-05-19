// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    //  domain -> owner mapping
    mapping(string => address) public domains;

    // domain -> ip mapping
    mapping(string => string) public records;

    constructor() {
        console.log("THIS IS MY DOMAINS CONTRACT. NICE.");
    }

    function register(string calldata _domain) public {
        require(domains[_domain] == address(0), "Domain already registered");
        domains[_domain] = msg.sender;
    }

    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata _domain, string calldata _record)
        public
    {
        require(domains[_domain] == msg.sender, "Not owner of domain");
        records[_domain] = _record;
    }

    function getRecord(string calldata name)
        public
        view
        returns (string memory)
    {
        return records[name];
    }
}
