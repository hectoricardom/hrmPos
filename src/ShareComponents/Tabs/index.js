

//import { React, observer,withRouter ,inject,NavLink} from '../../../../Utils/Sources'
import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import {Util,Icons} from '..';
import './style.css';


import AppToolbar from '../apptoolbar';




export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      index:'',
      screenWidth:0,
      startX:0,
      pointerDown:false,
      dimension:{},
      total : 0,
    };
  }
  
  componentWillUnmount() {
    var _th6 = this;
    var selector =  this.Elm;   
    selector.removeEventListener('mousedown', this.mousedownHandler);
    selector.removeEventListener('mouseup', this.mouseupHandler);
    //selector.removeEventListener('mouseleave', this.mouseleaveHandler); 
  }
  componentDidMount() {  
    var _th6 = this;
    var selector =  this.Elm;    
    this.mousedownHandler = this.mousedownHandler.bind(this)
    this.mouseupHandler = this.mouseupHandler.bind(this)
    //this.mouseleaveHandler = this.mouseleaveHandler.bind(this)

    this.updateComp = this.updateComp.bind(this)
    this.next = this.next.bind(this)

    selector.addEventListener('mousedown', this.mousedownHandler);
    selector.addEventListener('mouseup', this.mouseupHandler);
    //selector.addEventListener('mouseleave', this.mouseleaveHandler);
    
  }

  next = () =>{
    if (typeof this.props.updIndex === 'function') {      
      this.props.updIndex(this.props._i);      
      //window.scrollTo(0,this.props.topScroll)
    }
  }


  mousedownHandler(e) {
    this.setState({pointerDown:true,startX:e.pageX})
  }

  mouseupHandler(e) {
    if(this.state.pointerDown){
      var diif = e.pageX-this.state.startX;
      if(diif>5 || diif<-5){
        //console.log('drag',diif)
      }else{
        this.next();
        //console.log('click',diif)
      }
      this.setState({pointerDown:false,startX:0})
    }     
  }


  updateComp(){
    if(this.Elm && this.state.dimension && this.Elm.getBoundingClientRect().width !== this.state.dimension.width){
      this.setState({dimension:this.Elm.getBoundingClientRect()});
      if (typeof this.props.updListItem === 'function') {
        var nI = {} 
        nI[this.props._i]=this.Elm.getBoundingClientRect();
        this.props.updListItem(nI)    
      } 
    }
  }

  
  ref2 = r => {
    this.Elm = r
  }
  render() {  
    const {props} = this;
    this.updateComp()
    var textStyle = {color:'#fff'};    
    var _underline = "underline__inner";
    //var underlineStyle = {backgroundColor:'#fff'};
    var underlineBaseStyle = {minWidth: '40px',width:'calc( 100% - 26px)'};
    var tC_Style = {} 
    if(props.activeClass.toString().indexOf('tabActive')>5){
      _underline = "underline__inner underline__Active"
      tC_Style = {opacity:1} 
    }
    if(props.scroll){
      textStyle = {color:'#555'}
      //underlineStyle = {backgroundColor:'rgb(85, 85, 85)'};
      underlineBaseStyle = {minWidth: '40px',width:'calc( 100% - 26px)',bottom:'0px'}
    }
    var _aLink = <a > <div className="tabContent" style={tC_Style}> {props.title} </div> </a>
    if(props.item.url && props.item.url.pathname){
      var path = { pathname: props.item.url.pathname ,search: props.item.url.search }
      _aLink = <NavLink  to={path} > <div className="tabContent" style={tC_Style}> {props.title} </div> </NavLink>
    }



    return (
      <div ref={this.ref2} className={props.activeClass} id={props._k}  onClick={()=>{}}>
        {_aLink}
        <span className="tabs__underline underline"   style={underlineBaseStyle}  >
            <span className={_underline} ></span>
        </span>
      </div>
    )

  }
}




const Tabs =  (props =>{
  const {  ScreenWidth } = props;
  if(props.screenWidth!==ScreenWidth){    
    props.updateState({key:'screenWidth',value:ScreenWidth})
  }
  var _list = [];
  if(props._list && props._list.length>0){
    _list = props._list;
  }
  var cat_M = _list.map(function(tl, i){
    var activeClass ="tabsItem ";
    var _active = false;
    if(props._i===i){  _active = true;  activeClass = "tabsItem tabActive";}
    return (     
      <Item activeClass={activeClass} key={Util.Base64.encode(tl.title+i)} topScroll={props.topScroll} updListItem={props.updListItem} updIndex={props.updIndex} _i={i} _k={Util.Base64.encode(tl.title+i)} active={_active} item={tl} title={tl.title} store={props.props.CategoryStore} scroll={props.scroll}/>      
    );    
  }); 
  //var paperTabs = {marginLeft: 'calc(50% - 642px - 56px)'}
  return (    
    <div className="paperTabs"  style={{}}>
      <div  className="tabsContainer">
          {cat_M}       
      </div>   
    </div>
  )
})





