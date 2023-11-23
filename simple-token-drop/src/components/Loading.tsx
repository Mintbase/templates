export const Loading = () => {
    return (
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center space-y-4">
            <Spinner />
            <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-black text-center">
                Blockchain processing...
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 text-center">
                {" "}
                We are processing your transaction...
            </p>
        </div>
    );
};

export const InitialLoading = () => {
    return (
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center space-y-4">
            <Spinner />
            <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-black text-center">
                Loading token drop...
            </h1>

        </div>
    );
};


export const Spinner = () => {
    return (
        <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}
