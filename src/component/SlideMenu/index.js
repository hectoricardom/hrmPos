import React, { Component } from 'react';
import * as Util from '../../state/Util';
import Icons from '../Icons/Icons';

import ResizeObserve from '../resize-obsv';

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
  componentWillMount(){
   
  }



  Open(){    
    var _th6 = this;   
    const {  overlay } = _th6.props;  
    _th6.setState({visible:true});     
    setTimeout(()=>{  
        _th6.setState({display:true});       
        if(!overlay){
          Util.changethemeKey('light','--app-body-content-wapper--left--','240px');
          Util.changethemeKey('light','--app-body-content-wapper--','calc(100% - 280px)');
        }
        //bodyOverflow(true);  
      },25)    
  }

  Close(e){
    var _th6 = this;    
    const {  overlay } = _th6.props;  
    _th6.setState({display:false});     
    setTimeout(()=>{  
        _th6.setState({visible:false});    
        if(!overlay){
          Util.changethemeKey('light','--app-body-content-wapper--left--','0px');
          Util.changethemeKey('light','--app-body-content-wapper--','100%');
        }
        //enableScroll()    
    },25)
  }
  

  Resize(e){
    var _th6 = this;
    const {  overlay } = _th6.props; 
    if(_th6.state.visible){
      if(e.w<800){
        if(!overlay){         
          _th6.Close();
        }
      }else{
        if(!overlay){
          _th6.Open();
        }
      }
    }
    /*const {  overlay } = _th6.props;  
    _th6.setState({display:false});     
    setTimeout(()=>{  
        _th6.setState({visible:false});    
        if(!overlay){
          
        }
        //enableScroll()    
    },25)
    */
  }


  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { children, overlay } = this.props;    
    //var OrT = 'left'; var _Style = {};_Style[OrT]=0; let InitPs = '-110';
    var _overLay = null;    
    var  _closebtn = null;
    if(this.state.visible){
      //_overLay = <div className="SlideMenuOverlay" onClick={this.Close.bind(this)}/>;  
      if(overlay){_overLay = <div className="SlideMenuOverlay" onClick={this.Close.bind(this)}/>; }
      if(!overlay){_closebtn =   <div className={`__icons__menu__slide_nav`}  onClick={this.Close.bind(this)}><Icons name={'menu'} color={'#555'} size={24}/></div> } 
    } 
      return (
        <div>
          
          <ResizeObserve sizehandler={this.Resize.bind(this)}/>
          <div className={`SlideMenu ${this.state.visible?'show':''}`}>
            {children}
          </div>
          {_overLay}
        </div>
      ) 
  }
}
















