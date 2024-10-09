const { providers, utils } = require('near-api-js');
const { POTLOCK_DONATE_CONTRACT_ID, POTLOCK_LISTS_CONTRACT_ID, POTLOCK_REGISTRY_LIST_ID, networkId } = require('./constants');
const { getSocialProfile } = require('./nearSocialUtils');

// Function to get registrations for a specific list
const getRegistrations = async ({ list_id = POTLOCK_REGISTRY_LIST_ID, limit, offset }) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        const from_index = offset * limit;

        console.log(`offset:${offset},limit:${limit},from_index:${from_index},`)

        const queryArgs = {
            list_id: list_id,
            // status: 'Approved',
            limit,
            from_index
        };

        // Query the `get_registrations_for_list` method on the contract
        const res = await provider.query({
            request_type: 'call_function',
            account_id: POTLOCK_LISTS_CONTRACT_ID,
            method_name: 'get_registrations_for_list',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        // Parse the result from the blockchain
        const registrations = JSON.parse(Buffer.from(res.result).toString());

        if (registrations?.length > 0) {
            for (const project of registrations) {
                const socialProfile = await getSocialProfile(project?.registrant_id);
                if (socialProfile) {
                    project.name = socialProfile.name || '';
                    project.description = socialProfile.description
                        ? socialProfile.description.replace(/\|/g, '')
                        : '';
                }

                delete project.registered_by;
                delete project.registrant_notes;
                delete project.admin_notes;
            }
        }

        return registrations;
    } catch (error) {
        console.error("Error fetching registrations: ", error);
        throw new Error(error?.message || "Failed to fetch registrations.");
    }
};

// Function to get registration for a specific registrant
const getRegistration = async ({ list_id, registrant_id }) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        const queryArgs = {
            registrant_id: registrant_id,
        };

        // Query the `get_registrations_for_registrant` method on the contract
        const res = await provider.query({
            request_type: 'call_function',
            account_id: POTLOCK_LISTS_CONTRACT_ID,
            method_name: 'get_registrations_for_registrant',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        // Parse the result from the blockchain
        const registrations = JSON.parse(Buffer.from(res.result).toString());

        // Find the registration that matches the list_id or use the default POTLOCK_REGISTRY_LIST_ID
        const registration = registrations.find(
            (registration) => registration.list_id === list_id || POTLOCK_REGISTRY_LIST_ID
        );

        if (registration) {
            const socialProfile = await getSocialProfile(registration?.registrant_id);
            if (socialProfile) {
                registration.name = socialProfile?.name || '';
                registration.description = socialProfile?.description || '';
                registration.tagline = socialProfile?.tagline || '';
                registration.category = socialProfile?.category || '';
                registration.tags = socialProfile?.tags || '';
                registration.linktree = socialProfile?.linktree || '';
                registration.plPublicGoodReason = socialProfile?.plPublicGoodReason || '';
                registration.team = socialProfile?.team || '';
            }

            delete registration.registered_by;
        }

        console.log("Registration:", registration);
        return registration;
    } catch (error) {
        console.error("Error fetching registration: ", error);
        throw new Error(error?.message || "Failed to fetch registration.");
    }
};

// Function to get donations for a specific recipient
const getDonationsForRecipient = async ({ recipientId, limit, offset }) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        const from_index = offset * limit;

        const queryArgs = {
            recipient_id: recipientId,
            limit,
            from_index
        };

        const res = await provider.query({
            request_type: 'call_function',
            account_id: POTLOCK_DONATE_CONTRACT_ID,
            method_name: 'get_donations_for_recipient',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        const donations = JSON.parse(Buffer.from(res.result).toString());
        return donations;
    } catch (error) {
        console.error("Error fetching donations for recipient: ", error);
        throw new Error(error?.message || "Failed to fetch donations for recipient.");
    }
};

// Function to get donations for a specific donor
const getDonationsForDonor = async ({ donorId, limit, offset }) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        const from_index = offset * limit;

        const queryArgs = {
            donor_id: donorId,
            limit,
            from_index
        };

        const res = await provider.query({
            request_type: 'call_function',
            account_id: POTLOCK_DONATE_CONTRACT_ID,
            method_name: 'get_donations_for_donor',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        const donations = JSON.parse(Buffer.from(res.result).toString());
        return donations;
    } catch (error) {
        console.error("Error fetching donations for donor: ", error);
        throw new Error(error?.message || "Failed to fetch donations for donor.");
    }
};

const isRegistrationApproved = async (accountId) => {
    const providerUrl = `https://rpc.${networkId}.near.org`;
    const provider = new providers.JsonRpcProvider({ url: providerUrl });

    try {
        // Set up the arguments for the query
        const queryArgs = {
            account_id: accountId
        };

        // Query the `is_registered` method on the contract
        const res = await provider.query({
            request_type: 'call_function',
            account_id: POTLOCK_LISTS_CONTRACT_ID,
            method_name: 'is_registered',
            args_base64: Buffer.from(JSON.stringify(queryArgs)).toString('base64'),
            finality: 'optimistic',
        });

        // Parse the result from the blockchain
        const isApproved = JSON.parse(Buffer.from(res.result).toString());

        console.log("Is registration approved:", isApproved);
        return isApproved;
    } catch (error) {
        console.error("Error fetching registration status: ", error);
        throw new Error(error?.message || "Failed to fetch registration status.");
    }
};


module.exports = { getRegistrations, getRegistration, getDonationsForRecipient, getDonationsForDonor, isRegistrationApproved }
