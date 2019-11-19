# PolkadotJS Query Old State

Query the an old state in history

## Get started

```bash
git clone https://github.com/amaurymartiny/polkadotjs-recipes
yarn install
cd packages/query-old
yarn start
```

## How it works

The node at `wss://kusama-rpc.polkadot.io/` is an archive node, which means that it holds the entire history of the chain's state.

The code just fetches the metadata at any block number, fetches the events, and decodes the events with said metadata.
