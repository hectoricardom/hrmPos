



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';
//import * as Print2 from '../../state/printDoc';
import { withRouter} from 'react-router-dom';
import TabsHRM from '../TabsHRM';

//import { GraphLine, GraphLineMonth} from '../GraphLineHRM';

import { GraphMultiLine} from '../GraphMultiLineHRM';
import  RadioBoxHRM from '../radioBoxHRM';



import './style.css';
import LoadingColorSpinner from '../Icons/LoadingColorSpinner';


var _Type = 'Resume'

const _tabs = ['2019' ,'2018','mes'];
const _tabActive = 'earnings';

const monthsList_Short =[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];

const WeekDetails ={
  "1":{"color":"#ffd600","backColor":"rgb(255,214,0,0.2)","dayName":"Sunday"},
  //"0":{"color":"#4a148c","backColor":"rgb(74,20,140,0.09)","dayName":"Sunday"},  
  "2":{"color":"#4285f4","backColor":"#e8f0fe","dayName":"Monday"},
  "3":{"color":"#ea4335","backColor":"#fce8e6","dayName":"Tuesday"},
  "4":{"color":"#34a853","backColor":"#e6f4ea","dayName":"Wednesday"},
  "5":{"color":"#a142f4","backColor":"#f3e8fd","dayName":"Thrusday"},
  "6":{"color":"#ff7817","backColor":"rgba(255,120,23,0.09)","dayName":"Friday"},
  "7":{"color":"#222","backColor":"#e3e3e3","dayName":"Saturday"}
};


const colorListDetails ={
  "0":{"color":"#ff7817","backColor":"rgba(255,120,23,0.09)"},
  "1":{"color":"#ffd600","backColor":"rgb(255,214,0,0.2)"},    
  "2":{"color":"#4285f4","backColor":"#e8f0fe"},
  "3":{"color":"#ea4335","backColor":"#fce8e6"},
  "4":{"color":"#34a853","backColor":"#e6f4ea"},
  "5":{"color":"#a142f4","backColor":"#f3e8fd"},
  "6":{"color":"#ff7817","backColor":"rgba(255,120,23,0.09)"},
  "7":{"color":"#222","backColor":"#e3e3e3"},
  "8":{"color":"#4a148c","backColor":"rgb(74,20,140,0.09)"},
  "9":{"color":"#ffd600","backColor":"rgb(255,214,0,0.2)"},    
  "10":{"color":"#4285f4","backColor":"#e8f0fe"},
  "11":{"color":"#222","backColor":"#e3e3e3"},
  "12":{"color":"#4a148c","backColor":"rgb(74,20,140,0.09)"},
  "13":{"color":"#ea4335","backColor":"#fce8e6"},
  "14":{"color":"#34a853","backColor":"#e6f4ea"},
  "15":{"color":"#a142f4","backColor":"#f3e8fd"},
  "16":{"color":"#ff7817","backColor":"rgba(255,120,23,0.09)"},
  
};


