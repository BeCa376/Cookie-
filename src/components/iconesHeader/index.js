import perfil from '../../img/perfil.svg'
import sacola from '../../img/sacola.svg'
import styled from 'styled-components'

const Icones = styled.ul`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Icone = styled.li`
  margin-right: 40px;
  width: 50px;
`
const icones = [perfil, sacola];

function IconesHeader() {
    return  (   
        <Icones>
          {icones.map( (icone) => (
            <Icone><img src = {icone} alt={icone}></img></Icone>
          ) ) }
        </Icones>
    )
}

export default IconesHeader;