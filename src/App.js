import './App.css';
import Landing from './components/landing.js';
import Game from './components/game.js';
import Preview from './components/preview.js';
import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { tileCodes } from './vars.js';


library.add(fab, fas);


function App() {

  const [state, setState] = useState('start');
  const [level, setLevel] = useState(1);

  const timing = 1000;

  const triggerChangeComponent = () => {
    setState('game');
  }

  const triggerChangeComponentDelayed = () => {
    setTimeout(() => {
      setState('game');
    }, timing);
  }

  const triggerChangeComponentToPreview = () => {
    setState('preview');
  }

  const triggerStartDelayed = () => {
    setTimeout(() => {
      setState('start');
    }, timing);
  }

  return (
    <div className="App">
      {state === 'start' && (
        <Landing changeComponent={triggerChangeComponentToPreview} tileCodes={tileCodes} state={state} />
      )}

      {state === 'preview' && (
        <Preview changeComponent={triggerChangeComponentDelayed} backToHome={triggerStartDelayed} timing={timing} level={level} nextLV={() => {setLevel(level + 1)}} />
      )}

      {state === 'game' && (
        <Game changeComponent={triggerChangeComponent} preview={triggerChangeComponentToPreview} tileCodes={tileCodes} level={level}  />
      )}

    </div>
  );
}

export default App;
