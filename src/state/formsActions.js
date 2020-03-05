import * as types from '../constants/ActionTypes';
import { TMDB_URL, TMDB_API_KEY, GRAPHQLURL } from '../constants/Api';
import * as _Util from './Util';



/***********************************************************************************     FORMS   ***************************************************************************************************/





export function UpdateFormbyName(form,v){
  return function (dispatch, getState) { 
    const state = getState().forms;
    UpdForm(state,dispatch,form,v);
  }
}

function UpdForm(state,dispatch, form,v){
  var __forms = state.forms; 
  var foBs =  state.formObserve + 1;
  if(!__forms[form]){
    __forms[form] = {}
  }
  __forms[form] =v;
  dispatch(retrieveFormSuccess(__forms)); 
  dispatch(retrieveFormOberves(foBs)); 
}



export function UpdateForm(form,fld,v){
  return function (dispatch, getState) {   
    const state = getState().forms;
    var _forms = state.forms;
    if(!_forms[form]){
      _forms[form] = {}
    }
    _forms[form][fld] =v;    
    UpdForm(state,dispatch,form,_forms[form]);
  }
}


export function retrieveFormSuccess(res) {
  return {
    type: types.FORMS_SUCCESS,
    forms : res
  };
}

export function retrieveFormOberves(res) {
  return {
    type: types.FORMS_OBSERVES,
    formObserve : res
  };
}

export function UpdateValidationForm(form,fld,v){
  return function (dispatch, getState) {   
    const state = getState().forms;
    var foBs =  state.formObserve + 1;
    var _forms = state.validationForms;
    if(!_forms[form]){
      _forms[form] = {}
    }
    _forms[form][fld] =v;
    dispatch(retrieveValidationFormSuccess(_forms));
    dispatch(retrieveFormOberves(foBs));
  }
}

export function retrieveValidationFormSuccess(res) {
  return {
    type: types.VALIDATIONFORMS_SUCCESS,
    validationForms : res
  };
}

