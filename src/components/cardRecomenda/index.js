import styled from "styled-components";
import { Titulo } from "../titulo";

const CardContainer = styled.div`
    border: 1px solid #e0e7ff;
    border-radius: 16px;
    padding: 24px;
    background: #f8fafc;
    box-shadow: 0 6px 18px rgba(44, 62, 80, 0.12);
    transition: transform 0.2s, box-shadow 0.2s;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    &:hover {
        transform: translateY(-6px) scale(1.03);
        box-shadow: 0 12px 32px rgba(44, 62, 80, 0.18);
    }
`;

const CardSubtitle = styled.h4`
    margin: 0;
    font-size: 1.1rem;
    color: #64748b;
    font-weight: 500;
`;

const CardDescription = styled.p`
    color: #334155;
    font-size: 1rem;
    margin: 8px 0 0 0;
    text-align: center;
`;

const CardImage = styled.img`
    width: 90px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin: 12px 0;
    box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
`;

const CardButton = styled.button`
    margin-top: 8px;
    padding: 8px 20px;
    background: #6366f1;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #4f46e5;
    }
`;

function CardRecomenda({titulo, subtitulo, descrição, img}) {
    return (
        <CardContainer>
            <Titulo cor="#fde047" tamanho="30px">{titulo}</Titulo>
            <CardSubtitle>{subtitulo}</CardSubtitle>
            <CardDescription>{descrição}</CardDescription>
            <CardImage src={img} />
            <CardButton>Saiba mais</CardButton>
        </CardContainer>
    );
}

export default CardRecomenda;
