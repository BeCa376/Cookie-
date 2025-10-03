import Input from "../input";
import styled from "styled-components";
import { useState } from "react";
import { livros } from "./dadosPesquisa";

const PesquisaContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const Titulo = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
`;

const Subtitulo = styled.h3`
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    margin-bottom: 20px;
`;

const LivrosPesquisados = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 24px;
    width: 100%;
`;

const Livro = styled.div`
    display: flex;
    align-items: center;
    background: #035af2ff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    padding: 16px 24px;
    width: 350px;
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;

    &:hover {
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 6px 16px rgba(0,0,0,0.22);
    }

    p {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        margin-right: 18px;
        flex: 1;
    }

    img {
        width: 60px;
        height: 90px;
        object-fit: cover;
        border-radius: 6px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.12);
    }
`;
    
function Pesquisa() {
        
        //estados do React
    const [livrosPesquisados, setLivrosPesquisados] = useState([]);



    return(
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre seu livro ideal</Subtitulo>
            <Input  
                placeholder="Digite o título do livro"
                onBlur={evento => {
                    const textoDigitado = evento.target.value 
                    const resultadoPesquisa = livros.filter(livro => livro.nome.includes(textoDigitado))
                    setLivrosPesquisados(resultadoPesquisa)
                }}
            />
            <LivrosPesquisados>
                {livrosPesquisados.map(livro => (
                    <Livro key={livro.nome} >
                        <p>{livro.nome}</p>
                        <img src={livro.src} alt={livro.nome} />
                    </Livro>
                ))}
            </LivrosPesquisados>
        </PesquisaContainer>
    )
}

export default Pesquisa;