const OptAction_backup = artifacts.require('../contracts/OptAction_backup.sol');
const assert = require('assert');

let contractInstance;

contract('OptAction_backup', (accounts) => {
    beforeEach(async () => {
      contractInstance = await OptAction_backup.deployed()
   })
});

it('should add a opt action successfully', async () => {
    let isOpt = await contractInstance.isOptAction('0x85f199017c00b87e425abe971689d6df6516ccfe');

    assert.equal(false, isOpt);
    /*
    address optAddress,
        uint urn,
        uint optId,
        uint action,
        string timestamp,
        string optText

     */

    const newAddedAction = await contractInstance.insertOptAction('0x85f199017c00b87e425abe971689d6df6516ccfe', 1, 2, Date.now(), 'texto prueba');

    console.log('insertOptAction result:' + newAddedAction);

    assert.equal(1, newAddedAction);

    isOpt = await contractInstance.isOptAction('0x85f199017c00b87e425abe971689d6df6516ccfe');

    assert.equal(true, isOpt);
});

/*
it('should add a opt action successfully', async () => {
      await contractInstance.addTodo(web3.toHex('this is a short text'))
      const newAddedTodo = await contractInstance.todos(accounts[0], 0)
      const todoContent = web3.toUtf8(newAddedTodo[1])

      assert.equal(todoContent, 'this is a short text', 'The content of the new added todo is not correct')
   })
})
*/