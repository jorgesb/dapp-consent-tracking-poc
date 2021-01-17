var router = require('express').Router();
var optAction = require('../models/OptAction');

router.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
});

router.get("/deploy", function(req, res) {
    var result = optAction.deployStorage();
    res.status(200).send("Deploy result:" + result);
});

router.post("/add", function(req, res) {
    const body = req.body;

    // optAddress, urn, optId, action, timestamp, optText
    optAction.storeContent(body.id, body.urn, body.optId, body.action, Date.now(), body.optText, function (err, result) {
        console.log('insertOptAction callback...');
        if (err) {
            console.error("Transaction submission error:", err);
            res.status(500).json({success: false, error: err});
        } else {
            console.log("Data successfully stored. Transaction hash:", result);
            res.status(200).json({success: true, message: result});
        }
    });
});

router.get("/check-exist/:id", function (req, res) {
    optAction.checkExist(req.params.id, function (err, result) {
        if (err) {
            console.error("Transaction submission error:", err);
            res.status(500).json({success: false, error: "Transaction submission error:" + err});
        } else {
            console.log("Checked if exist, result:", result);
            res.status(200).json({success: true, message: result});
        }
    });
});

router.get("/opt-action/:id", function (req, res) {
    console.log(req.params.optAddress);
    optAction.fetchContent(req.params.id, function (err, result) {
        if (err) {
            console.error("Content fetch error:", err);
            res.status(500).json({success: false, error: err});
        } else if (result) {
            console.log("Content successfully retrieved (from network):", result);
            res.status(200).json({success: true, message: result});
        } else {
            console.error('No data, verify the transaction has been mined');
            res.status(200).json({success: true, message: 'No data, verify the transaction has been mined'});
        }
    });
});

router.get("/total", function(req, res) {
    optAction.getTotal(function (err, result) {
        console.log("/total result: ");
        console.dir(result);
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result.toNumber());
        }
    });
});

router.get("/opt-action-addresses", function(req, res) {
    optAction.getOptActionAddresses(function (err, result) {
        console.log("/opt-action-addresses result: ");
        console.dir(result);
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

router.get("/balance", function(req, res) {
    const result = optAction.getBalance();
    res.status(200).send(result);
});

module.exports = router;

