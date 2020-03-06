

import React, { Component } from 'react';
import { Switch, Route ,withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../state/commonActions';

import * as  Util from '../state/Util';
import LoadingColorSpinner from './Icons/LoadingColorSpinner';


import Logout from './Logout';




import DialogHRM from './DialogHRM';
import ViewHRM from './ViewHRM';
import ViewSlideHRM from './ViewSlideHRM';

import SlideOptionHRM from './SlideOptionHRM';


import Restarant from './Restarant';

import Login from './Login';
/*



import VerifyToken from './verifyToken';
import Login from './Login';
import Settings from './settings';
import Finances from './Finances';
import Daycare from './Daycare';
import Header from './Header';
import Resume from './Resume22';



import Ingresos from './Ingresos';
import Attendance from './Attendance';
import DashBoard from './dashboard';
import Kids from './Kids';
import Categories from './Categories';





const routerList = {
  "/":{component:DashBoard},
  "/gastos":{component:Gastos,translatetext:53},
  "/kids":{component:Kids,translatetext:3},
  "/ingresos":{component:Ingresos,translatetext:54},
  "/login":{component:DashBoard,translatetext:0},
  "/logout":{component:Logout,translatetext:11},
  "/groups":{component:Categories,translatetext:6},
  "/deniedAcces" :{component:DashBoard,translatetext:1},
  "/attendance" :{component:Attendance,translatetext:1},
  "/settings" :{component:Settings,translatetext:9},
  "/orders" :{component:DashBoard,translatetext:58},
 "/dashboard":{component:DashBoard,translatetext:8}
};
*/

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      route_list : [],
      setting:false,
      badUser:false
    };
  }

  

  componentWillMount(){ 
    const {location} = this.props
    Util.getFingerPrint().then(fps=>{
      window.localStorage.setItem('fpXb',fps);
      if(!localStorage.getItem('wdp')){
          var dw ={Friday: true, Monday: true, Saturday: true, Sunday: true, Thursday: true, Tuesday: true, Wednesday: true}
          localStorage.setItem('wdp',JSON.stringify(dw))
      }

      /*
        if(location && location.search){        
          var s = Util.parseQuery(location.search);
          if(s.tk){
            window.localStorage.setItem('jwt', s.tk); 
            window.localStorage.setItem('user', s.email);
            window.localStorage.setItem('hash', s.hash);
            this.props.commonActions.getUserProfile();
          }
        }else{}
      */

      this.props.commonActions.getUserProfile();   
         
      //Util._EventSourceFunction(commonStore); 
      //var dft = rlist.filter(rt=>rt.path===location.pathname);
    })

    
    


  }


  componentWillReceiveProps(nextProps){
    const {categories,  _routes} = nextProps;     
    var _id = this.props._routes?Object.keys(this.props._routes).length:null;
    var next_id = nextProps._routes?Object.keys(nextProps._routes).length:null;
    
    /*
    if(_id!==next_id){           
      if(Object.keys(_routes).length>0){
        let _rlist = []; 
        Object.keys(_routes).map((rt)=>{
          Object.keys(_routes[rt]).map((dd)=>{            
            if(routerList[dd]){
              var nRt = {path:dd,component:routerList[dd].component}
              _rlist.push(nRt);
            }
          })
        })
        
        if(Object.keys(categories).length>0){                 
          this.props.commonActions.getKids();
        }else{
          this.props.commonActions.getCategories();
        }  
        this.setState({route_list:_rlist,setting:false});             
      }
      else if (!this.state.setting){
        let _rlist = [];        
        var nRt = {path:"/settings",component:Settings};
        _rlist.push(nRt);
        this.setState({route_list:_rlist,setting:true});
      }
    }
    */
  }



  componentDidMount(){
    this.props.commonActions.UpdateCalendarParams('year',(new Date()).getFullYear())
    this.props.commonActions.UpdateCalendarParams('Resume_Year',(new Date()).getFullYear())
    this.props.commonActions.UpdateCalendarParams('month',(new Date()).getMonth()+1)
    this.props.commonActions.UpdateCalendarParams('date',`${(new Date()).getMonth()+1}/${(new Date()).getDate()}/${(new Date()).getFullYear()}`)
    window.addEventListener('resize', this.updateWidthScreenVar.bind(this));
    this.updateWidthScreen();
  }

  updateWidthScreenVar(){    
    Util.changethemeKey('light',"--screen--width--",window.outerWidth);
    Util.changethemeKey('light',"--screen--width--px--",window.outerWidth+'px');
    this.updateWidthScreen()
  }


  updateWidthScreen(){
    const isMobile = 800;  
    if(window.outerWidth<=isMobile){
      this.setState({ws:true})
      this.props.commonActions.updateWidthScreen(true);
    }
    else{
      this.setState({ws:false});
      this.props.commonActions.updateWidthScreen(false);
    }
  }


  render() {
    const {appLoaded, authenticate,filterObserve, categories,userDetail, location, _routes} = this.props;  
   
    
    /*
    const token = window.localStorage.getItem('jwt');    
    if(token && token!==last_token){
      last_token = token;
      if(_EventSource){
        _EventSource.close();
        Util._EventSourceFunction(props.props.commonStore);

      }
    } 
     {this.state.route_list.map((rt,indX)=>{
            return(<Route key={indX} path={rt.path} component={rt.component}/>)
            })}
    
    
    */

    if(appLoaded) {     
      return (
        <div>
          {false?<div back-item-detail={'false'} className={`back_item_detail`}></div> :null}
        
          <div className={'_app_body_content_'}>          
          <Switch>    
            <Route exact path="/" component={Restarant} />
            <Route path="/restaurant" component={Restarant} />
            <Route path="/logout" component={Logout} />                      
          </Switch>
          </div>
          <DialogHRM/>
          <ViewHRM/>         
          <ViewSlideHRM/>
          <SlideOptionHRM/>          
        </div>
      );
    }else{ 
      return(<div><LoadingColorSpinner/></div>)
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {       
    _routes: state.common.routeList,    
    appLoaded:state.common.appLoaded,
    authenticate:state.common.authenticate,
    userDetail:state.common.user,
    filterObserve: state.common.filterObserve,
    categories: state.common.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));