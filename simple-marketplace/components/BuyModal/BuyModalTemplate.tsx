import React from 'react';

export function BuyModalTemplate({
  closeModal,
  children,
}: {
  closeModal: () => void;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 ml-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="flex flex-row items-center justify-between w-full border-b-2">
                <h3
                  className="text-md leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Simple Sale
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md hover:border-primary text-gray-400 hover:text-primary transition duration-150 ease-in-out"
                  onClick={() => closeModal()}
                  aria-label="Close"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
