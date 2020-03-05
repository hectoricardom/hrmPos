



import React, { Component } from 'react';
import {Util} from '..';
import './style.css';



export default class Toast extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          lastHover:null
        };
    }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
  
  }



  Open(tm){    
    var _th6 = this;     
    _th6.setState({visible:true});     
    setTimeout(()=>{  
        _th6.setState({display:true});
        var Timer = tm || 3000;
        setTimeout(()=>{
            _th6.setState({visible:false});
        },Timer)
        //bodyOverflow(true);  
      },25)    
  }

  Close(e){
    var _th6 = this;      
    _th6.setState({display:false});     
    setTimeout(()=>{  
        _th6.setState({visible:false});
        //enableScroll()    
    },25)
  }

  handleStatus =e=>{
    var _th6_ = this;
    const {props} = _th6_;
    _th6_.Close();
    if (typeof props.Confirm === 'function') {
        props.Confirm(true);
    }
  }

  handleCancel =e=>{
    var _th6_ = this;
    const {props} = _th6_;
    _th6_.Close();
    if (typeof props.Decline === 'function') {
        props.Decline(true);
    }
  }

  ref = r => {
    this.MS_Elem = r
  }


  render() {  
    const {  color, text, opacity, cancelButton, cancelButtonText, buttonText, top } = this.props;
    const {visible } = this.state;
    var _Color = color || `rgb(0, 145, 234)`;
    if(visible){ 
      const {display } = this.state;
      /*
      var _2transformOrigin = `10px 0px 0`;
      if(!orientation){
        _2transformOrigin = `295px 0px 0`;
      }
      */
      if(display){
      var Tstyle= {}
      var classT ="toast"
      var _text = text
      if(this.state.visible){ 
        classT ="toast active";
        Tstyle= {opacity:0} 
        if(top){
            Tstyle= {opacity:opacity || 1,top:`${top}px` || `80px`} 
        }
        }
        var _cancelButton_ = null,_buttonText_ = `Ok`;
        if(cancelButton){
            var cancelButtonStyle = {color:`#fff`}
            var _CancelText =  cancelButtonText || Util.translatetext(28) || 'Cancelar';
            _cancelButton_ = <button className="md-button md-ink-ripple" type="button" style={cancelButtonStyle} onClick={this.handleCancel}>{_CancelText}</button>
        } 
        
        if(buttonText){
             _buttonText_ = buttonText     
        }
        var toastButtonStyle = {color:_Color}
        return (
            <div ref={this.ref}> 
                <div className={'TtBase_Toast'}>        
                    <div className={classT} style={Tstyle}>
                        <div className="text">{_text}</div>
                        <div className="actions">
                            {_cancelButton_}
                            <button className="md-button md-ink-ripple" type="button" style={toastButtonStyle} onClick={this.handleStatus}>{_buttonText_}</button>
                        </div>
                    </div>
                </div>
            </div>
        );  
    }
    else{return(null)}
  }else{return(null)}
}
}