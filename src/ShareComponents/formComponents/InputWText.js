import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';

import {Util ,Icons} from '..'
import './style.css';



class InputWText extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      removeOption:false
    };
  }
  componentWillMount() {    
    this.updateState = this.updateState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleblur = this.handleblur.bind(this);
    this.loadValidation = this.loadValidation.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    
  }
  componentDidMount() {  
    const {form,field} = this.props;
    this.props.actions.UpdateForm(form,field,'');
    this.loadValidation();
  }

  handleStatus= e => {
    var _this = this;    
    const {forms,field} = _this.props;     
    var y = document.getElementsByClassName('inputStyleC');    
    var elmX = null;   
    for(var i in y){
      var inP = y[i];      
      if(inP.childNodes){        
        if(inP.contains(e.target)){ 
          elmX = inP;break;
          
        } 
      } 
    };    
    if(elmX){
        var fC  = document.getElementsByClassName('formContainer')[0];                    
        var b = elmX.getBoundingClientRect();
        var cnt = fC.getBoundingClientRect();
        setTimeout(()=>{
          var f_label = forms?forms[field]:'';
          _this.setState({drowndropInputText:f_label});
          var inF  = this.Elm.getElementsByClassName('InputClass');   
          for(var i in inF){
            var ia = inF[i];            
            if(ia.childNodes){              
              if(this.Elm.contains(ia)){
                ia.focus();break;                
              }
            }
          }          
        },5)
      }  
  }


  updateState(e){    
    this.setState({[e.key]:e.value});
  }
  handleChange = e => {   
    const {form,field} = this.props;
    this.props.actions.UpdateForm(form,field,e.target.value); 
    this.setState({drowndropInputText:e.target.value});    
         
  };
  handleKeyUp = e => {
    if(e.keyCode){
      if(e.keyCode===13 || e.keyCode===27){    
        //
      } 
    } 
  };

  handleblur = e => {
    const {forms,field } = this.props;
    var f_label = forms?forms[field]:'';
    e.target.value = f_label;    
  };

  loadValidation = e => {
    const {form,field,validation,placeholder,minLenght,maxLenght,maxValue,minValue,number} = this.props; 
    var _field = {}   
    if(validation){      
      _field['required']={};
      _field['required']['value']=true;    
      _field['required']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(62)}`;
      if(minLenght){
        _field['minLenght']={};
        _field['minLenght']['value']=minLenght;
        _field['minLenght']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(63)}`;
      }
      if(maxLenght){
        _field['maxLenght']={};
        _field['maxLenght']['value']=maxLenght;
        _field['maxLenght']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(64)}`;
      }
      if(minValue>=0){
        _field['minValue']={};
        _field['minValue']['value']=minValue;
        _field['minValue']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(65)} ${minValue}`;
      }
      if(maxValue){
        _field['maxValue']={};
        _field['maxValue']['value']=maxValue;
        _field['maxValue']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(66)} ${maxValue}`;
      }
      if(number){
        _field['number']={};
        _field['number']['value']=true;
        _field['number']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(61)}`;
      }
    }
    this.props.actions.UpdateValidationForm(form,field,_field);
  }
  refT = r => {
    this._TextPopup = r
  }
  ref = r => {
    this.Elm = r
  }
  render() {  
    const {forms,field,placeholder,number,icon,validationForms } = this.props;
    var f_label = forms?forms[field]:null;
    var labelField = f_label || placeholder || '';
    var validStyle = {},textVStyle={},IconColor='#777',
    IconColor2='#fff';
    var VFrom = validationForms?validationForms[field]:{};
    var isvalid = Util.ValidateField(field,labelField,VFrom);     
    if(!isvalid.valid){    
      validStyle = {borderBottom: `1.5px solid firebrick`}
      textVStyle={color:'firebrick'}
      IconColor='firebrick';     
    }
    var inpuType = 'text';
    if(number){
      inpuType = 'number';
    }
    return (    
          <div className="inputStyle" ref={this.ref}>
            <div className="inputStyleC" >          
              <div className="IconInputText ">
                <Icons name={icon} color={IconColor2} size={24}/>
              </div>
              <div className="InputClass2" style={{}}>
                <input type={inpuType} placeholder={placeholder} className="InputWClass" onChange={this.handleChange} onBlur={this.handleblur}  onKeyUp={this.handleKeyUp} value={this.state[`drowndropInputText`]} style={textVStyle}/>
              </div>
            </div>           
          </div>
    ) 
  }
}

function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms[ownProps.form],
    formObserve: state.common.formObserve,
    validationForms:state.common.validationForms[ownProps.form]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputWText);
