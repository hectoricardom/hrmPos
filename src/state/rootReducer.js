import { combineReducers } from 'redux';
import dialog from './dialogReducer';
import common from './commonReducer';
export default combineReducers({ common, dialog });
