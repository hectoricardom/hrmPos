
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';

import Icons from '../Icons/Icons';

import ModalDate from '../ModalDate';

import * as Util from '../../state/Util';

import MobileCalendar from '../MobileCalendar'
import './style.css';




class InputDateHRM extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      valid : true,
    };
  }
  componentWillMount() {    
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount() {  
    const {form,field} = this.props;   
  }

  handleBack(e){
    var _id = Util.Base64.encode('_mobile_Calendar_'); 
    var options = {id:_id};
    if(this.props.isMobile){
      this.props.dialogActions.CloseView(options);  
    }else{
      this.props.dialogActions.CloseSlideView(options);  
    }
  };
  

  handleClick(e){    
    var _id = Util.Base64.encode('_mobile_Calendar_'); 
    var options = {id:_id};
    if(this.props.isMobile){
      this.props.dialogActions.CloseView(options);  
    }else{
      this.props.dialogActions.CloseSlideView(options);  
    }
  };  



  handleStatus(e){
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

  handleChange(e){  
    const {form,field, isMobile} = this.props;
    var _value = (new Date(e)).getTime();
    this.props._commonActions.UpdateForm(form,field,_value); 
    var _id = Util.Base64.encode('_mobile_Calendar_'); 
    var options = {id:_id};
    if(isMobile){
      this.props.dialogActions.CloseView(options);  
    }else{
      this.props.dialogActions.CloseSlideView(options);  
    }
    if (typeof this.props.dateChange === 'function') { 
      this.props.dateChange(_value); 
    }         
  };

  handleKeyUp(e){
    if(e.keyCode){
      if(e.keyCode===13 || e.keyCode===27){    
        //
      } 
    } 
  };

  handleblur(e){
    
  };


 
 
  close_modalDate(){
    let _id = Util.Base64.encode('_modalDate_picker_'); 
    let options = {id:_id};
    this.props.dialogActions.CloseDialog(options);
  }

  handle_data_modalDate(e){  
    const {form,field} = this.props;
    var _value = (new Date(e)).getTime();
    this.props._commonActions.UpdateForm(form,field,_value); 
    this.close_modalDate();        
  };
 

  handleFocus(e){    
    const  {modalDate,button_float, forms, form,dob, placeholder, field, isMobile} = this.props;
    if(modalDate){
      this.setState({focus:true}); 
      //this._TextPopup.Open('dateSlide2346');      
      let _id = Util.Base64.encode('_modalDate_picker_'); 
      var f_label = forms[form]?forms[form][field]?forms[form][field]:'date':'date';      
      let _content = <ModalDate form={form} field={field} valueUpdate={this.handle_data_modalDate.bind(this)} _close={this.close_modalDate.bind(this)} dob={dob} placeholder={placeholder} valueField={f_label}/>      
      let options = {id:_id,zIndex:9000,content:_content,height:'60vh',};
      this.props.dialogActions.OpenDialog(options);
    }
    else{
      if(isMobile){
        this.setState({focus:true}); 
        //this._TextPopup.Open('dateSlide2346');
        let _id = Util.Base64.encode('_mobile_Calendar_'); 
        let f_label = forms[form]?forms[form][field]?forms[form][field]:'date':'date';
        let _content = <MobileCalendar _dateValue={f_label} valueUpdate={this.handleChange.bind(this)} button_float={button_float}  handleBack={this.handleBack.bind(this)}/>
        let options = {id:_id,zIndex:9000,content:_content};
        this.props.dialogActions.OpenView(options); 
      }
      else{
        this.setState({focus:true}); 
        //this._TextPopup.Open('dateSlide2346');
        let _id = Util.Base64.encode('_mobile_Calendar_'); 
        let f_label = forms[form]?forms[form][field]?forms[form][field]:'date':'date';
        let _content = <MobileCalendar _dateValue={f_label} valueUpdate={this.handleChange.bind(this)} button_float={button_float} handleBack={this.handleBack.bind(this)}/>
        let options = {id:_id,zIndex:9000,content:_content};
        this.props.dialogActions.OpenSlideView(options); 
      }

     
    } 

    

  }
  
  handleBlur(e){ 
    //this.setState({focus:false}); 
  }

  updateState(e){    
    this.setState({[e.key]:e.value});
  }
  
  refT(r){
    this._TextPopup = r
  }

 
  render() {     
    const {forms,form,field,placeholder, color, colorRGBA,isMobile,button_float, formObserve} = this.props;    
    var f_label = forms[form]?forms[form][field]?forms[form][field]:'date':'date'; 
    
    var modalDate = true;
      var labelFl = {position: 'absolute', transform: `translate3d(0px, 2px, 0)`}
      var BoxB = {}
      var inpSty = {}  
      var isValid = isdategetTime(f_label);
      var isText = f_label?f_label.toString().length:0;
      if(isText>0){
        labelFl = {position: 'absolute',transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px',color:`var(--color-base--hover)`}    
      } 
      if(this.state.focus){
        labelFl = {position: 'absolute',color:`var(--color-base--hover)`, transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px'}
        BoxB = { border: `1px solid var(--color-base--hover)`
          //,padding: `15px 12px`
        }
      }
      if(!isValid){
        labelFl = {position: 'absolute',color:`#b71c1c`, transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px'}
        BoxB = { border: `1px solid #b71c1c`
          //  ,padding: `15px 12px`
        }
      }
      
      var placeholderText = this.state.msg || placeholder;
      if(button_float){
        return (    
          <div className="" style={{"--calendar--color--":'var(--color-base--hover)', "--calendar--back--color--":'rgba(25,103,210,0.2)'}}> 
            <div className={`__add__menu__btn__ `}  onClick={this.handleFocus.bind(this)}>
                <Icons name={'date'} color={'#555'} size={18}/>
                <span>Date to print</span>
            </div>                
          </div>
      )
      }else{
        return (    
          <div className="inputStyle" style={{"--calendar--color--":'var(--color-base--hover)', "--calendar--back--color--":'rgba(25,103,210,0.2)'}}> 
             {isMobile?
              <div className="Wxwduf" style={BoxB} onClick={this.handleFocus.bind(this)} ref={this.ref}>      
                <div className="_input_" >{date2pretyfy(f_label)}</div>
                <div className="_label" style={labelFl} >{placeholderText}</div>      
              </div>
             :
              <div className="Wxwduf" style={BoxB} onClick={this.handleClickFocus} ref={this.ref}>      
                <input type={'text'} value={date2pretyfy(f_label)} onFocus={this.handleFocus.bind(this)} onKeyUp={this.handleStatus}  onBlur={this.handleBlur} style={inpSty}/> 
                <div className="_label" style={labelFl} >{placeholderText}</div>      
              </div> 
            }                 
          </div>
        )
      }
      
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isMobile: state.common.isMobile,
    forms: state.common.forms,
    formObserve: state.common.formObserve
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dialogActions: bindActionCreators(dialogActions, dispatch),
    _commonActions: bindActionCreators(commonActions, dispatch),    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputDateHRM);



function date2pretyfy(dt) {  
  var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();   
  return `${Util.monthsList_Short[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}`;  
}

function weekdate2pretyfy(dt) {
  var date = !isNaN(dt)?new Date(parseInt(dt.toString())):new Date(); 
  var ws = new Date(date.setDate(date.getDate() + (0-date.getDay())));
  var we = new Date(date.setDate(date.getDate() + (6-date.getDay())));   
  return `${Util.monthsList_Short[ws.getMonth()+1]} ${ws.getDate()} - ${Util.monthsList_Short[we.getMonth()+1]} ${we.getDate()}`;  
}

function isdategetTime(dt) {  
  return dt?!isNaN(dt)?true:false:false;   
  
}



/**
 * 
 * 
 * 
 * 


         
 * 
 */