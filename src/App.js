import UltimosLancamentos from "./components/ultimosLancamentos/index.js"
import Pesquisa from "./components/pesquisa/index.js";
import Header from "./components/header.js";
import styled from "styled-components";

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #002f52 35%, #326589 100%);
`

function App() {
  return (
    <AppContainer>
      <Header />
      <Pesquisa />
      <UltimosLancamentos/>
    </AppContainer>
  );
}

export default App;

