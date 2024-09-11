import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DataStorageContract from './contracts/DataStorage.json'; // Update with your contract's ABI

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [inputData, setInputData] = useState({
    nin: '', bvn: '', passport: '', fullName: '', dob: '', address: '', phoneNumber: '', email: ''
  });
  const [publicKey, setPublicKey] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          const accounts = await web3.eth.requestAccounts();
          setAccount(accounts[0]);

          const networkId = await web3.eth.net.getId();
          const deployedNetwork = DataStorageContract.networks[networkId];
          if (deployedNetwork) {
            const instance = new web3.eth.Contract(DataStorageContract.abi, deployedNetwork.address);
            setContract(instance);
          } else {
            alert('Smart contract not deployed to the detected network.');
          }
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        alert('Please install MetaMask to use this feature.');
      }
    };
    loadBlockchainData();
  }, []);

  const storeData = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      await contract.methods.storeKYCData(
        inputData.nin, inputData.bvn, inputData.passport, inputData.fullName,
        inputData.dob, inputData.address, inputData.phoneNumber, inputData.email
      ).send({ from: account });
      
      alert('Data stored successfully!');
      setPublicKey(account);  // Use account as publicKey for now
    } catch (error) {
      console.error('Error storing data:', error);
      alert('Failed to store data.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Blockchain KYC Demo</h1>
      <form>
        <input 
          type="text" 
          placeholder="NIN" 
          value={inputData.nin} 
          onChange={(e) => setInputData({ ...inputData, nin: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="BVN" 
          value={inputData.bvn} 
          onChange={(e) => setInputData({ ...inputData, bvn: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Passport" 
          value={inputData.passport} 
          onChange={(e) => setInputData({ ...inputData, passport: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Full Name" 
          value={inputData.fullName} 
          onChange={(e) => setInputData({ ...inputData, fullName: e.target.value })} 
        />
        <input 
          type="date" 
          placeholder="Date of Birth" 
          value={inputData.dob} 
          onChange={(e) => setInputData({ ...inputData, dob: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={inputData.address} 
          onChange={(e) => setInputData({ ...inputData, address: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Phone Number" 
          value={inputData.phoneNumber} 
          onChange={(e) => setInputData({ ...inputData, phoneNumber: e.target.value })} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={inputData.email} 
          onChange={(e) => setInputData({ ...inputData, email: e.target.value })} 
        />
        <button type="button" onClick={storeData} disabled={loading}>
          {loading ? 'Storing...' : 'Store Data'}
        </button>
      </form>

      {publicKey && (
        <p>Your public key: {publicKey}</p>
      )}
    </div>
  );
}

export default App;