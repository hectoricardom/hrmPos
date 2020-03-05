import React, { Component } from 'react';
import './style.css';


export default class RippleHRM extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      rippleList:{},
      top:0,
      left:0
    };
  }


  componentDidMount() {  
    var _th_ = this;
    var RplParent = _th_._Ripple.parentNode;
    if(RplParent){      
      RplParent.addEventListener('mousedown', _th_.HandleDownClick.bind(_th_));     
    }
  } 
  
  
  componentWillUnmount(){
    var _th_ = this;
    var RplParent = _th_._Ripple.parentNode;
    if(RplParent){      
      RplParent.removeEventListener('mousedown', _th_.HandleDownClick.bind(_th_));     
    }
  }

  
  HandleDownClick(e){   
    var _th_ = this;
    let RplParent = _th_._Ripple.parentNode;    
    let xPos = e.pageX - RplParent.offsetLeft;
    let yPos = e.pageY - RplParent.offsetTop;
    var _Id = genId();
    var _rippleList = this.state.rippleList;
    _rippleList[_Id]={xPos:xPos,yPos:yPos,visible:true}
    let _open = {rippleList:_rippleList};
    _th_.setState(_open);
    setTimeout(function(){      
      let containerWidth = e.target.offsetWidth;
      let containerHeight = e.target.offsetHeight;
      let biggest = (containerWidth > containerHeight) ? containerWidth : containerHeight;      
      biggest = biggest * 1.4;
      _rippleList[_Id]={classS:'rippleHRM_close', amount:biggest ,w:containerWidth,h:containerHeight,xPos:xPos,yPos:yPos,visible:true}
      let _open2 = {rippleList:_rippleList};
      _th_.setState(_open2);   
      setTimeout(function(){
        _rippleList[_Id]={visible:false,amount:0}
        let _close2 = {rippleList:_rippleList};   
        _th_.setState(_close2);
      }, 1000);
    }, 30);
  }


  ref = r => {
    this._Ripple = r
  }


  render() {  
    var _th_ = this;
    const { color, opacity } = _th_.props;   
    const {rippleList } = _th_.state;
    var _color = color || 'rgba(0,0,0,.5)';
    var _opacity = opacity || 0.5;


    return (
            <div  ref={this.ref} className={'rippleHRM'}>
            {Object.keys(rippleList).map(rplId=>{
              var rpl = rippleList[rplId];
              if(rpl.visible){
                var _Style={
                  backgroundColor:_color,
                  opacity:_opacity,
                  left : rpl.xPos + 'px',
                  top : rpl.yPos + 'px',
                  width : rpl.amount*2 + 'px',
                  height : rpl.amount*2 + 'px'     
                }
                return (
                  <span className={`rippleHRM_effect ${rpl.classS}`} style={_Style} key={rplId}/>
                )
              }else{
                return null;
              }
            })              
          }
          </div>
         )
        
     
  }
}



function genId() {
  var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ID_LENGTH = 16;
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}