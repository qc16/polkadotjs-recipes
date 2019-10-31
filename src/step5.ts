import { Metadata } from '@polkadot/types';
import { createType } from '@polkadot/types';
import { Extrinsic } from '@polkadot/types/interfaces';
import Call from '@polkadot/types/primitive/Generic/Call';
import { hexToU8a } from '@polkadot/util';

import { step4 } from './step4';

/**
 * Given an extrinsic hex, try to decode it
 *
 * @param metadataRpc - The RPC response from state_getMetadata
 * @param extrinsicAsHex - A hex representing an extrinsic, that will be
 * decoded
 */
function decode(metadataRpc: string, extrinsicAsHex: string): Extrinsic {
  const metadata = new Metadata(metadataRpc);

  // Important! Since we don't use the `@polkadot/api` object directly, we need
  // to inject metadata ourselves. This is done with the `injectMethods`
  // function below.
  Call.injectMetadata(metadata);

  const extrinsic = createType('Extrinsic', hexToU8a(extrinsicAsHex), {
    isSigned: true
  });

  return extrinsic;
}

export async function step5(): Promise<void> {
  // TODO RPC-NEEDED state_getMetadata()
  // You need to pass in your own rpc result from state_getMetadata
  const metadataRpc = require('@polkadot/types/Metadata/static').default;

  // Fetch the extrinsic we generated in step 4
  const extrinsicAsHex = await step4();

  console.warn('\n=== STEP 5 ===\n');

  // Decode the above hex
  const tx = decode(metadataRpc, extrinsicAsHex);

  // Extract method from the decoded extrinsic
  console.log(
    'Decoded method:',
    `${tx.method.methodName}(${Object.entries(tx.method.argsDef)
      .map(([key, value], index) => {
        // `value` is a class constructor of the correct type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return `${key}: ${new (value as any)(tx.method.args[index])}`;
      })
      .join(', ')})`
  );
  // Extract signer from the decoded extrinsic
  console.log('Decoded Signer:', tx.signer.toString());
}

step5().catch(err => console.error(err));
