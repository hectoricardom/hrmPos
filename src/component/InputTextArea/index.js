
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as Util from '../../state/Util';

import './style.css';


class InputTextArea extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      text:'',
      valid:true,
      msg:'',
      removeOption:false
    };
  }
  componentWillMount() { 
    const {form,field} = this.props;    
    this.updateState = this.updateState.bind(this);
    this.clear = this.clear.bind(this);    
    const { initvalue} = this.props;
    if(initvalue){
      this.setState({text:initvalue});
      this.props.actions.UpdateForm(form,field,initvalue);
    } 
  }

  componentWillReceiveProps(nextProps){
    const {form,field} = this.props; 
    var _initvalue = this.props.initvalue?this.props.initvalue:null;
    var next_initvalue = nextProps.initvalue?nextProps.initvalue:null;
    if(_initvalue!==next_initvalue){
      this.setState({text:next_initvalue});
      this.props.actions.UpdateForm(form,field,next_initvalue);
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
      }else{        
      } 
    }    
  };
  

OnChange(e){  
  var _th6 = this;
  const {props} = _th6;  
  const {form,field,email,address} = this.props;    
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
  const { form , field, charLimit } = this.props;  
  var v = e.target.value;
  var valid = {v:true,m:''};  
    v = v.replace(/\n/g, "");
    if(charLimit<v.length){
      valid={v:false,m:'limit exceded'};
    }
    this.setState({text:v,valid:valid.v,msg:valid.m});   
    this.props.actions.UpdateForm(form,field,v);
    if (typeof this.props.OnChange === 'function') { 
      this.props.OnChange(v);       
    }
  }


ref = r => {
  this.Elm = r
}

render() {  
  var _th6 = this;
  const {number,email,placeholder,formObserve,dark,forms,form,field,password,charLimit, _rw } = this.props;
  var _row = _rw | 2;
  var _charLimit = charLimit || 100;
  var labelFl = {position: 'absolute', transform: `translate3d(0px, 2px, 0)`}
  var BoxB = {}
  var inpSty = {}
  var ftext = forms[form]?forms[form][field]:this.state.text?this.state.text:null;    
  var labelField = ftext || '';
  var isText = this.state.text?this.state.text.toString().length:0;
  if(isText>0){
    labelFl = {position: 'absolute',transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px',color:`#4d4d4d`,fontWeight:'bold'}    
  } 
  if(this.state.focus){
    labelFl = {position: 'absolute',color:`var(--color-base--hover)`, transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px',fontWeight:'bold'}
    BoxB = { border: `2px solid var(--color-base--hover)`
    ,padding: `15px 12px`
   }
  }
  if(!this.state.valid){
    labelFl = {position: 'absolute',color:`#b71c1c`, transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px',fontWeight:'bold'}
    BoxB = { border: `2px solid #b71c1c`
    ,padding: `15px 12px`
   }
  }
//<div className="INpyT2"  ></div>  
   
  var placeholderText = this.state.msg || placeholder;
  var inpuType = 'textarea';  
  
  return(   
    <div className="WxwdufTextArea" style={BoxB} onClick={this.handleClickFocus} ref={this.ref}>      
        <textarea rows={_row} cols="50" value={labelField} onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={this.handleKeyUp.bind(this)}  onBlur={this.handleBlur} style={inpSty}/> 
        <div className="_label" style={labelFl} >{placeholderText}</div>
        <div className={`_char_counter ${this.state.focus?!this.state.valid?"active inValid":"active":""}`} >{`${labelField.toString().length}/${_charLimit} `}</div>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(InputTextArea);



