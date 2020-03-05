import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../../state/commonActions';

import {Util ,Icons} from '..'
import './style.css';

class Calendar extends Component {
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
    const { month,year} = _th6.props.calendar;
    var y = Util.printMonth(month,year);
    this.setState({_MonthDataToRender:y})    
  }  

  componentWillReceiveProps(nextProps){
    var _month = this.state.month;
    var next_month = nextProps.calendar?nextProps.calendar.month:null;
    if(_month!==next_month){      
      var y = Util.printMonth(next_month,nextProps.calendar.year);
      this.setState({_MonthDataToRender:y,month:next_month});
    }
  }




  ref = r => {
    this.MS_Elem = r
  }

 

  updYear= (r) => {
    var _th6 = this;
    const {month, year} = _th6.props.calendar;
    this.props.actions.UpdateCalendarParams('year',year+r)
    var y = Util.printMonth(month,year+r);   
    this.setState({_MonthDataToRender:y,year:year+r})
  }


  prevMonth = () => {
    var _th6 = this;
    const { month,year} = _th6.props.calendar;
    var y = null;
    if(month-1<1){      
      y = Util.printMonth(12,year-1);
      this.setState({_MonthDataToRender:y,year:year-1,month:12});      
      this.props.actions.UpdateCalendarParams('month',12)
      this.props.actions.UpdateCalendarParams('year',year-1)
    }
    else{      
      y = Util.printMonth(month-1,year);
      this.setState({_MonthDataToRender:y,month:month-1});
      this.props.actions.UpdateCalendarParams('month',month-1)
    }
  }
  nextMonth = () => {
    var _th6 = this;    
    const { month,year} = _th6.props.calendar;
    var y = null;
    if(month+1>12){      
      y = Util.printMonth(1,year+1);
      this.setState({_MonthDataToRender:y,year:year+1,month:1});
      this.props.actions.UpdateCalendarParams('month',1)
      this.props.actions.UpdateCalendarParams('year',year+1)
    }
    else{      
      y = Util.printMonth(month+1,year);
      this.setState({_MonthDataToRender:y,month:month+1});      
      this.props.actions.UpdateCalendarParams('month',month+1)
    }    
    
  }

  updYearContainer = (r) => { 
    this.setState({yearContainer:r}); 
  }

  setDay= (r) => { 
    var _th6 = this;
    const { month,year} = _th6.props.calendar;   
    var cdate = `${month}/${r}/${year}`;
    this.props.actions.UpdateCalendarParams('day',r)
    if (typeof _th6.props.valueUpdate === 'function') {     
      _th6.props.valueUpdate(cdate);
    }  
  }

  render() {  
    var _th6 = this;
    const {currentColorTheme ,colorRGBA, calendar, date,  calendarObserve } = this.props;    
    const { day, year,month} = calendar
    var _month = (new Date(date)).getMonth()+1?(new Date(date)).getMonth()+1:month;
    var lng = localStorage.getItem('lng') || 'en';
    var theme = currentColorTheme;
    //var dayNowStyle= {color:`#fff`,backgroundColor: theme, border: `1px solid ${theme}`};    
    
    return (
      <div ref={this.ref} className="baseCalendar"> 
        <div id={`calendarPrev`} className="_flipper _prev" onClick={()=>{_th6.prevMonth()}}>
        <div className="_flipper_icon">
            <Icons name={'arrow_left'} color={currentColorTheme} size={24} />                         
          </div>
        </div>
        <div className="_flipper _next" onClick={()=>{_th6.nextMonth()}}>
          <div className="_flipper_icon">
            <Icons name={'arrow_right'} color={currentColorTheme} size={24} />
          </div>          
        </div>
        <div className="flexlIt WidthMonthContainer">   
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
          <table className="MonthCalendar flexlIt"> 
          
              <tbody>
                  <tr className="monthNow">
                      <th colSpan="7">{Util._monthNames[lng][month]} <span className="yearStyle" onClick={()=>{this.updYearContainer(true)}}>{year}</span></th>
                  </tr>                                                
                <tr className="">
                  {
                    Util._dayShortNames[lng].map((dk,inD)=>{
                      return (
                      <td className="Wdays" key={`${inD}@$wDayName@${dk}`}>
                          <div className='dayTextStyle' style={{color:currentColorTheme}}>                        
                              {dk}                       
                          </div>
                      </td>
                      )
                    })
                  }                            
                  </tr> 
                  {
                    this.state._MonthDataToRender.map((wk,inWk)=>{                
                      return (
                      <tr  key={`${inWk}@$week@00`}>
                          {
                            wk.map((dys,inDd)=>{
                             
                              if(dys.cls.indexOf(`dayNow`)>5){                                
                                return (
                                  <td key={`${inDd}@$day@${dys.d}`}  className={`${dys.cls} ${_month===month && dys.d===day?'activeday':''}`} onClick={()=>{this.setDay(dys.d)}}>
                                    <div  className='dayTextStyle'>
                                      {dys.d}
                                    </div>
                                  </td>
                                )
                              }else{
                                if(dys.d){
                                  return (
                                    <td key={`${inDd}@$day@${dys.d}`} className={`${dys.cls} ${_month===month && dys.d===day?'activeday':''}`} onClick={()=>{this.setDay(dys.d)}}>
                                      <div  className='dayTextStyle'>
                                        {dys.d}
                                      </div>
                                    </td>
                                  )
                                }else{
                                  return (
                                    <td key={`${inDd}@$day@${dys.d}`} className={`${dys.cls} ${_month===month && dys.d===day?'activeday':''}`}>
                                      <div  className='dayTextStyle'>
                                        {dys.d}
                                      </div>
                                    </td>
                                  )
                                }
                                
                              }
                              
                            })
                          }
                      </tr>
                      )
                    })
                  }            
              </tbody>
          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);