import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SkipLink from './components/skipLink';

import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';

import configureStore, { history } from './configureStore'

export const myStore = configureStore()

ReactDOM.render(
    <Provider store={myStore}>
        <SkipLink />
        <App history={history} />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
