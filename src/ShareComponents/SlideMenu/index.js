import React, { Component } from 'react';
import './style.css';




export default class SlideMenu extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,
      height:0,
      orientation:false
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
    this.Open = this.Open.bind(this);
    this.Close = this.Close.bind(this);
  }



  Open(){    
    var _th6 = this;    
    _th6.setState({visible:true});     
    setTimeout(()=>{  
        _th6.setState({display:true});
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
  


  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { children,overlay, orientation } = this.props;    
    var OrT = 'left',InitPs = '-110';
    var _Style={opacity:1,transform: `translate3d(${InitPs}%, 0, 0)`}
    _Style[OrT]=0;
    var _overLay = null;     
    if(this.state.visible){
      _Style={opacity:1,transform: `translate3d(0, 0, 0)`}
      _Style[OrT]=0; 
      _overLay = <div className="SlideMenuOverlay" onClick={this.Close.bind(this)}/>;  
      if(overlay){
        _overLay = <div className="SlideMenuOverlay" onClick={this.Close.bind(this)}/>; 
      }      
    } 
      return (
        <div>
          <div className="SlideMenu" style={_Style}>
            {children}
          </div>
          {_overLay}
        </div>
      ) 
  }
}
















