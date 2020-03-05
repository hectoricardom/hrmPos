//18557077328
//10303-084391003-3001
//4734
//1218 Aftertglow Ct
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';

import './style.css';

import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';


class MobileCalendar extends Component {
  


  constructor(props) {
    super(props);
  
    this.state = {
      yearContainer :false,
      year: 2018,
      _allYear2Render:{},
      month:1 
    };
  }

  componentDidMount() {  
    var _th6 = this;
    const { year} = _th6.props.calendar;   
    setTimeout(()=>{
      var y = Util.printYear(year);
      this.setState({_allYear2Render:y,year:year})   
      var Dt = new Date();
      var mnt = Dt.getMonth()
      var IDKey = Util.Base64.encode(`${mnt}@$mnbt@${mnt+1}`)
      var elmnt = document.getElementById(IDKey);
      elmnt.scrollIntoView();
    },50) 
  }  

  ref = r => {
    this.MS_Elem = r
  }

 
  updYear= (r) => {
    var _th6 = this;
    const { year} = _th6.props.calendar;
    this.props._commonActions.UpdateCalendarParams('year',year+r)
    setTimeout(()=>{
      var y = Util.printYear(year+r);   
      this.setState({_allYear2Render:y,year:year+r})
    },150) 
  }

  updYearContainer = (r) => { 
    this.setState({yearContainer:r}); 
  }

  setDay= (r,m) => { 
    var _th6 = this;    
    const { year} = _th6.props.calendar;   
    var cdate = (new Date(`${m}/${r}/${year}`)).getTime();
    this.props._commonActions.UpdateCalendarParams('day',r)
    this.props._commonActions.UpdateCalendarParams('date',cdate)
    if (typeof _th6.props.valueUpdate === 'function') {     
      _th6.props.valueUpdate(cdate);
    }  
  }

  handleBack = e => { 
    var _th6 = this;       
    if (typeof _th6.props.handleBack === 'function') {     
      _th6.props.handleBack();
    }
  };


