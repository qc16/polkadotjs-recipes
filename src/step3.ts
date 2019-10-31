import { Keyring } from '@polkadot/api';
import { createType } from '@polkadot/types';
import { Call } from '@polkadot/types/interfaces';
import { SignerPayloadJSON } from '@polkadot/types/types';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import { step2 } from './step2';

/**
 * Step 3: Sign the payload
 *
 * @param payloadAsHex - The signing payload, either as SignerPayloadJSON or as
 * hex
 */
export async function sign(
  payload: string | SignerPayloadJSON
): Promise<string> {
  // We're creating an Alice account that will sign the payload
  // Wait for the promise to resolve async WASM
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

  const { signature } = createType('ExtrinsicPayload', payload, {
    version: 4
  }).sign(alice);

  return signature;
}

/**
 * Example using the above function
 */
export async function step3(): Promise<{
  call: Call;
  payload: SignerPayloadJSON;
  payloadAsHex: string;
  signedPayload: string;
}> {
  // Use the payload that we generated in step 2
  const { payloadAsHex, ...rest } = step2();

  console.warn('\n=== STEP 3 ===\n');

  const signedPayload = await sign(payloadAsHex);

  console.log('Signed payload:', signedPayload);

  // Return useful results for the next step
  return { ...rest, payloadAsHex, signedPayload };
}
