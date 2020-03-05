

import React, { Component } from 'react';
import {Util} from '..';

import './style.css';




export default class AppToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      index:'',
      total : 0,
      ScreenWidth:0,
      totalWidth:0,
      ActionWidth:0,
      ActionRWidth:0,
      pointerDown:false,
      startX:0,
      verticalSwipe:false,
      _ViewSlidePosition:0,
      _lastSlidePosition:0,
      letItGo:null,
      buttons:false,
      preventClick:false,
      cursor:'-webkit-grab',
      startY:0,
      endX:0

    };
  }
  componentWillMount() {
    
  }
  componentWillUnmount() {
    var selector =  this.tabsElm.children[0];
    selector.removeEventListener('touchstart', this.touchstartHandler);
    selector.removeEventListener('touchend', this.touchendHandler);
    selector.removeEventListener('touchmove', this.touchmoveHandler);

    // Mouse events 
    selector.removeEventListener('mousedown', this.mousedownHandler);
    selector.removeEventListener('mouseup', this.mouseupHandler);
    selector.removeEventListener('mouseleave', this.mouseleaveHandler);  
    selector.removeEventListener('mousemove', this.mousemoveHandler);  
  }
  componentDidMount() {  
    var selector =  this.tabsElm.children[0];
    this.touchstartHandler = this.touchstartHandler.bind(this)
    this.touchendHandler = this.touchendHandler.bind(this)
    this.touchmoveHandler = this.touchmoveHandler.bind(this)
    this.mousedownHandler = this.mousedownHandler.bind(this)
    this.mouseupHandler = this.mouseupHandler.bind(this)
    this.mouseleaveHandler = this.mouseleaveHandler.bind(this)
    this.mousemoveHandler = this.mousemoveHandler.bind(this)
    this.updateState = this.updateState.bind(this)
    this.buttonUpd = this.buttonUpd.bind(this)
    
    

    selector.addEventListener('touchstart', this.touchstartHandler);
    selector.addEventListener('touchend', this.touchendHandler);
    selector.addEventListener('touchmove', this.touchmoveHandler);

    // Mouse events
    selector.addEventListener('mousedown', this.mousedownHandler);
    selector.addEventListener('mouseup', this.mouseupHandler);
    selector.addEventListener('mouseleave', this.mouseleaveHandler);
    selector.addEventListener('mousemove', this.mousemoveHandler);
    
  }
  
  ref = el => {
    this.tabsElm = el;
  }

  

  /**
   * touchstart event handler
   * transform: translate3d(0, 0, 0)
   * 
   * 
   */
  touchstartHandler(e) {
    // Prevent dragging / swiping on inputs, selects and textareas
    var ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1;
    if (ignoreSiema) {
      return;
    }
    e.stopPropagation();
    this.pointerDown = true;    
    const {totalWidth,ActionWidth,_ViewSlidePosition} = this.state;
    if(!totalWidth){
      var CSlidesContainer = this.tabsElm.getElementsByClassName('CSlidesContainer')[0];
      if(CSlidesContainer.getBoundingClientRect().width && totalWidth!==CSlidesContainer.getBoundingClientRect().width){
        this.setState({totalWidth:CSlidesContainer.getBoundingClientRect().width});
      }
    }
    if(!ActionWidth){
      var tt = this.tabsElm.getElementsByClassName('tabsContainer')[0];
      if(tt.getBoundingClientRect().width && totalWidth!==tt.getBoundingClientRect().width){
        this.setState({ActionRWidth:tt.getBoundingClientRect().width*-1});
      }
    }
    //this.startX = e.touches[0].pageX;startX:e.touches[0].pageX
    //this.startY = e.touches[0].pageY;
    this.setState({pointerDown:true,startX:e.touches[0].pageX,startY:e.touches[0].pageY,_lastSlidePosition:_ViewSlidePosition})
  }


  /**
   * touchend event handler
   */
  touchendHandler(e) {
    e.stopPropagation();
    //e.preventDefault();
    const {endX,endY,startY,verticalSwipe} = this.state;    
    if(verticalSwipe && endY){
      var diifY = endY-startY
      if(diifY>60){
        if (typeof this.props.onDownSwipe === 'function') {      
          this.props.onDownSwipe(true);      
        }
      }else if(diifY<60){
        if (typeof this.props.onUpSwipe === 'function') {      
          this.props.onUpSwipe(true);      
        }        
      }
    }else if (endX) {      
      /*var diif = endX-startX,ledft2 = this.state._ViewSlidePosition;          
      if(diif>10){
        ledft2 = (this.state._ViewSlidePosition + diif);
      }
      if(diif<10){
        ledft2 = (this.state._ViewSlidePosition + diif);
      }*/
      //this.setState({_ViewSlidePosition:ledft2,pointerDown:false});
      this.setState({pointerDown:false});
    }
    this.clearDrag();
  }



  /**
   * touchmove event handler
   */
  touchmoveHandler(e) {
    e.stopPropagation();    
    const {letItGo,pointerDown,startY,startX,ActionRWidth,_lastSlidePosition} = this.state;
    if (letItGo === null) {
      var _letItGo = Math.abs(startY - e.touches[0].pageY) < Math.abs(startX - e.touches[0].pageX);  
      if(_letItGo){ 
        this.setState({letItGo:_letItGo});
      }
    }
    var _verticalSwipe = Math.abs(startY - e.touches[0].pageY) > Math.abs(startX - e.touches[0].pageX);
    if(_verticalSwipe){
      this.setState({verticalSwipe:_verticalSwipe,endY:e.touches[0].pageY});    
    }
    if (pointerDown && letItGo) {
      e.preventDefault(); 
      var ledft2 = _lastSlidePosition
      var diif = e.touches[0].pageX-startX;    
      if(e.touches[0].pageX){
        if(diif>25 || diif<-25){
          ledft2 =diif/1+_lastSlidePosition;
          if(ledft2<ActionRWidth){          
            ledft2 = ActionRWidth;
          }          
          if(ledft2>0){
            ledft2 = 0;
          } 
          //console.log(_lastSlidePosition,'  +  ',diif,'  =  ',ledft2)  
        }
      }
        
      
      this.setState({endX:e.touches[0].pageX,_ViewSlidePosition:ledft2});
    }
  }


  /**
   * mousedown event handler
   */
  mousedownHandler(e) {
    var ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1;
    if (ignoreSiema) {
      return;
    }       
    e.stopPropagation();  
    const {totalWidth,_ViewSlidePosition} = this.state;    
    
    var CSlidesContainer = this.tabsElm.getElementsByClassName('CSlidesContainer')[0];
    if(CSlidesContainer && CSlidesContainer.getBoundingClientRect().width && totalWidth!==CSlidesContainer.getBoundingClientRect().width){
      this.setState({totalWidth:CSlidesContainer.getBoundingClientRect().width});
    }    
    var tt = this.tabsElm.getElementsByClassName('tabsContainer')[0];
    if(tt && tt.getBoundingClientRect().width && totalWidth!==tt.getBoundingClientRect().width){
      this.setState({ActionRWidth:tt.getBoundingClientRect().width});
    }
    
    //this.startX = e.touches[0].pageX;startX:e.touches[0].pageX
    //this.startY = e.touches[0].pageY;
    this.setState({pointerDown:true,startX:e.pageX,startY:e.pageY,_lastSlidePosition:_ViewSlidePosition,cursor:'-webkit-grab'})
  }



  /**
   * mousemove event handler
   */
  mousemoveHandler(e) {
    

     e.stopPropagation();    
     const {letItGo,pointerDown,startY,startX,ActionRWidth,totalWidth, _lastSlidePosition} = this.state;
     var _letItGo = letItGo;
     if (_letItGo === null) {
       _letItGo = Math.abs(startY - e.pageY) < Math.abs(startX - e.pageX);  
       if(_letItGo){ 
         this.setState({letItGo:_letItGo});
       }
     }
     var _verticalSwipe = Math.abs(startY - e.pageY) > Math.abs(startX - e.pageX);
     if(_verticalSwipe){
       this.setState({verticalSwipe:_verticalSwipe,endY:e.pageY});    
     }
     
    if (pointerDown && _letItGo) {
      var Aplus = 0;
      var st = (ActionRWidth-totalWidth);
      if (st>0){
        e.preventDefault(); 
        var ledft2 = _lastSlidePosition
        var diif = e.pageX-startX;    
        if(e.pageX){
          if( diif>25 || diif<-25){
            ledft2 =diif/1+_lastSlidePosition;         
            if(ledft2>0){
              ledft2 = 0;
            } 
            if(ledft2<(st+Aplus)*-1){
              ledft2 = (st+Aplus)*-1;
            }         
          } 
        }               
        this.setState({endX:e.pageX,_ViewSlidePosition:ledft2,cursor:'-webkit-grabbing'});
      }
    }    
  }


  /**
   * mouseleave event handler
   */
  mouseleaveHandler(e) {
    e.stopPropagation();    
    this.clearDrag();
  }


  mouseupHandler(e) {
    e.stopPropagation();    
    this.clearDrag();
  }


