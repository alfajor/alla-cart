import { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import CartNavigation from './cart-navigation';
import { useCart, CartProductTypes } from './cart-provider';
import { CgTrash } from "react-icons/cg";

type CartProps = {
  renderCartItem: (item: any) => React.ReactNode,
  cartLabel?: string,
  cartCTAButtonText?: string,
  cartCTAButtonLink?: string,
  cartCTABackgroundColor?: string,
  cartCTATextColor?: string,
  emptyCartText?: string,
  cartIcon?: React.ReactNode,
  trashIcon?: React.ReactNode,
  quantityCountBackgroundColor?: string
  quantityCountColor?: string,
  checkoutComponent?: React.ReactNode, 
  currencyLocale?: string | 'en-US',
  currencyType?: string | 'USD'
}

const AllaCart: React.FC<CartProps> = ({
    renderCartItem, cartLabel, cartCTAButtonText, cartCTAButtonLink, cartCTABackgroundColor, cartCTATextColor, emptyCartText, cartIcon, trashIcon,
    quantityCountBackgroundColor, quantityCountColor, checkoutComponent, currencyLocale, currencyType
  }) => {
  const { cartProducts, incrementCartItem, decrementCartItem, clearCart, removeCartItem, getCartTotal, getCartItems, currencyFormatter } = useCart();

  useEffect(() => {
    // persist cart 
    localStorage.setItem('cart', JSON.stringify(cartProducts))
  }, [cartProducts]);

  const subTotalCurrencyValue = currencyFormatter(currencyLocale ? currencyLocale : 'en-US', currencyType ? currencyType : 'USD', getCartTotal().toFixed(2))

  return (
      <>
        <CartNavigation quantityCounter={cartProducts && cartProducts.reduce((acc: number, item: CartProductTypes) => acc + item.quantity, 0)}
                        cartIcon={cartIcon} quantityCountBackgroundColor={quantityCountBackgroundColor} quantityCountColor={quantityCountColor}>
            <CartHeading>
              <h3>{cartLabel ? cartLabel : 'Cart'}</h3>
              {cartProducts && cartProducts.length > 0 ?
                  <h4>Subtotal: {subTotalCurrencyValue}</h4> 
              : null}
            </CartHeading>
            {/* retrieve stored cart data */}
            {cartProducts && cartProducts.length > 0 ?  
              cartProducts.map((item: CartProductTypes, idx: number) => {
                const product = getCartItems(item.id)
                return (
                  <Fragment key={idx}>
                    <CartWrapper>
                      <CartContentContainer>
                        {/* accept any product data obj - localstorage state contents */}
                        {renderCartItem(product)}
                      </CartContentContainer>
                      <CartOperationsWrapper>
                          <OperationsButton onClick={() => decrementCartItem(item.id)} name="decrement cart qty">-</OperationsButton>
                          <CartQuantityWrapper>
                              <QuantityCount>{item.quantity}</QuantityCount>
                          </CartQuantityWrapper>
                          <OperationsButton onClick={() => incrementCartItem(item.id)} name="increment cart qty">+</OperationsButton>

                          <TrashIcon onClick={() => removeCartItem(item.id)} title={'remove cart item'}>{trashIcon ? trashIcon : <CgTrash />}</TrashIcon>
                      </CartOperationsWrapper>  
                    </CartWrapper>
                  </Fragment>
              )
            }) : <CartActions>
                    <h4>{emptyCartText ? emptyCartText : 'Your cart is empty'}</h4> 
                    <a href={cartCTAButtonLink ? cartCTAButtonLink : ''}>
                      <CartCTAButton backgroundColor={cartCTABackgroundColor} textColor={cartCTATextColor}>{cartCTAButtonText ? cartCTAButtonText : 'Continue shopping'}</CartCTAButton>
                    </a>                  
                 </CartActions>
            }
            <div>
              {cartProducts && cartProducts.length > 0 ? 
                  <CartButtonsWrapper>
                    {checkoutComponent} 
                    <CartCTAButton backgroundColor={cartCTABackgroundColor} textColor={cartCTATextColor} onClick={() => clearCart()}>{'Clear cart'}</CartCTAButton>
                  </CartButtonsWrapper>
              : null}
            </div>
        </CartNavigation>
    </>
  )
}         

const CartHeading = styled.div`
  display: flex;
  flex-flow: column;
  line-height: 0.4;
  border-bottom: 1px solid #ddd;
  
  h3 {
    color: #111;
  }

  h4 {
    font-size: inherit;
  }
`;

const CartWrapper = styled.div`
    display: flex;
    flex-flow: column;
    border-bottom: 1px solid #ddd;
`;

const CartContentContainer = styled.div`
    display: flex;
    flex-flow: row;
    margin-top: 10px;
    padding-bottom: 10px;
`;

const CartActions = styled.div`
  h4 {
    font-size: inherit;
  }
`;

const CartCTAButton = styled.button<{backgroundColor?: string, textColor?: string}>`
  background: ${(props) => props.backgroundColor ? props.backgroundColor : 'transparent'};
  border: 1px solid ${(props) => props.backgroundColor ? props.backgroundColor : '#111'};
  padding: 10px 8px;
  color: ${(props) => props.textColor ? props.textColor : '#111'};
  width: 20%;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    width: 40%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const CartButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 900px) {
    button {
      width: 50%;
    }
  }
  @media screen and (max-width: 600px) {
    button {
      width: 100%;
    }
  }
`;

const CartOperationsWrapper = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const CartQuantityWrapper = styled.div`
    text-align: center;
`;

const QuantityCount = styled.span`
    display: block;
    padding: 6px 8px;
    border-top: 1px solid #111;
    border-bottom: 1px solid #111;
    background-color: transparent;
    color: #111;    
    font-size: 15px;
`;

const OperationsButton = styled.button`
    background-color: transparent;
    border: 1px solid #111;
    border-radius: 2px;
    padding: 6px 10px;
    cursor: pointer;
`;

const TrashIcon = styled.div` 
    position: relative;
    left: 100px;
    top: 3px;
    cursor: pointer;

    svg {
        width: 1.2em;
        height: 1.2em
    }
`;

export default AllaCart;