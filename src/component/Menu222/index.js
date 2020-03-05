import React, { Component } from 'react';
import './style.css';

import { NavLink } from 'react-router-dom';

import * as Util from '../../state/Util';
import LoadingColorSpinner from '../Icons/LoadingColorSpinner';
import Icons from '../Icons/Icons';




export default class Menu22 extends Component {
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
  }


  HandleSettingTabIndex(){    

  }

  goBack(){    
    this.setState({slideMenuCollapsed:!this.state.slideMenuCollapsed});
  }


  render() {
   
   
    const { editingSection } = this.props;


    const {slideMenuCollapsed, _active } = this.state;


    
    var _Id = "rty453";
    let options = [
      {label:'metrica',icon:'analytics', visible:true ,href:{pathname: '/finances', search:`?vId=${_Id}&tb=gastos`}},
      {label:'categories',icon:'dashboard', visible:true ,href:{pathname: '/finances', search:`?vId=${_Id}&tb=gastos`}},
      {label:'filters',icon:'filter', visible:true ,href:{pathname: '/finances', search:`?vId=${_Id}&tb=gastos`}},
    ]


    let settingsBottom =  [
      {label:'settings',icon:'setting', visible:true  ,href:{pathname: '/editing', search:``}}
      /*
      {label:`What's new` ,icon:'whats_new', visible:true ,href:{pathname: '/editing',search:``}},
      {label:'Theme',icon:'theme', visible:true ,href:{pathname: '/editing',search:`?`}},
         
      
      {label:'logout',icon:'logout', visible:true, href:{pathname: '/editing' ,search:`?vId=${_Id}&tb=genres`}}
      */
    ]
    ; 
    let  dashboardList = settingsBottom;


      return (
        <div className="container_left_menu var_left" ytcp-navigation-drawer={`${true}`} matterhorn={`${true}`} collapsed-nav={`${slideMenuCollapsed}`} content-section={`${_Id?'editing':'dashboard'}`} >
                    
        <nav className="ytcp-navigation-drawer">
        <div className="nav_goBack">
        {_Id?
          <NavLink  to={{pathname: '/finances', search:`?vId=${_Id}&tb=gastos`}} className={`-navigation_drawer_button_ ${slideMenuCollapsed?'rotateArrow':''}`} onClick={this.goBack.bind(this)}> 
            <Icons name={'arrowBack'} color={'#1967d2'} size={24}/>                                
          </NavLink>
        :null
        }
        </div>
        
        <div className={`top-section_edit sync-on-transition  ytcp-navigation-drawer`}>
        {_Id? <div id="main-menu" className=" ytcp-navigation-drawer">
          {options.map((op,in_6)=>{
            if(op.visible){
              return(
                <div track-click="" className="-navigation_drawer_items" role="none" key={`menu-item-${in_6}`}  is-active={`${editingSection===op.label}`}  onClick={this.HandlenavTabIndex.bind(this,in_6,op.label)}>
                  <NavLink  to={op.href}  className="menu-item-link  ytcp-navigation-drawer" id={`menu-item-${in_6}`}>                          
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
          :null}
        </div>

        <div className={`top-section sync-on-transition  ytcp-navigation-drawer`}>
        {<div id="main-menu" className=" ytcp-navigation-drawer">
          {dashboardList.map((op,in_6)=>{
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
        
        <div  className="bottom_section" >
         {/*<hr clclassNameass="divider"/> */} 
          <div id="main-menu" className=" ytcp-navigation-drawer">
          {false &&  settingsBottom.map((op,in_6)=>{
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
        </nav>
      </div>  
      ) 
  }
}
















