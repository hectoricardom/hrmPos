
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';

import {Calendar ,MobileCalendar,SelectPopup,Icons,Util, Ripplee} from '..'
import './style.css';




class InputDate extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      removeOption:false
    };
  }
  componentWillMount() {    
    this.updateState = this.updateState.bind(this);
    this.loadValidation = this.loadValidation.bind(this);
  }
  componentDidMount() {  
    const {form,field} = this.props;
    this.props._actions.UpdateForm(form,field,'');
    this.loadValidation();
  }

  handleBack = e => {   
    this._TextPopup.Close(); 
  };
  

  handleClick = e => {    
    const {form,field} = this.props;    
    this.props._actions.UpdateForm(form,field,e.id); 
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
    this.props._actions.UpdateForm(form,field,e); 
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

  loadValidation = e => {
    const {form,field,validation,placeholder} = this.props; 
    var _field = {}   
    if(validation){      
      _field['required']={};
      _field['required']['value']=true;    
      _field['required']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(62)}`;      
    }
    this.props._actions.UpdateValidationForm(form,field,_field);
  }
 
  handleUpdChange = e => { 
    const { form,field } = this.props;
    const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
    const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/g
    if (validDateMMDDYYYY.test(e.target.value)) {     
      this.props._actions.UpdateForm(form,field,e.target.value); 
      console.log(`valid date format DD/MM/YYYY`);
    }else if (validDateDDMMYYYY.test(e.target.value)) {
      this.props._actions.UpdateForm(form,field,e.target.value); 
      console.log(`valid date format MM/DD/YYYY`);
    }
    else{
      console.log(`no valid date format`);
    }
    this.updState({key:`drowndropInputText`,value:e.target.value});       
  }
      
  
  handleDelete(){
    const {forms,form,field} = this.props;
    var dt = SumDays('fe',0);
    var cdate = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
    this.props._actions.UpdateForm(form,field,cdate); 
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate())   
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1)
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear())
  }

  handleNextDay(){
    const {forms,form,field} = this.props;    
    var f_label = forms?forms[field]:null;
    var dt = SumDays(f_label,1);
    var cdate = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
    this.props._actions.UpdateForm(form,field,cdate); 
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate())   
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1)
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear())
  }
  
  handlePrevDay(){
    const {forms,form,field} = this.props;    
    var f_label = forms?forms[field]:null;    
    var dt = SumDays(f_label,-1);
    var cdate = `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}`;
    this.props._actions.UpdateForm(form,field,cdate); 
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate())   
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1)
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear())
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
    const {forms,form,field,placeholder, isMobile,icon, color, colorRGBA,weekPicker, formObserve } = this.props; 
    var f_label = forms?forms[field]:null;
    var labelField = f_label || placeholder || '';
    var iconBack = <div className="IconInputTextModal" onClick={this.handleBack}><Icons name={icon} color={'#777'} size={24}/></div>
    var _CalendaR = 
        <div className="DateContainerBox">          
          <div className="InputDateContainer1" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>        
            <div className="center--Container grayStyle" onClick={this.handleDelete.bind(this)}>
              <div className="hoverDiv"/>
              <span className="text2D">{`borrar`}</span>              
            </div>
            <div className="inputWrapperCalendar">
              <div className="center--Container Icon" >
                <Icons name={icon} color={'#777'} size={24}/>
              </div>
              <div className="center--Container dateFormated">  
                <span>{date2pretyfy(labelField)}</span>
              </div> 
              <div className="flexSpace"/> 
              <div className="center--Container Arrows" onClick={this.handlePrevDay.bind(this)}>
                <Icons name={'arrow_left'} color={'#777'} size={24}/>
              </div>
              <div className="center--Container Arrows"  onClick={this.handleNextDay.bind(this)}>
                <Icons name={'arrow_right'} color={'#777'} size={24}/>
              </div>
            </div>        
                              
          </div>
          <div className="InputDateContainer">
            <Calendar date={f_label} valueUpdate={this.handleChange} currentColorTheme={color} colorRGBA={colorRGBA} />
          </ div> 
        </div>;
    if(isMobile){
        iconBack = <div className="IconInputTextModal" onClick={this.handleBack}><Icons name={`arrowBack`} color={'#777'} size={24}/></div>
        var heightStyle = {height:`100vh`}
        _CalendaR = <div className="DateContainerBox" style={heightStyle}>          
        <div className="InputDateContainer1" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>
          <div className="inputWrapperCalendar">
            <div className="center--Container Icon" onClick={this.handleBack.bind(this)}>
              <Icons name={'arrowBack'} color={'#777'} size={24}/>
            </div>
            <div className="center--Container dateFormated">  
              <span>{date2pretyfy(labelField)}</span>
            </div> 
            <div className="flexSpace"/> 
            <div className="center--Container Arrows" onClick={this.handlePrevDay.bind(this)}>
              <Icons name={'arrow_left'} color={'#777'} size={24}/>
            </div>
            <div className="center--Container Arrows"  onClick={this.handleNextDay.bind(this)}>
              <Icons name={'arrow_right'} color={'#777'} size={24}/>
            </div>
          </div>        
                            
        </div>
        <div className="OptionContM">        
          <MobileCalendar date={f_label} valueUpdate={this.handleChange} currentColorTheme={color} colorRGBA={colorRGBA}  weekPicker={weekPicker}/>       
        </ div> 
          {/*  
        
        <div className="SelectContainer" >
                    <div className="InputSelectContainerM2" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>                  
                        {iconBack}
                        <div className="input2Alg">                 
                          <input placeholder={placeholder} className="InputClass"  value={this.state[`drowndropInputText`]} onChange={this.handleUpdChange} onKeyUp={this.handleKeyUp}
                          style={{}}/>
                        </div>                    
                    </div>
                    <div className="OptionCont" style={{overflow: `hidden`}}>  
                                
                    </div>
                </div>;*/}  
      </div>;
        
       
      }
      return (    
        <div className="inputStyle" style={{"--calendar--color--":color, "--calendar--back--color--":colorRGBA}}>
          <div className="inputStyleC" onClick={this.handleStatus}>          
            <div className="IconInputText ">              
              <Icons name={icon} color={'#fff'} size={24}/>
            </div>
            <div className="InputClass2">
            {date2pretyfy(labelField)}
            </div>
          </div>
          <SelectPopup ref={this.refT} isMobile={isMobile} w={420}>
              {_CalendaR}
          </SelectPopup>
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
    _actions: bindActionCreators(commonActions, dispatch),
    _commonActions: bindActionCreators(commonActions, dispatch),    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputDate);



function date2pretyfy(dt) {
  var y = new Date(dt);
  var date = isNaN(y.getTime())?new Date():y;
  return `${Util._dayLargeNames['es'][date.getDay()].slice(0,3)}, ${date.getDate()} ${Util.monthsList_Short[date.getMonth()+1]}`;  
}

function SumDays(dt,days) {
  var y = new Date(dt);
  var result = isNaN(y.getTime())?new Date():y;  
  result.setDate(result.getDate() + days);
  return result;
}