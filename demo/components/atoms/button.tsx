import styled from "styled-components";

type ButtonTypes = {
    buttonText: string, 
    buttonCallback: () => void,
    buttonClassName?: string
}

const Button: React.FC<ButtonTypes> = ({buttonText, buttonCallback, buttonClassName}) => {
    return (
        <>
            <StyledButton className={buttonClassName} onClick={buttonCallback}>
                {buttonText}
            </StyledButton>
        </>
    )
}

const StyledButton = styled.button`
  padding: 8px 10px;
  background-color: transparent;
  border: 1px solid #ddd;  
  color: limegreen;
  cursor: pointer;
  width: 100%;
`;


export default Button;