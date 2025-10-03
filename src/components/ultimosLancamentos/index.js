import { livros } from "./dadosUltimosLancamento";
import styled from "styled-components";
import { Titulo } from "../titulo";
import CardRecomenda from "../cardRecomenda";

const UltimosLancamentosContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 48px 40px;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    box-shadow: 0 8px 36px rgba(44, 62, 80, 0.13);
    margin: 48px auto;
    gap: 32px;
    background: linear-gradient(120deg, #f0f4ff 0%, #e0e7ff 100%);
    max-width: 900px;
`;

const LivrosContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;

const LivroImagem = styled.img`
    border-radius: 16px;
    box-shadow: 0 6px 24px rgba(44, 62, 80, 0.14);
    transition: transform 0.22s, box-shadow 0.22s;
    max-width: 200px;
    height: auto;
    cursor: pointer;
    background: #f8fafc;
    padding: 12px;
    border: 2px solid #e0e7ff;

    &:hover {
        transform: translateY(-10px) scale(1.08) rotate(-2deg);
        box-shadow: 0 16px 40px rgba(44, 62, 80, 0.22);
        border-color: #2563eb;
        background: #e0e7ff;
    }
`;

function UltimosLancamentos() {
    return(
        <UltimosLancamentosContainer>
            <Titulo 
            cor="#1d4ed8" 
            tamanho="36px" >
                Últimos Lançamentos
            </Titulo>
            <LivrosContainer>
                {livros.map(livro => (
                    <LivroImagem src={livro.src} alt={livro.nome}/>
                ))}
            </LivrosContainer>
            <CardRecomenda
            titulo= "O Senhor dos Anéis" 
            subtitulo="Uma jornada épica"
            descrição="Acompanhe Frodo e seus amigos em uma missão para destruir o Um Anel."
            img="https://tse4.mm.bing.net/th/id/OIP.9NMYdIWwJLvmmyx-b5V6LAHaK_?rs=1&pid=ImgDetMain&o=7&rm=3"
        />
        </UltimosLancamentosContainer>
    )
}

export default UltimosLancamentos;