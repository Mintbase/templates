const { providers } = require('near-api-js');
const Big = require('big.js');
const { NEAR_SOCIAL_DB_CONTRACT_ID, networkId } = require('./constants');

const StorageCostPerByte = Big(10).pow(19);

// Function to get available storage for a specific account
const getAvailableStorage = async (accountId) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        // Query the 'storage_balance_of' method on the NEAR Social DB contract
        const args = { account_id: accountId };
        const res = await provider.query({
            request_type: 'call_function',
            account_id: NEAR_SOCIAL_DB_CONTRACT_ID,
            method_name: 'get_account_storage',
            args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
            finality: 'optimistic',
        });

        // Parse and calculate the available storage
        const storage = JSON.parse(Buffer.from(res.result).toString());

        return storage;
    } catch (error) {
        console.error("Error fetching storage balance: ", error);
        throw new Error(error?.message || "Failed to fetch NEAR storage balance.");
    }
};

// Function to calculate the NEAR amount needed to cover storage costs
const calculateNearAmount = (totalSizeInBytes, ratePerNear = 100000) => {
    const rate = ratePerNear;
    return Number(totalSizeInBytes / rate);
};

const stringify = (s) => (isString(s) || s === null ? s : JSON.stringify(s));

const isArray = (a) => Array.isArray(a);

const isObject = (o) => o === Object(o) && !isArray(o) && typeof o !== "function";

const isString = (s) => typeof s === "string";

const EstimatedKeyValueSize = 160 * 3 + 8 + 12;
const EstimatedNodeSize = 160 * 2 + 8 + 12;

// Function to calculate the size of JSON data in bytes
const estimateDataSize = (data, prevData) =>
    isObject(data)
        ? Object.entries(data).reduce(
            (s, [key, value]) => {
                const prevValue = isObject(prevData) ? prevData[key] : undefined;
                return (
                    s +
                    (prevValue !== undefined
                        ? estimateDataSize(value, prevValue)
                        : key.length * 2 +
                        estimateDataSize(value, undefined) +
                        EstimatedKeyValueSize)
                );
            },
            isObject(prevData) ? 0 : EstimatedNodeSize
        )
        : (data?.length || 8) - (isString(prevData) ? prevData.length : 0);

module.exports = { getAvailableStorage, calculateNearAmount, estimateDataSize, StorageCostPerByte };