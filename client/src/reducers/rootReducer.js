import {combineReducers} from 'redux';
import store from './storeReducer';
import comment from './commentReducer';

const rootReducer = combineReducers({
  store,
  comment
});

export default rootReducer;