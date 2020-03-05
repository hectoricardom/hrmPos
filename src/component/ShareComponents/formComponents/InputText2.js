
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';


import './style.css';


class InputText2 extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      text:'',
      removeOption:false
    };
  }
  componentWillMount() { 
    const {forms,form,field} = this.props;    
    this.updateState = this.updateState.bind(this);
    this.clear = this.clear.bind(this);
    var ftext = forms[form]?forms[form][field]:null;
    if(ftext){
      this.setState({error:false,text:ftext}); 
    }
  }
  componentDidMount() {  
     
  }
  updateState(e){    
    this.setState({[e.key]:e.value});
  }

 
  handleKeyUp = e => {    
    if(e.keyCode){
      if(e.keyCode===13 || e.keyCode===27){    
        //
      } 
    }    
  };
  

OnChange(e){  
  var _th6 = this;
  const {props} = _th6;  
  const {form,field} = this.props;  
  if (typeof props.OnChange === 'function') { 
    props.OnChange(e);
  } 
}


updState(e){    
  this.setState({[e.key]:e.value});
}

handleFocus = e => {    
  this.setState({focus:true}); 
}

handleClickFocus = e => {
  var inF  = this.Elm.getElementsByTagName('input');   
  for(var i in inF){
    var ia = inF[i];            
    if(ia.childNodes){              
      if(this.Elm.contains(ia)){
        ia.focus();break;                
      }
    }
  } 
}

handleBlur = e => { 
  this.setState({focus:false}); 
}

clear = e => { 
  const { form } = this.props;  
  this.setState({error:false,text:''});
  this.props.actions.UpdateFormbyName(form,{});
}

handleChange = e => {
  const { form , field } = this.props;    
  this.setState({error:false,text:e.target.value});   
  this.props.actions.UpdateForm(form,field,e.target.value); 
  if (typeof this.props.OnChange === 'function') { 
    this.props.OnChange(e.target.value);       
  } 
};

ref = r => {
  this.Elm = r
}

render() {  
  var _th6 = this;
  const {number,email,placeholder,formObserve,forms,form,field} = this.props;
  const { label,_maxLengt,color, _text} = _th6.props;
  
  /*
  var _TexT = this.state.text || _text || '';
  var labelStyle = {} 
  var borderBottomStyle = {}
  var borderBottom = `borderBottomActive`
  var _colorS =  color || `#4285f4`;
  
  if(this.state.focus){
    labelStyle = {color:_colorS}
    borderBottom = `borderBottomActive load`
    borderBottomStyle = {backgroundColor:_colorS}
  }
  */

  var labelFl = {position: 'absolute', transform: `translate3d(0px, 15px, 0)`}
  var BoxB = {}
  if(this.state.text.length>0){
    labelFl = {position: 'absolute',transform: `translate3d(-5px, -15px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px'}    
  } 
  if(this.state.focus){
    labelFl = {position: 'absolute',color:`#1a73e8`, transform: `translate3d(-5px, -15px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px'}
    BoxB = { border: `2px solid #1a73e8`,padding: `15px 12px`}
  }
    var ftext = forms[form]?forms[form][field]:null;
    var labelField = ftext || this.state.text || '';
    var inpuType = 'text';
    if(number){
      inpuType = 'number';
    }
    if(email){
      inpuType = 'email';
    }
  return(   
    <div className="Wxwduf" style={BoxB}>
      <div className="INpyT2" ref={this.ref}>
            <input type={inpuType} value={labelField} onChange={this.handleChange} onFocus={this.handleFocus} onKeyUp={this.handleKeyUp}  onBlur={this.handleBlur} style={{}}/> 
            <div className="_label" style={labelFl} onClick={this.handleClickFocus} >{placeholder}</div>
      </div>  
    </div>     
  )   
}
}



function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputText2);
