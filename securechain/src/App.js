import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import DataStorageContract from './contracts/DataStorage.json';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [inputData, setInputData] = useState({
    nin: '',
    bvn: '',
    passport: '',
    fullName: '',
    dob: '',
    addressData: '',
    phoneNumber: '',
    email: ''
  });
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          const accounts = await web3.eth.requestAccounts();
          setAccount(accounts[0]);

          // Load the contract
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = DataStorageContract.networks[networkId];
          if (deployedNetwork) {
            const contractInstance = new web3.eth.Contract(
              DataStorageContract.abi,
              deployedNetwork && deployedNetwork.address,
            );
            setContract(contractInstance);
          } else {
            alert('Smart contract not deployed to detected network.');
          }
        } catch (error) {
          console.error('Error connecting to web3:', error);
        }
      } else {
        alert('Please install MetaMask to use this feature!');
      }
    };

    loadWeb3();
  }, []);

  // Function to store KYC data
  const storeData = async () => {
    if (!contract || Object.values(inputData).some(field => field === '')) return;
    setLoading(true);
    try {
      const tx = await contract.methods.storeKYCData(
        inputData.nin,
        inputData.bvn,
        inputData.passport,
        inputData.fullName,
        inputData.dob,
        inputData.addressData,
        inputData.phoneNumber,
        inputData.email
      ).send({ from: account });
      
      console.log('Transaction hash:', tx.transactionHash);
      alert('Data stored successfully!');
      setPublicKey(account);
    } catch (error) {
      console.error('Error storing data:', error);
      alert('Error storing data!');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Blockchain KYC Demo</Typography>

      <TextField
        label="NIN"
        fullWidth
        value={inputData.nin}
        onChange={(e) => setInputData({ ...inputData, nin: e.target.value })}
      />
      <TextField
        label="BVN"
        fullWidth
        value={inputData.bvn}
        onChange={(e) => setInputData({ ...inputData, bvn: e.target.value })}
      />
      <TextField
        label="Passport"
        fullWidth
        value={inputData.passport}
        onChange={(e) => setInputData({ ...inputData, passport: e.target.value })}
      />
      <TextField
        label="Full Name"
        fullWidth
        value={inputData.fullName}
        onChange={(e) => setInputData({ ...inputData, fullName: e.target.value })}
      />
      <TextField
        label="Date of Birth"
        fullWidth
        type="date"
        value={inputData.dob}
        onChange={(e) => setInputData({ ...inputData, dob: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Address"
        fullWidth
        value={inputData.addressData}
        onChange={(e) => setInputData({ ...inputData, addressData: e.target.value })}
      />
      <TextField
        label="Phone Number"
        fullWidth
        value={inputData.phoneNumber}
        onChange={(e) => setInputData({ ...inputData, phoneNumber: e.target.value })}
      />
      <TextField
        label="Email"
        fullWidth
        type="email"
        value={inputData.email}
        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
      />

      <Box my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={storeData}
          disabled={loading || Object.values(inputData).some(field => field === '')}
        >
          {loading ? <CircularProgress size={24} /> : 'Store Data'}
        </Button>
      </Box>

      {publicKey && (
        <Box>
          <Typography>Your Public Key: {publicKey}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default App;