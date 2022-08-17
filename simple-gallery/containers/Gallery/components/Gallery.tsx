import { LoadingProduct, Product } from './Product'
import useGalleryController, {
  Product as TProduct
} from '../controllers/useShopController'

export const Gallery = (): JSX.Element => {
  const { products, loading, error } = useGalleryController()

  if (error) {
    return (
      <>
        <p className="text-red-500 text-center mt-8">{error}</p>
        <p className="text-center mt-8">please set on your env file.</p>
      </>
    )
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-12">
      {loading ? (
        <LoadingProduct />
      ) : (
        products.map((product: TProduct, index: number) => (
          <Product key={index} product={product} />
        ))
      )}
    </div>
  )
}
