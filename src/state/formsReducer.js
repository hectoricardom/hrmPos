import * as types from '../constants/ActionTypes';
import initialState from './initialState';

export default function (state = initialState.forms, action) {
  switch (action.type) {    
    case types.FORMS_SUCCESS:
      return {
        ...state,
        forms: action.forms
      };

    case types.FORMS_OBSERVES:
      return {
        ...state,
        formObserve: action.formObserve
      };
    case types.VALIDATIONFORMS_SUCCESS:
      return {
        ...state,
        validationForms: action.validationForms
      };
    case types.CALENDAR_FORMS_SUCCESS:
      return {
        ...state,
        calendar: action.calendar
      };
    case types.CALENDAR_OBSERVES:
      return {
        ...state,
        calendarObserve: action.calendarObserve
      };
      
    
    default:
      return state;
  }
}
