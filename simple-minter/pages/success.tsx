import { EState, MbButton } from 'mintbase-ui';
import { useRouter } from 'next/router';

import Header from '../components/Header';

function SuccessPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col min-h-screen text-gray-500">
      <Header />
      <div className="mx-8 sm:mx-24 mt-24">
        <div className="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
          <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
            <div className="text-green-500">
              <svg
                className="w-6 sm:w-5 h-6 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm font-medium ml-3">Mint Successful.</div>
          </div>
          <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
            Your Mint was Successful. You can mint another!
          </div>
          <div className="ml-auto sm:right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
            <MbButton
              label="Mint Again"
              state={EState.ACTIVE}
              onClick={() => {
                router.push('/');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
