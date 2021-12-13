import './App.css';
import Header from './coponents/layout/Header';
import Main from './coponents/layout/Main';
import Footer from './coponents/layout/Footer';
import ThumbMaker from './coponents/ThumbMaker';

function App() {
  return (
    <div className="App">
      <div id="wrap">
        <Header/>
          <Main>
            <ThumbMaker/>
          </Main>
      </div>
    </div>
  );
}

export default App;
