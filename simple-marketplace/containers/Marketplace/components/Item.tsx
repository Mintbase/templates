import { MbButton } from "mintbase-ui"
import { StoreThing } from "../controllers/useMarketplaceController";

const Item = ({ item, showModal }: {item: StoreThing, showModal: (item: StoreThing) => void}) => {
  return (
    <div className="bg-white rounded shadow-lg p-4 relative">
      <img src={item.media} className="w-full h-72 object-cover"></img>
      <div className="">
        <div className="text-xl text-gray-800 font-bold">{item.title}</div>
        <div className="text-sm">{item.storeId}</div>
      </div>
      <div className="flex items-center mt-2 justify-end">
        <MbButton onClick={() => showModal(item)} label={`BUY NOW`} />
      </div>
    </div>
  );
}

const LoadingItem = (): JSX.Element => {
  const products = Array(12).fill(null);

  return (
    <>
      {products.map((_, i) => (
        <div key={i} className="flex items-center justify-center ">
            <div className="w-full h-64 bg-slate-900 animate-pulse"></div>
        </div>
      ))}
    </>
  );
};

export { Item, LoadingItem };