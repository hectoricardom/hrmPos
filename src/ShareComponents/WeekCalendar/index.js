import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';

import {Util ,Icons} from '..'
import './style.css';

class WeekCalendar extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      yearContainer :false,
      year: 2018,
      _MonthDataToRender:[],
      month:1 
    };
  }

  componentDidMount() {  
    var _th6 = this;
    const { year} = _th6.props.calendar;
    var y = Util.printYearWeekly(year);
    this.setState({_MonthDataToRender:y})
    setTimeout(()=>{           
      var elmnt = document.getElementsByClassName('currentWeek')[0];
      if(elmnt){
        elmnt.scrollIntoView();
      }      
    },350)     
  }  
  ref = r => {
    this.MS_Elem = r
  }

 

  updYear= (r) => {
    var _th6 = this;
    const { year} = _th6.props.calendar;
    this.props.actions.UpdateCalendarParams('year',year+r)
    var y = Util.printYearWeekly(year+r);   
    this.setState({_MonthDataToRender:y,year:year+r})
  }


  updYearContainer = (r) => { 
    this.setState({yearContainer:r}); 
  }

  setDay= (ds,de,ms,me) => {    
    var _th6 = this;
    const { year} = _th6.props.calendar;   
    var Week2print = {}    
      if(ds===1 && ms===1){
        let wd = (new Date(Util.formatDate(year,ms,ds))).getDay();
        if(wd!==0){
          Week2print['Iwk']=Util.formatDate(year-1,12,31-(wd-1));
        }
      }else{
        Week2print['Iwk']=Util.formatDate(year,ms,ds);
      } 
      if(de===31 && me===12){
        let wd = (new Date(Util.formatDate(year,me,de))).getDay();
        if(wd!==6){
          Week2print['ewk']=Util.formatDate(year+1,1,1+(5-wd));
        }
      }
    else{
      Week2print['ewk']=Util.formatDate(year,me,de);
    }    
    if(typeof this.props.valueUpdate === "function"){
      this.props.valueUpdate(Week2print);
    }     
  }

  render() {  
    var _th6 = this;
    const {currentColorTheme ,calendar,height, calendarObserve } = this.props;
    const { year} = calendar;
    var colorRT = currentColorTheme || `198, 40, 40`,
    _textStyle = {color:`rgba(${colorRT},1)`,font: `600 17px/23px "Google Sans", Roboto, Arial, sans-serif`},
    bckStyle = {border: `1.5px solid rgba(${colorRT},0.6)`,color:`rgba(${colorRT},1)`, backgroundColor: `rgba(${colorRT},0.2)`,borderRadius: `13px`};
    const dateNow = new Date();    
    const _month = dateNow.getMonth()+1;
    return (
      <div ref={this.ref} className="FlexList WCbase">
          {this.state.yearContainer? 
                      <div className="DesktopYearContainer" key={`fgyb45gbyq36234463`} >
                          <div className="IconInputText" onClick={()=>{this.updYear(-1)}}>
                            <Icons name={'arrow_left'} color={'#bbb'} size={24} />
                          </div>
                          <div className="flexSpace"/>   
                          <div className='le' style={{color:currentColorTheme}} onClick={()=>{this.updYearContainer(false)}}>                        
                              {year}                       
                          </div>
                          <div className="flexSpace"/>   
                          <div className="IconInputText"  onClick={()=>{this.updYear(1)}}>
                            <Icons name={'arrow_right'} color={'#bbb'} size={24}/>
                          </div>
                      </div>
                    : null
            } 
              <div  className="FlexList Mobile_WeekContainer" style={{height:(height-20)+'px'}}>
            { Util.ObjectKeys(this.state._MonthDataToRender).map((wk,inWk)=>{
              var wkD = this.state._MonthDataToRender[wk]; 
              var start = wkD['start'];
              var end = wkD['end'];
              var _2m = false;
              var currentWeek = "FlexList WkCont";
              
              if(start && end && start['month']!==end['month']){
                _2m = true;
                if(_month===start['month'] || _month===end['month']){
                  let Mntm = Util.getDayofyear();
                  let ddSm = Util.getDayofyear(Util.formatDate(year,start['month'],start['day']));
                  let ddEm = Util.getDayofyear(Util.formatDate(year,end['month'],end['day']));
                  
                  if(ddSm<=Mntm && Mntm<=ddEm){
                    currentWeek = "FlexList WkCont currentWeek";
                  }
                }
              }
              else{
                let Mnt = start?start['month']:end['month'];
                if(_month===Mnt){
                  let ddS = start?start['day']:1;
                  let ddE = end?end['day']:31;
                  let Mntm = Util.getDayofyear();
                  let ddSm = Util.getDayofyear(Util.formatDate(year,Mnt,ddS));
                  let ddEm = Util.getDayofyear(Util.formatDate(year,Mnt,ddE));
                  if(ddSm<=Mntm && Mntm<=ddEm){
                    currentWeek = "FlexList WkCont currentWeek";
                  }
                }
              }
              if(_2m){
                return (
                  <div key={wk} className={currentWeek} style={bckStyle}  onClick={()=>{this.setDay(start['day'],end['day'],start['month'],end['month'])}}>
                    <div className="FlexItem">
                          <div style={_textStyle}>{start['day']} {Util.monthsList_Short[start['month']]}</div>
                    </div> 
                    <div className="flexSpace"/> 
                    <div style={_textStyle}>-</div>
                    <div className="flexSpace"/>    
                    <div className="FlexItem">
                        <div style={_textStyle}>{end['day']} {Util.monthsList_Short[end['month']]}</div>
                    </div>
                  </div>
                )

              }else{
                let dayS = start?start['day']:1;
                let dayE = end?end['day']:31;
                let Month = start?start['month']:end['month'];
                return (
                  <div key={wk} className={currentWeek} style={bckStyle}  onClick={()=>{this.setDay(dayS,dayE,Month,Month)}}>
                    <div className="FlexItem">
                          <div style={_textStyle}>{dayS}</div>
                    </div> 
                    <div className="flexSpace"/> 
                    <div style={_textStyle}> {Util.monthsList_Short[Month]} </div>
                    <div className="flexSpace"/>    
                    <div className="FlexItem">
                      <div style={_textStyle}>{dayE}</div>
                    </div>
                  </div>
                )
              }
            })
            }            
            </div>
      </div>
    );
  }
}



function mapStateToProps(state, ownProps) {
  return {
    calendarObserve: state.common.calendarObserve,    
    calendar:state.common.calendar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekCalendar);