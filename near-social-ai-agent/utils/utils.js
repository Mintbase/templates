const { providers, utils } = require('near-api-js');
const Big = require('big.js');

const StorageCostPerByte = Big(10).pow(19);

const convertToStringLeaves = (data) => {
    return isObject(data)
        ? Object.entries(data).reduce((obj, [key, value]) => {
            obj[stringify(key)] = convertToStringLeaves(value);
            return obj;
        }, {})
        : stringify(data);
};

const extractKeys = (data, prefix = "") =>
    Object.entries(data)
        .map(([key, value]) =>
            isObject(value)
                ? extractKeys(value, `${prefix}${key}/`)
                : `${prefix}${key}`
        )
        .flat();

const fetchCurrentData = async (data, accountId = 'golden_comet.near', networkId = 'mainnet') => {
    const keys = extractKeys(data);
    const provider = new providers.JsonRpcProvider(`https://rpc.${networkId}.near.org`);

    try {
        const args = { keys };

        const res = await provider.query({
            request_type: 'call_function',
            account_id: accountId,
            method_name: 'get',
            args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
            finality: 'optimistic',
        });

        const result = JSON.parse(Buffer.from(res.result).toString());
        return result;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw new Error(error?.message || "Failed to fetch data from contract.");
    }
};

const removeDuplicates = (data, prevData) => {
    const obj = Object.entries(data).reduce((obj, [key, value]) => {
        const prevValue = isObject(prevData) ? prevData[key] : undefined;
        if (isObject(value)) {
            const newValue = isObject(prevValue)
                ? removeDuplicates(value, prevValue)
                : value;
            if (newValue !== undefined) {
                obj[key] = newValue;
            }
        } else if (value !== prevValue) {
            obj[key] = value;
        }

        return obj;
    }, {});
    return Object.keys(obj).length ? obj : undefined;
};

const stringify = (s) => (isString(s) || s === null ? s : JSON.stringify(s));

const isArray = (a) => Array.isArray(a);

const isObject = (o) => o === Object(o) && !isArray(o) && typeof o !== "function";

const isString = (s) => typeof s === "string";

const EstimatedKeyValueSize = 40 * 3 + 8 + 12;
const EstimatedNodeSize = 40 * 2 + 8 + 10;

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


const bigMax = (a, b) => {
    if (a && b) {
        return a.gt(b) ? a : b;
    }
    return a || b;
};


// Function for calculate the saving data size in bytes
const calculateTextSizeInBytes = (value) => {
    const encoder = new TextEncoder();
    return encoder.encode(value).length;
}

// Function to calculate the NEAR amount needed to cover storage costs
const calculateNearAmount = (totalSizeInBytes, ratePerNear = 100000) => {
    const rate = ratePerNear;
    return Number(totalSizeInBytes / rate);
};

module.exports = { estimateDataSize, StorageCostPerByte, bigMax, removeDuplicates, fetchCurrentData, calculateTextSizeInBytes, calculateNearAmount, convertToStringLeaves };