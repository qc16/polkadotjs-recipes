import Metadata from '@polkadot/metadata';
import { Call } from '@polkadot/types/interfaces';

/**
 * Construct a `balances.transfer` call
 *
 * @param metadataRpc - The RPC response from state_getMetadata
 * @param to - The recipient
 * @param amount - The amount to send
 */
export function createCall(
  metadataRpc: string,
  to: string,
  amount: number
): Call {
  const metadata = new Metadata(metadataRpc);

  return metadata.tx.balances.transfer(to, amount);
}

/**
 * Example using the above function
 */
export function step1(): { call: Call } {
  console.warn('\n=== STEP 1 ===\n');

  // TODO RPC-NEEDED state_getMetadata()
  // You need to pass in your own rpc result from state_getMetadata
  const metadataRpc = require('@polkadot/types/Metadata/static').default;

  const call = createCall(
    metadataRpc,
    'HTrpbES27bqMvCioQGHpmJbBzwji6V5DeuXUfB1gsZ5Vkh1',
    12
  );

  console.log('Call:', call.toJSON());

  // Return useful results for the next step
  return { call };
}
