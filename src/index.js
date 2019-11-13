import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { bindActionCreators, createStore } from 'redux'
import connect from 'react-redux';
import './index.css';
import App from './App';
import buttonApp from './actions/reducers'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(buttonApp)

ReactDOM.render(
    <Provider store={store}>
     <App store={store} />
    </Provider>,
    document.getElementById('root'));
    registerServiceWorker();
    