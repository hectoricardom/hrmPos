import * as types from '../constants/ActionTypes';
import initialState from './initialState';

export default function (state = initialState.common, action) {
  switch (action.type) {

    case types.TAB_COLOR_SUCCESS:
    return {
      ...state,
      tab_color: action.tab_color
    };

    case types.USERPROFILE_SUCCESS:
      return {
        ...state,
        user: action.user
      };

    case types.ROUTES_SUCCESS:
      return {
        ...state,
        _routes: action._routes
      };  

    case types.APPLOADED_SUCCESS:
      return {
        ...state,
        appLoaded: action.appLoaded
      };

    case types.ISMOBILE_SUCCESS:
      return {
        ...state,
        isMobile: action.isMobile
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
    case types.LANGUAGE_OBSERVES:
      return {
        ...state,
        lng: action.lng
      };
      case types.UPD_KEY_VALUE:
        return {
          ...state,
          [action.kv.key]: action.kv.value
        };
     
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
