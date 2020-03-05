

import { React, observer ,NavLink} from '../../../../Utils/Sources';
import {Util} from '../index';

import './style.css';


const _Slide =  observer(props =>{  
  const next = (tl) =>{    
    props.common._ViewSlideIndex=props._Index;
    //_ViewSlidePosition
    props.common.load('_ViewSlideAction',props.common._ViewSlideAction+1);
    props.common.setCurrentCategory(tl);    
    var Url3 = {id:tl,limit:16,page:1,sortBy:'popularity.desc',imgList:props.common.checImages(),lng:'en',webP:props.common.isWebPSupport()}; 
    props.common.clearMovies(Url3);
    window.scrollTo(0,100); 
    props.common.load(`moviesPagination`,1);
    props.common.load(`totalPagination`,1);
  }
  
  const {_ViewSlideAction, _ViewSlidePosition} = props.common;  
  return (
    <div>
     {props.item}
    </div>
  )

 })


const _Slides =  observer(props =>{
  const { categories, isLoading, currentCat } = props.props.store; 
  const { _ViewSlideAction, _ViewSlideIndex , _ViewSlide, ScreenWidth, _ViewSlidePosition} = props.props.common;   
  var ledft2 = 0;
  /*
  if(_ViewSlide && _ViewSlide[_ViewSlideIndex] && _ViewSlide[_ViewSlideIndex]['position'] && _ViewSlide[_ViewSlideIndex]['position']>(ScreenWidth/2)){
    var with_half =  _ViewSlide[_ViewSlideIndex]['width']/2;
    var halfScreen = ScreenWidth/2;
    //ledft2 = (_ViewSlide[_ViewSlideIndex]['position']-halfScreen)+with_half;
  }
  if(_ViewSlide && _ViewSlide[Util.ObjectKeys(_ViewSlide).length-1]){
    var wdtT = _ViewSlide[Util.ObjectKeys(_ViewSlide).length-1]['position']+_ViewSlide[Util.ObjectKeys(_ViewSlide).length-1]['width'];    
  }

  _ViewSlide = null;
  _ViewSlideIndex = 5;
  _ViewSlidePosition = 0;
  _ViewSlideWidth = 0;
  @observable _ViewSlideAction = 0;


  */
  if(ScreenWidth!==props.ScreenWidth){
    /*if (typeof props.updState === 'function') {
      props.updState({key:`ScreenWidth`,value:ScreenWidth});      
    }
    console.log(`ScreenWidth`);*/
  }

  ledft2 =_ViewSlidePosition;
  if(props.pointerDown){    
    var diif = props.endX-props.startX;
    if(props.endX && diif>10 || props.endX && diif<10){
      ledft2 =diif/1 + _ViewSlidePosition;    
      if(ledft2>0){
        ledft2 = 0;
      }
      var st = props.totalWidth-window.outerWidth;      
      if(ledft2<st*-1){
        ledft2 = st*-1;
      }  
    }   
    
  } 
  return (
    <div className="CSlidesDrag" style={{ margin: '0 auto',overflowX:'hidden',cursor:props.cursor}}> 
      <div  className="CSlidesContainer siema" style={{transform: `translate3d(${ledft2}px, 0, 0)`}}>
          {props._children.map(function(tl, i) {
              return (     
                <_Slide key={Util.Base64.encode('_SlideC@' + i)} active={props.active} item={tl} _Index={i+1} store={props.props.store} common={props.props.common} scroll={props.scroll}/>      
              );    
            })
          }       
      </div>
    </div>
  )
})




@observer
export default class CarouselSlide extends React.Component {
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
    //e.preventDefault();
    const {endX,endY,startX,startY,totalWidth,verticalSwipe} = this.state;
    const {common} = this.props;
    const { _tabsSlideAction, _tabsSlide, ScreenWidth,_tabsSlideIndex,categories, _tabsSlidePosition} =  common;
    this.setState({pointerDown:false})    
    this.enableTransition();
    var CSlidesContainer = document.getElementsByClassName('CSlidesContainer')[0];
    if(CSlidesContainer.getBoundingClientRect().width && totalWidth!==CSlidesContainer.getBoundingClientRect().width){
      this.setState({totalWidth:CSlidesContainer.getBoundingClientRect().width});
    }
    
