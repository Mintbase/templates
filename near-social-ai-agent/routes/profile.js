const express = require('express');
const router = express.Router();
const { format } = require('near-api-js').utils;
const { SOCIAL_DB_CONTRACT_ID } = require('../utils/constant');
const { getSocialProfile, getAvailableStorage} = require('../utils/nearSocialUtils');
const { estimateDataSize, convertToStringLeaves, StorageCostPerByte, bigMax, fetchCurrentData, removeDuplicates, calculateNearAmount } = require('../utils/utils');
const Big = require('big.js');

const MinStorageBalance = StorageCostPerByte.mul(2000);
const InitialAccountStorageBalance = StorageCostPerByte.mul(500);
const ExtraStorageBalance = StorageCostPerByte.mul(500);
const StorageForPermission = StorageCostPerByte.mul(500);
const CustomStorage = StorageCostPerByte.mul(500);

router.get("/", async (req, res) => {
    try {
        const accountId = req.query.id;
        if (!accountId) {
            return res.status(400).json({ error: 'Account Id not present!' });
        }
        const profile = await getSocialProfile(accountId);
        return res.status(200).json({ profile: profile });
    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        console.log("body >>", body);
        

        const { accountId, accountID, name, about, profileImage, bannerImage, twitter, github, telegram, website, tags } = body;

        const account = accountId || accountID;

        if (!account || !name || !about || !tags || !profileImage || !bannerImage || !twitter || !github || !telegram || !website) {
            console.log("Missing details");
            // return res.status(400).json({ error: 'Missing details' });
        }

        if (tags && !Array.isArray(tags)) {
            console.log("Missing tag format");
            return res.status(400).json({ error: 'Tags should be an array' });
        }

        let formattedTags;

        if (tags && Array.isArray(tags)) {
            formattedTags = tags.reduce((acc, tag) => {
                acc[tag] = "";
                return acc;
            }, {});
        }

        const profileData = {};
        if (name) profileData.name = name;
        if (about) profileData.description = about;
        if (profileImage) profileData.image = { url: profileImage };
        if (bannerImage) profileData.backgroundImage = { url: bannerImage };

        const linktree = {};
        if (twitter) linktree.twitter = twitter;
        if (github) linktree.github = github;
        if (telegram) linktree.telegram = telegram;
        if (website) linktree.website = website;

        if (Object.keys(linktree)?.length > 0) profileData.linktree = linktree;
        if (tags?.length > 0) profileData.tags = formattedTags;

        const data = {
            [account]: convertToStringLeaves({
                profile: profileData
            })
        };

        const storage = await getAvailableStorage(account);
        const availableBytes = Big(storage?.available_bytes || '0');

        let currentData = {};
        // if (availableBytes < 0) {
        //     console.log("Entered!!!!!")
        //     currentData = await fetchCurrentData(data);
        //     data = removeDuplicates(data, currentData);
        // }

        const expectedDataBalance = StorageCostPerByte?.mul(
            estimateDataSize(data, currentData)
        )
            .add(storage ? Big(0) : InitialAccountStorageBalance)
            .add(true ? Big(0) : StorageForPermission)
            .add(ExtraStorageBalance)
            .add(CustomStorage);
        const depositNew = bigMax(
            expectedDataBalance.sub(availableBytes?.mul(StorageCostPerByte)),
            !storage ? MinStorageBalance : true ? Big(0) : Big(1)
        );

        const dataSize = (expectedDataBalance?.toFixed() * 100000 / 10 ** 24).toFixed()

        let amount = 0;
        if (dataSize > availableBytes) {
            const extraSize = dataSize - availableBytes;
            console.log("Extra Size >> ", extraSize);
            amount = calculateNearAmount(extraSize);
        }
        console.log(`amt:${amount},size:${dataSize},availBytes:${availableBytes},data:${JSON.stringify(data)},`);

        const contractId = SOCIAL_DB_CONTRACT_ID;
        const method = 'set';
        const args = { data: data };
        const gas = '30000000000000';
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
        const callbackUrl = encodeURIComponent(`https://near.social/mob.near/widget/ProfilePage?accountId=${account}`);
        console.log("Transaction Data: ", transactionData);
        console.log("Callback URL: ", callbackUrl);

        const signUrl = `https://wallet.bitte.ai/sign-transaction?transactions_data=${transactionsData}&callback_url=${callbackUrl}`;
        console.log("Sign Url: ", decodeURIComponent(signUrl));

        return res.status(200).json({ profileUrl: signUrl });

    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;