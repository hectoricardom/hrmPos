
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';
import ModalDate from '../ModalDate'
import { Util,Dialog,Icons, Ripplee} from '..'
import './style.css';




class InputMDate extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      removeOption:false
    };
  }
  componentWillMount() {    
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount() {  
    const {form,field} = this.props;
    this.props.actions.UpdateForm(form,field,''); 
    this.handleUpdChange = this.handleUpdChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack = e => {   
    this._TextPopup.Close(); 
  };
  

  handleClick = e => {    
    const {form,field} = this.props;    
    this.props.actions.UpdateForm(form,field,e.id); 
    this.setState({drowndropInputText:''});      
    this._TextPopup.Close();    
  };  



  handleStatus= e => {
    var _this = this;
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
      _this._TextPopup.Open(b,cnt.right);
    }  
  }

  handleChange = e => {  
    const {form,field} = this.props;
    this.props.actions.UpdateForm(form,field,e); 
    //this.setState({drowndropInputText:e.target.value});    
    this._TextPopup.Close();          
  };

  handleKeyUp = e => {
    if(e.keyCode){
      if(e.keyCode===13 || e.keyCode===27){    
        //
      } 
    } 
  };

  handleblur = e => {
    
  };


 
  handleUpdChange = e => { 
    const { form,field } = this.props;
    const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
    const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/g
    if (validDateMMDDYYYY.test(e.target.value)) {     
      this.props.actions.UpdateForm(form,field,e.target.value); 
      console.log(`valid date format DD/MM/YYYY`);
    }else if (validDateDDMMYYYY.test(e.target.value)) {
      this.props.actions.UpdateForm(form,field,e.target.value); 
      console.log(`valid date format MM/DD/YYYY`);
    }
    else{
      console.log(`no valid date format`);
    }
    this.updState({key:`drowndropInputText`,value:e.target.value});       
  }
        

  updateState(e){    
    this.setState({[e.key]:e.value});
  }
  refT = r => {
    this._TextPopup = r
  }
  ref = r => {
    this.Elm = r
  }

  render() {     
    const {forms,form,field,placeholder, isMobile,icon, color,formObserve,dob } = this.props;     
    var valueField = forms?forms[field]:null;
    var labelField = valueField?valueField:placeholder;
      return (    
        <div className="inputStyle">
          <div className="inputStyleC" onClick={this.handleStatus}>          
            <div className="IconInputText ">              
              <Icons name={icon} color={'#fff'} size={24}/>
            </div>
            <div className="InputClass2">
            {labelField}
            </div>
          </div>
          <Dialog ref={this.refT} isMobile={isMobile}>
            <ModalDate form={form} field={field} color={color} valueField={valueField} dob={dob} placeholder={placeholder} Close={this.handleBack}/>
          </Dialog>
          
        </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms[ownProps.form],
    formObserve: state.common.formObserve,
    validationForms:state.common.validationForms[ownProps.form],
    isMobile:state.common.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputMDate);
