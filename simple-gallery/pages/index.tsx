import { MbButton } from "mintbase-ui";
import type { NextPage } from "next";
import {
  Product,
  LoadingProduct,
} from "../containers/Gallery/components/Product";
import useGalleryController, {
  Product as TProduct,
} from "../containers/Gallery/controllers/useShopController";

import { useWallet } from "../services/providers/NearWalletProvider";

const Store: NextPage = () => {
  const { isConnected, details, signIn, signOut } = useWallet();
  const { products, loading } = useGalleryController();

  return (
    <div className="mx-24">
      <div className="flex items-center justify-center mt-12">
        {isConnected && (
          <MbButton onClick={signOut} label={`Sign Out ${details.accountId}`} />
        )}
        {!isConnected && (
          <MbButton onClick={signIn} label="Connect NEAR Wallet" />
        )}
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-12">
        {loading ? (
          <LoadingProduct />
        ) : (
          products.map((product: TProduct, index: number) => (
            <Product key={index} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Store;
