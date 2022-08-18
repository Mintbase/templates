import Header from '../containers/Minter/components/Header';
import Main from '../containers/Minter/components/Main';

function Minter(): JSX.Element {
  return (
    <div className="flex flex-1 flex-col min-h-screen text-gray-500">
      <Header />
      <div className="mx-6 sm:mx-24 mt-4 mb-4">
        <Main />
      </div>
    </div>
  );
}

export default Minter;
