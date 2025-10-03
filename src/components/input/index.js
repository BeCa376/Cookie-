import styled from "styled-components";

const Input = styled.input`
    background: rgba(255, 255, 255, 0.05);
    border: 1.5px solid #fff;
    padding: 8px 16px;
    border-radius: 24px;
    width: 300px;
    max-width: 100%;
    color: #fff;
    font-size: 1rem;
    margin-bottom: 12px;
    transition: border-color 0.2s, box-shadow 0.2s;

    &::placeholder {
        color: #fff;
        font-size: 1rem;
        opacity: 0.6;
    }

    &:focus {
        outline: none;
        border-color: #00bfff;
        box-shadow: 0 0 0 2px rgba(0,191,255,0.2);
    }
`
export default Input;
