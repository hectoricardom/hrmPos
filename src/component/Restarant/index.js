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

import Menu222 from '../Menu222';

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
      return (
        <div className=" restaurant_wrapper_comp_">
          {false?
            <TabsHRM data={_tabs} UpdateIndex={this.UpdateIndex.bind(this)} pth={_Type} initValue={this.state.index}/>
          :null}
          <SlideCards  ref={this.ref}>
            <OnlineRestarantRX _indX={this.state.index+1}/>
            <div _indX={this.state.index+1}/>                         
            <div  _indX={this.state.index+1}/>  
          </SlideCards>              
        </div>
      ) 
  }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Restaurant));






var data = {
  appetizer:{
    logo:"https://p.kindpng.com/picc/s/425-4253452_download-enjoy-your-favorites-with-the-appetizer-sampler.png",    
    list:{
      y0872ty6n3f:{
        name:"bread",
        price:0.55,
        picture:'https://www.budgetbytes.com/wp-content/uploads/2010/03/Homemade-Garlic-Bread-front-500x500.jpg'
      },
      y0f72tjln3f:{
        name:"brownie",
        price:3.05,
        picture:'https://www.clipartkey.com/mpngs/m/43-432775_thanksgiving-clipart-charlie-brown-transparent-background-brownie-png.png'
      },
    }
  },
  lunchs:{
    logo:"https://www.pngfind.com/pngs/m/331-3311656_plate-lunch-hd-png-download.png",
    list:{
      y0872ty6n3f:{
        name:"fried rice",
        price:3.75,
        picture:'https://www.pngfind.com/pngs/m/637-6373506_panda-express-fried-rice-chinese-fried-rice-hd.png',
        size:{
          small:3.75,
          large:7.00
        }
      },
      y0f72tjln3f:{
        name:"pork steak",
        price:5.00,
        picture:'https://images.summitmedia-digital.com/yummyph/images/2017/10/04/pork-steak-gratin.jpg',
        size:{
          small:5.00,
          large:7.50
        }
      },
    },
   extras:true

  },
  dinners:{
    logo:"https://www.a-akisushi.com/wp-content/uploads/2017/05/Hibachi-Combo.png",
    list:{
      
    }
  },
  beverages:{
    logo:"https://pngimage.net/wp-content/uploads/2018/05/beverages-png-4.png",
    list:{
      y087676ty6n3f:{
        name:"coke",
        price:1.05,
        picture:'https://icon2.cleanpng.com/20180317/hhw/kisspng-coca-cola-fizzy-drinks-fanta-sprite-coca-cola-png-transparent-images-5aadb5822422a1.230768881521333634148.jpg',
        directOrder:true
      },
      y0f72tjln3f:{
        name:"sprite",
        price:1.05,
        picture:'https://www.pinclipart.com/picdir/middle/56-567275_transparent-sprite-clip-art-royalty-free-download-sprite.png',
        directOrder:true
      },
      y0f7dssgjln3f:{
        name:"pepsi",
        price:1.05,
        picture:'https://www.pinclipart.com/picdir/middle/361-3613612_pepsi-can-png-pepsi-and-coca-cola-logo.png',
        directOrder:true
      },
      y0f52tjln3f:{
        name:"mountain dew",
        price:1.05,
        picture:'https://banner2.cleanpng.com/20180511/dhw/kisspng-fizzy-drinks-mountain-dew-beer-coca-cola-sangrita-5af5cf4be01a71.4484766915260588279179.jpg',
        directOrder:true
      },
      y0f7f342tjln3f:{
        name:"sierra mist",
        price:1.05,
        picture:'https://www.pngkit.com/png/detail/30-308769_sierra-mist-caffeinated-drink.png',
        directOrder:true
      },
    },
   extras:false
  },
  lunchs2:{
    logo:"https://www.pngfind.com/pngs/m/331-3311656_plate-lunch-hd-png-download.png",
    list:{
     
    }
  },
  dinners2:{
    logo:"https://www.a-akisushi.com/wp-content/uploads/2017/05/Hibachi-Combo.png",
    list:{
      
    }
  },
  beverages2:{
    logo:"https://pngimage.net/wp-content/uploads/2018/05/beverages-png-4.png",
    list:{
      
    }
  }
}




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
    var options = Object.keys(data);
      var _list = data && data[this.state.groupActive] && data[this.state.groupActive]['list']?data[this.state.groupActive]['list']:{};
      const {location, forms} = this.props;
      var s = Util.parseQuery(location.search); 
      var isInCart = s.tb==="cart"?true:false;      
      var _item2cart = forms[cartFormName];   
      console.log(_item2cart)   
      return (
          <div className={`_filters_metricas_operations`}>     
            <SideMenuRestarant updFiltersTab={this.updFiltersTab.bind(this)}  editingSection={this.state.groupActive}   />
            <div className="flexSpace"/>
            {isInCart && 
                <div  className={`graph_Container  ${isInCart?'isVisible':''}`} style={{width:isInCart?'99%':0}} >
                  <div className={'header_title_group'}>
                      <h3>{'CART'}</h3>                      
                    </div>
                   {
                    _item2cart && Object.keys(_item2cart).map(orderNo=>{
                      return(<div>
                          {Object.keys(_item2cart[orderNo]).map(plateId=>{ 
                            let orderDetail = _item2cart[orderNo][plateId];                        
                            let currentSize = orderDetail && orderDetail['size'];                        
                            let currentSizeKey = currentSize && Object.keys(currentSize)[0]; 
                            let currentExtras = orderDetail && orderDetail['extras'];         
                            let item =  data && data[this.state.groupActive]&& data[this.state.groupActive]['list'] &&  data && data[this.state.groupActive]['list'][plateId];
                            if(item){                              
                              let ImgUrlPlt = commonActions.getBlobImage(item.picture) || item.picture;
                              
                              return(
                                <div>
                                  <div className={'_cart_item_top_'}>
                                    <img src={ImgUrlPlt} alt={''} />
                                    <div >
                                      <div  className={'_cart_item_name_'}>
                                        {item['name']}
                                      </div>
                                    
                                      <div  className={'_cart_item_size_'}>
                                        {currentSizeKey}
                                      </div>
                                      <div  className={'_cart_item_price_'}>
                                        {currentSize[currentSizeKey]}
                                      </div>
                                    </div>
                                  </div>
                                  <div  className={'_cart_item_sub_'}>
                                    {
                                      Object.keys(currentExtras).map(_extra_=>{
                                        let _qty = currentExtras[_extra_]['qty'];
                                        console.log(_qty);
                                        if(_qty!==0){
                                          let _grp = currentExtras[_extra_]['group'];
                                          let extraGrpDetail= commonActions.extrasOptions[_grp][_extra_];
                                          let ImgUrl = commonActions.getBlobImage(extraGrpDetail.picture);
                                          return(
                                            <div className={`_cart_item_sub_extras ${_qty>0?'add':'rmv'}`}>                                          
                                              <img src={ImgUrl} alt={''} />
                                              <div className={'_qty'}>
                                              {_qty>0?_qty:'X'}
                                              </div>
                                              <div className={'_name'}>
                                              {_extra_}
                                              </div>                                          
                                            </div>
                                          )
                                        }else{
                                          return null;
                                        }
                                      })
                                    }                                  
                                  </div>
                                </div>
                              )
                            }else{
                              return null
                            }
                          })}
                      </div>)                     
                      
                    })
                   }
                  
                </div>
            }             
            {!isInCart && options.map(title=>{   
              var _extras = data && data[this.state.groupActive] && data[this.state.groupActive]['extras']?data[this.state.groupActive]['extras']:null;           
              return(
                <div  className={`graph_Container  ${this.state.groupActive===title?'isVisible':''}`} style={{width:this.state.groupActive===title?'99%':0}}>
                   <div className={'header_title_group'}>
                      <h3>{this.state.groupActive}</h3>                      
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
    

    var options = Object.keys(data);

      return (
        <div className="restaurant_wrapper">
          <div className="container_left_menu var_left" ytcp-navigation-drawer={`${true}`} matterhorn={`${true}`} collapsed-nav={`${slideMenuCollapsed}`} content-section={`${_Id?'editing':'dashboard'}`} >                    
            <nav className="ytcp-navigation-drawer">
                    <div className="nav_goBack">
                    {_Id?
                      <NavLink  to={{pathname: '/restaurant', search:`?vId=${_Id}&tb=online`}} className={`-navigation_drawer_button_ ${slideMenuCollapsed?'rotateArrow':''}`} onClick={this.goBack.bind(this)}> 
                        <Icons name={'arrowBack'} color={'#1967d2'} size={24}/>                                
                      </NavLink>
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








