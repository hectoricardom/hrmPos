import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';


import './style.css';
import './style2.css';

import TabsHRM from '../TabsHRM';
import * as Util from '../../state/Util';

import { NavLink , withRouter} from 'react-router-dom';

import Icons from '../Icons/Icons';

import MenuItemsRestaurantRx from '../MenuItemsRestaurant';

import SlideCards from '../SlideCards';
import Cart from '../cart';

import Menu222 from '../Menu222';

import RippleHRM from '../RippleHRM';

var _tabs = ['online' ,'order fast','order pretty'];
var _Type = 'restaurant'


var cartFormName = 'cartData';



function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve,    
    gettingObserve:state.common.gettingObserve,
    filterObserve: state.common.filterObserve,
    data:state.common.filters[ownProps.operation],
    groups: state.common.filters["groups"],
    dataObj: state.common[ownProps.operation],
    categories: state.common.categories,
    calendar: state.common.calendar,
    year: state.common.year,
    month: state.common.month,
    blobImagesList: state.common.blobImagesList,
    thumbnailJsonBlobObserve: state.common.thumbnailJsonBlobObserve,
    isMobile: state.common.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}









class Restaurant extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,
      index:0,
      orientation:false
    };
  }

  componentDidMount() {  
    window.localStorage.setItem('c_id',2); 
    var ind = null;
    const {location, history} = this.props;
    var s = Util.parseQuery(location.search);
    
    if(s.tb){    
      _tabs.map((t,_i)=>{
        if(t===s.tb){
          ind=_i;
        }
      })
    }
    if(ind){
      this.setState({index:ind});
      this.SldCard.updSlide(ind)
    }  

  }  
  componentWillMount(){    
    
  }
  
  componentWillUnmount(){    

  }
  
  UpdateIndex(i){
    this.setState({index:i});
    this.SldCard.updSlide(i)
  }

  ref = r => {
    this.SldCard = r
  }
  


  render() {
    const {isMobile} = this.props;
      return (
        <div className=" restaurant_wrapper_comp_">
          {false?
            <TabsHRM data={_tabs} UpdateIndex={this.UpdateIndex.bind(this)} pth={_Type} initValue={this.state.index}/>
          :null}
          {isMobile?<MobileOnlineRestarantRX _indX={this.state.index+1}/>:<OnlineRestarantRX _indX={this.state.index+1}/>}
          
          {false?
          <SlideCards  ref={this.ref}>
            {isMobile?<MobileOnlineRestarantRX _indX={this.state.index+1}/>:<OnlineRestarantRX _indX={this.state.index+1}/>}
            <div _indX={this.state.index+1}/>                         
            <div  _indX={this.state.index+1}/>  
          </SlideCards>  
          :null}            
        </div>
      ) 
  }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Restaurant));







class OnlineRestarant extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,      
      groupActive:null,
      index:0,
      _Id: Util.generateUUID(),
      orientation:false
    };
  }

  componentDidMount() {  
    let data =  commonActions.data;
    var options = Object.keys(data);
    this.setState({groupActive:options[0]})
  } 
  
  
  componentWillMount(){    
       
  }
  
  componentWillUnmount(){    

  }
  
  
  UpdateIndex(i){
    this.setState({index:i});
    this.SldCard.updSlide(i)
  }


  updFiltersTab(l){  
    this.setState({groupActive:l});
    var backDetails = `[back-item-detail]`;
    var elmbackDetails = document.querySelector(backDetails);
    //elmbackDetails.setAttribute("back-item-detail", false);
  }


  HandleSettingTabIndex(){    

  }

  goBack(){    
    this.setState({slideMenuCollapsed:!this.state.slideMenuCollapsed});
  }


  ref = r => {
    this.SldCard = r
  }
  


  render() { 
   
     const {location, forms} = this.props;
      let data =  commonActions.data;
      var s = Util.parseQuery(location.search); 
      var isInCart = s.tb==="cart"?true:false;      
      var _item2cart = forms[cartFormName];   
      var options = Object.keys(data);
      var _list = data && data[this.state.groupActive] && data[this.state.groupActive]['list']?data[this.state.groupActive]['list']:{};
      
      return (
          <div className={`_filters_metricas_operations`}>     
            <SideMenuRestarant updFiltersTab={this.updFiltersTab.bind(this)}  editingSection={this.state.groupActive}   />
            <div className="flexSpace"/>
            {isInCart && 
                <Cart itemOnCart={_item2cart} groupActive={this.state.groupActive} />
            }             
            {!isInCart && options.map(title=>{   
              var _extras = data && data[this.state.groupActive] && data[this.state.groupActive]['extras']?data[this.state.groupActive]['extras']:null;           
              return(
                <div  className={`graph_Container  ${this.state.groupActive===title?'isVisible':''}`} style={{width:this.state.groupActive===title?'99%':0}}>
                   <div className={'header_title_group'}>
                      <h3>{this.state.groupActive}</h3> 
                      <div className={'__save__btn'} >
                        <NavLink to={{pathname: '/restaurant', search:`?tb=cart`}}>
                          <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
                            <div className="hoverDiv orangeFlex "/>
                            <span className="text2D orangeFlex">{'Cart'}</span>              
                          </div> 
                        </NavLink>
                      </div>                       
                    </div>
                {this.state.groupActive===title?
                  <MenuItemsRestaurantRx groupActive={this.state.groupActive} list={_list} extras={_extras}/>
                :null}
              </div>
              )
            })}            
          </div>
    )
  }
}