const _dayShortNames = ['','S','M','T','W','T','F','S'];
const _dayLargeNames = ['',"Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];

var _width = 340;

class Resume extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          lastHover:null, 
          activeGraphtab:0,
          activeType:'Ingresos',
          _year:2019,
          filterMonth:false,
          month2flt:null,
          filterCategory:false,
          _weekDayflt:null,
          rangeWeek:'last Month',
          index:0,
          activeGraphCategory:null
        };
    }
  componentDidMount() {  
    

  }  
  componentWillMount(){    
    window.localStorage.setItem('c_id',1);
    this.updateURlPath();
  }



  componentWillReceiveProps(nextProps){     
    var _initvalue = this.props.location.search?this.props.location.search:null;
    var next_initvalue = nextProps.location.search?nextProps.location.search:null;
    if(_initvalue!==next_initvalue){
      console.log('_initvalue');
     // this.updateURlPath();
    }
  }


  updateURlPath(){
    const {location, history} = this.props;
    var resumePath = window.localStorage.getItem('resumePath');
    var rs = Util.parseQuery(resumePath);
    
    var s = Util.parseQuery(location.search);
    var i = null;
    var tabActive = false;
    if(s.tb===_tabActive){
      tabActive = true;
    }
    if(tabActive){
      if(s.rsm){   
        i = parseInt(s.rsm);      
      } 
    
      var updateUrl = false;
      
      if(!i){
        updateUrl = true;
        s = rs;
        i = parseInt(rs.rsm);
      }      
      if(i!==this.state.index){
        var _clearState = {index:i,filterMonth:false, month2flt:null,filterWeekDay:false,filterbyWeek:false, _weekflt:null, _weekDayflt:null}
        if(i===1){
          let _v = 2019;
          _clearState['_year'] = _v;
          this.setState(_clearState);
          updateUrl && history.push(`/details?tb=earnings&rsm=${i}&v=${_v}`);
        }else  if(i===2){
          let _v = 2018;
          _clearState['_year'] = _v;
          this.setState(_clearState);       
          updateUrl && history.push(`/details?tb=earnings&rsm=${i}&v=${_v}`);
        }
        else  if(i===3){
          var m = (new Date()).getMonth();
          if(s.v){
            m = s.v;
            updateUrl && history.push(`/details?tb=earnings&rsm=${i}&v=${m}`);
          }else{
            updateUrl && history.push(`/details?tb=earnings&rsm=${i}`);
          }
          _clearState['filterMonth'] = true;
          _clearState['month2flt'] = m;
          this.setState(_clearState);        
        }
        else  if(i===4){        
          if(s.v){
            let m = s.v;
            _clearState['_weekDayflt'] = m;
            updateUrl && history.push(`/details?tb=earnings&rsm=${i}&v=${m}`);
          }else{
            updateUrl && history.push(`/details?tb=earnings&rsm=${i}`);
          }
          _clearState['filterWeekDay'] = true;       
          this.setState(_clearState);
        }
        else  if(i===5){  
          var lmt = '';
          let mv = '';
          if(s.lmt){
            lmt = `&lmt=${s.lmt}`;
            _clearState['rangeWeek'] = s.lmt;
          }
          if(s.v){
            mv = `&v=${s.v}`;
            _clearState['_weekflt'] = s.v;            
          }
          updateUrl && history.push(`/details?tb=earnings&rsm=${i}${lmt}${mv}`);
          
          _clearState['filterbyWeek'] = true;
          this.setState(_clearState);
        }       
      }
    }
  }





  activeGraphtab(i){
    this.setState({activeGraphtab:i,activeGraphCategory:null,});
   }


   activeGraphCategory(i){
    this.setState({activeGraphCategory:i});
   }
   

  ref = r => {
    this.MS_Elem = r
  }



  updYear(v){
    const {history} = this.props;
    this.close_filterOptions();    
    this.setState({_year:v, filterMonth:false, month2flt:null, filterWeekDay:false});
    let _year = {2019:1,2018:2}
    history.push(`/details?tb=earnings&rsm=${_year[v]}&v=${v}`);
    window.localStorage.setItem('resumePath',`tb=earnings&rsm=${_year[v]}&v=${v}`)
  }

 
  open_filterOptions(){    
    var formName = `period_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterOption sortList={[]} updChange={this.handleOptionsFilterChanges.bind(this)} updYear={this.updYear.bind(this)}  weekChange={this.handleGroupWeekChanges.bind(this)} weekDayChange={this.handleGroupWeekDayChanges.bind(this)}/>
    var options = {id:_id,zIndex:150,height:125,content:_cont};
    this.props.dialogActions.OpenSlideOption(options);
  }



  close_filterOptions(){
    var formName = `period_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseSlideOption(options);
  }


  

  
  handleGroupWeekDayChanges(){
    const {history} = this.props;
    this.setState({filterMonth:false,month2flt:null, filterWeekDay:true,filterbyWeek:false});
    this.close_filterOptions();
    history.push(`/details?tb=earnings&rsm=${4}`);
    window.localStorage.setItem('resumePath',`tb=earnings&rsm=${4}`)
  }

  handleGroupWeekChanges(){
    const {history} = this.props;
    this.setState({filterMonth:false,month2flt:null, filterWeekDay:false,filterbyWeek:true});
    this.close_filterOptions();
    history.push(`/details?tb=earnings&rsm=${5}`);
    window.localStorage.setItem('resumePath',`tb=earnings&rsm=${5}`)
  }

  handleOptionsFilterChanges(){
    this.close_filterOptions();
    var formName = `groupDate_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterGroupByMonth updChange={this.handleGroupDateChanges.bind(this)} year={this.state._year} active={this.state.date2F} closeView={this.close_GroupDate.bind(this)} clearFilter={this.handleclearFilter.bind(this)}  />
    var options = {id:_id,zIndex:500,height:450,content:_cont};
    this.props.dialogActions.OpenView(options);    
  }
     


  close_GroupDate(){
    var formName = `groupDate_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id};
    this.props.dialogActions.CloseView(options); 
  }




  handleGroupDateChanges(i){
    const {history} = this.props;
    this.setState({filterMonth:true,month2flt:i, filterWeekDay:false})
    this.close_GroupDate();
    history.push(`/details?tb=earnings&rsm=${3}&v=${i}`);
    window.localStorage.setItem('resumePath',`tb=earnings&rsm=${3}&v=${i}`);
  }


  handleclearFilter(i){
    this.setState({filterMonth:false,month2flt:null, filterWeekDay:false,filterbyWeek:false})
    this.close_GroupDate();
    
    
  }





  handlePrint(i){
    
  }



  handlerSaveForm(i){    
    this.setState({filterMonth:true,month2flt:i})
    //this.props.history.push(`/resume?tb=mes&v=${i}`);
    
  }

  clearFilter(i){
    this.setState({filterMonth:false,month2flt:null})
  }


  activeWday(i){
    const {history} = this.props;
    if(this.state._weekDayflt !== i){      
      this.setState({filterMonth:false,month2flt:null,_weekDayflt:i, _weekflt:null});
      history.push(`/details?tb=earnings&rsm=${4}&v=${i}`);
      window.localStorage.setItem('resumePath',`tb=earnings&rsm=${4}&v=${i}`);
    }else{
      this.setState({filterMonth:false,month2flt:null,_weekDayflt:null, _weekflt:null});
      history.push(`/details?tb=earnings&rsm=${4}`);
      window.localStorage.setItem('resumePath',`tb=earnings&rsm=${4}`);
    }
  }

  clearActiveWday(i){
    
    this.setState({filterMonth:false,month2flt:null,_weekDayflt:null})
  }

  activeWeek(i){
    const {history} = this.props;
    const {rangeWeek} = this.state;    
    if(this.state._weekflt !== i){      
      this.setState({filterMonth:false,month2flt:null,_weekDayflt:null, _weekflt:i});
      history.push(`/details?tb=earnings&rsm=${5}&v=${i}&lmt=${rangeWeek}`);
      window.localStorage.setItem('resumePath',`tb=earnings&rsm=${5}&v=${i}&lmt=${rangeWeek}`);
    }else{
      this.setState({filterMonth:false,month2flt:null,_weekDayflt:null, _weekflt:null});
      history.push(`/details?tb=earnings&rsm=${5}&lmt=${rangeWeek}`);
      window.localStorage.setItem('resumePath',`tb=earnings&rsm=${5}&lmt=${rangeWeek}`);
    }
  }






  updRadioChange(i){
    const {history} = this.props;
    const {index,_weekflt} = this.state;  
    this.setState({rangeWeek:i});
    var value =   _weekflt?`&v=${_weekflt}`:'';
    history.push(`/details?tb=earnings&rsm=${index}&lmt=${i}${value}`);
    window.localStorage.setItem('resumePath',`tb=earnings&rsm=${index}&lmt=${i}${value}`);
  }


  updRadioList(){
    const {history} = this.props;
    const {index,rangeWeek} = this.state;  
    this.setState({_weekflt:null});
    var value =   '';
    history.push(`/details?tb=earnings&rsm=${index}&lmt=${rangeWeek}${value}`);
    window.localStorage.setItem('resumePath',`tb=earnings&rsm=${index}&lmt=${rangeWeek}${value}`);
  }



































  render() {  
    var _th_ = this;
    const {  earningsFilters,categories, isMobile } = this.props;
    const {activeGraphtab,_year,  filterMonth, month2flt, filterWeekDay,  _weekDayflt, filterbyWeek, _weekflt, index, activeMonth, rangeWeek } = this.state;  

    var mnt =   filterMonth && month2flt-(Math.floor(month2flt/12)*12);

    var _graph = <LoadingColorSpinner/>; 

    var _month = null;
    var graphColor = 'var(--hxrymz_color_base_hover)';
    var backgroundcolorTav = 'var(--calendar--back--color--)';   
    var yy = null;
    var ww = null;
    var _titleResume= null;
    let weeks2ShowObj  = {} 
    let weeks2Show  = null 

    if(filterMonth){    


              /****************************************************************************************************
         * 
         * 
         *          
         *              filterMonth
         * 
         * 
         * 
         * **************************************************************************************************
         */


      _month =  month2flt-1;
      //month2flt-(_year*12);
      let _monthTotal  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['months'][month2flt]?earningsFilters[_year]['months'][month2flt]['total']:0:0:0;
      let _monthAmount  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['months'][month2flt]?earningsFilters[_year]['months'][month2flt]['amount']:0:0:0;
      let _monthTip  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['months'][month2flt]?earningsFilters[_year]['months'][month2flt]['tip']:0:0:0;
      let _monthList  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['months'][month2flt]?earningsFilters[_year]['months'][month2flt]['list']:[]:[]:[];
      let _key2Graph = 'total'
      if(activeGraphtab===1){
        _key2Graph = 'amount'
      } 
      else if(activeGraphtab===2){
        _key2Graph = 'tip'
      }      
      let multiGraph ={}

      let _dataList = createListMonth(_monthList,_key2Graph, _month);
      multiGraph[month2flt]={data:_dataList,color:graphColor}
      let _margin = 30;
      let xAxle =  createXAxleListMonths(_month,_margin);
      _graph = <GraphMultiLine graph={multiGraph} axleX={xAxle} margin={_margin}/>



      //_graph = <GraphLineMonth graph={_dataList} graphColor={graphColor} month={_month}/>
     
      yy = [{label:'Total',ammount:Math.floor(_monthTotal)},{label:'Amount',ammount:Math.floor(_monthAmount)},{label:'Tips',ammount:Math.floor(_monthTip)}]  
      _titleResume = <div  className="_text_">Resumen del mes  <span className="_text_title_month_">{monthsList_Short[_month]} {_year}</span> </div>;
      
      



    }else if(filterWeekDay){

        /****************************************************************************************************
         * 
         * 
         *          
         *              filterWeekDay
         * 
         * 
         * 
         * **************************************************************************************************
         */

      let _key2Graph = 'total'

      let _WeekDaysList  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['daysWeek']:{}:{};
      ww = true;
      let multiGraph  = {}
      let _marginWeekDays = 40;
      if(_weekDayflt===null || _weekDayflt===undefined){       
        var vDe = {}
        Object.keys(_WeekDaysList).map(day=>{
          let _list = _WeekDaysList[day]['list'];
          vDe[day]={};
          vDe[day]['color']='#222';
          vDe[day]['dayName']=_dayLargeNames[day];
          var _dataList = createListByWeekDays(_list,_key2Graph);
          multiGraph[day]={data:_dataList,color:WeekDetails[day]['color']}
        })
        
        let xAxle =  createXAxleListWeekDays(multiGraph,_marginWeekDays);
        _graph = <GraphMultiLine graph={multiGraph} axleX={xAxle} margin={_marginWeekDays}/>

      }else{        
        let _weekDaysTotal  = _WeekDaysList?_WeekDaysList[_weekDayflt]?_WeekDaysList[_weekDayflt]['total']:0:0;
        let _weekDaysAmount  = _WeekDaysList?_WeekDaysList[_weekDayflt]?_WeekDaysList[_weekDayflt]['amount']:0:0;
        let _weekDaysTip  = _WeekDaysList?_WeekDaysList[_weekDayflt]?_WeekDaysList[_weekDayflt]['tip']:0:0;
        let _weekDaysHrs  = _WeekDaysList?_WeekDaysList[_weekDayflt]?_WeekDaysList[_weekDayflt]['hrs']:0:0;
        let _key2Graph = 'total'
        let _list = _WeekDaysList[_weekDayflt]?_WeekDaysList[_weekDayflt]['list']:null;
        if(_list){
          if(activeGraphtab===1){
            _key2Graph = 'amount'
          } 
          else if(activeGraphtab===2){
            _key2Graph = 'tip'
          }
          else if(activeGraphtab===3){
            _key2Graph = 'hrs'
          }
          var _dataList = createListByWeekDays(_list,_key2Graph);
          multiGraph[_weekDayflt]={data:_dataList,color:WeekDetails[_weekDayflt]['color']}
          yy = [{label:'Total',ammount:Math.floor(_weekDaysTotal)},{label:'Amount',ammount:Math.floor(_weekDaysAmount)},{label:'Tips',ammount:Math.floor(_weekDaysTip)},{label:'Hours',ammount:Math.floor(_weekDaysHrs)}]  
          let xAxle =  createXAxleListWeekDays(multiGraph,_marginWeekDays);
          _graph = <GraphMultiLine graph={multiGraph} axleX={xAxle}  margin={_marginWeekDays}/>
             
        }else{
          //_graph = <GraphLine graph={{}} graphColor={graphColor} year={_year}/>
        }
        
      }

      _titleResume = <div  className="_text_">Resume by <span className="_text_title_year_">Week Day</span></div>
      _titleResume = null
    }
    else if(filterbyWeek){

/****************************************************************************************************
 * 
 * 
 *          
 * filterbyWeek
 * 
 * 
 * 
 * **************************************************************************************************
 */



      let _marginWeek = 40;
      let _key2Graph = 'total'
      let _WeekList  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['Weeks']:{}:{};
      var  multiGraphWeek  = {}           
      var _ttttt = getOrderedWeeks(_WeekList);
      weeks2Show = true; 
      var limitWk = 4; 
      if('last 3 Month' === rangeWeek){
        limitWk = 12;
      }
      _ttttt.map((wk,In9)=>{          
        if(In9<limitWk){          
          var wdate = Util.getWeekDate(parseInt(wk.toString()));
          var _label_ = `${monthsList_Short[wdate.getMonth()]}, ${wdate.getDate()}`;
          var _iNNd = In9+1;
         
          //  var wDLength  = Object.keys(WeekDetails).length;if(_iNNd>wDLength){   //_iNNd = _iNNd-(wDLength);  } 
          weeks2ShowObj[wk]={
            label:_label_,
            hrs:_WeekList[wk]['hrs'],
            total:_WeekList[wk]['total'],
            color:colorListDetails[_iNNd]['color'],
            backColor:colorListDetails[_iNNd]['backColor']
          };
        }        
      })      
      if(_weekflt===null || _weekflt===undefined){ 
        Object.keys(weeks2ShowObj).map((wk)=>{
            let _list = _WeekList[wk]['list'];
            let _dataList = createListByWeeks(_list,_key2Graph);           
            multiGraphWeek[wk]={data:_dataList,color:weeks2ShowObj[wk]['color']}
        })
        let xAxle =  createXAxleListWeeks(7,_marginWeek);
       
        _graph = <GraphMultiLine graph={multiGraphWeek} axleX={xAxle}  margin={_marginWeek}/>
      }else{
        let _multiGraph = {};        
        let _weekDaysTotal  = _WeekList?_WeekList[_weekflt]?_WeekList[_weekflt]['total']:0:0;
        let _weekDaysAmount  = _WeekList?_WeekList[_weekflt]?_WeekList[_weekflt]['amount']:0:0;
        let _weekDaysTip  = _WeekList?_WeekList[_weekflt]?_WeekList[_weekflt]['tip']:0:0;
        let _weekDaysHrs  = _WeekList?_WeekList[_weekflt]?_WeekList[_weekflt]['hrs']:0:0;
        let _key2Graph = 'total'
        let _list = _WeekList[_weekflt]?_WeekList[_weekflt]['list']:null;       
        if(_list && weeks2ShowObj[_weekflt]){
          if(activeGraphtab===0){
            let _dataList = createListByWeeks(_list,_key2Graph);            
            _multiGraph[_weekflt]={data:_dataList,color: weeks2ShowObj[_weekflt]['color']}
          }
          else if(activeGraphtab===1){
            _key2Graph = 'amount'
            let _dataList = createListByWeeks(_list,_key2Graph);
          _multiGraph[_weekflt]={data:_dataList,color: weeks2ShowObj[_weekflt]['color']}
          } 
          else if(activeGraphtab===2){
            _key2Graph = 'tip'
            let _dataList = createListByWeeks(_list,_key2Graph);
          _multiGraph[_weekflt]={data:_dataList,color: weeks2ShowObj[_weekflt]['color']}
          }  
          else if(activeGraphtab===3){
            _key2Graph = 'hrs'
            let _dataList = createListByWeeks(_list,_key2Graph);
          _multiGraph[_weekflt]={data:_dataList,color: weeks2ShowObj[_weekflt]['color']}
          }         
          yy = [{label:'Total',ammount:Math.floor(_weekDaysTotal)},{label:'Amount',ammount:Math.floor(_weekDaysAmount)},{label:'Tips',ammount:Math.floor(_weekDaysTip)},{label:'Hours',ammount:Math.floor(_weekDaysHrs)}]  
          let xAxle =  createXAxleListWeeks(7,_marginWeek);
          _graph = <GraphMultiLine graph={_multiGraph} axleX={xAxle}  margin={_marginWeek}/>
        }else if(weeks2ShowObj[_weekflt] === undefined){         
          _th_.updRadioList();
          //_graph = <GraphLine graph={{}} graphColor={graphColor} year={_year}/>
        }
      }

      _titleResume = <div  className="_text_">Resume by <span className="_text_title_year_">Week Day</span></div>
      _titleResume = null
    }
    
    else{



          /****************************************************************************************************
           * 
           * 
           *          
           * filter by Year
           * 
           * 
           * 
           * **************************************************************************************************
           */



      let _yearTotal  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['total']:0:0;
      let _yearAmount  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['amount']:0:0;
      let _yearTip  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['tip']:0:0;
      let _yearList  = earningsFilters?earningsFilters[_year]?earningsFilters[_year]['months']:{}:{};
      let _key2Graph = 'total'
      if(activeGraphtab===1){
        _key2Graph = 'amount'
      }
      else if(activeGraphtab===2){
        _key2Graph = 'tip'
      }      

      let _dataList = createListYear(_yearList,_key2Graph,12);
      let multiGraph ={}

      //let _dataList = createListMonth(_monthList,_key2Graph, _month);
      multiGraph[_year]={data:_dataList,color:graphColor}
      let _marginYear = 30;
      let xAxle =  createXAxleListYear(12,_marginYear);
      _graph = <GraphMultiLine graph={multiGraph} axleX={xAxle} margin={_marginYear}/>


      //_graph = <GraphLine graph={dataGraph} graphColor={graphColor} year={_year}/>
     

      yy = [{label:'Total',ammount:Math.floor(_yearTotal)},{label:'Amount',ammount:Math.floor(_yearAmount)},{label:'Tips',ammount:Math.floor(_yearTip)}]  
      _titleResume = <div  className="_text_">Resumen del año <span className="_text_title_year_">{_year}</span></div>



    }
    





















          /****************************************************************************************************
           * 
           * 
           *          
           * Render Section
           * 
           * 
           * 
           * **************************************************************************************************
           */




    
    if(isMobile){


    
    return (
      <div  className="resume__TopPadding" >
      <div  className="resume__Container" >
      <div  className="resume__Wrapper" >
        
        <div  className="resume__period">
          <div  className={''}></div>
          {/*
          <div className={`__print__menu__btn__ `}  onClick={this.open_Print_Dialog.bind(this)}>
            <Icons name={'printer'} color={'#555'} size={18}/>
            <span>Print</span>
          </div>
          */}
          {weeks2Show?
          <div className={`__print__menu__btn__ `}>
            <RadioBoxHRM labels={['last Month','last 3 Month']} updChange={this.updRadioChange.bind(this)} initvalue={rangeWeek}/>                   
          </div>
          :null}
          <div className="flexSpace"/>
          <div className="" >  
            <div className="calendar_Wrapper" onClick={this.open_filterOptions.bind(this)}>
              <div  className="_text_">{'Periodo'}</div>
              <Icons name={'calendar'} color={'#555'} size={18}/> 
            </div>
          </div>
        </div>
        {_titleResume?
          <div  className="resume__Title">
             {_titleResume}
          </div>:null}
          {ww && <div  className={'_dysWeekWrapper'}>
            {ww && Object.keys(WeekDetails).map((wday,In9)=>{
              let _active = wday===this.state._weekDayflt?true:false;
              let _dayData = WeekDetails[wday];
              let _sty = {
                "--color_item_tabs_graph_active":_dayData.color              
              }
              if(_active){
                _sty["--backgroundcolor_item_tabs_graph_active"]=_dayData.backColor;
              }
              return(
                <div className={`item_wkday_graph ${_active?'active':''}`} key={wday}  style={_sty}  onClick={this.activeWday.bind(this,wday)}>
                  <div className={'_label'} >
                    {_dayData.dayName}                    
                  </div>         
                </div>
              )

            })
            }
            </div>
          }

          {weeks2Show && <div  className={'_dysWeekWrapper'}>
          {Object.keys(weeks2ShowObj).map((wk,In9)=>{
            let _active = wk===this.state._weekflt?true:false;
            let _dayData = weeks2ShowObj[wk];
            let _sty = {
              "--color_item_tabs_graph_active":_dayData.color              
            }
            if(_active){
              _sty["--backgroundcolor_item_tabs_graph_active"]=_dayData.backColor;
            }
            return(
              <div className={`item_wks_graph ${_active?'active':''}`} key={wk}  style={_sty}  onClick={this.activeWeek.bind(this,wk)}>
                <div className={'_label'} >
                  {_dayData.label}   - ${(_dayData.total/_dayData.hrs).toFixed(1)}/hr
                  <div>{_dayData.hrs}HRS - ${_dayData.total} </div>                                  
                </div>        
              </div>
            )

          })
          }
          </div>
          }

          {yy && <div className={'wrapper_tabs'}>
            {yy && yy.map((dv,In4)=>{
              var _active = In4===this.state.activeGraphtab?true:false;
              var sty = {"--color_item_tabs_graph_active":graphColor,"--backgroundcolor_item_tabs_graph_active":backgroundcolorTav}
              if(ww){
                let _dayData = WeekDetails[_weekDayflt];                
                sty = {"--color_item_tabs_graph_active":_dayData.color,"--backgroundcolor_item_tabs_graph_active":_dayData.backColor}
               
              }
              return(
                <div className={`item_tabs_graph ${_active?'active':''}`} onClick={this.activeGraphtab.bind(this,In4)} key={In4}  style={sty}>
                  <div className={'_label'}>
                    {dv.label}
                  </div>
                  <div className={'_ammount'}>
                    {dv.ammount}
                  </div>
                </div>
              )
            })            
          }
          </div>}
         {_graph}
         </div>
      </div>
      </div>
    )
  }else{
    return <div>this site is not available on desktop version</div>
  }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    formsAll: state.common.forms,
    formObserve: state.common.formObserve,  
    earningsFilters:state.common.earningsFilters,
    calendar:state.common.calendar,
    isMobile: state.common.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Resume));





























