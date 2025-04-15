import styled from "styled-components";

const Wrapper = styled.button`
    background-color: ${({ type }) =>
        type === "POSITIVE"
            ? "#64c964"
            : type === "NEGATIVE"
            ? "#ce3426"
            : "#dadada"};
    color: ${({ type }) =>
        type === "POSITIVE" || type === "NEGATIVE" ? "white" : "black"};
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    white-space: nowrap;

    &:hover {
        opacity: 0.9;
    }
`;

const Button = ({ text, type, onClick }) => {
    return (
        <Wrapper type={type} onClick={onClick}>
            {text}
        </Wrapper>
    );
};

export default Button;
