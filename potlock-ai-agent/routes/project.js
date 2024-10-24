const express = require('express');
const router = express.Router();
const { format } = require('near-api-js').utils;
const Big = require('big.js');
const { getRegistrations, getRegistration } = require('../utils/potlockUtils');
const { getSocialProfile } = require('../utils/nearSocialUtils');
const { NEAR_SOCIAL_DB_CONTRACT_ID, POTLOCK_LISTS_CONTRACT_ID, ADD_PROJECT_CONTRACT_ID } = require('../utils/constants');
const { getAvailableStorage, calculateNearAmount, estimateDataSize, StorageCostPerByte } = require('../utils/utils');

const MinStorageBalance = StorageCostPerByte.mul(2000);
const InitialAccountStorageBalance = StorageCostPerByte.mul(500);
const ExtraStorageBalance = StorageCostPerByte.mul(500);
const StorageForPermission = StorageCostPerByte.mul(500);
const CustomStorage = StorageCostPerByte.mul(500);

router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = parseInt(req.query.offset, 10) || 0;
        const registrantId = req.query.id;
        console.log("account >>", registrantId);
        if (registrantId) {
            const project = await getRegistration({ registrant_id: registrantId });
            return res.status(200).json({ project: project });
        }
        const projects = await getRegistrations({ limit, offset });
        return res.status(200).json({ projects: projects });
    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/profile", async (req, res) => {
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

        const { accountId, accountID, name, categories, description, reason, twitter, github, telegram, website, profileImage, bannerImage, smartContracts, githubRepos, fundingSources, team } = body;

        const account = accountId || accountID;
        if (!account || !name || !description || !reason || !categories || !profileImage || !bannerImage) {
            console.log("Missing required fields!");
            return res.status(400).json({ error: "Missing required fields!" });
        }

        let processedCategories = categories;
        if (categories && !Array.isArray(categories)) {
            if (typeof categories === "string") {
                processedCategories = categories.split(',').map(category => category.trim());
            } else {
                console.log("Missing categories format");
                return res.status(400).json({ error: 'Categories should be an array' });
            }
        }

        const profileData = {};
        if (name) profileData.name = name;
        if (description) profileData.description = description;
        if (categories) profileData.plCategories = JSON.stringify(processedCategories);
        if (reason) profileData.plPublicGoodReason = reason;
        if (profileImage) profileData.image = { url: profileImage };
        if (bannerImage) profileData.backgroundImage = { url: bannerImage };
        profileData.plSmartContracts = smartContracts || "{}";
        profileData.plGithubRepos = githubRepos || "[]";
        profileData.plFundingSources = fundingSources || "[]";
        profileData.plTeam = team || "[]";

        // Handling linktree fields
        const linktree = {};
        if (twitter) linktree.twitter = twitter;
        if (github) linktree.github = github;
        if (telegram) linktree.telegram = telegram;
        if (website) linktree.website = website;

        if (Object.keys(linktree)?.length > 0) profileData.linktree = linktree;

        // Adding index section with default star and notify
        const indexData = {
            star: {
                key: {
                    type: "social",
                    path: "potlock.near/widget/Index"
                },
                value: {
                    type: "star"
                }
            },
            notify: {
                key: "potlock.near",
                value: {
                    type: "star",
                    item: {
                        type: "social",
                        path: "potlock.near/widget/Index"
                    }
                }
            }
        };

        // Adding graph section for star and follow
        const graphData = {
            star: {
                "potlock.near": {
                    widget: {
                        Index: ""
                    }
                }
            },
            follow: {
                "potlock.near": ""
            }
        };

        const data = {
            [account]: {
                profile: profileData,
                index: indexData,
                graph: graphData
            }
        };

        const storage = await getAvailableStorage(account);
        const availableBytes = Big(storage?.available_bytes || '0');

        const currentData = {};

        const demo = await estimateDataSize(data, currentData);

        const expectedDataBalance = StorageCostPerByte?.mul(
            estimateDataSize(data, currentData)
        )
            .add(storage ? Big(0) : InitialAccountStorageBalance)
            .add(true ? Big(0) : StorageForPermission)
            .add(ExtraStorageBalance)
            .add(CustomStorage);

        const dataSize = Number((expectedDataBalance?.toFixed() * 100000 / 10 ** 24).toFixed());

        let amount = 0;
        console.log(`Amount:${amount}, available:${availableBytes}, dataSize:${dataSize}, demo:${demo}`);
        if (dataSize > availableBytes) {
            const extraSize = dataSize - availableBytes;
            console.log("Extra Size >> ", extraSize);
            amount = calculateNearAmount(extraSize);
        }

        console.log(`Amount:${amount}, available:${availableBytes}, dataSize:${dataSize}, demo:${demo}`);

        const args1 = { data: data };
        const args2 = { list_id: 1 };
        const args3 = { account_id: account };
        const gas = '30000000000000';

        const deposit = format.parseNearAmount(amount.toString());
        const transaction1 = {
            receiverId: NEAR_SOCIAL_DB_CONTRACT_ID,
            actions: [{
                type: 'FunctionCall',
                params: {
                    methodName: 'set',
                    args: args1,
                    gas: gas,
                    deposit: deposit
                }
            }]
        }

        const deposit2 = format.parseNearAmount("0.05");
        const transaction2 = {
            receiverId: POTLOCK_LISTS_CONTRACT_ID,
            actions: [{
                type: 'FunctionCall',
                params: {
                    methodName: 'register_batch',
                    args: args2,
                    gas: gas,
                    deposit: deposit2
                }
            }]
        }

        const transaction3 = {
            receiverId: ADD_PROJECT_CONTRACT_ID,
            actions: [{
                type: 'FunctionCall',
                params: {
                    methodName: 'add_project',
                    args: args3,
                    gas: gas,
                    deposit: '0'
                }
            }]
        }

        const transactionData = [transaction1, transaction2, transaction3];

        const transactionsData = encodeURIComponent(JSON.stringify(transactionData));
        const callbackUrl = encodeURIComponent(`https://app.potlock.org/?tab=project&projectId=${account}`);
        console.log("Transaction Data: ", transactionData);
        console.log("Callback URL: ", callbackUrl);

        const projectUrl = `https://wallet.bitte.ai/sign-transaction?transactions_data=${transactionsData}&callback_url=${callbackUrl}`;
        console.log("Project Create Url: ", projectUrl);

        return res.status(200).json({ projectUrl: projectUrl });
    } catch (error) {
        console.error("Error >> ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
