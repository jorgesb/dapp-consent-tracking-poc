pragma solidity ^0.4.18;

contract OptAction {
    struct OptActionStruct {
        uint index;
        uint urn;
        uint optId;
        uint action;
        uint timestamp;
        string optText;
    }

    mapping(uint => OptActionStruct) public optActionStructs;
    uint[] public optActionIndex;


    function isOptAction(uint optActionId) public constant returns (bool isIndeed) {
        if (optActionIndex.length == 0) return false;

        return (optActionIndex[optActionStructs[optActionId].index] == optActionId);
    }

    function insertOptAction(
        uint optActionId,
        uint urn,
        uint optId,
        uint action,
        uint timestamp,
        string optText
    ) public returns (uint index) {
        if (isOptAction(optActionId)) revert();

        optActionStructs[optActionId].urn = urn;
        optActionStructs[optActionId].optId = optId;
        optActionStructs[optActionId].action = action;
        optActionStructs[optActionId].timestamp = timestamp;
        optActionStructs[optActionId].optText = optText;
        optActionStructs[optActionId].index = optActionIndex.push(optActionId) - 1;

        return optActionIndex.length - 1;
    }

    function getOptAction(uint optActionId) public constant returns (uint urn, uint optId, uint action, uint timestamp, string optText, uint index) {
        if (!isOptAction(optActionId)) revert();

        return (
        optActionStructs[optActionId].urn,
        optActionStructs[optActionId].optId,
        optActionStructs[optActionId].action,
        optActionStructs[optActionId].timestamp,
        optActionStructs[optActionId].optText,
        optActionStructs[optActionId].index
        );
    }

    function getOptActionCount() public constant returns (uint count) {
        return optActionIndex.length;
    }

    function getOptActionIdAtIndex(uint index) public constant returns (uint optActionId) {
        return optActionIndex[index];
    }

    // TODO: Should be adjusted to build an array with all the items on the mapping (traverse the mapping using the array of indexes)

    //function getOptActions() public constant returns (uint[] optActions) {
    //    return optActionIndex;
    //}

}