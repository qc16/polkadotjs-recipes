import ApiPromise from '@polkadot/api/promise';
import { WsProvider } from '@polkadot/rpc-provider';
import Event from '@polkadot/types/primitive/Generic/Event';

/**
 * Get the events at a block number
 *
 * @param blockHash - The blockHash
 */
async function eventsAtBlock(blockNumber: number): Promise<void> {
  const api = await ApiPromise.create({
    provider: new WsProvider('wss://kusama-rpc.polkadot.io/')
  });

  // Fetch metadata at given blockNumber
  const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
  const metadata = await api.rpc.state.getMetadata(blockHash);

  // Inject the metadata at that blockHash
  Event.injectMetadata(metadata);

  // Get events at blockHash
  const events = await api.query.system.events.at(blockHash);

  console.log(events.toJSON());
}

// Put the number of a block here
eventsAtBlock(431759).catch(error => console.error(error));
