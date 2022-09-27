import './App.css';
import Landing from './components/landing.js';
//import Game from './components/game.js';
import Game from './components/memory_game.js';
import Preview from './components/preview.js';
import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { tileCodes } from './vars.js';


library.add(fab, fas);


function App() {

  const [state, setState] = useState('start');
  const [level, setLevel] = useState(1);  // outdated - porperty will be reworked
  const [newLevel, setNewLevel] = useState(null);
  const [newSerie, setNewSerie] = useState(null);

  const timing = 1000;

  const triggerChangeComponent = () => {
    setState('game');
  }

  const triggerChangeComponentDelayed = (new_lv, serie_name) => {
    setNewLevel(new_lv);
    setNewSerie(serie_name);
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
        <Game changeComponent={triggerChangeComponentToPreview} preview={triggerChangeComponentToPreview} tileCodes={tileCodes} level={level} newLevel={newLevel} newSerie={newSerie}  />
      )}

    </div>
  );
}

export default App;
