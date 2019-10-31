import { createType } from '@polkadot/types';
import { Call, Extrinsic } from '@polkadot/types/interfaces';
import { SignerPayloadJSON } from '@polkadot/types/types';

import { step3 } from './step3';

/**
 * Step 4: Create an extrinsic that will be ready to be broadcasted to the
 * network
 *
 * @param call - The call from the 1st step
 * @param payload - The payload from the 2nd step
 * @param signedPayload - The payload from the 3rd step
 */
export function createExtrinsic(
  call: Call,
  payload: SignerPayloadJSON,
  signedPayload: string
): Extrinsic {
  const extrinsic = createType('Extrinsic', { method: call }, { version: 4 });

  extrinsic.addSignature(payload.address, signedPayload, payload);

  return extrinsic;
}

/**
 * Example using the above function
 */
export async function step4(): Promise<string> {
  // Use the values we generated in previous steps
  const { call, payload, signedPayload } = await step3();

  console.warn('\n=== STEP 4 ===\n');

  const extrinsic = createExtrinsic(call, payload, signedPayload);

  console.log('Final extrinsic:', extrinsic.toHex());

  // Return useful results for the next step
  return extrinsic.toHex();
}
