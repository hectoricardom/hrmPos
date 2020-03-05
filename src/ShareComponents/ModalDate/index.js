


import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';

import {Util} from '..'
import './style.css';



class ModalDate extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      removeOption:false,
      valid:false,
      maxDays:31,
      yyyy:null,
      mm:null,
      dd:null
    };
  }
  componentDidMount() {  
    var _th6 = this;
    const {valueField } = _th6.props;

    this.checkvalid = this.checkvalid.bind(this);
    this.setDay = this.setDay.bind(this);
    this.UpdYear = this.UpdYear.bind(this);
    this.UpdMonth = this.UpdMonth.bind(this);
    this.UpdDay = this.UpdDay.bind(this);
    this.SaveC = this.SaveC.bind(this);
    this.C_cancel = this.C_cancel.bind(this);
    
    if(valueField){
      var t = new Date(valueField)
      _th6.setState({yyyy:t.getFullYear()})
      _th6.setState({mm:t.getMonth()+1}) 
      _th6.setState({dd:t.getDate()}) 
      _th6.setState({valid:true}) 
    }    
    
  }  

  setDay= (r,m) => {
    this.props.actions.UpdateCalendarParams('date',`${m}/${r}/${this.props.year}`);     
    ///this.valueUpdate(`${m}/${r}/${this.props.year}`);      
  }

  checkvalid= (y,m,d) => {
    //const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
    if(Util.isDate(y,m,d)){
      if(Util.isInteger(m) && m<10){ m='0'+m}
      if(Util.isInteger(d) && d<10){ d='0'+d}    
      var dt = `${m}/${d}/${y}`   
      var dD = new Date(dt);
      var dNow = new Date();
      var ctd = new Date()
      var minY = ctd.getFullYear();
      var maxY = minY+50;
      var maxDay = Util.MaxDayperMotnh(y,m);
      if(this.props.dob){
        maxY = ctd.getFullYear();
        minY = maxY-100;
      }
      if(this.props.dob){        
        if(maxDay< d){
          this.setState({valid:false});
        }
        else if(y > minY && dD.getTime()<dNow.getTime()){
          this.setState({valid:true});
        }
        else{
          this.setState({valid:false});            
        }      
      }
      else{  
        if(maxDay< d){
          this.setState({valid:false});
        }
        else if(y >= minY && dD.getTime()>=dNow.getTime()){
          this.setState({valid:true});
        }
        else{
          this.setState({valid:false});            
        }
      }      
    }else{
      this.setState({valid:false});
    }
}

  UpdYear = (r) => {
    var ctd = new Date()
    var minY = ctd.getFullYear();
    var maxY = minY+50;
    if(this.props.dob){
      maxY = ctd.getFullYear();
      minY = maxY-100;
    }
    r = parseInt(r);    
    if(maxY>= r && minY<=r){
      this.setState({yyyy:r});
      this.checkvalid(r,this.state.mm,this.state.dd)       
    }else{
      this.setState({yyyy:null});
      this.checkvalid(r,this.state.mm,this.state.dd)
     }
  }

  UpdMonth = (r) => { 
    r = parseInt(r);
    if(12>= r && 1<=r){     
      this.setState({mm:r});
      this.checkvalid(this.state.yyyy,r,this.state.dd)   
    }else{
      this.setState({mm:null});
      this.checkvalid(this.state.yyyy,r,this.state.dd)    
    }
  }


 UpdDay = (r) => {
  r = parseInt(r);
  var maxDay = Util.MaxDayperMotnh(this.state.yyyy,this.state.mm);
  if(maxDay>= r && 1<=r){
    this.setState({dd:r});
    this.checkvalid(this.state.yyyy,this.state.mm,r)    
 }else{  
    this.setState({dd:null});
    this.checkvalid(this.state.yyyy,this.state.mm,r)
  }
 }

C_cancel = (r) => {
  if(typeof this.props.Close === "function"){
    this.props.Close();
  }  
}

