import * as types from '../constants/ActionTypes';
import initialState from './initialState';

export default function (state = initialState.finances, action) {
  switch (action.type) {

    case types.FILTERS_SUCCESS:
    return {
      ...state,
      filters: action.filters
    };
    
    case types.GASTOS_SUCCESS:
    return {
      ...state,
      gastos: action.gastos
    };

    case types.INGRESOS_SUCCESS:
    return {
      ...state,
      ingresos: action.ingresos
    };

    case types.CATEGORIES_SUCCESS:
    return {
      ...state,
      categories: action.categories
    };
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
    case types.FILTER_FORMS_OBSERVES:
      return {
        ...state,
        filterObserve: action.filterObserve
      };
    case types.VALIDATIONFORMS_SUCCESS:
      return {
        ...state,
        validationForms: action.validationForms
      };


    case types.KIDS_SUCCESS:
      return {
        ...state,
        kids: action.kids
      };
       
    case types.ATTENDANCES_SUCCESS:
      return {
        ...state,
        attendances: action.attendances
      }; 
    default:
      return state;
  }
}
