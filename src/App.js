import logo from './logo.svg';
import './App.css';
import Landing from './components/landing.js';
import Game from './components/game.js';
import Preview from './components/preview.js';
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
  const [level, setLevel] = useState(1);

  const triggerChangeComponent = () => {
    setState('game');
  }

  const triggerChangeComponentToPreview = () => {
    setState('preview');
  }

  const triggerStart = () => {
    setTimeout(() => {
      setState('start');
    }, 1700);  // zamiast tego zrób animację dla przegranej gry, po której można kliknąć przycisk :)
  }

  const triggerStartQuick = () => {
    setState('start');
  }

  return (
    <div className="App">
      {state === 'start' && (
        <Landing changeComponent={triggerChangeComponentToPreview} tileCodes={tileCodes} />
      )}

      {state === 'preview' && (
        <Preview changeComponent={triggerChangeComponent} start={triggerStart} startQuick={triggerStartQuick} level={level} nextLV={() => {setLevel(level + 1)}} />
      )}

      {state === 'game' && (
        <Game changeComponent={triggerChangeComponent} start={triggerStart} preview={triggerChangeComponentToPreview} tileCodes={tileCodes} level={level}  />
      )}

    </div>
  );
}

export default App;
