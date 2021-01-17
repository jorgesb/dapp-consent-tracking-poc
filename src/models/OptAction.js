var optAction = {
    web3: null,
    account: null,
    contractInterface: null,
    smartContract: null,

    init: function () {
        console.log('Initializing opt consent Dapp ...');
        /* Configuration variables */
        const web3Host = 'http://localhost';
        //const web3Port = '9545';
        const web3Port = '8545';

        /* web3 initialization */
        var Web3 = require('web3');
        optAction.web3 = new Web3();
        optAction.web3.setProvider(new optAction.web3.providers.HttpProvider(web3Host + ':' + web3Port));
        optAction.account = optAction.web3.eth.accounts[0];
        optAction.contractInterface = [
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "optActionIndex",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "name": "getOptActionIdAtIndex",
                    "outputs": [
                        {
                            "name": "optActionId",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "getOptActionCount",
                    "outputs": [
                        {
                            "name": "count",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "optActionId",
                            "type": "uint256"
                        }
                    ],
                    "name": "getOptAction",
                    "outputs": [
                        {
                            "name": "urn",
                            "type": "uint256"
                        },
                        {
                            "name": "optId",
                            "type": "uint256"
                        },
                        {
                            "name": "action",
                            "type": "uint256"
                        },
                        {
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "name": "optText",
                            "type": "string"
                        },
                        {
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "optActionStructs",
                    "outputs": [
                        {
                            "name": "index",
                            "type": "uint256"
                        },
                        {
                            "name": "urn",
                            "type": "uint256"
                        },
                        {
                            "name": "optId",
                            "type": "uint256"
                        },
                        {
                            "name": "action",
                            "type": "uint256"
                        },
                        {
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "name": "optText",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "optActionId",
                            "type": "uint256"
                        },
                        {
                            "name": "urn",
                            "type": "uint256"
                        },
                        {
                            "name": "optId",
                            "type": "uint256"
                        },
                        {
                            "name": "action",
                            "type": "uint256"
                        },
                        {
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "name": "optText",
                            "type": "string"
                        }
                    ],
                    "name": "insertOptAction",
                    "outputs": [
                        {
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "optActionId",
                            "type": "uint256"
                        }
                    ],
                    "name": "isOptAction",
                    "outputs": [
                        {
                            "name": "isIndeed",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
        optAction.smartContract = optAction.web3.eth.contract(optAction.contractInterface);
        optAction.deployStorage();
    },

    deployStorage: function () {
        console.log('Deploying contract...');
        if (optAction.contractInstance) {
            console.error('Contract already been deployed at: ', optAction.contractAddress);
            return;
        }

        // Bellow data has been generated by Remix (http://remix.ethereum.org)
        optAction.smartContract.new({
            from: optAction.web3.eth.accounts[0],
            data: '0x608060405234801561001057600080fd5b50610857806100206000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806301e5f6171461008857806330d1b1c9146100c95780637b88def31461010a5780638ac794d1146101355780639b5dd94b146101fe578063c631cb3f146102c7578063f961b5cf14610376575b600080fd5b34801561009457600080fd5b506100b3600480360381019080803590602001909291905050506103bb565b6040518082815260200191505060405180910390f35b3480156100d557600080fd5b506100f4600480360381019080803590602001909291905050506103de565b6040518082815260200191505060405180910390f35b34801561011657600080fd5b5061011f610401565b6040518082815260200191505060405180910390f35b34801561014157600080fd5b506101606004803603810190808035906020019092919050505061040e565b6040518087815260200186815260200185815260200184815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156101be5780820151818401526020810190506101a3565b50505050905090810190601f1680156101eb5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b34801561020a57600080fd5b5061022960048036038101908080359060200190929190505050610560565b6040518087815260200186815260200185815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561028757808201518184015260208101905061026c565b50505050905090810190601f1680156102b45780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b3480156102d357600080fd5b506103606004803603810190808035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610634565b6040518082815260200191505060405180910390f35b34801561038257600080fd5b506103a160048036038101908080359060200190929190505050610735565b604051808215151515815260200191505060405180910390f35b6001818154811015156103ca57fe5b906000526020600020016000915090505481565b60006001828154811015156103ef57fe5b90600052602060002001549050919050565b6000600180549050905090565b6000806000806060600061042187610735565b151561042c57600080fd5b60008088815260200190815260200160002060010154600080898152602001908152602001600020600201546000808a8152602001908152602001600020600301546000808b8152602001908152602001600020600401546000808c81526020019081526020016000206005016000808d815260200190815260200160002060000154818054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105445780601f1061051957610100808354040283529160200191610544565b820191906000526020600020905b81548152906001019060200180831161052757829003601f168201915b5050505050915095509550955095509550955091939550919395565b6000602052806000526040600020600091509050806000015490806001015490806002015490806003015490806004015490806005018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561062a5780601f106105ff5761010080835404028352916020019161062a565b820191906000526020600020905b81548152906001019060200180831161060d57829003601f168201915b5050505050905086565b600061063f87610735565b1561064957600080fd5b85600080898152602001908152602001600020600101819055508460008089815260200190815260200160002060020181905550836000808981526020019081526020016000206003018190555082600080898152602001908152602001600020600401819055508160008089815260200190815260200160002060050190805190602001906106da929190610786565b5060018088908060018154018082558091505090600182039060005260206000200160009091929091909150550360008089815260200190815260200160002060000181905550600180805490500390509695505050505050565b600080600180549050141561074d5760009050610781565b8160016000808581526020019081526020016000206000015481548110151561077257fe5b90600052602060002001541490505b919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106107c757805160ff19168380011785556107f5565b828001600101855582156107f5579182015b828111156107f45782518255916020019190600101906107d9565b5b5090506108029190610806565b5090565b61082891905b8082111561082457600081600090555060010161080c565b5090565b905600a165627a7a7230582092719bd8471c79a9398de6dbb51d6624ae160cc3f4bd487b1168ddd82a653d840029',
            gas: '4700000'
        }, function (err, contract) {
            if (err) {
                console.error("Contract deployment error: ", err);
            } else if (contract.address) {
                optAction.contractAddress = contract.address;
                optAction.contractInstance = optAction.smartContract.at(contract.address);
                console.log("Contract successfully deployed at: ", contract.address);
            } else if (contract.transactionHash) {
                console.log("Awaiting contract deployment with transaction hash: ", contract.transactionHash);
            } else {
                console.error("Unresolved contract deployment error");
            }
        });
    },

    storeContent: function (id, urn, optId, action, timestamp, optText, callback) {
        if (!optAction.contractInstance) {
            console.error('Ensure the storage contract has been deployed');
            return false;
        }

        console.log('Calling insertOptAction with params:');
        console.dir({id, urn, optId, action, timestamp, optText});

        optAction.contractInstance.insertOptAction.sendTransaction(
            id,
            urn,
            optId,
            action,
            timestamp,
            optText, {from: optAction.account, gas: 3000000}, callback);
    },

    fetchContent: function (id, callback) {
        if (!optAction.contractInstance) {
            console.error("Storage contract has not been deployed");
            return false;
        }

        console.log('Getting opt action with address:' + id);
        optAction.contractInstance.getOptAction(id, callback);
    },

    checkExist: function (id, callback) {
        optAction.contractInstance.isOptAction(id, callback);
    },

    getTotal: function (callback) {
        optAction.contractInstance.getOptActionCount(optAction.account, callback);
    },

    getOptActionAddresses: function (callback) {
        optAction.contractInstance.getOptActions(optAction.account, callback);
    },

    getBalance: function () {
        optAction.web3.eth.getBalance(optAction.account, function (err, balance) {
            console.log(parseFloat(optAction.web3.fromWei(balance, "ether")));
            return parseFloat(optAction.web3.fromWei(balance, "ether"));
        });
    }
};

optAction.init();

module.exports = optAction;