import { mbjs, RPC_ENDPOINTS, NEAR_RPC_ENDPOINTS } from '@mintbase-js/sdk';
import fetch from 'cross-fetch';

mbjs.config({ network: "testnet" });

export type RPC_OPTIONS  = 'lava' | 'near' | 'beta'


export const requestFromNearRpc = async (
  body: Record<string, unknown>,
  network?: string,
  rpc?:  RPC_OPTIONS,
): Promise<{ result: Record<string, unknown>, error: unknown } | undefined> => {

  //@ts-ignore
  const fetchUrl =  mbjs.keys.nearRpcUrl || RPC_ENDPOINTS[mbjs.keys.rpc][mbjs.keys.network]  || NEAR_RPC_ENDPOINTS[mbjs.keys.network];
  //@ts-ignore
  const rpcAddress = network && rpc ? RPC_ENDPOINTS[rpc][network] : fetchUrl;
  //console.log(rpcAddress)

  const res = await fetch(rpcAddress, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' },
  });

  return res.json();
};

export const callViewMethod = async <T>({
  contractId,
  method,
  args,
  network,
  rpc,
}: {
  contractId: string;
  method: string;
  args?: Record<string, any>;
  network?: string;
  rpc?: RPC_OPTIONS;
}): Promise<T> => {
  const args_base64 = args
    ? Buffer.from(JSON.stringify(args), 'utf-8').toString('base64')
    : '';

  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'query',
    params: {
      request_type: 'call_function',
      finality: 'final',
      account_id: contractId,
      method_name: method,
      args_base64,
    },
  }, network, rpc);

  //console.log(res)
  if (res?.error) {
    throw res.error;
  }
  // @ts-ignore
  const parsed = JSON.parse(Buffer.from(res?.result?.result).toString());
  return parsed as T;
};