  handleNextDay(){
    const {form,field,calendar,button_float} = this.props; 
    const {date} = calendar; 
    var f_label = date?date:'date';
    var dt = button_float?SumDays(f_label,7) :SumDays(f_label,1);
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate())   
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1)
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear())
    this.props._commonActions.UpdateCalendarParams('date',dt.getTime());
    this.props._commonActions.UpdateForm(form,field,dt.getTime());
  }
  
  handlePrevDay(){
    const {form,field,calendar,button_float} = this.props; 
    const {date} = calendar; 
    var f_label = date?date:'date';
    var dt = button_float?SumDays(f_label,-7) :SumDays(f_label,-1);
    this.props._commonActions.UpdateCalendarParams('day',dt.getDate());   
    this.props._commonActions.UpdateCalendarParams('month',dt.getMonth()+1);
    this.props._commonActions.UpdateCalendarParams('year',dt.getFullYear());
    this.props._commonActions.UpdateCalendarParams('date',dt.getTime());
    this.props._commonActions.UpdateForm(form,field,dt.getTime());
  }
 
  render() {  
    var _th6 = this;
    const {calendar, weekPicker, button_float, field,  calendarObserve, colorRGBA, currentColorTheme} = this.props;
    const { day,month,year,date} = calendar;     
    var _month = (new Date(date)).getMonth()+1?(new Date(date)).getMonth()+1:month;
    const lng = localStorage.getItem('lng');
    var theme = currentColorTheme;
    const wdt = (window.outerWidth / 7)-2;
    var dayNowStyle= {width:`${wdt}px`};
    const AddClassTag = (r) => {
      return 'Mobile_'+r
    }    
    var heightStyle = {height:`100vh`}
    var labelField = button_float?Util.weekdate2pretyfy(date):Util.date2pretyfy(date);
    return (
      <div className="DateContainerBox" style={heightStyle}>  
      <div className="InputDateContainer1" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>
          <div className="inputWrapperCalendar">          
            <div className="center--Container Icon" onClick={this.handleBack.bind(this)}>
              <Icons name={'arrowBack'} color={'#777'} size={24}/>
            </div>
            <div className="center--Container dateFormated">  
              <div>{labelField}</div>
            </div> 
            <div className="flexSpace"/> 
            <div className="center--Container Arrows" onClick={this.handlePrevDay.bind(this)}>
              <Icons name={'arrow_left'} color={'#777'} size={24}/>
            </div>
            <div className="center--Container Arrows"  onClick={this.handleNextDay.bind(this)}>
              <Icons name={'arrow_right'} color={'#777'} size={24}/>
            </div>
          </div>              
        </div>
      <div ref={this.ref} className={`Mobile_BaseCalendar ${weekPicker?'weekPicker':''}`}  style={{"--calendar--mobile--base--color--": theme,"--calendar--mobile--background--color--":colorRGBA}}> 
      
      {this.state.yearContainer?        
        <div className={`Mobile_YearsContainer`}>
            {
                <div className="Mobile_Wdays" key={`fgyb45gbyq36234463`} style={{width:`${wdt}px`}}>
                    <div className="IconInputText" onClick={()=>{_th6.updYear(-1)}}>
                      <Icons name={'arrow_left'} color={'#bbb'} size={24} />
                    </div>
                    <div className='Mobile_dayTextStyle' style={{color:theme}} onClick={()=>{_th6.updYearContainer(false)}}>                        
                        {year}                       
                    </div>
                    <div className="IconInputText"  onClick={()=>{_th6.updYear(1)}}>
                      <Icons name={'arrow_right'} color={'#bbb'} size={24}/>
                    </div>
                </div>
            }                            
        </div>:
          <div className="Mobile_DaysContainer">
          {
            Util._dayShortNames[lng].map((dk,inD)=>{
              return (
              <div className="Mobile_Wdays" key={`${inD}@$wDayName@${dk}`} style={{width:`${wdt}px`}}>
                  <div className='Mobile_dayTextStyle' style={{color:theme}}>                        
                      {dk}                       
                  </div>
              </div>
              )
            })
          }                            
      </div>
      }        
      <div className="Mobile_MonthsContainer">
       <div className={AddClassTag(`WidthMonthContainer`)}>    
      <table className={AddClassTag(`MonthCalendar`)}> 
        <tbody>         
        {
              Util.ObjectKeys(this.state._allYear2Render).map((yr,inYr)=>{
                var f_label = date;
                var dy2c = f_label?(new Date(f_label)).dayOfYear():(new Date()).dayOfYear();
                var IDKey = Util.Base64.encode(`${inYr}@$mnbt@${yr}`)
                return (    
                  <tr id={IDKey} key={IDKey}>         
                    <td className={AddClassTag(`monthNow`)}>
                      <div colSpan="7" className={AddClassTag(`MonthNameCont`)} style={{color:theme}}>{Util._monthNames[lng][yr]} <span className={AddClassTag(`yearStyle`)}  style={{color:theme}} onClick={()=>{this.updYearContainer(true)}}>{year}</span></div>
                    
                { this.state._allYear2Render[yr].map((wk,inWk)=>{                  
                  var isWp = weekPicker?wk.filter(dyys=>dyys.dy===dy2c).length>0?true:false:false;   
                  return (
                    <tr  key={`${inWk}@$week@00`} className={`${isWp?'weekActive':''}`} >
                    {
                      wk.map((dys,inDd)=>{                        
                        if(!weekPicker && dys.cls.indexOf(`dayNow`)>5){
                          return (
                            <td key={`${inDd}@$day@${dys.d}`} className={`${AddClassTag(dys.cls)} ${_month===parseInt(yr) && dys.d===day?'activeday':''}`} style={{width:`${wdt}px`}} onClick={()=>{this.setDay(dys.d,yr)}}>
                              <div  className={AddClassTag(`dayTextStyle`)}>
                                {dys.d}
                              </div>
                            </td>
                          )
                        }else{
                          if(dys.d){
                            return (
                              <td key={`${inDd}@$day@${dys.d}`} className={`${AddClassTag(dys.cls)} ${_month===parseInt(yr) && dys.d===day?'activeday':''}`} style={{width:`${wdt}px`}} onClick={()=>{this.setDay(dys.d,yr)}}>
                                <div  className={AddClassTag(`dayTextStyle`)}>
                                  {dys.d}
                                </div>
                              </td>
                            )
                          }else{
                            return (
                              <td key={`${inDd}@$day@${dys.d}`} className={`${AddClassTag(dys.cls)} ${_month===parseInt(yr) && dys.d===day?'activeday':''}`} style={{width:`${wdt}px`}}>
                                <div  className={AddClassTag(`dayTextStyle`)}>
                                  
                                </div>
                              </td>
                            )
                          }
                          
                        }
                        
                      })
                    }
                    </tr>
                 ) })
                } 
                </td></tr> 
              )              
            })
            
        }      
        </tbody>
    </table>
    </div>
    </div>
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
    _commonActions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileCalendar);



function SumDays(dt,days) {
  var y = new Date(dt);
  var result = isNaN(y.getTime())?new Date():y;  
  result.setDate(result.getDate() + days);
  return result;
}

function SumMonths(dt,mnt) {
  var y = new Date(dt);
  var result = isNaN(y.getTime())?new Date():y;  
  result.setDate(result.getMonth() + mnt);
  return result;
}