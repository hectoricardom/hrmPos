import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';

import {Util ,SelectPopup,Icons} from '..'
import './style.css';



class InputDrown extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      ScreenWidth:0,
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
    this.handleBack = this.handleBack.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
    
  }
  componentDidMount() {  
    const {form,field} = this.props;
    this.props.actions.UpdateForm(form,field,'');
    this.loadValidation();
  }

  handleBack = e => {   
    this._TextPopup.Close(); 
  };

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
        _this._TextPopup.Open(b,cnt.right);
        setTimeout(()=>{                     
          var inF  = document.getElementsByClassName('InputClass');   
          for(var i in inF){
            var ia = inF[i];
            if(ia.childNodes){
              if(elmX.contains(ia)){
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
    //e.target.value = f_label;    
  };

  handleAddOption= e => {
    if(typeof this.props.addFunction=== "function"){
      this._TextPopup.Close();
      this.props.addFunction();
    }       
  };



  handleClick = e => {   
    const {form,field} = this.props;    
    this.props.actions.UpdateForm(form,field,e.id); 
    this.setState({drowndropInputText:''});      
    this._TextPopup.Close();     
  };  

  loadValidation = e => {
    const {form,field,validation,placeholder} = this.props; 
    var _field = {}   
    if(validation){      
      _field['required']={};
      _field['required']['value']=true;    
      _field['required']['msg']=`${Util.translatetext(60)} ${placeholder} ${Util.translatetext(62)}`;
    }
    this.props.actions.UpdateValidationForm(form,field,_field);
  }

 
  handleDelete(){
    
  }


  refT = r => {
    this._TextPopup = r
  }
  ref = r => {
    this.Elm = r
  }
  render() {  
    const {forms,field,placeholder,
      icon,filterObserve,      
      option,
      isMobile,
      addButton,clearButton
    } = this.props;
    var _option = option;
    
    var f_label = forms?forms[field]:null;
    var fR_label = f_label?_option[f_label]?_option[f_label].name:null:null;
    var labelField = fR_label || placeholder || '';
    /*
    var validStyle = {},
    textVStyle={},
    IconColor='#777',
    IconColor2='#fff';
    var VFrom = validationForms?validationForms[field]:{};
    var isvalid = Util.ValidateField(field,placeholder,VFrom);     
    if(!isvalid.valid){    
      validStyle = {borderBottom: `1.5px solid firebrick`}
      textVStyle={color:'firebrick'}
      IconColor='firebrick';     
    }
    */
    var ItemClass = `InputSelectClass`

    
    
    var adBut = null,_clearButton=null;
    if(addButton){
      adBut =<div className="center--Container Arrows" onClick={this.handleAddOption.bind(this)}>             <Icons name={'add'} color={'#777'} size={24}/>          </div>
    }
    if(clearButton){
      _clearButton = <div className="center--Container grayStyle" onClick={this.handleCearData.bind(this)}>
      <div className="hoverDiv"/>
      <span className="text2D">{`borrar`}</span>              
    </div>    
    }
    var iconBack = <div className="center--Container Arrows"><Icons name={icon} color={'#777'} size={24}/></div>
    var heightStyle = {}  
    var OptionCont = 'OptionCont'
    if(isMobile){
      _clearButton=null;
      OptionCont = 'OptionContM'
      iconBack = <div className="center--Container Arrows" onClick={this.handleBack.bind(this)}><Icons name={`arrowBack`} color={'#777'} size={24}/></div>      
      heightStyle = {height:`100vh`}
    }
    var cmp = this.state[`drowndropInputText`].toLowerCase();
    if(cmp){    
      var h = {}
      Object.keys(option).map(o=>{
        var opt = _option[o];
        if(opt.name.toLowerCase().indexOf(cmp)>=0){
          h[opt.id]=opt;
        }
      })
      _option = h;
    }


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
        <SelectPopup ref={this.refT}  isMobile={isMobile} w={420}>
        <div className="DateContainerBox">          
          <div className="InputDateContainer1" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>
            <div className="inputWrapperCalendar">
              {iconBack}
              <div className="center--Container dateFormated">  
                <input placeholder={placeholder} className="InputClass"  value={this.state[`drowndropInputText`]} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
              </div> 
              <div className="flexSpace"/> 
              {adBut}
            </div>              
          </div>
          <div className={OptionCont}>
            {              
                Object.keys(_option).map((o,inDx)=>{
                  var opt = _option[o];
                  return(
                    <div key={`${inDx}--${opt.id}`} placeholder={placeholder} className={ItemClass} onClick={()=>{this.handleClick(opt)}}>
                      {opt.name}                  
                    </div>
                  )                  
                })
              }
          </ div> 
        </div>;
        </SelectPopup>
       
      </div>    
    ) 
  }
}

function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms[ownProps.form],
    formObserve: state.common.formObserve, 
    filterObserve: state.common.filterObserve,    
    isMobile:state.common.isMobile,
    validationForms:state.common.validationForms[ownProps.form]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputDrown);
