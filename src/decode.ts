import { createType, createTypeUnsafe } from '@polkadot/types';
import { hexToU8a } from '@polkadot/util';

import extrinsics from '@polkadot/api-metadata/extrinsics/static';
import Call from '@polkadot/types/primitive/Generic/Call';

// Important! Since we don't use the `@polkadot/api` object directly, we need
// to inject metadata ourselves. This is done with the `injectMethods`
// function below.
Call.injectMethods(extrinsics);

function decodeExtrinsic() {
  const raw =
    '0x' +
    // The 2 lines below are the signer address
    'ff' +
    'd172a74cda4c865912c32ba0a80a57ae69abae410e5ccb59dee84e2f4432db4f' +
    // The 2 lines below are the signature of the ExtrinsicPayload
    '21de8ff3cae3ee72ced565ed5f79fd153dc84a3be9166b7904eecde8045ba59a' +
    'd2f998cc970e59157f168ec762eea061f4930b5288f57a45a1c1911863860208' +
    // The line below is era,nonce,tip
    '000408' +
    // The 4 lines below are the method call (here balances.transfer)
    // - callIndex of balances.transfer
    '0500' +
    // - 1st arg = dest
    'ff' +
    'd7568e5f0a7eda67a82691ff379ac4bba4f9c9b859fe779b5d46363b61ad2db9' +
    // - 2nd arg = amount
    'e56c';
  const tx = createType('ExtrinsicV3', hexToU8a(raw), {
    isSigned: true
  });

  // Extract 'FROM' from the signature's signer
  console.log('FROM:', tx.signature.signer.toString());

  // Extract 'METHOD' from the metadata
  console.log(
    'METHOD:',
    `${tx.method.methodName}(${Object.entries(tx.method.argsDef)
      .map(([key, value], index) => {
        // `value` is a class constructor of the correct type
        return `${key}: ${new (value as any)(tx.method.args[index])}`;
      })
      .join(', ')})`
  );
}

async function main() {
  decodeExtrinsic();
}

main().catch(console.error);
