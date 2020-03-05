import React, { Component } from 'react';
import './style.css';



export default class LoadingColorSpinner extends Component {
  
  render() {
    var _th6 = this;

    var style  = {
      position: 'relative',
      width: _th6.props.width+'px' || '100px',
      height: _th6.props.height+'px' || '100px',
      
    }
    var classCircle  = 'spinnerPath', styleCircle={}
    if(this.props.stroke){
      classCircle = 'spinnerPathWC';
      styleCircle={stroke:this.props.stroke};
    }
    
    return (
      <div id="loadingSpinner"  style={style}>
        <svg className="spinnerSvg" viewBox="25 25 50 50">
            <circle className={classCircle} cx="50" cy="50" r="20" fill="none" style={styleCircle} strokeWidth="2" strokeMiterlimit="10"></circle>
        </svg>
    </div>
    );
  }
}
