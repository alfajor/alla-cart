import styled, { css } from "styled-components";
import cartVisibilityHandler from "../../utils/cart-visibility-handler";
import { BiCart } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

interface CartNavigationTypes {
    children: React.ReactNode,
    cartIcon: React.ReactNode,
    quantityCounter: number,
    quantityCountBackgroundColor?: string,
    quantityCountColor?: string
}

const CartNavigation: React.FC<CartNavigationTypes> = ({children, cartIcon, quantityCounter, quantityCountBackgroundColor, quantityCountColor}) => {
    const { componentRef, isVisible, setIsVisible } = cartVisibilityHandler(false);

    const cartRevealHandler = () => {
        setIsVisible(!isVisible); 
    }

    return (
        <>
         <CartNavWrapper ref={componentRef}>
            <CartMenu>
                <CartIcon onClick={cartRevealHandler} aria-label="cart" title="cart">
                    {cartIcon ? cartIcon : <BiCart />}
                </CartIcon>
                <CartQuantityCount countBackgroundColor={quantityCountBackgroundColor} countColor={quantityCountColor}>
                    {quantityCounter > 0 ? quantityCounter : 0}
                </CartQuantityCount>
            </CartMenu>

            <CartFlyout isopen={isVisible}>
                <CartCloseButton name="close cart" onClick={cartRevealHandler}><MdOutlineClose /></CartCloseButton>
                    {children}
            </CartFlyout>
         </CartNavWrapper>
        </>
    )
}

const CartNavWrapper = styled.div`
    display: flex;
    flex-flow: column;
    position: sticky;
    top: 0;
    z-index: 77;
`;

const CartMenu = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: end;
    height: 75px;
    width: 100%;
    background-color: transparent;
`;

const CartQuantityCount = styled.span<{countBackgroundColor?: string, countColor?: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    right: 28px;
    bottom: 18px;
    width: 25px;
    height: 25px;
    color: ${(props) => props.countColor ? props.countColor : '#fff'};
    background-color: ${(props) => props.countBackgroundColor ? props.countBackgroundColor : 'limegreen'}; 
    border-radius: 50px;
    text-align: center;
    font-size: 16px;
`;

const menuOpen = css`
    transform: translateX(65%);  

    @media screen and (min-width: 2000px ) {
        transform: translateX(70%);
    }

    @media screen and (max-width: 1100px ) {
        transform: translateX(60%);
    }

    @media screen and (max-width: 900px ) {
        transform: translateX(40%);
    }
    @media screen and (max-width: 600px ) {
        transform: translateX(5%);
    }
`;
const menuClosed = css`
    transform: translateX(120%);
`;

const CartFlyout = styled.div<{isopen: boolean}>`
    position: absolute;
    right: 0;
    background-color: #fff;
    width: 100%;
    padding: 0px 10px;
    border-left: 1px solid rgba(149, 157, 165, 0.2);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    ${(props) => props.isopen ? menuOpen : menuClosed};
    transition: all .6s ease;
    z-index: 2;
    height: 100vh;
    overflow-y: scroll;
`;

const CartIcon = styled.div`
    position: relative;
    right: 40px;
    width: 25px;
    cursor: pointer;

    svg {
        width: 2em;
        height: 2em;
    }
`;

const CartCloseButton = styled.button`
  position: relative;
  left: 30%;
  top: 35px;
  background-color: transparent;
  border: none;  
  display: flex;
  justify-content: end;
  font-size: 25px;
  cursor: pointer;

  @media screen and (max-width: 900px ) {
    left: 50%;
  }

  @media screen and (max-width: 600px ) {
    left: 80%;
  }
`;

export default CartNavigation;