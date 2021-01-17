const OptAction = artifacts.require('./OptAction.sol');

contract('OptAction', function (accounts) {
    beforeEach(async () => {
        contractInstance = await OptAction.deployed()
    });

    it('should add an opt action successfully', async () => {
        var isOpt = await contractInstance.isOptAction('0x85f199017c00b87e425abe971689d6df6516ccfe');
        assert.equal(false, isOpt);

        /*
        address optAddress,
            uint urn,
            uint optId,
            uint action,
            string timestamp,
            string optText
         */
        const newAddedAction = await contractInstance.insertOptAction(
            '0x85f199017c00b87e425abe971689d6df6516ccfe',
            2,
            2,
            2,
            1530543469206,
            'texto prueba');

        const total = await contractInstance.getOptActionCount();

        assert.equal(1, total, "Not equal; count value: " + total);

        isOpt = await contractInstance.isOptAction('0x85f199017c00b87e425abe971689d6df6516ccfe');

        assert.equal(true, isOpt, "Not equal; isOpt value: " + isOpt);
    });

    it('should obtain the opt address by index', async () => {
        const newAddedAction = await contractInstance.insertOptAction(
            '0x5aeda56215b167893e80b4fe645ba6d5bab767de',
            1,
            1,
            1,
            Date.now(),
            'texto prueba');

        //assert.equal(0, newAddedAction,"Not equal; newAddedAction value: " + newAddedAction);

        const total = await contractInstance.getOptActionCount();

        assert.equal(2, total, "Not equal; total value: " + total);

        const optAddress = await contractInstance.getOptAddressAtIndex(0);

        assert.equal('0x85f199017c00b87e425abe971689d6df6516ccfe', optAddress, "Not equal; optAddress value: " + optAddress);
    });

    it('should obtain the opt action by address', async () => {
        const optAction = await contractInstance.getOptAction('0x85f199017c00b87e425abe971689d6df6516ccfe');

        assert.equal(2, optAction[0].toNumber(), "Not equal; optAction.urn value: " + optAction[0].toNumber());
        assert.equal(2, optAction[1].toNumber(), "Not equal; optId value: " + optAction[1].optId);
        assert.equal(2, optAction[2].toNumber(), "Not equal; optAction.action value: " + optAction[2].action);
        assert.equal(1530543469206, optAction[3].toNumber(), "Not equal; optAction.timestamp value: " + optAction[3].toNumber());
        assert.equal('texto prueba', optAction[4], "Not equal; optAction.optText value: " + optAction[4]);
        assert.equal(0, optAction[5].toNumber(), "Not equal; optAction.index value: " + optAction[5].toNumber());
    });

});

