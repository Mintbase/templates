const express = require('express');
const router = express.Router();
const { format } = require('near-api-js').utils;
const { SOCIAL_DB_CONTRACT_ID } = require('../utils/constant');
const { getAvailableStorage} = require('../utils/nearSocialUtils');
const { StorageCostPerByte, estimateDataSize, calculateNearAmount } = require('../utils/utils');
const Big = require('big.js');

const MinStorageBalance = StorageCostPerByte.mul(2000);
const InitialAccountStorageBalance = StorageCostPerByte.mul(500);
const ExtraStorageBalance = StorageCostPerByte.mul(500);
const StorageForPermission = StorageCostPerByte.mul(500);
const CustomStorage = StorageCostPerByte.mul(500);

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        console.log("body >>", body);

        const { accountId, accountID, recipientId } = body;
        const account = accountId || accountID;
        if (!account || !recipientId) {
            console.log("Missing accountId or recipientId");
            return res.status(400).json({ error: "Missing accountId or recipientId" });
        }

        const data = {
            graph: { follow: { [recipientId] : "" } },
            index: {
                graph: JSON.stringify({
                    key: "follow",
                    value: {
                        type: "follow",
                        accountId: recipientId,
                    },
                }),
                notify: JSON.stringify({
                    key: recipientId,
                    value: {
                        type: "follow",
                    },
                }),
            },
        };

        const storage = await getAvailableStorage(account);
        const availableBytes = Big(storage?.available_bytes || '0');

        let currentData = {};

        const expectedDataBalance = StorageCostPerByte?.mul(
            estimateDataSize(data, currentData)
        )
            .add(storage ? Big(0) : InitialAccountStorageBalance)
            .add(true ? Big(0) : StorageForPermission)
            .add(ExtraStorageBalance)
            .add(CustomStorage);

        const totalSize = (expectedDataBalance?.toFixed() * 100000 / 10 ** 24).toFixed()

        let amount = 0;
        if (totalSize > availableBytes) {
            // Calculate NEAR amount if the total size exceeds the available storage
            const extraSize = totalSize - availableBytes;
            amount = calculateNearAmount(extraSize);
        }
        console.log(`amt:${amount},size:${totalSize},availBytes:${availableBytes},data:${JSON.stringify(data)},`);

        const contractId = SOCIAL_DB_CONTRACT_ID;
        const method = 'set';
        const args = {
            [account]: data,
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
        const callbackUrl = encodeURIComponent(`https://near.social/mob.near/widget/ProfilePage?accountId=${recipientId}`);

        console.log("Transaction Data: ", transactionData);
        console.log("Callback URL: ", callbackUrl);

        const followUrl = `https://wallet.bitte.ai/sign-transaction?transactions_data=${transactionsData}&callback_url=${callbackUrl}`;
        console.log("Post Url: ", decodeURIComponent(followUrl));
        res.json({ followUrl: followUrl });

    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'An error occurred while generating the post URL.' });
    }
});

module.exports = router;