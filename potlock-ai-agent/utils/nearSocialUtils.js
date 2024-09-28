const { providers, utils } = require('near-api-js');
const { NEAR_SOCIAL_DB_CONTRACT_ID, networkId} = require('./constants');

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
            account_id: NEAR_SOCIAL_DB_CONTRACT_ID,
            method_name: 'get',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        // Parse the result from the blockchain
        const profileData = JSON.parse(Buffer.from(res.result).toString());

        if (!profileData[accountId]) return;

        return profileData[accountId].profile;

    } catch (error) {
        console.error("Error fetching profile: ", error);
        throw new Error(error?.message || "Failed to fetch profile.");
    }
};

module.exports = { getSocialProfile }