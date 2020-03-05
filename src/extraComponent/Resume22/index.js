



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';
//import * as Print2 from '../../state/printDoc';
import { withRouter} from 'react-router-dom';
import * as Print2 from '../../state/printDoc';

// import TabsHRM from '../TabsHRM';

// import { GraphLine, GraphLineMonth} from '../GraphLineHRM';

import { GraphMultiLine} from '../GraphMultiLineHRM';
import  RadioBoxHRM from '../radioBoxHRM';



import './style.css';
import LoadingColorSpinner from '../Icons/LoadingColorSpinner';


var _Type = 'Resume'


const _tabs = ['2020' ,'2019','mes','categorias' ];   


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

var _width11 = 340;

class Resume extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          lastHover:null, 
          activeGraphtab:0,
          activeType:'Ingresos',
          _year:2019,
          filterMonth:true,
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
    const {location, history} = this.props;
    var s = Util.parseQuery(location.search);
    var i = null;
    if(s.tb){    
      _tabs.map((t,_i)=>{
        if(t===s.tb){
          i=_i;
        }
      })
    } 
    if(i!==this.state.index){
      this.setState({index:i});
      if(i===0){ 
        let _v = 2020;     
        this.props.actions.getGastos(_v);
        this.props.actions.getIngresos(_v);
        this.setState({_year:_v , filterMonth:false, month2flt:null, filterCategory:false, category2flt:null});
      }else  if(i===1){
        let _v = 2019;  
        this.props.actions.getGastos(_v );
        this.props.actions.getIngresos(_v );
        this.setState({_year:_v , filterMonth:false, month2flt:null, filterCategory:false, category2flt:null});
      }
      else  if(i===2){  
        let m = (new Date()).getMonth()+this.state._year*12;
        if(s.v){
          m = s.v;
        }else{
          history.push(`/resume?tb=mes&v=${m}`);
        }
        this.setState({filterMonth:true, month2flt:m, filterCategory:false, category2flt:null});
       // this.handleOptionsFilterChanges.bind(this)
      }
      else  if(i===3){
        let m = null;
        if(s.v){
          m = s.v;
        }
        this.setState({filterCategory:true, category2flt:m, filterMonth:false, month2flt:null});
      }
    }
    this.props.actions.getGastos(2019);
    this.props.actions.getIngresos(2019);
  }


  
  componentWillReceiveProps(nextProps){     
    var _initvalue = this.props.location.search?this.props.location.search:null;
    var next_initvalue = nextProps.location.search?nextProps.location.search:null;
    if(_initvalue!==next_initvalue){
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
    //const {history} = this.props;
    this.close_filterOptions();    
    this.setState({_year:v, filterMonth:false, month2flt:null, filterWeekDay:false});
    this.props.actions.UpdKeyValue({key:'year',value:v});
    this.props.actions.getIngresos(v);
    this.props.actions.getGastos(v);
    //let _year = {2019:1,2018:2}
    //history.push(`/details?tb=earnings&rsm=${_year[v]}&v=${v}`);
    //window.localStorage.setItem('resumePath',`tb=earnings&rsm=${_year[v]}&v=${v}`)
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











  handleSetCategoriy2Filter(i){  
    this.setState({filterCategory:true, category2flt:i,filterMonth:false,month2flt:null})
    this.props.history.push(`/resume?tb=categorias&v=${i}`);
  }


  handlerSaveForm(i){    
    this.setState({filterMonth:true,month2flt:i,filterCategory:false, category2flt:null})
    this.props.history.push(`/resume?tb=mes&v=${i}`);
  }

  clearFilter(i){
    this.setState({filterMonth:false,month2flt:null,filterCategory:false, category2flt:null})
  }






  open_Print_Dialog(){   
    const {categories } = this.props;  
    Print2.handlePdf_I864();
    const {_year, filterMonth, month2flt, filterCategory, printError, category2flt } = this.state; 
    var categories2Filter =   filterCategory && categories[category2flt]['name'];   
    var mnt =   filterMonth && month2flt-(Math.floor(month2flt/12)*12);  
    var formName = `print_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var title = filterCategory?`Resumen por categoria ${categories2Filter} para el ${_year}`:filterMonth?`Resumen del mes de ${monthsList_Short[mnt]} para el ${_year}`: `Resumen del año ${_year}`;
           
    var _cont = <OpenPrintDialog2 printError={printError} close={this.close_Print_Dialog.bind(this)} title={title}  printConfirm={this.printConfirm.bind(this)}/>
    var options = {id:_id,zIndex:150,height:'50vh',content:_cont};
    this.props.dialogActions.OpenDialog(options);
  }


  close_Print_Dialog(){
    var formName = `print_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseDialog(options);
    this.props.actions.UpdKeyValue({key:'printError',value:false});
  }


  printConfirm(){
    const {categories,ingresos,gastos } = this.props;    
    const {_year, filterMonth, month2flt, filterCategory, category2flt} = this.state; 
    var mnt =   filterMonth && month2flt-(Math.floor(month2flt/12)*12);
    let IngresosMonthTotal  = {};
    let GastosMonthTotal  = {};
    let IngresosTotal = null;
    let GastosTotal = null;

    if(filterCategory){
      var s = null;
      if(ingresos && ingresos.GroupbyMonthXCategories && ingresos.GroupbyMonthXCategories[_year] && ingresos.GroupbyMonthXCategories[_year][category2flt]){
        s = ingresos.GroupbyMonthXCategories[_year][category2flt];
      }else if(gastos&& gastos.GroupbyMonthXCategories && gastos.GroupbyMonthXCategories[_year] && gastos.GroupbyMonthXCategories[_year][category2flt]){
        s = gastos.GroupbyMonthXCategories[_year][category2flt];
      }
      if(s?s['total']:null){
        Print2.PrintCategoryResume(s ,categories[category2flt]['name'] , _year); 
      this.close_Print_Dialog()
      }else{        
        this.props.actions.UpdKeyValue({key:'printError',value:true});
      }
    }
    else if(filterMonth){        
      IngresosTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]['total']:null:null:null:null:null;
      GastosTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]['total']:null:null:null:null:null;
      IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]['list']:[]:[]:[]:[]:[];
      GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]['list']:[]:[]:[]:[]:[];     
      if(GastosTotal && IngresosTotal){
        Print2.PrintMonthResume(IngresosMonthTotal, IngresosTotal, GastosMonthTotal, GastosTotal, categories, monthsList_Short[mnt], _year); 
        this.close_Print_Dialog();
      }else{        
        this.props.actions.UpdKeyValue({key:'printError',value:true});
      }  
    }else{
      IngresosTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['total']:0:0:0;
      GastosTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['total']:0:0:0;        
      IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list']:{}:{}:{};      
      GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list']:{}:{}:{};  
      let g_cs = gastos.GroupbyMonthXCategories[_year];
      let i_cs = ingresos.GroupbyMonthXCategories[_year];
      Print2.PrintYearResume(IngresosMonthTotal, IngresosTotal, GastosMonthTotal, GastosTotal, categories,i_cs ,g_cs , _year); 
      this.close_Print_Dialog()
    }
   
  }






  UpdateIndex(i){
    //const {history, location} = this.props;   
    //console.log(history)
    if(i!==this.state.index){
      this.setState({index:i});
      if(i===0){ 
        let _v = 2020;     
        this.props.actions.getGastos(_v );
        this.props.actions.getIngresos(_v );
        this.setState({_year:_v , filterMonth:false, month2flt:null, filterCategory:false, category2flt:null});
        //history.push(`/resume?tb=2020`);
      }else  if(i===1){
        let _v = 2019;     
        this.props.actions.getGastos(_v );
        this.props.actions.getIngresos(_v );
        this.setState({_year:_v , filterMonth:false, month2flt:null, filterCategory:false, category2flt:null});
        //history.push(`/resume?tb=2019`);
      }
      else  if(i===2){
        var m = (new Date()).getMonth()+this.state._year*12;
        this.setState({filterMonth:true,filterCategory:false, category2flt:null, month2flt:m});
       
        //history.push(`/resume?tb=mes&v=${m}`);
       // this.handleOptionsFilterChanges.bind(this)
      }
      else  if(i===3){        
        this.setState({filterCategory:true,filterMonth:false, month2flt:null});
        //history.push(`/resume?tb=categorias`);
      }
    }
  }




















  render() {  
    var _th_ = this;
    const {  earningsFilters,categories, isMobile , year,month, ingresos, gastos} = this.props;
    const {activeGraphtab,_year,  filterMonth, month2flt, filterWeekDay,  _weekDayflt, filterbyWeek, _weekflt, index, activeMonth, rangeWeek } = this.state;  
    const {activeGraphCategory,   filterCategory, category2flt } = this.state;    

   
    var mnt =   filterMonth && month2flt-(Math.floor(month2flt/12)*12);

    var _graph = <LoadingColorSpinner/>; 

    var _month = null;
    var graphColor = '#4285f4';
    var backgroundcolorTav = 'var(--calendar--back--color--)';   
    var yy = null;
    var ww = null;
    var _titleResume= null;
    let weeks2ShowObj  = {} 
    let weeks2Show  = null 
    let IngresosMonthTotal  = {};
    let GastosMonthTotal  = {};
    var categoriesTotal = 0;
  

    var IngresosTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['total']:0:0:0;
    var GastosTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['total']:0:0:0;   
    var mnt =   filterMonth && month2flt-(Math.floor(month2flt/12)*12);
    var categories2Filter =   filterCategory && category2flt && categories[category2flt] && categories[category2flt]['name'];
    var _graph = null; 


    if(filterCategory && false){
       

    }

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
     
      let _key2Graph = 'total'

      let month2flt2 = year*12+month;
      
      IngresosTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[year]?ingresos.groupByMonth[year]['list'][month2flt2]?ingresos.groupByMonth[year]['list'][month2flt2]?ingresos.groupByMonth[year]['list'][month2flt2]['total']:0:0:0:0:0;
      GastosTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[year]?gastos.groupByMonth[year]['list'][month2flt2]?gastos.groupByMonth[year]['list'][month2flt2]?gastos.groupByMonth[year]['list'][month2flt2]['total']:0:0:0:0:0;
      
      _month = month2flt-(_year*12);
      let multiGraph ={}
     
      if(activeGraphtab===0){}
      else if(activeGraphtab===1){}
      else if(activeGraphtab===2){   }


        IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[year]?ingresos.groupByMonth[year]['list'][month2flt2]?ingresos.groupByMonth[year]['list'][month2flt2]?ingresos.groupByMonth[year]['list'][month2flt2]['list']:{}:{}:{}:{}:{};  
     
        let _dataList = createListMonth(IngresosMonthTotal,_key2Graph, month);
        multiGraph['ingresos']={data:_dataList,color:graphColor}
      
        GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[year]?gastos.groupByMonth[year]['list'][month2flt2]?gastos.groupByMonth[year]['list'][month2flt2]?gastos.groupByMonth[year]['list'][month2flt2]['list']:{}:{}:{}:{}:{};  
        graphColor = '#CC0000';    
        backgroundcolorTav = '#fce8e6';  
        
        let _dataList2 = createListMonth(GastosMonthTotal,_key2Graph, month);
        multiGraph['gastos']={data:_dataList2,color:graphColor}
      
 

      /*
        IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]['list']:{}:{}:{}:{}:{};  
        GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]['list']:{}:{}:{}:{}:{};  
        //_graph = createUtilityAmmountListMonth(IngresosMonthTotal,GastosMonthTotal);
        graphColor = '#00796b'; 
        backgroundcolorTav = '#e6f4ea';   
        let _dataList = createListMonth(_monthList,_key2Graph, _month);
        multiGraph[month2flt]={data:_dataList,color:graphColor}
   
        */


    



       let _width = isMobile?340: 560;

       let _height = 300;
   
   
   
      let _margin = 30;
      let xAxle =  createXAxleListMonths(month,_width,_margin);
     

      console.log(xAxle);
      console.log(multiGraph);


      _graph = <GraphMultiLine graph={multiGraph} axleX={xAxle} margin={_margin} WidthGraph={_width} HeightGraph={_height}/>



      //_graph = <GraphLineMonth graph={_dataList} graphColor={graphColor} month={_month}/>
     
      //yy = [{label:'Total',ammount:Math.floor(_monthTotal)},{label:'Amount',ammount:Math.floor(_monthAmount)},{label:'Tips',ammount:Math.floor(_monthTip)}]  
      _titleResume = <div  className="_text_">Resumen del mes  <span className="_text_title_month_">{monthsList_Short[_month]} {_year}</span> </div>;
      
      



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



  let _yearTotal  = earningsFilters?earningsFilters[year]?earningsFilters[year]['total']:0:0;
  let _yearAmount  = earningsFilters?earningsFilters[year]?earningsFilters[year]['amount']:0:0;
  let _yearTip  = earningsFilters?earningsFilters[year]?earningsFilters[year]['tip']:0:0;
  let _yearList  = earningsFilters?earningsFilters[year]?earningsFilters[year]['months']:{}:{};
  let multiGraph ={}
 
 
  if(ingresos){
    
    let _key2Graph = 'total'
    IngresosTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[year]?ingresos.groupByMonth[year]['total']:0:0:0;
    GastosTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[year]?gastos.groupByMonth[year]['total']:0:0:0;      
    if(activeGraphtab===0){}
    else if(activeGraphtab===1){}
    else if(activeGraphtab===2){   }
    
    
      IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[year]?ingresos.groupByMonth[year]['list']:{}:{}:{};     
     
      let _dataList = createListYear(IngresosMonthTotal,_key2Graph,12);
      multiGraph['ingresos']={data:_dataList,color:graphColor}
      GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[year]?gastos.groupByMonth[year]['list']:{}:{}:{};
      //_graph = createListYear(GastosMonthTotal,_year);
      //graphColor = '#CC0000';    
      //backgroundcolorTav = '#fce8e6';      
      let _dataList2 = createListYear(GastosMonthTotal,_key2Graph,12);
      multiGraph['gastos']={data:_dataList2,color:'#CC0000'}

        
      let _dataList3 = createListYearDiff(IngresosMonthTotal,GastosMonthTotal,_key2Graph,12);
      multiGraph['profit']={data:_dataList3,color:"#34a853"}
    
      




    let _width = isMobile?340: 560;

    let _height = 300;


   
    let _marginYear = 50;

    let xAxle =  createXAxleListYear(12,_width,_marginYear);

  
    _graph = <GraphMultiLine graph={multiGraph} axleX={xAxle} margin={_marginYear} WidthGraph={_width} HeightGraph={_height}/>



    //_graph = <GraphLine graph={dataGraph} graphColor={graphColor} year={_year}/>
  

    yy = [{label:'Total',ammount:Math.floor(_yearTotal)},{label:'Amount',ammount:Math.floor(_yearAmount)},{label:'Tips',ammount:Math.floor(_yearTip)}]  
    _titleResume = <div  className="_text_">Resumen del año <span className="_text_title_year_">{_year}</span></div>
  }


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


          var yy = [{label:'Ingresos',ammount:Math.floor(IngresosTotal)},{label:'Gastos',ammount:Math.floor(GastosTotal)},{label:'Ganancias',ammount:Math.floor(IngresosTotal-GastosTotal)}]   
  

    
    if(isMobile){


    
    return (
      <div  className="resume__TopPadding" >
      <div  className="resume__Container" >
      <div  className={`resume__Wrapper ${'isMobile'}`} >
        <div  className="resume__period"> 
          <div  className={''}></div>
          <div className={`__print__menu__btn__ `}  onClick={this.open_Print_Dialog.bind(this)}>
            <Icons name={'printer'} color={'#555'} size={18}/>
            <span>Print</span>
          </div>
          <div className="flexSpace"/>
          <div className="calendar_Wrapper" onClick={this.open_filterOptions.bind(this)}>  
            <div  className="_text_">{'Periodo'}</div>
            <Icons name={'calendar'} color={'#555'} size={18}/> 
          </div>
        </div>
          <div  className="resume__Mobile_Title">
            {filterCategory?<div  className="_text_ _categories_">Resumen por categoria <span className="_text_title_categories_">{categories2Filter}</span> del <span className="_text_title_category_year_">{_year}</span></div>:filterMonth?<div  className="_text_">Resumen del mes  <span className="_text_title_month_">{monthsList_Short[mnt]} {_year}</span> </div>: <div  className="_text_">Resumen del año <span className="_text_title_year_">{_year}</span></div>}
            {filterCategory?<div  className="_text_ _categories_">Total <span className="_text_title_total_">${categoriesTotal.toFixed(2)}</span></div>:null}
          </div>
          
          
          {!filterCategory?<div className={'wrapper_tabs'}>
            {yy.map((dv,In4)=>{
              var _active = In4===this.state.activeGraphtab?true:false;
              return(
                <div className={`item_tabs_graph ${_active?'active':''}`} onClick={this.activeGraphtab.bind(this,In4)} key={In4}  style={{"--color_item_tabs_graph_active":graphColor,"--backgroundcolor_item_tabs_graph_active":backgroundcolorTav}}>
                  <div className={'_label'}>
                    {dv.label}
                  </div>
                  <div className={'_ammount'}>
                    $  {dv.ammount}
                  </div>
                </div>
              )
            })            
          }
          </div>:null}
         {_graph}
      </div>
      </div>
      </div>
    )
  }else{

    var dataTabAvailable = filterMonth && month2flt?true:index<2?true:false;
    var printbtnVisible = filterMonth && month2flt?true:filterCategory && category2flt?true:index<2?true:false;
    return <div> 
      
      
      <div  className="resume__Wrapper" >
        
        <div  className="resume__Title">
           {filterCategory?<div  className="_text_ _categories_">Resumen por categoria <span className="_text_title_categories_">{categories2Filter}</span> del <span className="_text_title_category_year_">{_year}</span></div>:filterMonth?<div  className="_text_">Resumen del mes  <span className="_text_title_month_">{monthsList_Short[mnt]} {_year}</span> </div>: <div  className="_text_">Resumen del año <span className="_text_title_year_">{_year}</span></div>}
           {filterCategory?<div  className="_text_ _categories_">Total <span className="_text_title_total_">${categoriesTotal.toFixed(2)}</span></div>:null}
         </div>
         {printbtnVisible?
         <div  className="resume__period">
           
           <div  className={''}></div>
           <div className="flexSpace"/>    
           <div className={`__print__menu__btn__ `} >
             <Icons name={'printer'} color={'#555'} size={18}/>
             <span>Print</span>
           </div>
           <div className="flexSpace"/>          
         </div>
         :null}
         {dataTabAvailable? <div className={'wrapper_tabs'}>
           {yy.map((dv,In4)=>{
             var _active = In4===this.state.activeGraphtab?true:false;
             return(
               <div className={`item_tabs_graph ${_active?'active':''} ${dv.ammount<0?'_negative':''}`}  key={In4} style={{"--color_item_tabs_graph_active":graphColor,"--backgroundcolor_item_tabs_graph_active":backgroundcolorTav}}>
                 <div className={'_label'}>
                   {dv.label}
                 </div>
                 <div className={'_ammount'}>
                   <span>$ {dv.ammount}</span>
                 </div>
               </div>
             )
           })
           }
         </div>:null}

      </div>
      <div  className={'graph_Container'}>
       {_graph}
      </div>
     
       </div>
  }
  }
}



