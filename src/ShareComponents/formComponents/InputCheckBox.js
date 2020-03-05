

import React, { Component } from 'react';

import './style.css';

export default class InputCheckBox extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active : false,
      removeOption:false
    };
  }
  componentWillMount() {    
    this.updateState = this.updateState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    const { initvalue} = this.props; 
    if(initvalue){
      this.setState({active:initvalue});
    }
    /*
    const { common,form,field} = this.props;  
    const {forms} = common;
    if(!forms[form]){
      forms[form] = {}
    }
    if(forms[form] && !forms[form][field]){
      forms[form][field] = false;
    }
    this.props.actions.UpdateForm(form,field,false);
    this.setState({active:forms[form][field]});
    */
  }
  componentDidMount() {  
     
  }
  updateState(e){
    this.setState({[e.key]:e.value});
  }


  handleChange(e){    
    if(this.state.active){
      //this.props.actions.UpdateForm(form,field,false);
      this.setState({active:false});
      if (typeof this.props.updChange === 'function') {      
        this.props.updChange(false)
      }
    }else{
      this.setState({active:true});
      if (typeof this.props.updChange === 'function') {      
        this.props.updChange(true)
      }
    }

  }

  render() {  
    var _Style2={transform: `translate(0px, 0)`,backgroundColor: 'var(--checkBox--button--color)'}
    if(this.state[`active`]){
      _Style2={transform: `translate(16px, 0)`,backgroundColor: 'var(--checkBox--button--Active--color)'}
    }
  
    return (    
        <div className="toggle-container ptoggle-button" onClick={this.handleChange}>
          <div id="toggleBar" className="toggle-bar ptoggle-button"></div>
          <div id="toggleButton" className="toggle-button ptoggle-button" style={_Style2} >
            <div id="background" className="pripple" style={{opacity: 0.00448}}></div>
            <div id="waves" className="pripple"></div>
          </div>
          <div className="toggle-label ptoggle-button"></div>
        </div> 
    )       
    
  }
}


