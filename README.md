# AllaCart

AllaCart is a simple, customizable React shopping cart feature. Supply your own product data and the cart does the rest!

# Install

`npm install alla-cart`

# Usage

AllaCart is easy to use! Import `CartProvider` and wrap your root component in the `CartProvider` context:

```javascript
import { CartProvider } from "alla-cart";
// main.tsx or root component
<CartProvider
  products={sampleProducts}
  getItemPrice={(item) => item.unit_price}
>
  <App />
</CartProvider>;
```

The context provider takes two props: `products` and `getItemPrice`.

- The first is a data obj of products you'd like to use in the cart. The only data requirement for this is an `id` property for cart functionality.

- The second is a callback to pass in a custom price value from the product dataset. This allows the cart to disregard specific price identifiers when computing cart totals. This can be any price identifier used in your product data obj: `price, unit_price, amount`, etc.

Finally, import the `AllaCart` component and `useCart` hook into your app.

```javascript
import { AllaCart, useCart } from 'alla-cart';

const App = () => {
  const { addToCart } = useCart();

  return (
    <>
    <AllaCart renderCartItem={(item) => {
        return (
          // custom cart data component
          <CartItem id={item.id} image={item.image} name={item.name} description={item.description} price={item.unit_price} />
        )
      }} checkoutComponent={<Checkout />} cartIcon={<BiSolidCart />} currencyLocale={'es-ES'} currencyType={'EUR'}
    />
  )
  ...

  <div>
    {sampleProducts.map((product) => {
        // sample product catalog
        return (
            <div>
              <h2>{product.name}</h2>
              <button className="cart-add" onClick={() => addToCart(product.id)}>add to cart</button>
            </div>
          )
    })}
  </div>
}
```

## Component props

The `AllaCart` component accepts several props for additional customization.

```javascript
type CartProps = {
  renderCartItem: (item: any) => React.ReactNode, // product cart data callback - required
  cartLabel?: string, // cart title - optional
  cartCTAButtonText?: string, // cta message - optional
  cartCTAButtonLink?: string, // cta link - optional
  cartCTABackgroundColor?: string, // cta background color - optional
  cartCTAColor?: string, // cta color - optional
  emptyCartText?: string, // custom empty cart message - optional
  cartIcon?: React.ReactNode, // custom cart icon - optional
  trashIcon?: React.ReactNode, // custom trash icon - optional
  quantityCountBackgroundColor?: string // qty counter background color - optional
  quantityCountColor?: string, // qty counter color - optional
  checkoutComponent?: React.ReactNode, // custom checkout component - optional
  currencyLocale?: string | 'en-US', // currency locale - optional
  currencyType?: string | 'USD' // currency - optional
}
```

The only required prop is `renderCartItem`, which accepts a callback to a data obj that contains your cart's products.

The easiest way to use this is to simply pass in a custom component containing your product data. The cart will store and retrieve this data from localstorage.

The `checkoutComponent` prop supports a custom checkout handler.

Additional props support custom text, CTA buttons, and custom icons.

Finally, there is locale / currency support for cart totals. Display your cart totals in multiple currencies for multiple locales. Simply declare the `currencyLocale` and `currencyType` props to display cart totals in your desired currency. These default to `en-US` and `USD`.

- Note: The user is responsible for locale and currency support in the product data being supplied to the cart.

## Hooks

The `useCart` hook allows access to the following cart operations:

```javascript
cartProducts, addToCart, decrementCartItem, incrementCartItem, removeCartItem, clearCart, getCartTotal, getCartItems currencyFormatter
```

The `addToCart` hook is used to tell the cart which products will be stored and included in the cart. It accepts one argument of product `id`.

```javascript
<button className="cart-add" onClick={() => addToCart(product.id)}>
  add to cart
</button>
```

The class `cart-add` should be added to this button to ensure the cart flyout triggers anytime the 'add to cart' event is triggered.
