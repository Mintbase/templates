export const config = {
  runtime: 'experimental-edge',
};

const network = process.env.NETWORK;
const graphQlUrl = network == 'testnet' ? process.env.MINTBASE_GRAPHQL_URL_TESTNET : process.env.MINTBASE_GRAPHQL_URL_MAINNET;
const mintbaseUrl = network == 'testnet' ? process.env.MINTBASE_BASE_URL_TESTNET : process.env.MINTBASE_BASE_URL_MAINNET;

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-License-Key',
      },
    });
  }

  if (request.method === 'POST') {
    try {
      const origin = request.headers.get('origin') || 'example.org';
      const domain = origin.replace(/^(http:\/\/|https:\/\/)/, '');
      const licenseKey = request.headers.get('X-License-Key') || 'xxx';

      if (!await verifyLicense(licenseKey, domain)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 403,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, X-License-Key',
          },
        });
      }

      const reqBody = await request.json();
      const reference = reqBody.reference;
      if (!reference) {
        return new Response(JSON.stringify({ error: 'Missing reference' }), {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-License-Key',
          },
      });
      }
      const url = graphQlUrl;
      const graphQuery = {
        query: `query MyQuery {
                nft_metadata(
                  where: {reference: {_eq: "${reference}"}}
                ) {
                  id
                }
              }`,
        variables: {},
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mb-api-key': process.env.MINTBASE_GRAPHQL_API_KEY,
        },
        body: JSON.stringify(graphQuery),
      });

      const resp = await response.json();
      var metadataId = '';
      if (resp.data.nft_metadata && resp.data.nft_metadata.length > 0) {
        metadataId = resp.data.nft_metadata[0].id;
      } else {
        return new Response(JSON.stringify({ error: 'No metadata for reference' }), {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-License-Key',
          },
        });
      }

      const nftUrl = mintbaseUrl + '/meta/' + metadataId;

      return new Response(JSON.stringify({url: nftUrl}), {
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-License-Key',
         },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Error fetching metadata' }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-License-Key',
        },
      });
    }
  }
}

async function verifyLicense(licenseKey, domain) {
  try {
    const response = await fetch('https://woonft-api.yoshi.tech/api/verify-license', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ licenseKey, domain })
    });

    if (!response.ok) {
      console.error('Failed to verify license:', response.statusText);
      return false;
    }

    return true;

  } catch (error) {
    console.error('Error verifying license:', error);
    return false;
  }
}