import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const init = () => {
  console.group('%c%c⊢☵☵☵☵☵☵┤ 𝙇𝙚𝙜𝙚𝙣𝙙 ├☵☵☵☵☵☵⊣', '', 'color:#1E799E; font-size:1.3em;');
    console.info('%c☉  %c=  %cPinpoint info', 'font-size: 2em', 'font-size: 1.5em' , 'color:#598ED1');
    console.info('%c☀  %c=  %cCorrect app flow', 'font-size: 2em', 'font-size: 1.5em' , 'color:#1E9E65');
    console.info('%c☂  %c=  %cWarning it may rain', 'font-size: 2em', 'font-size: 1.5em' , 'color:#aca94f');
    console.info('%c❄  %c=  %cApp got freeze by errors', 'font-size: 2em', 'font-size: 1.5em' , 'color:#C72A2A');
  console.groupEnd();
  console.info('%c%c⊢☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵☵⊣', '', 'color:#1E799E; font-weight: bold; font-size:1.3em;');
  console.info('');

  console.group('%c%c ⊢└⊣┤ 𝙇𝙤𝙜 ├⊢┘⊣', '', 'color:#1E799E; font-size:1.3em;');
}

init();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