//@withScroll
class TabsGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      index:0,
      prevIndex:0,
      screenWidth:0,
      list:{},
      buttons:false,
      total : 0,
      activeScroll : false,
      scroll:0
    };
  }

  componentWillReceiveProps(nextProps, prevState){
    if(nextProps.scrollPosition!==prevState.scrollPosition){
      if(!this.state.activeScroll && nextProps.scrollPosition>this.props.scrollUpdPoint){
        this.setState({activeScroll:true})
        this.activeScroll(true)
      }
      else if(this.state.activeScroll && nextProps.scrollPosition<this.props.scrollUpdPoint){
        this.setState({activeScroll:false})
        this.activeScroll(false)
      }     
    }
 }
 

  componentWillMount() {
    this.updateState = this.updateState.bind(this)
    this.buttonUpd = this.buttonUpd.bind(this)  
    this.nextTab = this.nextTab.bind(this) 
    this.prevTab = this.prevTab.bind(this)   
    this.handleScroll = this.handleScroll.bind(this)   
    
  }
  componentDidMount() {  
    var _th6 = this;
    document.addEventListener('scroll', _th6.handleScroll.bind(_th6));
    this.setState({index:this.props.currentIndex}) 
  }

  handleScroll(){
    var scrollPosition =  window.pageYOffset || document.documentElement.scrollTop;
    if(scrollPosition>this.props.scrollUpdPoint){
      console.log(scrollPosition)
      console.log(true)
      this.setState({activeScroll:true})
      this.activeScroll(true)
    }
    else if(scrollPosition<this.props.scrollUpdPoint){
      console.log(scrollPosition)
      console.log(false)
      this.setState({activeScroll:false})
      this.activeScroll(false)
    }    
  }

  updateState(e){
    this.setState({[e.key]:e.value});  
  } 

  buttonUpd(e){    
    this.setState({buttons:e});    
  } 

  prevTab(e){
    if(this.props.buttonUpdateIndex){
      var l = this.state.list,i=this.state.index,k = Util.ObjectKeys(l).length;
      if(i-1<0){
        i=k-1
      }else{
        i-=1;
      }
      var pIn = this.state.index;
      this.setState({index:i,prevIndex:pIn}); 
      this.AppToolbar.ClickTabPositionHandler(i);
      if (typeof this.props.changeIndex === 'function') {     
        this.props.changeIndex(i)    
      }
    }else{
      this.AppToolbar.TabPositionHandler(false);
    }   
  }

  nextTab(e){ 
    if(this.props.buttonUpdateIndex){
      var l = this.state.list,i=this.state.index,k = Util.ObjectKeys(l).length;   
      if(i+1>k-1){
        i=0
      }else{
        i+=1;
      }
      var pIn = this.state.index;
      this.setState({index:i,prevIndex:pIn});
      this.AppToolbar.ClickTabPositionHandler(i);
      if (typeof this.props.changeIndex === 'function') {     
        this.props.changeIndex(i)    
      }
    }
    else{
      this.AppToolbar.TabPositionHandler(true);
    }
  } 

  activeScroll(i){ 
    if (typeof this.props.activeScroll === 'function') {     
      this.props.activeScroll(i)    
    }
  } 


  updListItem(e){
    var l = this.state.list;
    var k = Util.ObjectKeys(e)[0];
    l[k]=e[k];
    var cwidth = 0;
      Util.ObjectKeys(l).map(s=>{
        var it = l[s];
        cwidth += it['width']
      })
    this.setState({list:l,total:cwidth});
  } 

  updIndex(i){
    var pIn = this.state.index;
    this.setState({index:i,prevIndex:pIn});
    this.AppToolbar.ClickTabPositionHandler(i); 
    if (typeof this.props.changeIndex === 'function') {     
      this.props.changeIndex(i)    
    }
  }

  ref = r => {
    this.AppToolbar = r
  }
  ref2 = r => {
    this.Elm = r
  }
  render() {
    var _marginLeft = `calc(50% - 264px)`
    if(this.state.total>0){
      _marginLeft = `calc(50% - ${Math.round(this.state.total/2)}px)`;
    }     
    var p2t = {
      position: 'relative', marginLeft: _marginLeft
    };
    var Cp2t = {   
      "--app-tabsItem-underline-in-direction":'left',
      "--app-tabsItem-underline-out-direction":'right'   
    };      
    if(this.state.buttons){
      p2t["marginLeft"] = `0px`;
    }
    if(this.state.activeScroll){      
      p2t["position"]='fixed';
      p2t["top"]='42px';
      Cp2t["position"]='fixed';
      Cp2t["top"]='42px';      
    }           
    if(this.state.index - this.state.prevIndex<0){      
      Cp2t["--app-tabsItem-underline-in-direction"]='right';
      Cp2t["--app-tabsItem-underline-out-direction"]='left';
    }   
    const {list } = this.props;
    return (      
      <div className="tabBarContainer" style={Cp2t}>
        <div ref={this.ref2} className={'paper2Tabs'} key={Util.Base64.encode('tabsFixed')} style={p2t}>    
          {this.state.buttons?
          <div className="tabIcon" style={{}} onClick={this.prevTab}>
            <Icons name={'arrow_left'} color={'#666'} size={24}/>
          </div> 
          :null}
          <AppToolbar screenWidth={this.state.screenWidth} ref={this.ref} buttonUpd={this.buttonUpd} items={this.state.list} _index={this.state.index}>
            <Tabs props={this.props} _list={list} scroll={true} _i={this.state.index} screenWidth={this.state.screenWidth} buttons={this.state.buttons} topScroll={this.props.scrollUpdPoint} updateState={this.updateState.bind(this)} updListItem={this.updListItem.bind(this)} updIndex={this.updIndex.bind(this)}/> 
          </AppToolbar>  
          {this.state.buttons?
          <div className="tabIcon" style={{}} onClick={this.nextTab}>
            <Icons name={'arrow_right'} color={'#666'} size={24}/>
          </div> 
          :null}       
        </div>   
      </div>   
    );
  }
}


export default TabsGroup;