    if(verticalSwipe && endY){
      var diifY = endY-startY
      if(diifY>20){
        if (typeof this.props.onDownSwipe === 'function') {      
          this.props.onDownSwipe(true);      
        }
      }else if(diifY<20){
        if (typeof this.props.onUpSwipe === 'function') {      
          this.props.onUpSwipe(true);      
        }        
      }
    }else if (endX) {
      //this.updateAfterDrag();
      var diif = endX-startX,ledft2 = common._ViewSlidePosition; 
      var SlN = -1; 
      if(diif>10){
        ledft2 = common._ViewSlidePosition + window.outerWidth;
      }else if(diif<10){
        ledft2 = common._ViewSlidePosition - window.outerWidth;
        SlN = 1
      }
      if(ledft2>0){
        ledft2 = 0;
      }
      var st = totalWidth-window.outerWidth;
      if(ledft2<st*-1){
        ledft2 = st*-1;
      } 
      
      var nIndX = (ledft2 /window.outerWidth)<0?((ledft2 /window.outerWidth)*-1)+1:(ledft2 /window.outerWidth)+1;      
      common._tabsSlideIndex = nIndX;
      if(_tabsSlide && _tabsSlide[nIndX] && _tabsSlide[nIndX]['position']){
        if(_tabsSlide[nIndX]['position']>(ScreenWidth/2)){
          var with_half =  _tabsSlide[nIndX]['width']/2;
          var halfScreen = ScreenWidth/2;
          common._tabsSlidePosition = ((_tabsSlide[nIndX]['position']-halfScreen)+with_half)*-1;
        }
        else{
          common._tabsSlidePosition = 0;
        }
      }
      common.load('_IndexByCatAction',common._IndexByCatAction+1);
      common.load('_tabsSlideAction',common._tabsSlideAction+1);
      common._ViewSlidePosition = ledft2;

    }
    this.clearDrag();
  }



  /**
   * touchmove event handler
   */
  touchmoveHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    const {letItGo,pointerDown,startY,startX,totalWidth} = this.state;
    
    const {common} = this.props;
    //this.setState({pointerDown:false})
    if (letItGo === null) {
      var _letItGo = Math.abs(startY - e.touches[0].pageY) < Math.abs(startX - e.touches[0].pageX);
      this.setState({letItGo:_letItGo});
    }
    var _verticalSwipe = Math.abs(startY - e.touches[0].pageY) > Math.abs(startX - e.touches[0].pageX);
    this.setState({verticalSwipe:_verticalSwipe,endY:e.touches[0].pageY});
    
    if (pointerDown && letItGo) {
      e.preventDefault();      
      this.setState({endX:e.touches[0].pageX});
      var CSlidesContainer = document.getElementsByClassName('CSlidesContainer')[0];
      if(CSlidesContainer.getBoundingClientRect().width && totalWidth!==CSlidesContainer.getBoundingClientRect().width){
        this.setState({totalWidth:CSlidesContainer.getBoundingClientRect().width});
      }
   
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
    var rtl = 1;
    const {endX,startX} = this.state;
    const movement = (rtl ? -1 : 1) * (endX - startX);
    const movementDistance = Math.abs(movement);    
    /*const howManySliderToSlide = this.config.multipleDrag ? Math.ceil(movementDistance / (this.selectorWidth / this.perPage)) : 1;

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
    console.log(e)
    if (typeof _th_.setState === 'function') {
      _th_.setState({[e.key]:e.value});  
    }
    
  }


  render() {
    const {location,children  } = this.props;    
    const {endX,cursor,startX,startY,preventClick,letItGo,pointerDown,totalWidth,onUpSwipe,onDownSwipe,ScreenWidth} = this.state;      
    return (
      <div className="CSlidesbase"  ref={this.ref}>
          <_Slides props={this.props} updState={this.updateState} _children={children} scroll={false} startX={startX} _ScreenWidth={ScreenWidth} pointerDown={pointerDown} letItGo={letItGo} preventClick={preventClick}  cursor={cursor} startY={startY} endX={endX} totalWidth={totalWidth} />       
      </div>
    );
  }
}