SaveC = (r) => {
  const {form,field} = this.props;
  var dt = `${this.state.mm}/${this.state.dd}/${this.state.yyyy}`    
  this.props.actions.UpdateForm(form,field,dt);
  if(typeof this.props.Close === "function"){
    this.props.Close();
  }
}






  ref = r => {
    this.MS_Elem = r
  }
  updateState(e){    
    this.setState({[e.key]:e.value});
  }
  
  setDay= (r) => {     
    this.props.actions.UpdateCalendarParams('date',`${this.state.mm}/${r}/${this.props.year}`);
  }
  render() {    
    const { placeholder,dob,color } = this.props;
    var ctd = new Date()
    var minY = ctd.getFullYear();
    var maxY = minY+50;
    if(dob){
        maxY = ctd.getFullYear();
        minY = ctd.getFullYear()-100;
    }
    var StyText = {color:color}
    var maxDay = Util.MaxDayperMotnh(this.state.yyyy,this.state.mm);      
    var savebutton =  <div className="button disable"><div className="cc" >save </div></div>
    var _dob = ``;
    if(this.state.valid){
      var dt = `${this.state.mm}/${this.state.dd}/${this.state.yyyy}`;
      _dob = Util.parseFullDate((new Date(dt)).getTime());
      savebutton =  <div className="button" onClick={this.SaveC}  style={StyText}><div className="cc" >save </div></div>
    }else{      
      _dob = Util.parseFullDate((new Date()).getTime());
    }

      return(
      <div>
        <div className="headerDateModal" style={{backgroundColor:color}}>
          <div className="Title">
            {placeholder}
            <div className="date">
            {_dob}
            </div>
          </div>      
        </div>
        <div className="bodyDateModal">
          <div className="formCont">
          <MDateInput color={color} label={Util.translatetext(`year`)} _maxLengt={4} _text={this.state.yyyy} _minValue={minY}  _maxValue={maxY} minValueError={`the year is too old`} maxValueError={`the year need be less or equal to ${maxY}`} OnChange={this.UpdYear}/>
          <MDateInput color={color} label={Util.translatetext(`month`)} _maxLengt={2}  _text={this.state.mm} _minValue={1}  _maxValue={12} minValueError={`the month is invalid`} maxValueError={`the month need be less or equal to ${12}`} OnChange={this.UpdMonth}/> 
          <MDateInput color={color} label={Util.translatetext(`day`)} _maxLengt={2}  _text={this.state.dd} _minValue={1}  _maxValue={maxDay} minValueError={`the day is invalid`} maxValueError={`the day need be less or equal to ${maxDay}`} OnChange={this.UpdDay}/>         
          </div>
        </div>
        <div className="actionContainer">
        <div className="button" onClick={this.C_cancel} style={StyText}>
          <div className="cc" >
            cancel 
          </div>
        </div>
        {savebutton}
        </div>
      </div>
      )  
  }
}








class MDateInput extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      focus : false,
      text:'',
      error:false,
      errMsg:''
    };
  }
  OnChange(e){  
    var _th6 = this;
    const {props} = _th6;  
    if (typeof props.OnChange === 'function') { 
      props.OnChange(e);
    } 
  }

  componentWillMount() {    
  } 

  updState(e){    
    this.setState({[e.key]:e.value});
  }
  
  handleFocus = e => { 
    this.setState({focus:true}); 
  }

  handleBlur = e => { 
    this.setState({focus:false}); 
  }

  handleChange = e => {   
    const { _minValue , _maxValue ,minValueError, maxValueError} = this.props;    
    var value = parseInt(e.target.value);    
    if(parseInt(_maxValue)<value){
      this.setState({error:true,errMsg:maxValueError,text:e.target.value});
      if (typeof this.props.OnChange === 'function') { 
        this.props.OnChange(null);       
      } 
    }else if(parseInt(_minValue)>value){      
      this.setState({error:true,errMsg:minValueError,text:e.target.value});
      if (typeof this.props.OnChange === 'function') { 
        this.props.OnChange(null);       
      }
    }
    else{      
      this.setState({error:false,text:e.target.value});      
      if (typeof this.props.OnChange === 'function') { 
        this.props.OnChange(value);       
      }      
    }  
  };



  render() {  
    var _th6 = this;
    const { label,_maxLengt,color, _text} = _th6.props;
    var _TexT = this.state.text || _text || '';
    var labelStyle = {}
    var _colorS =  color || `#4285f4`
    var borderBottomStyle = {}
    var borderBottom = `borderBottomActive`
    if(this.state.focus){
      labelStyle = {color:_colorS}
      borderBottom = `borderBottomActive load`
      borderBottomStyle = {backgroundColor:_colorS}
    }
    return(   
        <div className="inputDatePick">
            <div className="base">  
              <div className="date">
                <div className="inputCont">  
                  <input type="number" tabIndex="0" aria-label="Año" maxLength={_maxLengt} value={_TexT} onFocus={this.handleFocus} onChange={this.handleChange} onBlur={this.handleBlur}/>
                  <div className="label" style={labelStyle}>{label}</div>
                </div>
                <div className="borderBottom"/>
                <div className={borderBottom} style={borderBottomStyle}/>
              </div>   
            </div>     
        </div>
    )   
  }
}


function mapStateToProps(state, ownProps) {
  return {
    formsAll: state.common.forms,
    formObserve: state.common.formObserve,
    year:state.common.year,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDate);
