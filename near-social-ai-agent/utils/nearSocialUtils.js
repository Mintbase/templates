const { providers, utils } = require('near-api-js');
const { SOCIAL_DB_CONTRACT_ID, networkId } = require('./constant');

// Function to get profile details of the given accountId
const getSocialProfile = async (accountId) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        // Set the query arguments for fetching the social profile
        const queryArgs = {
            keys: [`${accountId}/profile/**`],
        };

        // Query the `get` method on the social DB contract
        const res = await provider.query({
            request_type: 'call_function',
            account_id: SOCIAL_DB_CONTRACT_ID,
            method_name: 'get',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        // Parse the result from the blockchain
        const profileData = JSON.parse(Buffer.from(res.result).toString());

        if (!profileData[accountId]) return;

        delete profileData[accountId].profile.image;
        delete profileData[accountId].profile.backgroundImage;

        console.log("Profile >> ", profileData[accountId].profile);
        return profileData[accountId].profile;

    } catch (error) {
        console.error("Error fetching profile: ", error);
        throw new Error(error?.message || "Failed to fetch profile.");
    }
};

// Get the list of following accounts
const getFollowing = async (accountId) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        const queryArgs = {
            keys: [`${accountId}/graph/follow/*`],
        };

        const res = await provider.query({
            request_type: 'call_function',
            account_id: SOCIAL_DB_CONTRACT_ID,
            method_name: 'get',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        const response = JSON.parse(Buffer.from(res.result).toString());

        if (!response || !response[accountId]?.graph?.follow) {
            return { accounts: [], total: 0 };
        }

        const followingAccounts = Object.keys(response[accountId].graph.follow);
        return { accounts: followingAccounts, total: followingAccounts.length };
    } catch (e) {
        console.error('getFollowing:', e);
        return { accounts: [], total: 0 };
    }
};

const getFollowers = async ({ accountId }) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        const queryArgs = {
            keys: [`*/graph/follow/${accountId}`],
        };

        const res = await provider.query({
            request_type: 'call_function',
            account_id: SOCIAL_DB_CONTRACT_ID,
            method_name: 'get',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        const response = JSON.parse(Buffer.from(res.result).toString());

        if (!response) {
            return { accounts: [], total: 0 };
        }

        const followerAccounts = Object.keys(response).filter((key) => {
            return response[key]?.graph?.follow?.hasOwnProperty(accountId);
        });

        return { accounts: followerAccounts, total: followerAccounts.length };
    } catch (e) {
        console.error('getFollowers:', e);
        return { accounts: [], total: 0 };
    }
};

// Function to get available storage for a specific account
const getAvailableStorage = async (accountId, networkId = 'mainnet') => {
    console.log("Account Id : ", accountId)
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        // Query the 'storage_balance_of' method on the NEAR Social DB contract
        const args = { account_id: accountId };
        const res = await provider.query({
            request_type: 'call_function',
            account_id: SOCIAL_DB_CONTRACT_ID,
            method_name: 'get_account_storage',
            args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
            finality: 'optimistic',
        });

        // Parse and calculate the available storage
        const storage = JSON.parse(Buffer.from(res.result).toString());
        // // const availableStorage = BigInt(storage?.available) / BigInt(10 ** 19);
        // const ratePerNear = 100000;
        // const availableStorage = BigInt(storage?.available) * BigInt(ratePerNear) / BigInt(10 ** 24);

        return storage; // Return the available storage
    } catch (error) {
        console.error("Error fetching storage balance: ", error);
        throw new Error(error?.message || "Failed to fetch NEAR storage balance.");
    }
};

module.exports = { getSocialProfile, getFollowing, getFollowers, getAvailableStorage }