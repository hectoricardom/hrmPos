

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as commonActions from '../../state/commonActions';
import './style.css';

import Icons from '../Icons/Icons';
import SlideMenu from '../SlideMenu';
import * as Util from '../../state/Util';


const routerList = [
  //{name:'resume',icon:'graph_sprite',path:'/resume',query:'?tb=2019'},
  {name:'finances',icon:'money',path:'/finances',query:'?tb=gastos'},
  {name:'daycare',icon:'kid',path:'/daycare',query:'?tb=kids'},
  {name:'restaurant',icon:'kid',path:'/restaurant',query:'?tb=online'},
  {name:'settings',icon:'setting',path:'/settings'},
  {name:'logout',icon:'logout',path:'/logout'}
]
const routerListIndex = {"finances":1,"daycare":2,"settings":3,"logout":4}



class LogoHeader extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      index : 0,
      indexM : 0,
      active:false,
      activeItem:0,
      firstOpen:true,
      isMenu:true,
      ws:false,
      openSlide:false
    };
  }
  componentDidMount(){
    this.updateWidthScreen();
    //window.addEventListener('resize', this.updateWidthScreen.bind(this));  
    this.Active = this.Active.bind(this);
    this.UpdateIndex = this.UpdateIndex.bind(this); 
  }

  updateWidthScreen(){
    const isMobile = 720;  
    if(window.outerWidth<=isMobile){
      this.setState({ws:true});
      this.props.actions.UpdIsMobile(true);
    }
    else{
      this.setState({ws:false});
      this.props.actions.UpdIsMobile(false);
    }
  }

  

  Active(a,i){
    if(this.state.active && this.state.index===i){
      this.setState({active:false})
    }else{
      this.setState({active:true,index:a,indexM:i})
    } 
  }

  OpenSlidemenu(){
    if(this.state.firstOpen){
      this.handleCurrentRoute();
    }
    if(this.SM.state.visible){
      this.SM.Close();      
    }else{
      this.SM.Open();      
    } 
  }

  UpdateIndex(ig,it){  
    this.SM.Close(); 
    this.setState({indexM:ig,activeItem:it})
  }

  UpdateisMenu(){   
    this.setState({isMenu:!this.state.isMenu})
  }

  handleSaveEdit(){   
    //this.setState({isMenu:!this.state.isMenu})
  }

  closeSlm(){  
    this.SM.Close();     
  }


  handleCurrentRoute(){   
    var section =  window.location.hash.split('/').pop();
    const {_routes} = this.props; 
    if(!_routes[section]){
      section =  window.location.hash.split(`/${section}`)[0].split('/').pop();
    }
    var itm = routerListIndex[section];
    this.setState({activeItem:itm,firstOpen:false});
    //this.setState({isMenu:!this.state.isMenu})
  }

  
  // CloseSLideMenu(ig,it){        this.UpdateIndex(ig,it);  }

  ref = r => {
    this.SM = r
  }

  refAdd = r => {
    this._refAdd = r
  }

  render() {  
    var _th_ = this;
    const {user,_routes,isMobile} = this.props; 
    const {activeItem,  isMenu} = _th_.state;    
    
    let P_email = user.email?user.email:window.localStorage.getItem('email')?window.localStorage.getItem('email'):'';  
    let P_name = user.name?user.name:window.localStorage.getItem('provider')?window.localStorage.getItem('provider'):'';    
    if(isMobile){
      let _overlayClose = true;
      return (
        <div  className={`${isMenu?'':"isNotMenu"}`}> 
          <div className={`__header_Nav__`}>
            <div className={`__icons__menu__slide_nav`}  onClick={this.OpenSlidemenu.bind(this)}>
              <Icons name={'menu'} color={'#555'} size={24}/>
            </div>  
            <div className="flexSpace"/>
            <span></span>
            <div className="flexSpace"/>

            <div className={`__icons__menu__slide_nav`} >
              <Icons name={'more_vert'} color={'#555'} size={24}/>
            </div>
          </div>     
      { /* <div className={`__header_Nav__affter`}></div>  */  }        
      <SlideMenu ref={this.ref}  overlay={_overlayClose}>
        <div className="headerMobileLogo">
            <div className="name_content">{P_name}</div>
            <div className="email_content">{P_email}</div>              
          </div>
          <nav className="navSlideBox" id="navigation" role="navigation" aria-hidden="false">
            <ul role='menubar'>
              {routerList.map((tb,i)=>{
                var active_ = false;
                if(_routes[tb.name]){
                  if(activeItem===i){
                    active_ = true;                    
                  }
                  let _2link = {pathname: tb.path};
                    if(tb.query){
                      _2link['search']=tb.query;
                    }
                  return(
                    <li onClick={this.UpdateIndex.bind(this,i,i)} className={`${active_?'_activeNav':''}`}  tab-slide-index={i} key={i}>
                      <NavLink  to={_2link} className="logo" role="slide_item">
                        <div className="icon" >
                          <Icons name={tb.icon} size={24}/>
                        </div>
                        <div className="text">
                          {tb.name}  
                        </div>       
                      </NavLink>                      
                    </li>
                  )
                }else{
                  return null;
                }
                
              })                
              }  
              {
                window.matchMedia('(display-mode: standalone)').matches?null:<li data-add-home-screen="true" role="slide_item">
                <div className="icon" >
                  <Icons name={'android_phone'} size={24}/>
                </div>
                <div className="text a2hs">
                  {'Add to Home Screen'}
                </div>                                                   
            </li>
          }                                           
            </ul>                
          </nav>
        </SlideMenu>
        </div>
      );


    }
    else{
      let _overlayClose = false;
    
      return (
          <div  className={`${isMenu?'desktopV2':""}`}> 
            <div className={`__header_Nav__`}>
              <div className={`__icons__menu__slide_nav`}  onClick={this.OpenSlidemenu.bind(this)}>
                <Icons name={'menu'} color={'#555'} size={24}/>
              </div>  
              <div className="flexSpace"/>
              <span></span>
              <div className="flexSpace"/>
              <NavLink  to={{pathname: '/restaurant', search:`?vId=${Util.gen6CodeId()}&tb=online`}} className="logo" role="slide_item">
                restaurant
              </NavLink>
              <div className={`__icons__menu__slide_nav`} >
                <Icons name={'more_vert'} color={'#555'} size={24}/>
              </div>
            </div>     
        { /* <div className={`__header_Nav__affter`}></div>  */  }        
        <SlideMenu ref={this.ref} overlay={_overlayClose}>
            <div className="headerMobileLogo">
              {_overlayClose?null:<div className={`icon_content`}>
                <div className="flexSpace"/>
                <div className={``}  onClick={this.closeSlm.bind(this)}>
                  <Icons name={'menu'} color={'#555'} size={24}/>
                </div>
              </div>}
              <div className="name_content">{P_name}</div>
              <div className="email_content">{P_email}</div>              
            </div>
            <nav className="navSlideBox" id="navigation" role="navigation" aria-hidden="false">
              <ul role='menubar'>
                {routerList.map((tb,i)=>{
                  var active_ = false;
                  if(_routes[tb.name]){
                    if(activeItem===i){
                      active_ = true;                    
                    }

                    let _2link = {pathname: tb.path};
                    if(tb.query){
                      _2link['search']=tb.query;
                    }
                    return(
                      <li onClick={this.UpdateIndex.bind(this,i,i)} className={`${active_?'_activeNav':''}`}  tab-slide-index={i} key={i}>
                        <NavLink  to={_2link} className="logo" role="slide_item">
                          <div className="icon" >
                            <Icons name={tb.icon} size={24}/>
                          </div>
                          <div className="text">
                            {tb.name}  
                          </div>
                                          
                        </NavLink>                      
                      </li>
                    )
                  }else{
                    return null;
                  }
                  
                })                
                }  
                {
                  window.matchMedia('(display-mode: standalone)').matches?null:<li data-add-home-screen="true" role="slide_item">
                  <div className="icon" >
                    <Icons name={'android_phone'} size={24}/>
                  </div>
                  <div className="text a2hs">
                    {'Add to Home Screen'}
                  </div>                                                   
              </li>
            }                                           
              </ul>                
            </nav>
          </SlideMenu>
          </div>
        );
      }
  } 
}

function mapStateToProps(state, ownProps) {
  return {    
    _routes: state.common.routeList,
    user: state.common.user,
    isMobile: state.common.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoHeader);



