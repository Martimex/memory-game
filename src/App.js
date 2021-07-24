import logo from './logo.svg';
import './App.css';
import Landing from './components/landing.js';
import Game from './components/game.js';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { tileCodes } from './vars.js';


library.add(fab, fas);




//let fasArray = Object.keys(library.definitions.fas)

//console.log(fasArray)

function App() {

  const [state, setState] = useState('start');

  const triggerChangeComponent = () => {
    setState('game');
  }

  return (
    <div className="App">
      {state === 'start' && (
        <Landing changeComponent={triggerChangeComponent} tileCodes={tileCodes} />
      )}

      {state === 'game' && (
        <Game changeComponent={triggerChangeComponent} tileCodes={tileCodes} />
      )}

    </div>
  );
}

export default App;
