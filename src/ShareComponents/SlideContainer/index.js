

import { React, observer ,NavLink} from '../../../../Utils/Sources';
import {Util} from '../index';

@observer
export default class SlideContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      index:'',
      total : 0,
      ScreenWidth:0,
      totalWidth:0,
      pointerDown:false,
      startX:0,
      verticalSwipe:false,
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
    var _th6 = this;
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
    var _th6 = this;
    var selector =  this.tabsElm.children[0];
    this.touchstartHandler = this.touchstartHandler.bind(this)
    this.touchendHandler = this.touchendHandler.bind(this)
    this.touchmoveHandler = this.touchmoveHandler.bind(this)
    this.mousedownHandler = this.mousedownHandler.bind(this)
    this.mouseupHandler = this.mouseupHandler.bind(this)
    this.mouseleaveHandler = this.mouseleaveHandler.bind(this)   
    

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
   */
  touchstartHandler(e) {
    // Prevent dragging / swiping on inputs, selects and textareas
    var ignoreSiema = ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) !== -1;
    if (ignoreSiema) {
      return;
    }
    e.stopPropagation();
    this.pointerDown = true;
    this.setState({pointerDown:true,startX:e.touches[0].pageX,startY:e.touches[0].pageY})
    //this.startX = e.touches[0].pageX;startX:e.touches[0].pageX
    //this.startY = e.touches[0].pageY;
  }


  /**
   * touchend event handler
   */
  touchendHandler(e) {
    e.stopPropagation();
    
    const {endX,endY,startX,startY,totalWidth,verticalSwipe} = this.state; 
    this.setState({pointerDown:false})    
    /*
    //e.preventDefault();
    this.enableTransition();
    var CSlidesContainer = document.getElementsByClassName('CSlidesContainer')[0];
    if(CSlidesContainer.getBoundingClientRect().width && totalWidth!==CSlidesContainer.getBoundingClientRect().width){
      this.setState({totalWidth:CSlidesContainer.getBoundingClientRect().width});
    }
    */
    var paterD = 100;
    var paterD2 = -100;
    if(verticalSwipe && endY){
      var diifY = endY-startY
      if(diifY>paterD){
        if (typeof this.props.onDownSwipe === 'function') {      
          this.props.onDownSwipe(true);      
        }
      }else if(diifY<paterD){
        if (typeof this.props.onUpSwipe === 'function') {      
          this.props.onUpSwipe(true);      
        }        
      }
    }else if (endX) {
      var diifX = endX-startX
      if(diifX>paterD){
        if (typeof this.props.onRightSwipe === 'function') {      
          this.props.onRightSwipe(true);
        }
      }else if(diifX<paterD2){
        if (typeof this.props.onLeftSwipe === 'function') {
          this.props.onLeftSwipe(true);
        }        
      }
    }
    this.clearDrag();
  }



  /**
   * touchmove event handler
   */
  touchmoveHandler(e) {    
    const {letItGo,pointerDown,startY,startX,totalWidth} = this.state;    
    if (letItGo === null) {
      var _letItGo = Math.abs(startY - e.touches[0].pageY) < Math.abs(startX - e.touches[0].pageX);
      this.setState({letItGo:_letItGo});
    }
    var _verticalSwipe = Math.abs(startY - e.touches[0].pageY) > Math.abs(startX - e.touches[0].pageX);
    this.setState({verticalSwipe:_verticalSwipe,endY:e.touches[0].pageY});
    
    if (pointerDown && letItGo) {
      e.stopPropagation();
      e.preventDefault();   
      this.setState({endX:e.touches[0].pageX});
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
      this.setState({endX:e.pageX,cursor:'-webkit-grabbing'});
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
  }

  updateAfterDrag() {
    var rtl = 1;
    const {endX,startX} = this.state;
    const movement = (rtl ? -1 : 1) * (endX - startX);
    const movementDistance = Math.abs(movement);   
   
  }



  render() {
    const {location,children  } = this.props;     
    return (
      <div className="CSlidesbase"  ref={this.ref}>
          {children}   
      </div>
    );
  }
}


