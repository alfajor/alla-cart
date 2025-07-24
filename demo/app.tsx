import AllaCart from "../src/components/cart/cart";
import { useCart } from '../src/components/cart/cart-provider';
import { sampleProducts } from "./data/sample-products.json";
import CartItem from './cart-item';
import Checkout from './checkout';
import { BiSolidCart } from 'react-icons/bi'

// demo w/sample user component & products
const App = () => {
  const { addToCart } = useCart();

  return (
    <>
    <AllaCart renderCartItem={(item) => {
        return (
          // custom cart data component
          <CartItem id={item.id} image={item.image} name={item.name} description={item.description} price={item.unit_price} />
        )
      }} checkoutComponent={<Checkout />} cartIcon={<BiSolidCart />} currencyLocale={'en-US'} currencyType={'USD'}
    />
    
    <div>
      <h1>All-a-Cart Demo</h1>

      {sampleProducts.map((product) => {
        return (
            <div>
              <h2>{product.name}</h2>
              <button className="cart-add" onClick={() => addToCart(product.id)}>add to cart</button>
            </div>          
          )
      })}
    </div>
    </>
  )
}

export default App
