import styled from "styled-components";

export const Titulo = styled.h2`
    color:  ${props => props.cor || '#000'};
    display: flex;
    text-align: ${props => props.alinhamento || 'center'};
    justify-content: center;
    font-size: ${props => props.tamanho || '2.6rem'};
    margin-bottom: 16px;
    font-weight: 900;
    letter-spacing: 2px;
    width: 100%;
    text-align: left;
    text-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
`;