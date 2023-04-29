//import '../src/App.css'; temporarily commented out, You can uncomment and test if you feel like it
import Landing from './landing.js';
//import Game from './components/game.js';
import Game from './memory_game.js';
import Preview from './preview.js';
import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { tileCodes } from '../src/vars.js';

//import anime from 'animejs/lib/anime.es.js';
import * as Animation from "animejs";

library.add(fab, fas);

const timing = 1000;
const anime = Animation.default;

async function fadeAnimation() {
        
  const a1 = anime({
    targets: 'body',
    duration: timing,
    opacity: [1, 0],
    direction: 'alternate',
    easing: 'linear',
  })

  await Promise.all([a1]);
}


function App() {

  const [state, setState] = useState('start');
  const [level, setLevel] = useState(1);  // outdated - porperty will be reworked
  const [newLevel, setNewLevel] = useState(null);
  const [newSerie, setNewSerie] = useState(null);

  const proceed = async() => {
      await fadeAnimation()
  }

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

  const triggerChangeComponentToConfirm = () => {
    setState('confirm'); // this is 'fake' state, meaning it will not change any new component by itself
  }

  const triggerStartDelayed = () => {
    setTimeout(() => {
      setState('start');
    }, timing);
  }

  useEffect(() => {
    if(state === 'confirm') { // it's a trick to trigger level restart
      setState('game')
    }
  }, [state])

  return (
    <div className="App">
      {state === 'start' && (
        <Landing changeComponent={triggerChangeComponentToPreview} tileCodes={tileCodes} state={state} />
      )}

      {state === 'preview' && (
        <Preview changeComponent={triggerChangeComponentDelayed} proceed={proceed} backToHome={triggerStartDelayed} timing={timing} level={level} nextLV={() => {setLevel(level + 1)}} />
      )}

      {state === 'game' && (
        <Game changeComponent={triggerChangeComponentToPreview} proceed={proceed} restartGame={triggerChangeComponent} confirmComponent={triggerChangeComponentToConfirm} preview={triggerChangeComponentToPreview} tileCodes={tileCodes} level={level} newLevel={newLevel} newSerie={newSerie}  />
      )}

    </div>
  );
}

export default App;
