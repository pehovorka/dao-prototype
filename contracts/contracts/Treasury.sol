// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    // Enables receiving ether in this contract.
    receive() external payable {}

    // Sends funds from the treasury to an address.
    function sendFunds(uint256 amount, address recipient) public onlyOwner {
        payable(recipient).transfer(amount);
    }
}
