

import React, { Component } from 'react';
import Icons from '../Icons/Icons';
import RippleHRM from '../RippleHRM';
import './style.css';

export default class RadioBoxHRM extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active : false,
      removeOption:false
    };
  }
  componentWillMount() {
    const { initvalue} = this.props;
    if(initvalue){
      this.setState({active:initvalue});
    }      
  }

  componentWillReceiveProps(nextProps){
    var _initvalue = this.props.initvalue?this.props.initvalue:null;
    var next_initvalue = nextProps.initvalue?nextProps.initvalue:null;
    if(_initvalue!==next_initvalue){      
      this.setState({active:next_initvalue});
    }
  }

  componentDidMount() {  
     
  }

  


  handleChange(e){   
    var _th6 = this;
    if(typeof _th6.props.updChange === 'function') {      
      _th6.props.updChange(e);
    }    
    _th6.setState({active:e});
  }


  render() {
    var _th6 = this;
    // <div className={`toggle-container ptoggle-button ${this.state[`active`]?'_active':''}`} onClick={this.handleChange} >
    const {labels} = this.props;
    return (    
        <div className={`radioBtnHRM_wrapper`}>
          {labels && labels.map(lb=>{
            return(
                <label className={`radioBtnHRM ${_th6.state[`active`]===lb?'_active':''}`} onClick={_th6.handleChange.bind(_th6,lb)} key={lb}>    
                  <RippleHRM color={'#64B5F6'}/>       
                  <div  className={"_icon_checked_"} >                    
                    <Icons name={_th6.state[`active`]===lb?'radio_checked':'radio_unchecked'} size={24}/>
                  </div>     
                  <span>{lb}</span>        
                </label>
            )
          })
             
        }       
        </div> 
    )       
    
  }
}