class FilterOption extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      asc:true      
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
    
  }

  openGroupDate(){
    if(typeof this.props.updChange === "function"){
      this.props.updChange()
    }
  }

  openGroupcategories(){
    if(typeof this.props.openCategories === "function"){
      this.props.openCategories()
    }
  }


  UpdateYear(v){
    if(typeof this.props.updYear === "function"){
      this.props.updYear(v)
    }
  }

  handlerWeekChange(){ 
    if(typeof this.props.weekChange === "function"){      
      this.props.weekChange(true);
    }  
  }

  handlerWeekDayChange(){ 
    if(typeof this.props.weekDayChange === "function"){      
      this.props.weekDayChange(true);
    }  
  }
  


  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    return (
        <div className={'option--wrapper'}>
          <div className={'__header--'}>
            <h5>
              Periodo
            </h5>              
          </div>
          <div className="__body__">
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.UpdateYear.bind(this,2019)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Resumen del año 2019'}
              </div>                
            </div>  
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.UpdateYear.bind(this,2018)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Resumen del año 2018'}
              </div>                
            </div> 
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.openGroupDate.bind(this)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Resumen por mes'}
              </div>                
            </div> 
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.handlerWeekDayChange.bind(this)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Resumen by week day'}
              </div>                
            </div> 
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.handlerWeekChange.bind(this)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Resumen by week'}
              </div>                
            </div>   
          </div>          
        </div>
      ) 
  }
}




