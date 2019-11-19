# PolkadotJS Offline

Generating & signing offline transactions with PolkadotJS api without PolkadotJS's `api` object.

## Get started

```bash
git clone https://github.com/amaurymartiny/polkadotjs-recipes
yarn install
cd packages/offline
yarn start
```

## How it works

The offline generation & signing of an extrinsic is done in 5 steps.

### Step 1 - Given the metadata, generate the `Call`

We're only trying to generate the `balances.transfer` call. The inputs are the result from RPC `state_getMetadata`, a recipient and an amount.

### Step 2 - Generate the payload to sign

The payload to sign is the [`SignerPayloadJSON`](https://github.com/polkadot-js/api/blob/64bc3fbffa2ac5c39433678c99213d50843c7187/packages/types/src/types.ts#L226-L276) object. Notice the `method` field, it should be the result of Step 1.

### Step 3 - Sign the payload

In this repo, we're signing the payload from Step 2 using Alice's key.

### Step 4 - Create an extrinsic

Given the `Call` from Step 1, the payload from Step 2 and the signed payload from Step 3, we can generate an `Extrinsic`, which can be inputted into `author_submitExtrinsic`.

### Step 5 (optional) - Decode the extrinsic

Step 4 returns a hex string, in this last step, we decode this hex string and retrieve the same values we found in the payload and in the `Call`.

## How to pass in correct values?

I added some `TODO RPC-NEEDED` tags throughout the codebase. This means that the developer should input the values given by RPC calls to the Polkadot network.

Example:

```typescript
  const payload: SignerPayloadJSON = {
    // ...snip...
    // TODO RPC-NEEDED chain_getBlockHash(0)
    genesisHash:
      '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf',
    // ...snip...
```

This means that the `genesisHash` value should be replaced by the actual value or the genesis hash, which can be retrived via `chain.getBlockHash(0)`.

Since this repo is meant to be run completely offline, how you retrieve these RPC results and how to pass them to these 5 steps above is completely orthogonal to this repo.

## Useful links

- Offline signing:
  - FAQ: https://polkadot.js.org/api/start/FAQ.html#i-would-like-to-sign-transactions-offline
  - Offline signer unit test: https://github.com/polkadot-js/api/blob/master/packages/api/test/util/SingleAccountSigner.ts
