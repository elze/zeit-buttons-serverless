import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

import './index.css';
import AppWrapper from './App';
//import { Test } from './App';
//import ModalGalleryExample from './ModalGalleryExample'
//import PrimarySkillStandaloneExample from './PrimarySkillStandaloneComponent';
import reducer from './actions/reducers'
import 'bootstrap/dist/css/bootstrap.css';

// The "instance" is for Matomo Analytics; it does not have much to do with the rest of the application
const instance = createInstance({
  urlBase: 'https://www.piw.geekitude.com/matomo',
  siteId: 3,
  userId: 'UID76903202', // optional, default value: `undefined`.
  trackerUrl: 'https://www.piw.geekitude.com/matomo/tracking.php', // optional, default value: `${urlBase}matomo.php`
  srcUrl: 'https://www.piw.geekitude.com/matomo/tracking.js', // optional, default value: `${urlBase}matomo.js`
  disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    seconds: 10 // optional, default value: `15
  },
  linkTracking: false, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: true,
    setSecureCookie: true,
    setRequestMethod: 'POST'
  }
})


const store = createStore(reducer)


ReactDOM.render(
	<MatomoProvider value={instance}>
    <Provider store={store}>
     <AppWrapper store={store} />
    </Provider>,
	</MatomoProvider>,
    document.getElementById('root'));
	