function mapStateToProps(state, ownProps) {
  return {
    formsAll: state.common.forms,
    formObserve: state.common.formObserve,    
    filterObserve: state.common.filterObserve,    
    ingresos:state.common.filters["ingresos"],
    gastos:state.common.filters["gastos"],
    groups:state.common.filters["groups"],    
    categories: state.common.categories,
    calendar:state.common.calendar,
    year: state.common.year,
    month: state.common.month,
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



  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    return (
        <div className={'option--wrapper'}>
          <div className={'__header--'}>
            <h5>
              Filters
            </h5>              
          </div>
          <div className="__body__">
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.UpdateYear.bind(this,2020)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Resumen del año 2020'}
              </div>                
            </div>  
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.UpdateYear.bind(this,2019)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Resumen del año 2019'}
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
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.openGroupcategories.bind(this)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Resumen por categorias'}
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


function createXAxleListWeekDays(g,_width,margin){
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






function createXAxleListWeeks(m,_width,margin){
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



var _dayPerMonth = [31,Util.febMaxDays((new Date()).getFullYear()),31,30,31,30,31,31,30,31,30,31];






function createListMonth(ing,_key,m){
    var gDays = {}
    console.log(m,_dayPerMonth[m])
    const _days = m?Array.from(Array(Math.floor(_dayPerMonth[m])).keys()):[];
    _days.map((mnt,In0)=>{
      if(!gDays[mnt]){
        gDays[mnt+1] =0
      }
    })    
    console.log(gDays)
    console.log(ing)
    Object.keys(ing).map((dt,In2)=>{    
      var _date = (new Date(ing[dt]['date'])).getDate(); 
      if(!gDays[_date]){
        gDays[_date] = ing[dt]['import']
      }
      else if(gDays[_date]){
        gDays[_date] += ing[dt]['import'];
      }    
    })

  /*
    Object.keys(ing).map((dt,In2)=>{
      var _date = (new Date(dt['date'])).getDate();
      if(dt[_key]){
        gDays[_date] += dt[_key];
      }
    })

    */
    return gDays;
}



function createXAxleListMonths(m,_width,margin){
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






function createListYear(ing,_key,m,y){
  var gDays = {}  
  const mnts = Array.from(Array(Math.floor(m)).keys());
  mnts.map((mnt,In0)=>{
    if(!gDays[mnt]){
      gDays[mnt] =0
    }
  })

  Object.keys(ing).map((dt,In2)=>{    
    var mnt = dt%12; 
    if(ing[dt] && ing[dt][_key]){
      gDays[mnt] += ing[dt][_key];
    }
  })  
  return gDays;
}




function createListYearDiff(ing,gast,_key,m,y){
  var gDays = {}  
  const mnts = Array.from(Array(Math.floor(m)).keys());
  mnts.map((mnt,In0)=>{
    if(!gDays[mnt]){
      gDays[mnt] =0
    }
  })

  Object.keys(ing).map((dt,In2)=>{    
    var mnt = dt%12; 
    if(ing[dt] && ing[dt][_key] && gast[dt] && gast[dt][_key]){
      gDays[mnt] += ((ing[dt][_key])-(gast[dt][_key]));
    }
  })  
  return gDays;
}






function createXAxleListYear(m,_width,margin){
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







class OpenPrintDialog extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active:false,   
      url:'',
      fileBlob:'',
      label:'',
      _Id:Util.genId()  
    };
  }

  componentWillMount() {      
    window.localStorage.setItem('c_id',0);
  }
  componentDidMount(){     
    
  }
  sendReport(){       
   
  }


  confirm(){      
    const {url, label, fileBlob} = this.state;
    const {file} = this.props;
    if(file){
      if (typeof this.props.confirmFile === 'function') { this.props.confirmFile(fileBlob,label);}    
    }else{
      if (typeof this.props.confirm === 'function') { this.props.confirm(url,label);}
    
    }
   
  }

  labelInput(e){
    
    this.setState({label:e.target.value});
    
  }

  labelInput_Blur(e){    
     this.setState({label:e.target.value});
   
    
  }

  _close(e){    
    if (typeof this.props.close === 'function') { this.props.close();}  
 }

 printDocument(e){    
  if (typeof this.props.printConfirm === 'function') { this.props.printConfirm();}  
}

  render() {
    var _th6_ = this;
    const {title,printError} = this.props;
    var style2Print = {"--printcolor-error-light":'#e6f4ea',"--printcolor-error-text":"#34a853"}
    if(printError){
      style2Print = {"--printcolor-error-light":'#fce8e6',"--printcolor-error-text":"#ea4335"}
    }
    return(
      <div className="__dialog__2__print_" style={style2Print} >
        <div className="_container_" >
            <div  className="_title_dialog_" >              
             <span className="_label_">Print Report</span>
              <div  className="_close_btn_"  onClick={_th6_._close.bind(_th6_)}>
                X
              </div>
            </div>
            <div className="printcallout">
              <div className="printcallout-body">
                <div className={`printcallout-icon ${printError?'error':''}`}>
                  <Icons name={'alert'} color={'var(--printcolor-error-text)'} size={24}/> 
                </div>
                <div className="printcallout-message">{printError?'No Data to Print':`Desea Imprimir el documento`} </div>
              </div>
            </div>
            <div className="resume_2_print">
              {title}
            </div>
            <div className={'_action_container_'}>
                <div>{printError?null:
                  <div className={`__print__menu__btn__ `}  onClick={this.printDocument.bind(this)}>
                    <Icons name={'printer'} color={'#555'} size={18}/>
                    <span>Print</span>
                  </div>} 
                </div>
            </div>
            
        </div>                
      </div>
    )
  }
}


function mapStateToProps_PrintDialog(state, ownProps) {
  return {
    printError: state.common.printError
  };
}

const OpenPrintDialog2 = connect(mapStateToProps_PrintDialog)(OpenPrintDialog);

