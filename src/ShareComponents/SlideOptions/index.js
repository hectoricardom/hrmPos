import React, { Component } from 'react';
import './style.css';




export default class SlideOptions extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,
      height:0,
      id:null,
      orientation:false
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
    this.Open = this.Open.bind(this);
    this.Close = this.Close.bind(this);
  }



  Open(id){    
    var _th6 = this;    
    _th6.setState({visible:true,id:id});     
    setTimeout(()=>{  
        _th6.setState({display:true});
        if(typeof _th6.props.onOpen === "function"){ 
          _th6.props.onOpen()
        }
        //bodyOverflow(true);  
      },25)    
  }

  Close(e){
    var _th6 = this;      
    _th6.setState({display:false});     
    setTimeout(()=>{  
        _th6.setState({visible:false});
        if(typeof _th6.props.onClose === "function"){ 
          _th6.props.onClose()
        }
        //enableScroll()    
    },75)
  }
  


  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { children,h_perc, z_index } = this.props; 
    var _Style={"--slide-option-heigth-perc--":'400px',"--slide-option-z-index--":250}
    if(h_perc){
      _Style["--slide-option-heigth-perc--"]=h_perc+'px';
    }
    if(z_index){
      _Style["--slide-option-z-index--"] = z_index;
    }

    var ts = this.state.id === this.props._id && this.state.visible?{transform:` translate3d(0, var(--slide-option-heigth-perc--), 0)`,opacity: 1}:{transform:` translate3d(0, 200%, 0)`,opacity: 0};
    
  
    
      return (
        <div className={this.state.id === this.props._id && this.state.visible?'active':''} style={_Style}>
          <div className="SlideOption" style={ts}>
            {children}
          </div>
          {this.state.visible?<div className={`SlideOptionOverlay ${this.state.display?'show':''}`} onClick={this.Close.bind(this)}/> :null}        
        </div>
      ) 
  }
}
















