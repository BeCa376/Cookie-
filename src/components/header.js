import Logo from './logo'
import OpcoesHeader from './opcoesHeader'
import IconesHeader from './iconesHeader'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-color: #f8f9fa;
`;

function Header() {
    return (
        <HeaderContainer>
            <Logo />
            <OpcoesHeader />
            <IconesHeader />
        </HeaderContainer>
    );
}

export default Header;
