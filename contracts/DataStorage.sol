// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataStorage {

    struct UserData {
        string encryptedData;
        address owner;
    }

    mapping(address => UserData) public userStorage;

    // Event to log data updates
    event DataStored(address indexed user, string encryptedData);

    // Store the encrypted data on the blockchain
    function storeData(string memory _encryptedData) public {
        userStorage[msg.sender] = UserData({
            encryptedData: _encryptedData,
            owner: msg.sender
        });
        emit DataStored(msg.sender, _encryptedData);
    }

    // Retrieve the encrypted data
    function retrieveData() public view returns (string memory) {
        require(userStorage[msg.sender].owner == msg.sender, "Not the owner of the data");
        return userStorage[msg.sender].encryptedData;
    }
}