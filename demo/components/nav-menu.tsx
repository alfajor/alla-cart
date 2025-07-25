import styled from 'styled-components';
import { BiSolidCart } from 'react-icons/bi'
import AllaCart from "../../src/components/cart/cart";
import CartItem from './cart-item';
import Checkout from './checkout';

const NavigationMenu = () => {
    return (
        <>
        <MenuWrapper>
            <PrimaryMenuItems>
                <li><a href="#">shop all</a></li>
                <li><a href="#">pudding club</a></li>
            </PrimaryMenuItems>
            <AllaCart renderCartItem={(item: any) => {
                return (
                    // custom cart data component
                    <CartItem id={item.id} image={item.image} name={item.name} description={item.description} price={item.unit_price} />
                )
            }} quantityButtonPadding={'2.8px 8px'} checkoutComponent={<Checkout />} cartIcon={<BiSolidCart />} currencyLocale={'en-US'} currencyType={'USD'}
            />
        </MenuWrapper>
        </>
    )
}

const MenuWrapper = styled.div`
    display: flex;
    flex-flow: row;
    position: sticky;
    top: 0;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    background-color: #fff;
`
const PrimaryMenuItems = styled.ul`
    display: flex;

    li {
        list-style: none;
        padding-left: 10px;
    }  
`;

export default NavigationMenu;