class FilterGroupByMonth extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      validForm:true,
      asc:true      
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
    
  }

 

  handlerSaveForm(i){ 
    if(typeof this.props.updChange === "function"){      
      this.props.updChange(i);
    }  
  }

  
  handlerInputValue(field,value){ 
    
  }

  handleSaveEdit(i){    
    if(typeof this.props.handleSaveEdit === "function"){      
      this.props.handleSaveEdit(i)
    }
  }

  clearFilter(){
    if(typeof this.props.clearFilter === "function"){      
      this.props.clearFilter();
    } 
  }


  dialogClose(){
    if(typeof this.props.closeView === "function"){      
      this.props.closeView();
    } 
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { list, active, year  } = this.props;
    let lng = localStorage.getItem('lng');
    return (
      <div className="__form_group__">
        <div  className={`_form_group_cancel_`}>
        <div className={'__save__btn '}>
            <div className="center--Container grayStyle" onClick={this.dialogClose.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv grayStyle "/>
              <Icons name={'arrowBack'} color={'#1967d2'} size={24}/>             
            </div> 
          </div>          
          <div className="flexSpace"/>
          <div className={'__save__btn '} >
            <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv orangeFlex "/>
              <span className="text2D orangeFlex">{'Group by Month'}</span>              
            </div> 
          </div>       
        </div>
        <div className={'option--wrapper'}>          
          <div className="__body__">
            {monthsList_Short.map((mnt,in0)=>{              
              var m = in0+1;
              return (
                <div className={`__sort_options-- __groupby  __sort_options-- ${active===m?"__active":''} `} key={Util.gen6CodeId()} >
                  <div className={'__gbItemWrapp__'} onClick={this.handlerSaveForm.bind(this,m)}>
                    <div  className={'__icons--'}>
                        <Icons name={active===m?"success":'calendar'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {`${mnt}, ${year}`}
                    </div>
                  </div>
                  <div className="flexSpace"/>
                  {active===m?<div  className={'__icons-- _rmvFilter__'}  onClick={this.clearFilter.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                  </div>:null}     
                </div>
              )
            })}

          </div>          
        </div>
      </div>
      ) 
  }
}

























































/*
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*/
















function createListByWeekDays(wds,key){   
  var gDays = {}
  let currentWeek = (new Date()).getWeek();
  for(var wk = currentWeek;wk>(currentWeek-12);wk--){
    if(!gDays[wk]){
      if(wds[wk]){
        gDays[wk] = wds[wk][key];
      }else{
        gDays[wk] = 0;
      }
    } 
  }
  /*Object.keys(wds).map((_date,In2)=>{
    if(!gDays[_date]){
      gDays[_date] = wds[_date][key]
    }
    else if(gDays[_date]){
      gDays[_date] += wds[_date][key];
    }    
  })*/
  return gDays;
}


function createXAxleListWeekDays(g,margin){
  var y = [];
  var Index0 = Object.keys(g)[0];  
  var list = g[Index0] && g[Index0]['data'];
  list && Object.keys(list).map((mnt,In2)=>{
    let multiplier = (_width-margin)/Object.keys(list).length;
    var xIn = (In2*multiplier)+margin;   
    var wdate = Util.getWeekDate(parseInt(mnt));
    var _label_ = In2%2===0?wdate.getTime()>(new Date()).getTime()?'':`${monthsList_Short[wdate.getMonth()]}, ${wdate.getDate()}`:'';     
    y.push({x:xIn,label:_label_})
  }) 
  return y;
}




/*
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*/





function getOrderedWeeks(aa){
  var _ttttt = Object.keys(aa).sort(function(a, b) {
    if(parseInt(a) > parseInt(b)) { return -1; }
    if(parseInt(a) < parseInt(b)) { return 1; }
    return 0;
  })
  return _ttttt;
}



function createListByWeeks(wds,key){   
  var gDays = {}
  Array.from(Array(7).keys()).map((_dy)=>{
    let dy = _dy+1;
    if(!gDays[dy]){
      if(wds[dy]){
        gDays[dy] = wds[dy][key];
      }else{
        gDays[dy] = 0;
      }
    }
  })
  return gDays;
}






function createXAxleListWeeks(m,margin){
  var y = [];
  Array.from(Array(m).keys()).map((mnt,In2)=>{
    let multiplier = (_width-margin)/m;
    var xIn = (In2*multiplier)+margin;
    var _label_ = _dayShortNames[In2+1];  
    y.push({x:xIn,label:_label_})
  })
  return y;
}





/*
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*/







function createListMonth(ing,_key,m){
    var gDays = {}
    const _days = Array.from(Array(Math.floor(_dayPerMonth[m])).keys());
    _days.map((mnt,In0)=>{
      if(!gDays[mnt]){
        gDays[mnt+1] =0
      }
    })    
    ing.map((dt,In2)=>{
      var _date = (new Date(dt['date'])).getDate();
      if(dt[_key]){
        gDays[_date] += dt[_key];
      }
    })
    return gDays;
}



function createXAxleListMonths(m,margin){
  var y = [];
  const _days = Array.from(Array(Math.floor(_dayPerMonth[m])).keys());
  _days.map((mnt,In2)=>{
    let multiplier = (_width-margin)/_dayPerMonth[m];
    var xIn = (In2*multiplier)+margin;
    var _label_ = In2%2===0?`${In2+1}`:'';  
    y.push({x:xIn,label:_label_})
  })
  return y;
}


var _dayPerMonth = [31,Util.febMaxDays((new Date()).getFullYear()),31,30,31,30,31,31,30,31,30,31];




/*
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*******************************************************************************************
*/






function createListYear(ing,_key,m){
  var gDays = {}  
  const mnts = Array.from(Array(Math.floor(m)).keys());
  mnts.map((mnt,In0)=>{
    if(!gDays[mnt]){
      gDays[mnt] =0
    }
  })
  Object.keys(ing).map((dt,In2)=>{    
    if(ing[dt] && ing[dt][_key]){
      gDays[dt] += ing[dt][_key];
    }
  })  
  return gDays;
}







function createXAxleListYear(m,margin){
  var y = [];
  const mnt = Array.from(Array(Math.floor(m)).keys());
  mnt.map((mnt,In2)=>{
      let multiplier = (_width-margin)/m;
      var xIn = (In2*multiplier)+margin;
      var _label_ = monthsList_Short[mnt];  
      y.push({x:xIn,label:_label_})
  })
  return y;
}
