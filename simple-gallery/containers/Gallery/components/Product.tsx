import { Product } from '../controllers/useShopController'

const Product = ({ product, key }: { product: Product; key: number }) => {
  return (
    <div key={key} className="flex items-center justify-center">
      <img src={product.coverImageUrl} className="w-64 h-64 object-cover"></img>
    </div>
  )
}

const LoadingProduct = (): JSX.Element => {
  const products = Array(12).fill(null)

  return (
    <>
      {products.map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          <div className="w-64 h-64 bg-slate-900 animate-pulse"></div>
        </div>
      ))}
    </>
  )
}

export { Product, LoadingProduct }
