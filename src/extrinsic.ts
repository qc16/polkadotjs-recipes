import { createType } from '@polkadot/types';

import { getPayload, getSignedPayload } from './payload';

import extrinsics from '@polkadot/api-metadata/extrinsics/static';
import Call from '@polkadot/types/primitive/Generic/Call';

// Important! Since we don't use the `@polkadot/api` object directly, we need
// to inject metadata ourselves. This is done with the `injectMethods`
// function below.
Call.injectMethods(extrinsics);

async function main() {
  const payload = getPayload();
  const extrinsic = createType(
    'Extrinsic',
    { method: payload.method },
    {
      version: payload.version
    }
  );

  const signedPayload = await getSignedPayload(); // see payload.ts for this step

  extrinsic.addSignature(payload.address, signedPayload.signature, payload);

  console.log('isSigned =', extrinsic.isSigned); // true
  console.log('signer =', extrinsic.signer.toString()); // 5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE
  // Extract 'METHOD' from the extrinsic
  // Note: same thing as in decode.ts
  console.log(
    'METHOD:',
    `${extrinsic.method.methodName}(${Object.entries(extrinsic.method.argsDef)
      .map(([key, value], index) => {
        // `value` is a class constructor of the correct type
        return `${key}: ${new (value as any)(extrinsic.method.args[index])}`;
      })
      .join(', ')})`
  );
}

main().catch(console.error);
