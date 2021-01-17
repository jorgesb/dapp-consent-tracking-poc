var Migrations = artifacts.require("./Migrations.sol");
var OptAction = artifacts.require("./OptAction.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(OptAction);
};
