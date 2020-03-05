import React, { Component } from 'react';
import './style.css';



export default class TextPopup extends Component {
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



  Open(b,r,h){    
    var _th6 = this; 
    var orT = true;
    var left = b.left;
    if(left+305>r){
      left = r-310;
      orT = false;
    } 
    var _height = h || 60;
    var _top = document.documentElement.scrollTop + b.top;
    var _left =left;
    var orientation = orT;  
    //disableScroll()   
    _th6.setState({visible:true,orientation:orientation,height:_height,left:_left,top:_top});     
    setTimeout(()=>{  
        _th6.setState({display:true});
        setTimeout(()=>{          
          var el = _th6.MS_Elem?_th6.MS_Elem.children[0]?_th6.MS_Elem.children[0].getBoundingClientRect():null:null;  
          var _w = _th6.props.w ||  el.width;
          if((b.left+_w)>window.outerWidth){
            _left = window.outerWidth - (_w +80);
            orT = false;
          }     
          if(el){
            _th6.setState({height:el.height,width:_w,left:_left});   
          }         
        },5)
        //bodyOverflow(true);  
      },25)    
  }

  Close(e){
    var _th6 = this;      
    _th6.setState({display:false});     
    setTimeout(()=>{  
        _th6.setState({visible:false,});
        //enableScroll()    
    },25)
  }
  


  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { children, style } = this.props;
    const {visible } = this.state;  
    var _h = this.state.height;
    var _w = this.state.width;  
    var isMobile = 720;
    if(visible){ 
      const {top,left,display,orientation } = this.state;
      var _2transformOrigin = `10px 0px 0`;
      if(!orientation){
        _2transformOrigin = `295px 0px 0`;
      }
      var _style = {};
      if(display){      
        _style = {
          left:`${left-10}px`,
          top:`${top-1}px`,
          height:`${_h}px`,width:`${_w}px`,
          opacity:1,transformOrigin:_2transformOrigin,transform: `scale3d(1,1,1)`
        };
        if(window.outerWidth<=isMobile){
          if(window.outerWidth<=450){
            _style = {          
              left:`50%`,             
              marginLeft: `-145px`,
              width:`290px`,
              position:`absolute`,
              //top:`${top-1}px`,height:`${height}px`,width:`${300}px`,
              opacity:1,transformOrigin: `10px 0px 0`,transform: `scale3d(1,1,1)`
            };     
          }          
        }
      }else{
        _style = {
          left:`${left-10}px`,
          //top:`${top-1}px`,height:`${height}px`,width:`${300}px`,
          opacity:0.001,transformOrigin:_2transformOrigin,transform: `scale3d(0.8,0.8,1)`
        };
        if(window.outerWidth<=isMobile){
          if(window.outerWidth<=450){
            _style = {          
              left:`50%`,             
              marginLeft: `-145px`,
              width:`290px`,
              position:`absolute`,
              //height:`${height}px`,width:`${300}px`,top: `65px`,       
              opacity:0.001,transformOrigin:`10px 0px 0`,transform: `scale3d(0.8,0.8,1)`
            };
          }        
        }
      }    
      var dStyle = _style;
      if(_style){
        dStyle = Object.assign({}, _style, style);    
      }
      return (
        <div>
          <div  ref={this.ref} className="textPopup" style={dStyle}>
            {children}
          </div>
          <div className="hOverlay" onClick={this.Close.bind(this)}/>
        </div>
      )  
    }
    else{return(null)}
  }
}




