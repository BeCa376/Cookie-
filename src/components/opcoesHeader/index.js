import styled from "styled-components";

const Opcoes = styled.ul`
    display: flex;
`
const Opcao = styled.li`
    min-width: 120px;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 5px;
    cursor: pointer;
    text-align: center;

`

const textoOpcoes = ['CATEGORIAS', 'FAVORITOS', 'MINHA ESTANTE'];

function OpcoesHeader () {
    return (
        <Opcoes>
            {textoOpcoes.map( (texto) => (
            <Opcao><p>{texto}</p></Opcao>
          ) ) }
        </Opcoes>
    ) 
}

export default OpcoesHeader;