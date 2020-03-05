import * as types from '../constants/ActionTypes';
import initialState from './initialState';

export default function (state = initialState.dialog, action) {
  switch (action.type) {     
    case types.UPD_KEY_VALUE_DIALOGS:
        return {
          ...state,
          [action.kv.key]: action.kv.value
      };

    default:
      return state;
  }
}