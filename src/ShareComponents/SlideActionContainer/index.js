

import React, { Component } from 'react';

import './style.css';

export default class SlideAction extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      index:'',
      total : 0,
      ScreenWidth:0,
      totalWidth:0,
      ActionWidth:0,
      pointerDown:false,
      startX:0,
      verticalSwipe:false,
      _ViewSlidePosition:0,
      _lastSlidePosition:0,
      letItGo:null,
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
  }
  componentDidMount() {  
    var selector =  this.tabsElm.children[0];
    this.touchstartHandler = this.touchstartHandler.bind(this)
    this.touchendHandler = this.touchendHandler.bind(this)
    this.touchmoveHandler = this.touchmoveHandler.bind(this)
    this.mousedownHandler = this.mousedownHandler.bind(this)
    this.mouseupHandler = this.mouseupHandler.bind(this)
    this.mouseleaveHandler = this.mouseleaveHandler.bind(this)
    this.updateState = this.updateState.bind(this)
    

    selector.addEventListener('touchstart', this.touchstartHandler);
    selector.addEventListener('touchend', this.touchendHandler);
    selector.addEventListener('touchmove', this.touchmoveHandler);

    // Mouse events
    selector.addEventListener('mousedown', this.mousedownHandler);
    selector.addEventListener('mouseup', this.mouseupHandler);
    selector.addEventListener('mouseleave', this.mouseleaveHandler);
    
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
      var tt = this.tabsElm.getElementsByClassName('actionSlideIconContainer')[0];
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
    // Prevent dragging / swiping on inputs, selects and textareas
    var ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1;
    if (ignoreSiema) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.setState({pointerDown:true,startX:e.pageX})
  }


  mouseupHandler(e) {
    e.stopPropagation();
    const {endX} = this.state;
    this.setState({pointerDown:false,startX:e.pageX})
    //this.selector.style.cursor = '-webkit-grab';
    this.enableTransition();
    if (endX) {
      //this.updateAfterDrag();
    }
    this.clearDrag();
  }


  /**
   * mousemove event handler
   */
  mousemoveHandler(e) {
    e.preventDefault();
    const {pointerDown} = this.state;
    if (pointerDown) {
      // if dragged element is a link
      // mark preventClick prop as a true
      // to detemine about browser redirection later on
      if (e.target.nodeName === 'A') {
        this.setState({preventClick:true});        
      }
      this.setState({endX:e.pageX,cursor:'-webkit-grabbing'})    
      /*
      this.selector.style.cursor = '-webkit-grabbing';
      this.sliderFrame.style.webkitTransition = `all 0ms ${this.config.easing}`;
      this.sliderFrame.style.transition = `all 0ms ${this.config.easing}`;

      const currentSlide = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide;
      const currentOffset = currentSlide * (this.selectorWidth / this.perPage);
      const dragOffset = (endX - startX);
      const offset = this.config.rtl ? currentOffset + dragOffset : currentOffset - dragOffset;
      this.sliderFrame.style[this.transformProperty] = `translate3d(${(this.config.rtl ? 1 : -1) * offset}px, 0, 0)`;
      */
    }
  }


  /**
   * mouseleave event handler
   */
  mouseleaveHandler(e) {
    const {pointerDown} = this.state;
    if (pointerDown) {
      this.setState({endX:e.pageX,preventClick:false,pointerDown:false,cursor:'-webkit-grab'})
      //this.selector.style.cursor = '-webkit-grab';      
      this.enableTransition();
      //this.updateAfterDrag();
      this.clearDrag();
    }
  }



clearDrag() {  
  this.setState({
      startX: 0,
      endX: 0,
      endY: 0,
      startY: 0,
      letItGo: null,
      preventClick: false
    })
  }


  enableTransition() {
   //this.sliderFrame.style.webkitTransition = `all ${this.config.duration}ms ${this.config.easing}`;
    //this.sliderFrame.style.transition = `all ${this.config.duration}ms ${this.config.easing}`;
  }

  updateAfterDrag() {
    /*var rtl = 1;
    const {endX,startX} = this.state;
    const movement = (rtl ? -1 : 1) * (endX - startX);

    const movementDistance = Math.abs(movement);    
    const howManySliderToSlide = this.config.multipleDrag ? Math.ceil(movementDistance / (this.selectorWidth / this.perPage)) : 1;

    const slideToNegativeClone = movement > 0 && this.currentSlide - howManySliderToSlide < 0;
    const slideToPositiveClone = movement < 0 && this.currentSlide + howManySliderToSlide > this.innerElements.length - this.perPage;

    if (movement > 0 && movementDistance > this.config.threshold && this.innerElements.length > this.perPage) {
      this.prev(howManySliderToSlide);
    }
    else if (movement < 0 && movementDistance > this.config.threshold && this.innerElements.length > this.perPage) {
      this.next(howManySliderToSlide);
    }
    this.slideToCurrent(slideToNegativeClone || slideToPositiveClone);
    */
  }


  updateState(e){  
    var _th_ = this; 
    if (typeof _th_.setState === 'function') {
      _th_.setState({[e.key]:e.value});  
    }
    
  } 


  render() {
    const {children ,leftAction,rightAction } = this.props;
    var _rightAction = rightAction?<div className={'actionSlideIconContainer'}>{rightAction}</div>:null  
    var ledft2 =this.state._ViewSlidePosition;   
    return (
      <div className="CSlidesbase"  ref={this.ref}>
        <div className="CSlidesDrag" style={{ margin: '0 auto',overflowX:'hidden',cursor:this.state.cursor}}> 
          <div  className="CSlidesContainer siema" style={{transform: `translate3d(${ledft2}px, 0, 0)`}}> 
          {leftAction?leftAction:null}              
          {children}
          {_rightAction}  
          </div>
        </div>
       </div>
    );
  }
}


