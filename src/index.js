import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { bindActionCreators, createStore } from 'redux'
import connect from 'react-redux';
import './index.css';
import App from './App';
import reducer from './actions/reducers'
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
     <App store={store} />
    </Provider>,
    document.getElementById('root'));
    