clearDrag() {  
  this.setState({
      startX: 0,
      endX: 0,
      endY: 0,
      startY: 0,
      letItGo: null,
      pointerDown:false,
      cursor:'-webkit-grab',
      preventClick: false
    })
  }


  enableTransition() {
  
  }

  updateAfterDrag() {
    /*
    var rtl = 1;
    const {endX,startX} = this.state;
    const movement = (rtl ? -1 : 1) * (endX - startX);
    const movementDistance = Math.abs(movement);   
    */
  }

  
  TabPositionHandler(d) {
    const {ActionRWidth,totalWidth,_ViewSlidePosition} = this.state; 
    var st = (ActionRWidth-totalWidth);
    if (st>0){ 
      var Aplus = 0;
      var ledft2 = _ViewSlidePosition - (totalWidth)*-1;
      if(d){
        ledft2 = _ViewSlidePosition + (totalWidth)*-1;
      }
      if(ledft2>0){
          ledft2 = 0;
      }
      if(ledft2<(st+Aplus)*-1){
          ledft2 = (st+Aplus)*-1;
      }
      this.setState({_ViewSlidePosition:ledft2}); 
    }  
  }


  ClickTabPositionHandler(i) {
    const {ActionRWidth,totalWidth} = this.state; 
    var st = (ActionRWidth-totalWidth);    
    if (st>0){   
      const {items} = this.props; 
      var Aplus = 0;
      
      var Clickwidth = 0;
      Util.ObjectKeys(items).map(s=>{
        if(s<i){
          let it = items[s];
          Clickwidth += it['width']
        }
        if(s===i){
          let it = items[s];        
          Clickwidth += it['width']/2
        }
      });
      var ledft2 = (Clickwidth-(totalWidth/2))*-1;              
      if(ledft2>0){
        ledft2 = 0;
      } 
      if(ledft2<(st+Aplus)*-1){
        ledft2 = (st+Aplus)*-1;
      }       
      this.setState({_ViewSlidePosition:ledft2});    
   }    
 }








  updateState(e){  
    var _th_ = this; 
    if (typeof _th_.setState === 'function') {
      _th_.setState({[e.key]:e.value});  
    }    
  } 

  updateTotalWidth(){  
    const {totalWidth,ActionRWidth,ScreenWidth} = this.state; 
    if(this.tabsElm){
      var CSlidesContainer = this.tabsElm.getElementsByClassName('CSlidesContainer')?this.tabsElm.getElementsByClassName('CSlidesContainer')[0]:null;
      if(CSlidesContainer && CSlidesContainer.getBoundingClientRect().width && totalWidth!==CSlidesContainer.getBoundingClientRect().width){
        this.setState({totalWidth:CSlidesContainer.getBoundingClientRect().width});
      }
      var tt = this.tabsElm.getElementsByClassName('tabsContainer')[0];
      if(tt && tt.getBoundingClientRect().width && ActionRWidth!==tt.getBoundingClientRect().width){
        this.setState({ActionRWidth:tt.getBoundingClientRect().width});
      }
      if(ScreenWidth-window.outerWidth>25){
        this.setState({ScreenWidth:window.outerWidth});
        this.ClickTabPositionHandler(this.props._index);
      }else if(ScreenWidth-window.outerWidth<-25){
        this.setState({ScreenWidth:window.outerWidth});
        this.ClickTabPositionHandler(this.props._index);
      }
      
    }        
  } 

  buttonUpd(e){
    if (typeof this.props.buttonUpd === 'function') {
      this.props.buttonUpd(e);
    } 
    this.setState({buttons:e});
  } 

  render() {
    const {children} = this.props;    
    const {cursor,buttons,totalWidth,_ViewSlidePosition,ActionRWidth} = this.state;
    var ledft2 =0;
    var st = (ActionRWidth-totalWidth);
    if (st>0){
      if(!buttons){
        this.buttonUpd(true)
      }
      ledft2 =_ViewSlidePosition;
    }
    else{
      if(buttons){
        this.buttonUpd(false)
      }
    }
    this.updateTotalWidth()
    return (
      <div className="CSlidesbase"  ref={this.ref}>
        <div className="CSlidesDrag" style={{ margin: '0 auto',overflowX:'hidden',cursor:cursor}}> 
          <div  className="CSlidesContainer siema" style={{transform: `translate3d(${ledft2}px, 0, 0)`}}>                  
            {children}     
          </div>
        </div>
     </div>
    );
  }
}


