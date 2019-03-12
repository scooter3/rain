import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import rootReducer from './reducers'
import './index.css';
import App from './App';
import Weather from './components/Weather'

//const store = createStore(rootReducer);


ReactDOM.render(<App />, document.getElementById("root"));
