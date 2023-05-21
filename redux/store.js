import { createStore } from 'redux';
import userReducer from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

export default createStore(userReducer, devToolsEnhancer());
