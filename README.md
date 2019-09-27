# offline

Generating & signing offline transactions with PolkadotJS api

Useful links:

- Generating the `balances.transfer` call:
  - One possibility: using PolkadotJS **statically** generated metadata: https://github.com/polkadot-js/api/blob/8b0ef159c05bcb5d9b664546d0e7289e79b5c9d5/packages/types/src/primitive/Extrinsic/v3/Extrinsic.spec.ts#L28
- Offline signing:
  - FAQ: https://polkadot.js.org/api/start/FAQ.html#i-would-like-to-sign-transactions-offline
  - Offline signer unit test: https://github.com/polkadot-js/api/blob/master/packages/api/test/util/SingleAccountSigner.ts
