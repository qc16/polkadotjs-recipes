import { Keyring } from '@polkadot/api';
import { createType } from '@polkadot/types';
import { ExtrinsicPayload } from '@polkadot/types/interfaces';
import { SignerPayloadJSON } from '@polkadot/types/types';
import { cryptoWaitReady } from '@polkadot/util-crypto';

/**
 * Step 1: Get the `balances.transfer` call encoded to hex.
 */
function getMethod() {
  // Need to generate this from metadata
  return '0x0500ffee5a3c1f409c4ad69cd7a477419bf3fd1bc2e72f3c43ba5c4a9896de1d8bf94200';
}

/**
 * Step 2: Generate the payload to sign.
 */
function getPayload() {
  const payload: SignerPayloadJSON = {
    address: '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE',
    blockHash:
      '0xde8f69eeb5e065e18c6950ff708d7e551f68dc9bf59a07c52367c0280f805ec7',
    blockNumber: '345145',
    era: '0x0703',
    genesisHash:
      '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf',
    method: getMethod(),
    nonce: '0x00001234',
    specVersion: '3',
    tip: '0x123',
    version: 3
  };

  return createType('ExtrinsicPayload', payload, { version: 3 });
}

/**
 * Sign 3: Sign the payload
 */
async function sign(payload: ExtrinsicPayload) {
  // We're creating an Alice account that will sign the payload
  // Wait for the promise to resolve async WASM
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

  return payload.sign(alice);
}

async function main() {
  const payload = getPayload();
  const signedPayload = await sign(payload);

  console.log(signedPayload.signature);
}

main().catch(console.error);
