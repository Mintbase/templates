const express = require('express');
const router = express.Router();
const { format } = require('near-api-js').utils;
const { getDonationsForRecipient, getDonationsForDonor, isRegistrationApproved } = require('../utils/potlockUtils');
const { POTLOCK_DONATE_CONTRACT_ID } = require('../utils/constants');

router.get("/recipient", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        const accountId = req.query.id;
        console.log("account1 >>", accountId);
        const accountId2 = req.query.accountId;
        console.log("account2 >>", accountId2);
        const accountId3 = req.query.donorId;
        console.log("account3 >>", accountId3);
        const accountId4 = req.query.recipientId;
        console.log("account4 >>", accountId4);
        const account = accountId || accountId2 || accountId3 || accountId4;
        if(!account){
            return res.status(400).json({ error: 'Account Id is missing in request!' });
        }
        const donationsReceived = await getDonationsForRecipient({ recipientId: account, limit, offset });
        console.log("Res", donationsReceived);
        // hitting api with recipientId query params,
        return res.status(200).json({ donations: donationsReceived });
    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/donor", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        const accountId = req.query.id;
        console.log("account1 >>", accountId);
        const accountId2 = req.query.accountId;
        console.log("account2 >>", accountId2);
        const accountId3 = req.query.donorId;
        console.log("account3 >>", accountId3);
        const accountId4 = req.query.recipientId;
        console.log("account4 >>", accountId4);
        const account = accountId || accountId2 || accountId3 || accountId4;
        if(!account){
            return res.status(400).json({ error: 'Account Id is missing in request!' });
        }
        const donationsSend = await getDonationsForDonor({ donorId: account, limit, offset });
        console.log("Res", donationsSend)
        return res.status(200).json({ donations: donationsSend });
    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        console.log("body >>", body);

        const { recipientId, amount, referrerId, message } = body;
        if (!recipientId || !amount) {
            console.log("Missing accountId or recipientId or amount");
            return res.status(400).json({ error: "Missing accountId or recipientId or amount" });
        }

        const approved = await isRegistrationApproved(recipientId);
        if(!approved) {
            return res.status(400).json({ error: 'This project has been not approved!' });
        }

        const contractId = POTLOCK_DONATE_CONTRACT_ID;
        const method = 'donate';
        const args = {
            recipient_id: recipientId,
            referrer_id: referrerId || "sweety08.near",
            message: message || "Keep rocking!",
            bypass_protocol_fee: true
        };
        const gas = '300000000000000';
        const deposit = format.parseNearAmount(amount.toString());

        const transactionData = [{
            receiverId: contractId,
            actions: [{
                type: 'FunctionCall',
                params: {
                    methodName: method,
                    args: args,
                    gas: gas,
                    deposit: deposit
                }
            }]
        }];

        const transactionsData = encodeURIComponent(JSON.stringify(transactionData));
        const callbackUrl = encodeURIComponent(`https://app.potlock.org/?tab=project&projectId=${recipientId}`);

        console.log("Transaction Data: ", transactionData);
        console.log("Callback URL: ", callbackUrl);

        const donateUrl = `https://wallet.bitte.ai/sign-transaction?transactions_data=${transactionsData}&callback_url=${callbackUrl}`;
        console.log("Donate Url: ", decodeURIComponent(donateUrl));
        return res.json({ donateUrl: donateUrl });
    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;