import logo from './logo.svg';
import './App.css';
import './styles/sass/style.scss'

import Counter from './components/counter';
import LoadingIndicator from './components/ui/loading-indicator'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
      <LoadingIndicator />
      <Counter />
    </div>
  );
}

export default App;
