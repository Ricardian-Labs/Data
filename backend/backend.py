from flask import Flask, request, jsonify
from web3 import Web3
import re

app = Flask(__name__)

# Connect to Ethereum blockchain
blockchain_url = 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID'
web3 = Web3(Web3.HTTPProvider(blockchain_url))
contract_address = 'YOUR_CONTRACT_ADDRESS'
contract_abi = 'YOUR_CONTRACT_ABI'

contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Simple regex functions for NIN and BVN validation
def verify_nin(nin):
    pattern = r"^\d{11}$"  # NIN is an 11-digit number
    return re.match(pattern, nin) is not None

def verify_bvn(bvn):
    pattern = r"^\d{11}$"  # BVN is also an 11-digit number
    return re.match(pattern, bvn) is not None

# ML function to verify KYC data
def verify_kyc(nin, bvn):
    if verify_nin(nin) and verify_bvn(bvn):
        return True
    return False

# API endpoint to store KYC data
@app.route('/store_kyc', methods=['POST'])
def store_kyc():
    data = request.json
    nin = data['nin']
    bvn = data['bvn']
    passport = data['passport']
    public_key = data['public_key']

    # Verify KYC data with ML logic
    if verify_kyc(nin, bvn):
        try:
            # Call smart contract to store KYC data
            tx = contract.functions.storeKYCData(nin, bvn, passport, public_key).transact({'from': public_key})
            web3.eth.waitForTransactionReceipt(tx)
            return jsonify({"status": "success", "message": "KYC data stored successfully"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
    else:
        return jsonify({"status": "error", "message": "Invalid NIN or BVN"}), 400

# API endpoint to retrieve KYC data
@app.route('/retrieve_kyc/<public_key>', methods=['GET'])
def retrieve_kyc(public_key):
    try:
        kyc_data = contract.functions.retrieveKYCData(public_key).call()
        return jsonify({
            "nin": kyc_data[0],
            "bvn": kyc_data[1],
            "passport": kyc_data[2],
            "public_key": kyc_data[3],
            "verified": kyc_data[4]
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)