import './App.css'
import styled from 'styled-components'
import Header from './layout/Header'
import Main from './layout/Main'
// import Footer from './coponents/layout/Footer';
import ThumbMaker from './coponents/ThumbMaker'
import React, { useState } from 'react'
import EmojiUrl from './utils/EmojiUrl'

function App() {
  const emojiStart = EmojiUrl()
  const [loaded, setLoaded] = useState(false)

  React.useEffect(() => {
    emojiStart()
    setLoaded(true)
  }, [])

  return (
    <Wrap className={loaded ? 'app loaded' : 'app'}>
      <div id="wrap">
        <Header />
        <Main>
          <ThumbMaker />
        </Main>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  &.loaded {
    animation: loadEffect 0.8s ease forwards;
  }
  @keyframes loadEffect {
    0% {
      opacity: 0;
      transform: translateY(-40px);
    }
    100% {
      opacity: 100%;
      transform: translateY(0);
    }
  }
`

export default App
