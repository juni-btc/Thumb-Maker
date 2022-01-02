import './App.css';
import styled from 'styled-components';
import Header from './coponents/layout/Header';
import Main from './coponents/layout/Main';
// import Footer from './coponents/layout/Footer';
import ThumbMaker from './coponents/ThumbMaker';
import React, {useState} from 'react';

function App() {

  const [loaded, setLoaded] = useState('');

  React.useEffect(()=>{
    setLoaded('loaded');
  }, [])

  return (
    <Wrap className="App" className={loaded}>
      <div id="wrap">
        <Header/>
          <Main>
            <ThumbMaker/>
          </Main>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  &.loaded{
    animation: loadEffect 0.8s ease forwards;
  }
@keyframes loadEffect {
    0%{ opacity: 0; transform: translateY(-40px); }
    100%{ opacity: 100%; transform: translateY(0); }
}
`

export default App;
