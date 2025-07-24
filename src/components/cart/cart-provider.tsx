import { useState, useContext, createContext } from 'react';
import Cookies from 'universal-cookie';

export interface CartProductTypes {
    id: string,
    quantity: number
};

export interface CartOperations {
    addToCart?: (id: string) => void
    decrementCartItem?: (id: string) => void,
    incrementCartItem?: (id: string) => void,
    removeCartItem?: (id: string) => void,
    clearCart?: () => void,
    getCartTotal?: () => number,
}

interface CartProviderProps {
  children: React.ReactNode;
  products: CartProductTypes[];
  getItemPrice: (item: any) => number;
}

const CartContext = createContext<CartProductTypes[] | any>([]);
const cookies = new Cookies();

export const CartProvider = ({children, products, getItemPrice} : CartProviderProps) => {
    const [cartProducts, setCartProducts] = useState<CartProductTypes[]>(() => {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : []
    });

    const getCartItems = (id: string) => {
        // user supplied product data
        return products.find((product: any) => product.id === id);
    }
    // add to cart
    const addToCart = (id: string) => {
      const itemInCatalog = getCartItems(id);

      setCartProducts((currentCart: any) => {
        const itemExists = currentCart.find((product: any) => product.id === id);
      
        if(itemExists) {
          return currentCart.map((item: { id: string; quantity: number; })  => 
            item.id === id 
              ? { ...item, quantity: item.quantity + 1} 
              : item
          );
        } else {
            return [...cartProducts, {...itemInCatalog, quantity: 1}]
        }
      });   
    } 
    // decrement cart
    const decrementCartItem = (id: string) => {
      setCartProducts((currentCart) => {
        return currentCart.map((item) => {
          if(item.id === id) {
            if(item.quantity > 1) {
              return {...item, quantity: item.quantity - 1}
            }
            return null
          }
          return item
        }).filter(item => item !== null) 
      });
    }
    // increment cart
    const incrementCartItem = (id: string) => {
      setCartProducts((currentCart) => {
          return currentCart.map((item) => item.id === id ? 
            {...item, quantity: item.quantity + 1} : item).filter(item => item.quantity > 0)
      });
    }
    // remove item
    const removeCartItem = (id: string) => {
      const updatedCart = cartProducts.flatMap(product => product).filter(product => product.id !== id)
      setCartProducts(updatedCart)
    }
    // empty cart
    const clearCart = () => {
      setCartProducts([])
      // remove cookie when cart empty
      cookies.remove('pid', { 
        path: '/', 
        secure: false, 
        domain: window.location.hostname,
        sameSite: 'strict'
      })
    }
    // currency formatter
    const currencyFormatter = (locale: string, currency: string, value: number) => {
      return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value)
    }
    // total cart 
    const getCartTotal = () => {
      return cartProducts.reduce((total, item) => {
        const unitPrice = getItemPrice(item) || 0; // user defined price handling

        return total + (unitPrice) * item.quantity;
      }, 0)
    }

    return (
        <>
        <CartContext.Provider value={{ cartProducts, addToCart, decrementCartItem, incrementCartItem, removeCartItem, clearCart, getCartTotal, getCartItems, currencyFormatter }}>
            {children}
        </CartContext.Provider>
        </>
    )
}

export const useCart = () => useContext(CartContext);