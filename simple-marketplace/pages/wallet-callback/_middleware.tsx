import { NextRequest, NextResponse } from 'next/server';

const successTransactionParams = ['transactionHashes'];
const errorTransactionParams = ['errorCode', 'errorMessage'];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let success = false;
  let failed = false;

  console.log('wallet-callback', url.toString());

  url.searchParams.forEach((_, key) => {
    if (successTransactionParams.includes(key)) {
      success = true;
    }
    if (errorTransactionParams.includes(key)) {
      failed = true;
    }
  });

  if (success) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = '/success';

    return NextResponse.redirect(redirectUrl);
  }

  if (failed) {
    const redirectUrl = url.clone();
    redirectUrl.pathname = '/fail';

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.rewrite(url);
}
