import styled from "styled-components"

const Checkout = () => {
    return (
        <>
            <StyledCheckoutButton onClick={() => alert('checkout')}>Checkout</StyledCheckoutButton>
        </>
    )
}

const StyledCheckoutButton = styled.button`
   background: transparent;
   border: 1px solid #111;
   padding: 10px 8px;
   color: #111;
   width: 20%;
   cursor: pointer;  
   margin-bottom: 15px;
`;

export default Checkout