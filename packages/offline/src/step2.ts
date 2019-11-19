import { createType } from '@polkadot/types';
import { Call } from '@polkadot/types/interfaces';
import { SignerPayloadJSON } from '@polkadot/types/types';

import { step1 } from './step1';

/**
 * Create the extrinsic payload that needs to be signed
 *
 * @param payload - Additional information needed to create the payload
 */
export function createExtrinsicPayload(payload: SignerPayloadJSON): string {
  return createType('ExtrinsicPayload', payload, { version: 4 }).toHex();
}

/**
 * Example using the above function
 */
export function step2(): {
  call: Call;
  payload: SignerPayloadJSON;
  payloadAsHex: string;
} {
  // Use the call that we generated in step 1, convert to hex
  const { call } = step1();
  const callAsHex = call.toHex();

  console.warn('\n=== STEP 2 ===\n');

  // For docs on all the fields, see link below
  // https://github.com/polkadot-js/api/blob/64bc3fbffa2ac5c39433678c99213d50843c7187/packages/types/src/types.ts#L226-L276
  const payload: SignerPayloadJSON = {
    address: '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE',
    // TODO RPC-NEEDED chain_getBlockHash()
    blockHash:
      '0xde8f69eeb5e065e18c6950ff708d7e551f68dc9bf59a07c52367c0280f805ec7',
    // TODO RPC-NEEDED chain_getBlock()
    blockNumber: '345145',
    era: createType('ExtrinsicEra', {
      // TODO RPC-NEEDED chain_getBlock()
      // Same as `blockNumber`, assuming we want the extrinsic to be valid asap
      current: '345145',
      // 50 means 5 minutes. For calculations, see
      // https://github.com/polkadot-js/api/blob/64bc3fbffa2ac5c39433678c99213d50843c7187/packages/api/src/submittable/Submittable.ts#L26-L31
      period: 50
    }).toHex(),
    // TODO RPC-NEEDED chain_getBlockHash(0)
    genesisHash:
      '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf',
    method: callAsHex,
    // TODO RPC-NEEDED
    nonce: '0x00001234',
    // TODO RPC-NEEDED state_getRuntimeVersion()
    specVersion: '1000',
    tip: '0x0',
    version: 4
  };

  // Convert the above payload to hex
  const payloadAsHex = createExtrinsicPayload(payload);

  console.log('Payload to sign (as hex):', payloadAsHex);

  // Return useful results for the next step
  return { call, payload, payloadAsHex };
}
