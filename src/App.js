import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const el = document.getElementById('input')
    el.setAttribute('style', 'width: 100px')
  }, [])
  return (
    <div className="App">
      <div id='input' />
    </div>
  );
}

export default App;
