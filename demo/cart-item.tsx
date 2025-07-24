import React from "react";
import styled from "styled-components";

interface CartItemProps {
    id: string,
    image?: string, 
    name: string, 
    description?: string,
    price: number,
    quantity?: number
}

// sample cart item component - user provided
const CartItem: React.FC<CartItemProps> = ({id, image, name, description, price}) => {
    return (
        <>  
        {image && 
            <CartItemImage src={image} alt="cart thumbnail image" /> 
        }
        <CartContentInner key={id}>
            <CartInfo>
                <h4>{name}</h4>
                <span>{description}</span>
                <p>${price}</p>
            </CartInfo>
        </CartContentInner>    
        </>
    )
}

const CartItemImage = styled.img`
    width: 100px;
    height: 100px;
`;

const CartContentInner = styled.div`
    position: relative;
    left: 10px;
`;

const CartInfo = styled.div`
    line-height: .7;

    @media screen and (max-width: 600px ) {
        line-height: 1.2;
    }

    h4 {
        font-size: inherit;
    }
`;

export default CartItem;