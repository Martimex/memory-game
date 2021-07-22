import logo from './logo.svg';
import './App.css';
import Landing from './components/landing.js';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);


//let fasArray = Object.keys(library.definitions.fas)

//console.log(fasArray)

function App() {
  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;
