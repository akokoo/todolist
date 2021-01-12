import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Auth0Provider } from "./react-auth0-spa";
import reducer from './reducers';
import config from './auth_config.json';

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import App from './components/app';

let store = createStore(reducer);

/**
     * wake up heroku
     */
    fetch('https://desolate-stream-21755.herokuapp.com/wakeupheroku', {method: 'GET', mode: 'no-cors'});

render(
    <Provider store={store}>
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            audience={config.audience}
        >
            <App />
        </Auth0Provider>
    </Provider>,
    document.getElementById('root')
);