import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app'
import { CartProvider } from '../src/components/cart/cart-provider';
import { sampleProducts } from './data/sample-products.json';

createRoot(document.getElementById('root') as HTMLBodyElement).render(
  <StrictMode>
    {/* @ts-ignore */}
    <CartProvider products={sampleProducts} getItemPrice={(item) => item.unit_price}> 
      <App />
    </CartProvider>
  </StrictMode>,
)
