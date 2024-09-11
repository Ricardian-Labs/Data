// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DataStorage is Ownable {
    struct KYC {
        string nin;
        string bvn;
        string passport;
        string fullName;
        string dateOfBirth;
        string addressData;
        string phoneNumber;
        string email;
        address publicKey;
        bool verified;
    }

    mapping(address => KYC) public kycData;

    event DataStored(address indexed user, string nin, address publicKey);

    modifier validInput(string memory _input) {
        require(bytes(_input).length > 0, "Input cannot be empty");
        _;
    }

    // Store encrypted KYC data with validation
    function storeKYCData(
        string memory _nin,
        string memory _bvn,
        string memory _passport,
        string memory _fullName,
        string memory _dob,
        string memory _addressData,
        string memory _phoneNumber,
        string memory _email
    )
        public
        validInput(_nin)
        validInput(_bvn)
        validInput(_passport)
        validInput(_fullName)
        validInput(_dob)
        validInput(_addressData)
        validInput(_phoneNumber)
        validInput(_email)
    {
        kycData[msg.sender] = KYC({
            nin: _nin,
            bvn: _bvn,
            passport: _passport,
            fullName: _fullName,
            dateOfBirth: _dob,
            addressData: _addressData,
            phoneNumber: _phoneNumber,
            email: _email,
            publicKey: msg.sender,
            verified: false
        });

        emit DataStored(msg.sender, _nin, msg.sender);
    }

    // Retrieve KYC data for verification
    function retrieveKYCData(address user) public view returns (
        string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory, address, bool
    ) {
        KYC memory data = kycData[user];
        return (
            data.nin,
            data.bvn,
            data.passport,
            data.fullName,
            data.dateOfBirth,
            data.addressData,
            data.phoneNumber,
            data.email,
            data.publicKey,
            data.verified
        );
    }
}