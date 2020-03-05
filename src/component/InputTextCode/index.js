
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as Util from '../../state/Util';

import './style.css';


class InputTextCode extends Component {
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
    const {forms,form,field} = this.props;    
    this.updateState = this.updateState.bind(this);
    this.clear = this.clear.bind(this);
    var ftext = forms[form]?forms[form][field]:null;
    if(ftext){
      this.setState({error:false,text:ftext}); 
    }
  }

  componentWillReceiveProps(nextProps){
    /*var _id = this.props.item?this.props.item.id:null;
    var next_id = nextProps.item?nextProps.item.id:null;
    if(_id!==next_id){      
     
      this.setState({index:0,transition:true,item:this.props.item,nextItem:nextProps.item})      
      setTimeout(()=>{  this.setState({transition:false,item:nextProps.item})  },300)
    }*/
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
  const { form , email, ssn, address, date, phone, field } = this.props;  
  var v = e.target.value;  
  var valid = {v:true,m:''};
  var _minuSpace = new RegExp('- ','g');
  v = v.toUpperCase().replace(_minuSpace,'');
  /*if(email){
    Util.emailValidate(v)?valid={v:true,m:''}:valid={v:false,m:'email not valid'};
  }
  if(ssn){
    Util.ssnValidate(v)?valid={v:true,m:''}:valid={v:false,m:'ssn not valid'};
  }
  if(phone){
    Util.phoneValidate(v)?valid={v:true,m:''}:valid={v:false,m:'phone not valid'};
  }
  if(date){
    Util.dobValidate(v)?valid={v:true,m:''}:valid={v:false,m:'date not valid'};
  }
  if(address){
    //Util.getAddress(v);
  }*/
  this.setState({text:v,valid:valid.v,msg:valid.m});   
  this.props.actions.UpdateForm(form,field,v);
  if (typeof this.props.OnChange === 'function') { 
    this.props.OnChange(v);       
  } 
};

ref = r => {
  this.Elm = r
}

render() {  
  var _th6 = this;
  const {number,email,placeholder,formObserve,dark,forms,form,field} = this.props;

  var labelFl = {position: 'absolute', transform: `scale(1)`}
  var BoxB = {}
  var inpSty = {}
  var ftext = forms[form]?forms[form][field]:null;    
  var labelField = ftext || '';
  if(labelField.length>0){
    labelFl = {position: 'absolute',transform: `scale(0)`}; 
  } 
  /*
  var labelFl = {position: 'absolute', transform: `translate3d(0px, 15px, 0)`}
  if(labelField.length>0){
    labelFl = {position: 'absolute',transform: `translate3d(-5px, -15px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'1px'}    
  } 
  if(this.state.focus){
    labelFl = {position: 'absolute',color:`#1a73e8`, transform: `translate3d(-5px, -15px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px'}
    BoxB = { border: `1px solid #1a73e8`,padding: `15px 12px`}
  }
  if(!this.state.valid){
    labelFl = {position: 'absolute',color:`#b71c1c`, transform: `translate3d(-5px, -15px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px'}
    BoxB = { border: `1px solid #b71c1c`,padding: `15px 12px`}
  }
*/
 
    var inpuType = 'text';
    if(number){
      inpuType = 'number';
    }
    if(email){
      inpuType = 'email';
    }  
  return(   
    <div className="codeIt" style={BoxB} onClick={this.handleClickFocus} ref={this.ref}>      
            <input type={inpuType} value={labelField} onChange={this.handleChange} onFocus={this.handleFocus} onKeyUp={this.handleKeyUp}  onBlur={this.handleBlur} style={inpSty}/>
            <div className="_label" style={labelFl} >{' - - - - - - '}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InputTextCode);