const OnlineRestarantRX = withRouter(connect(mapStateToProps, mapDispatchToProps)(OnlineRestarant));












class MobileOnlineRestarant extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,      
      groupActive:null,
      index:0,
      _Id: Util.generateUUID(),
      orientation:false
    };
  }

  componentDidMount() {  
    let data =  commonActions.data;
    var options = Object.keys(data);
    // this.setState({groupActive:options[0]})
  } 
  
  
  componentWillMount(){    
       
  }
  
  componentWillUnmount(){    

  }
  
  
  UpdateIndex(i){
    this.setState({index:i});
    this.SldCard.updSlide(i)
  }


  updFiltersTab(l){  
    this.setState({groupActive:l});
    // var backDetails = `[back-item-detail]`;
    // var elmbackDetails = document.querySelector(backDetails);
    // elmbackDetails.setAttribute("back-item-detail", false);
  }


  HandleSettingTabIndex(){    

  }

  goBack(){    
    this.setState({groupActive:null});
  }


  ref = r => {
    this.SldCard = r
  }
  


  render() { 
   
     const {location, forms, isMobile} = this.props;
      let data =  commonActions.data;
      var s = Util.parseQuery(location.search); 
      var isInCart = s.tb==="cart"?true:false; 
      var isInMenu = s.tb==="menu"?true:false; 
      var isInAccount = s.tb==="account"?true:false;
      var _item2cart = forms[cartFormName];   
      var options = Object.keys(data);
      var _list = data && data[this.state.groupActive] && data[this.state.groupActive]['list']?data[this.state.groupActive]['list']:{};
      
      return (
          <div is-mobile={`${isMobile}`} className={``}>
            {false?
            <div className={'header_title_group'}>
              <h3>{isInCart?'CART':this.state.groupActive?this.state.groupActive:"MENU"}</h3> 
              <div className={'__save__btn'} >
                <NavLink to={{pathname: '/restaurant', search:`?tb=${isInCart?'':'cart'}`}}>
                  <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
                    <div className="hoverDiv orangeFlex "/>
                    <span className="text2D orangeFlex">{isInCart?'CHECKOUT':''}</span>              
                  </div> 
                </NavLink>
              </div>                       
            </div>
            :null}
            <div className={`_bottomBar_Float`}>
              <div className={`_wrp_btBar`} >
                
                  <NavLink to={{pathname: '/restaurant', search:`?tb=menu`}}  onClick={this.updFiltersTab.bind(this,null)}>                    
                    <div className={`_tab_Bar_  ${isInMenu?'_activeTab':''}`} >
                    <RippleHRM />                      
                      <div className={`_tab_Bar_Icon_`} >
                        <Icons name={'outline_restaurant'} color={'#555'} size={30}/> 
                      </div>
                      <p>Menu</p>
                    </div>
                  </NavLink>
                  <NavLink to={{pathname: '/restaurant', search:`?tb=cart`}}>                    
                    <div className={`_tab_Bar_  ${isInCart?'_activeTab':''}`} >
                    <RippleHRM />
                      <div className={`_tab_Bar_Icon_`} >
                        <Icons name={'outline_cart'} color={'#555'} size={30}/> 
                      </div>
                      <p>Cart</p>
                    </div>
                  </NavLink>
                  <NavLink to={{pathname: '/restaurant', search:`?tb=account`}}>
                    <div className={`_tab_Bar_ ${isInAccount?'_activeTab':''}`} >
                    <RippleHRM />
                      <div className={`_tab_Bar_Icon_`} >
                        <Icons name={'account'} color={'#555'} size={30}/> 
                      </div>
                      <p>Account</p>
                    </div>
                  </NavLink>
              </div>
            </div> 
            <div className="flexSpace"/>
            {isInCart && 
                <Cart itemOnCart={_item2cart} groupActive={this.state.groupActive} />
            }            
            {!isInCart && isInMenu && <div className={`${this.state.groupActive?'':`_flexDisplay_ _flexWrapDisplay_ `}_body_menu_`}> 
             {options.map(title=>{
              var _extras = data && data[this.state.groupActive] && data[this.state.groupActive]['extras']?data[this.state.groupActive]['extras']:null;           
              let ImgUrlLogo = data && data[title] && data[title]['logo']; 
              let ImgUrl = commonActions.getBlobImage(ImgUrlLogo) || ImgUrlLogo; 
              return(
                <div  className={`_cart_item_sub_ `} is-submenu-active={this.state.groupActive===title?'true':'false'} style={{"--dimention_sub_ingredients--": '125px'}}>
                  {!this.state.groupActive?<div>
                    <div className={`_cart_item_sub_extras `}  onClick={this.updFiltersTab.bind(this,title)}>                                          
                      <img src={ImgUrl} alt={''} />
                      <div className={'_name'}>
                          {title}
                      </div>                                          
                    </div>
                  </div>:null}
                  <div  className={`graph_Container  ${this.state.groupActive===title?'isVisible':''}`} style={{width:this.state.groupActive===title?'99%':0}}>
                  {this.state.groupActive && this.state.groupActive===title?
                  <div className={"_headerbarMenu"}>
                    <div className="backBtn"  onClick={this.goBack.bind(this)}>
                      <Icons name={'arrowBack'} color={'#5d5d5d'} size={24}/>             
                    </div>
                    <div className="flexSpace"/>
                    <h5>{this.state.groupActive}</h5>
                    <div className="flexSpace"/>
                  </div>
                  :null}
                  {this.state.groupActive && this.state.groupActive===title?
                    <MenuItemsRestaurantRx groupActive={this.state.groupActive} list={_list} extras={_extras}/>
                  :null}
                </div>
              </div>
              )
            })}
            </div>}            
          </div>
    )
  }
}



const MobileOnlineRestarantRX = withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileOnlineRestarant));










class SideMenuRestarant extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,      
      groupActive:null,
      index:0,
      _Id: Util.generateUUID(),
      orientation:false
    };
  }

  componentDidMount() {  
   
  } 
  
  
  componentWillMount(){    
    
  }
  
  componentWillUnmount(){    

  }
  
  
  UpdateIndex(i){
    this.setState({index:i});
    this.SldCard.updSlide(i)
  }


  HandlenavTabIndex(i,l){    
    if(typeof this.props.updFiltersTab === "function"){      
      this.props.updFiltersTab(l)
    }
    this.setState({groupActive:l});
  }


  HandleSettingTabIndex(){    

  }

  goBack(){    
    this.setState({slideMenuCollapsed:!this.state.slideMenuCollapsed});
  }


  ref = r => {
    this.SldCard = r
  }
  


  render() {
    const { editingSection } = this.props;


    const {slideMenuCollapsed, groupActive, _Id } = this.state;
    
    let data =  commonActions.data;

    var options = Object.keys(data);
      return (
        <div className="restaurant_wrapper">
          <div className="container_left_menu var_left" ytcp-navigation-drawer={`${true}`} matterhorn={`${true}`} collapsed-nav={`${slideMenuCollapsed}`} content-section={`${_Id?'editing':'dashboard'}`} >                    
            <nav className="ytcp-navigation-drawer">
                    <div className="nav_goBack">
                    {_Id?
                      <a className={`-navigation_drawer_button_ ${slideMenuCollapsed?'rotateArrow':''}`} onClick={this.goBack.bind(this)}> 
                        <Icons name={'arrowBack'} color={'#1967d2'} size={24}/>                                
                      </a>
                    :null
                    }
                    </div>
                    
                    <div className={`top-section_edit sync-on-transition  ytcp-navigation-drawer`}>
                    {_Id? <div id="main-menu" className=" ytcp-navigation-drawer">
                      {options.map((op2,in_6)=>{
                        let op = data[op2];                       
                        return(
                            <div track-click="" className="-navigation_drawer_items" role="none" key={`menu-item-${in_6}`}  is-active={`${editingSection==='op.label'}`}  onClick={this.HandlenavTabIndex.bind(this,in_6,op2)}>
                       {/**/}  
                              <NavLink  to={{pathname: '/restaurant', search:`?group=${op2}&tb=online`}}  className="menu-item-link  ytcp-navigation-drawer" id={`menu-item-${in_6}`}>     
                                <div role="button" tabIndex="-1" className="-navigation_drawer_button_ menu_restaurant">
                                  <div className="imageOnMenu">
                                   <img src={op.logo} alt={'logo'} height={160} width={160}/>
                                  </div>
                                  <div className="nav-item-text">
                                    {op2}
                                  </div>
                                </div>                       
                              </NavLink> 
                            </div>
                          )
                      })}
                        
                      </div>
                      :null}
                    </div>
            
                    <div className={`top-section sync-on-transition  ytcp-navigation-drawer`}>
                    {<div id="main-menu" className=" ytcp-navigation-drawer">
                      {false && [].map((op,in_6)=>{
                        if(op.visible){
                          let path2 = {pathname: '/search'} || op.href;
                          return(
                            <div track-click="" className="-navigation_drawer_items" role="none" key={`menu-item-${in_6}`}  is-active={`${this.state.navtabIndex===in_6}`}  onClick={this.HandleSettingTabIndex.bind(this,in_6,op.label)}>
                              <NavLink  to={path2}  className="menu-item-link  ytcp-navigation-drawer" id={`menu-item-${in_6}`}>                          
                                <div role="button" tabIndex="-1" className="-navigation_drawer_button_">
                                  <div id="contentIcon" className="content-icon  paper-icon-item">                          
                                    <Icons name={op.icon} color={'#1967d2'} size={24}/>                                
                                  </div>
                                  <div className="nav-item-text">
                                    {op.label}
                                  </div>
                                </div>                       
                                </NavLink>
                            </div>
                          )
                        }else{
                          return null;
                        }
                        
                      })}
                        
                      </div>
                      }
                    </div>
                    {false?
                    <div  className="bottom_section" >
                     {/*<hr clclassNameass="divider"/> */} 
                      <div id="main-menu" className=" ytcp-navigation-drawer">
                      {false &&  ['settingsBottom'].map((op,in_6)=>{
                        if(op.visible){
                          return(
                            <div track-click="" className="-navigation_drawer_items" role="none" key={`menu-item-${in_6}`}  onClick={this.HandleSettingTabIndex.bind(this,in_6,op.label)}>
                              <a className="menu-item-link  ytcp-navigation-drawer" id={`menu-item-${in_6}`}>                          
                                <div role="button" tabindex="-1" className="-navigation_drawer_button_">
                                  <div id="contentIcon" className="content-icon  paper-icon-item">                          
                                    <Icons name={op.icon} color={'#1967d2'} size={24}/>                                
                                  </div>
                                  <div className="nav-item-text">
                                    {op.label}
                                  </div>
                                </div>                       
                                </a>
                            </div>
                          )
                        }else{
                          return null;
                        }                      
                      })}                      
                      </div>
                    </div>
                    :null}
                    </nav>
                  </div>  


                      
        </div>
      ) 
  }
}








