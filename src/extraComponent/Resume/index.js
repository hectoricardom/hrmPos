



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';
import * as Print2 from '../../state/printDoc';
import { withRouter} from 'react-router-dom';
import TabsHRM from '../TabsHRM';


import { GraphMultiLine} from '../GraphMultiLineHRM';

import './style.css';
import LoadingColorSpinner from '../Icons/LoadingColorSpinner';

var _Type = 'Resume'

const _tabs = ['2020' ,'2019','mes','categorias' ];   

const monthsList_Short =[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];

class Resume extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          lastHover:null, 
          activeGraphtab:0,
          activeType:'Ingresos',
          _year:2020,
          filterMonth:false,
          month2flt:null,
          filterCategory:false,
          category2flt:null,
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
    this.close_filterOptions();
    this.props.actions.getGastos(v);
    this.props.actions.getIngresos(v);
    this.setState({_year:v, filterMonth:false, month2flt:null, filterCategory:false, category2flt:null});   
    this.props.actions.UpdKeyValue({key:'year',value:v});
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



  open_filterOptions(){    
    var formName = `period_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterOption sortList={[]} updChange={this.handleOptionsFilterChanges.bind(this)} updYear={this.updYear.bind(this)}  openCategories={this.handleOpenCategoriesChanges.bind(this)}/>
    var options = {id:_id,zIndex:150,height:250,content:_cont};
    this.props.dialogActions.OpenSlideOption(options);
  }



  close_filterOptions(){
    var formName = `period_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseSlideOption(options);
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
    this.setState({filterMonth:true,month2flt:i,filterCategory:false, category2flt:null})
    this.close_GroupDate();
  }


  handleclearFilter(i){
    this.setState({filterMonth:false,month2flt:null})
    this.close_GroupDate();
  }

  handleOpenCategoriesChanges(){
    this.close_filterOptions();
    
    var _gastos_ = this.props.groups.groupByType['gastos'];
    var _ingresos_ = this.props.groups.groupByType['ingresos'];    
    var formName = `groupCaterine_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterGroupByCategories updChange={this.handleGroupCatChanges.bind(this)} gastos={_gastos_} ingresos={_ingresos_} active={this.state.date2F} closeView={this.close_GroupCategories.bind(this)} clearFilter={this.handleclearCatFilter.bind(this)}  />
    var options = {id:_id,zIndex:500,height:450,content:_cont};
    this.props.dialogActions.OpenView(options);    
  }
     


  close_GroupCategories(){
    var formName = `groupCaterine_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id};
    this.props.dialogActions.CloseView(options); 
  }


  handleGroupCatChanges(i){
    this.setState({filterCategory:true, category2flt:i,filterMonth:false,month2flt:null})
    this.close_GroupCategories();
  }


  handleclearCatFilter(i){
    this.setState({filterCategory:false, category2flt:null})
    this.close_GroupCategories();
  }

  handlePrint(i){
    
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





  render() {  
    const {  ingresos,gastos,categories, isMobile } = this.props;
    const {activeGraphtab,_year, activeGraphCategory, filterMonth, month2flt, filterCategory, category2flt, index, activeMonth } = this.state;    


    var IngresosTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['total']:0:0:0;
    var GastosTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['total']:0:0:0;   
    var mnt =   filterMonth && month2flt-(Math.floor(month2flt/12)*12);
    var categories2Filter =   filterCategory && category2flt && categories[category2flt] && categories[category2flt]['name'];
    var _graph = {}; 

    let IngresosMonthTotal  = {};
    let GastosMonthTotal  = {};
    var categoriesTotal = 0;
    var _month = null;
    var graphColor = 'var(--color-base--hover)';
    var backgroundcolorTav = 'var(--calendar--back--color--)';   

    if(filterCategory){
      var s = null;
      if(ingresos && ingresos.GroupbyMonthXCategories && ingresos.GroupbyMonthXCategories[_year] && ingresos.GroupbyMonthXCategories[_year][category2flt]){
        s = ingresos.GroupbyMonthXCategories[_year][category2flt];
      }else if(gastos&& gastos.GroupbyMonthXCategories && gastos.GroupbyMonthXCategories[_year] && gastos.GroupbyMonthXCategories[_year][category2flt]){
        s = gastos.GroupbyMonthXCategories[_year][category2flt];
      }
      _graph = s?createListYear(s['list'],_year):{};
      categoriesTotal= s?s['total']:0;
    }
    else if(filterMonth){     
      IngresosTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]['total']:0:0:0:0:0;
      GastosTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]['total']:0:0:0:0:0;
      _month = month2flt-(_year*12);
      if(activeGraphtab===0){
        IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]['list']:{}:{}:{}:{}:{};  
        _graph = createListMonth(IngresosMonthTotal);
      }
      else if(activeGraphtab===1){
        GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]['list']:{}:{}:{}:{}:{};  
        _graph = createListMonth(GastosMonthTotal);  
        graphColor = '#CC0000';    
        backgroundcolorTav = '#fce8e6';      
      }
      else if(activeGraphtab===2){
        IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]?ingresos.groupByMonth[_year]['list'][month2flt]['list']:{}:{}:{}:{}:{};  
        GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]?gastos.groupByMonth[_year]['list'][month2flt]['list']:{}:{}:{}:{}:{};  
        _graph = createUtilityAmmountListMonth(IngresosMonthTotal,GastosMonthTotal);
        graphColor = '#00796b'; 
        backgroundcolorTav = '#e6f4ea';   
      }
    }else{
      IngresosTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['total']:0:0:0;
      GastosTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['total']:0:0:0;        
      if(activeGraphtab===0){
        IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list']:{}:{}:{};      
        _graph = createListYear(IngresosMonthTotal,_year);
      }
      else if(activeGraphtab===1){
        GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list']:{}:{}:{};
        _graph = createListYear(GastosMonthTotal,_year);
        graphColor = '#CC0000';    
        backgroundcolorTav = '#fce8e6';   
      }
      else if(activeGraphtab===2){
        IngresosMonthTotal  = ingresos?ingresos.groupByMonth?ingresos.groupByMonth[_year]?ingresos.groupByMonth[_year]['list']:{}:{}:{};
        GastosMonthTotal  = gastos?gastos.groupByMonth?gastos.groupByMonth[_year]?gastos.groupByMonth[_year]['list']:{}:{}:{};
        _graph = createUtilityAmmountListYear(IngresosMonthTotal,GastosMonthTotal,_year);
        graphColor = '#00796b'; 
        backgroundcolorTav = '#e6f4ea';   
        
      }
    }
    

  
    var yy = [{label:'Ingresos',ammount:Math.floor(IngresosTotal)},{label:'Gastos',ammount:Math.floor(GastosTotal)},{label:'Ganancias',ammount:Math.floor(IngresosTotal-GastosTotal)}]   
  
    if(isMobile){


    
    return (
      <div  className="resume__TopPadding" >
      <div  className="resume__Container" >
      <div  className={`resume__Wrapper ${'isMobile'}`} >
        <div  className="resume__period ">
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
         {filterMonth?month2flt?<GraphLineMonth graph={_graph} graphColor={graphColor} month={_month}/>:<LoadingColorSpinner  stroke={'#1967d2'}/>:filterCategory?category2flt?<GraphLine graph={_graph} graphColor={graphColor} year={_year}/>:<LoadingColorSpinner stroke={'#1967d2'}/>:<GraphLine graph={_graph} graphColor={graphColor} year={_year}/>}
         
         </div>
      </div>
      </div>
    )
  }else{
    
    var dataTabAvailable = filterMonth && month2flt?true:index<2?true:false;
    var printbtnVisible = filterMonth && month2flt?true:filterCategory && category2flt?true:index<2?true:false;
    return (
      <div  className="resume__TopPadding" >
       <TabsHRM data={_tabs} UpdateIndex={this.UpdateIndex.bind(this)}  pth={'resume'} initValue={this.state.index}/>
        
      <div  className="resume__Container" >

          {/* MONTHS FILTER SECTION  */}

        {this.state.index===2?<div  className="left__options" >
         <div className={'option--wrapper'}>          
          <div className="__body__">
            {monthsList_Short.map((mnt,in0)=>{
              //var y = Math.floor(mnt/12);
              var m = in0+_year*12;
              var m2c = parseInt(month2flt);
              return (
                <div className={`__sort_options-- __groupby  __sort_options-- ${m2c===m?"__activeDesktop":''} `} key={Util.gen6CodeId()} >
                  <div className={'__gbItemWrapp__'} onClick={this.handlerSaveForm.bind(this,m)}>
                    <div  className={'__icons--'}>
                        <Icons name={m2c===m?"success":'calendar'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {`${mnt}, ${_year}`}
                    </div>
                  </div>
                  <div className="flexSpace"/>
                  {m2c===m?<div  className={'__icons-- _rmvFilter__'}  onClick={this.clearFilter.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                  </div>:null}     
                </div>
              )
            })}

          </div>          
        </div>
        </div>:null}

        {/* CATEGOIRES FILTER SECTION  */}



        {this.state.filterCategory?
        <div  className="left__options" >
         <div className={'option--wrapper'}>          
          <div className="__body__">
          <div  className="__Title_categories_">Ingresos</div>
            {ingresos && ingresos.GroupbyMonthXCategories && ingresos.GroupbyMonthXCategories[_year] && Object.keys(ingresos.GroupbyMonthXCategories[_year]).map((ing,in0)=>{
              let _categoriesName =   ing && categories[ing]['name'];
              return (
                <div className={`__sort_options-- __groupby  __sort_options-- ${category2flt===ing?"__activeDesktop":''} `} key={Util.gen6CodeId()} >
                  <div className={'__gbItemWrapp__'} onClick={this.handleSetCategoriy2Filter.bind(this,ing)}>
                    <div  className={'__icons--'}>
                        <Icons name={category2flt===ing?"success":'calendar'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {`${_categoriesName}`}
                    </div>
                  </div>
                  <div className="flexSpace"/>
                  {category2flt===ing?<div  className={'__icons-- _rmvFilter__'}  onClick={this.clearFilter.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                  </div>:null}     
                </div>
              )
            })}
            <div  className="__Title_categories_">Gastos</div>
            {gastos && gastos.GroupbyMonthXCategories && gastos.GroupbyMonthXCategories[_year] && Object.keys(gastos.GroupbyMonthXCategories[_year]).map((ing,in0)=>{
               let _categoriesName =   ing && categories[ing]['name'];
              return (
                <div className={`__sort_options-- __groupby  __sort_options-- ${category2flt===ing?"__activeDesktop":''} `} key={Util.gen6CodeId()} >
                  <div className={'__gbItemWrapp__'} onClick={this.handleSetCategoriy2Filter.bind(this,ing)}>
                    <div  className={'__icons--'}>
                        <Icons name={category2flt===ing?"success":'calendar'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {`${_categoriesName}`}
                    </div>
                  </div>
                  <div className="flexSpace"/>
                  {category2flt===ing?<div  className={'__icons-- _rmvFilter__'}  onClick={this.clearFilter.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                  </div>:null}     
                </div>
              )
            })}
          </div>          
        </div>
        </div>:null}

        
       <div  className="resume__Wrapper" >
        
         <div  className="resume__Title">
            {filterCategory?<div  className="_text_ _categories_">Resumen por categoria <span className="_text_title_categories_">{categories2Filter}</span> del <span className="_text_title_category_year_">{_year}</span></div>:filterMonth?<div  className="_text_">Resumen del mes  <span className="_text_title_month_">{monthsList_Short[mnt]} {_year}</span> </div>: <div  className="_text_">Resumen del año <span className="_text_title_year_">{_year}</span></div>}
            {filterCategory?<div  className="_text_ _categories_">Total <span className="_text_title_total_">${categoriesTotal.toFixed(2)}</span></div>:null}
          </div>
          {printbtnVisible?
          <div  className="resume__period">
            
            <div  className={''}></div>
            <div className="flexSpace"/>    
            <div className={`__print__menu__btn__ `}  onClick={this.open_Print_Dialog.bind(this)}>
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
                <div className={`item_tabs_graph ${_active?'active':''} ${dv.ammount<0?'_negative':''}`} onClick={this.activeGraphtab.bind(this,In4)} key={In4} style={{"--color_item_tabs_graph_active":graphColor,"--backgroundcolor_item_tabs_graph_active":backgroundcolorTav}}>
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


          {filterMonth?month2flt?<GraphLineMonth graph={_graph} graphColor={graphColor} month={_month}/>:<LoadingColorSpinner  stroke={'#1967d2'}/>:filterCategory?category2flt?<GraphLine graph={_graph} graphColor={graphColor} year={_year}/>:<LoadingColorSpinner  stroke={'#1967d2'}/>:<GraphLine graph={_graph} graphColor={graphColor} year={_year}/>}
         

      </div>
      </div>
      </div>
    )
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
              <Icons name={'arrowBack'} color={'#1967d2'} size={18}/>             
            </div> 
          </div>          
          <div className="flexSpace"/>
          <div className={'__save__btn '} >
            <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv orangeFlex "/>
              <span className="text2D orangeFlex">{'Group by Date'}</span>              
            </div> 
          </div>       
        </div>
        <div className={'option--wrapper'}>          
          <div className="__body__">
            {monthsList_Short.map((mnt,in0)=>{
              //var y = Math.floor(mnt/12);
              var m = in0+year*12;
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









class FilterGroupByCategories extends Component {
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
    const {  active, gastos, ingresos  } = this.props;
    return (
      <div className="__form_group__">
        <div  className={`_form_group_cancel_`}>
        <div className={'__save__btn '}>
            <div className="center--Container grayStyle" onClick={this.dialogClose.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv grayStyle "/>
              <Icons name={'arrowBack'} color={'#1967d2'} size={18}/>             
            </div> 
          </div>          
          <div className="flexSpace"/>
          <div className={'__save__btn '} >
            <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv orangeFlex "/>
              <span className="text2D orangeFlex">{'Group by categories'}</span>              
            </div> 
          </div>       
        </div>
        <div className={'option--wrapper'}>          
          <div className="__body__">
          <div  className="__Title_categories_">Ingresos</div>
            {Object.keys(ingresos).map((ing,in0)=>{
              //var y = Math.floor(mnt/12);
              let mnt = ingresos[ing];
              return (
                <div className={`__sort_options-- __groupby  __sort_options-- ${active===ing?"__active":''} `} key={Util.gen6CodeId()} >
                  <div className={'__gbItemWrapp__'} onClick={this.handlerSaveForm.bind(this,ing)}>
                    <div  className={'__icons--'}>
                        <Icons name={active===ing?"success":'calendar'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {`${mnt.name}`}
                    </div>
                  </div>
                  <div className="flexSpace"/>
                  {active===ing?<div  className={'__icons-- _rmvFilter__'}  onClick={this.clearFilter.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                  </div>:null}
                                  
                </div>
              )
            })}
            <div className="__Title_categories_">Gastos</div>
            {Object.keys(gastos).map((gst,in0)=>{              
              let mnt = gastos[gst];
              return (
                <div className={`__sort_options-- __groupby  __sort_options-- ${active===gst?"__active":''} `} key={Util.gen6CodeId()} >
                  <div className={'__gbItemWrapp__'} onClick={this.handlerSaveForm.bind(this,gst)}>
                    <div  className={'__icons--'}>
                        <Icons name={active===gst?"success":'calendar'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {`${mnt.name}`}
                    </div>
                  </div>
                  <div className="flexSpace"/>
                  {active===gst?<div  className={'__icons-- _rmvFilter__'}  onClick={this.clearFilter.bind(this)}>
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







class GraphLine extends Component {

  constructor(props) {
    super(props);  
    this.state = {        
      key:0,
      activeGraphtab:0,
    };
  }


  activeGraphtab(i){
    this.setState({activeGraphtab:i});
   }





  render() {
    const {graph,graphColor} = this.props;   
    const monthsList_Short =[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];
    var l = Object.keys(graph).length;
    var Wgraph = 320;
    var Xgraph = 32;
    const _mnths = Array.from(Array(Math.floor(12)).keys());
    var _max = sumMax_Month(graph,_mnths);
    var _min = sumMin_Month(graph,_mnths);
    const Moneys = createAmmountListMonth(_max,_min);    
    var range = l>0?_max-_min:0;
    var YbyUnit = (26*8)/range;
    const dPath = createD_Path_List_Year(graph,YbyUnit,_max,_mnths); 
   



    return (
          <div  className={'_graphHRM_'}  style={{position: 'relative', left: '0px', top: '0px', width: `${Wgraph+20}px`, height: '100%',marginBottom:'50px'}} aria-label="Un gráfico.">
            <svg width={Wgraph+20} height="300" aria-label="Un gráfico." style={{overflow: 'hidden'}}>
              <defs id="_ABSTRACT_RENDERER_ID_32"><clipPath id="_ABSTRACT_RENDERER_ID_33"><rect x={Xgraph} y="45" width={Wgraph} height="210"></rect></clipPath></defs>
              <rect x="0" y="0" width={Wgraph} height="300" stroke="none" strokeWidth="0" fill="#ffffff"></rect>
              <g>
                <rect x={Xgraph} y="45" width={Wgraph} height="210" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
                <g clipPath="">
                  <g>
                  {Moneys && Moneys.map((mn,In2)=>{
                    var xIn = (In2*26)+46;
                    let colorFill =  In2%2===0?"#d6d6d6":"#efefef";       
                      return(
                         <rect x={Xgraph} y={xIn} width={Wgraph} height="1" stroke="none" strokeWidth="0" fill={colorFill} key={In2}></rect>                       
                      )
                  })} 
                  
                  </g>                  
                  <g>
                    {range!==0?<path d={dPath} stroke="#039be5" strokeWidth="2" fillOpacity="1" fill="none" style={{stroke:graphColor}}></path>:<g>
                        <text textAnchor="middle" x={175} y="145" fontFamily="Arial" fontSize="19" stroke="none" strokeWidth="0" fill="#9e9e9e">{'Not Enough Data'}</text>
                      </g>}
                  </g>
                </g>
                <g></g>
                <g>
                  {monthsList_Short.map((mnt,In2)=>{
                    var xIn = (In2*27)+30;
                    return(
                      <g key={In2}>
                        <text textAnchor="middle" x={xIn} y="272.2" fontFamily="Arial" fontSize="10" stroke="none" strokeWidth="0" fill="#9e9e9e">{mnt}</text>
                      </g>
                    )
                  })}

                  {l>0 && Moneys && Moneys.map((mn,In2)=>{
                    var xIn = (In2*26)+50;  
                    let colorFill =  mn>=0?"#9e9e9e":"#c62828";                
                      return(
                        <g key={In2}>
                          <text textAnchor="middle" x={'15'} y={xIn} fontFamily="Arial" fontSize="9" stroke="none" strokeWidth="0" fill={colorFill}>{mn}</text>
                        </g>
                      )
                  })}                 
                    
                  </g>
                </g>
                </svg>
            </div>
    );
  }
}



function createD_Path_List_Year(g,YbyUnit,max,days){  
  var dPath = '';
  days.map((_day,In2)=>{
   
    if(g[_day]){
      var y2 = 27    
      let Yp = (max-g[_day])*YbyUnit+46;
      let Xp = (_day*y2)+30;   
      let Xvert = Xp.toFixed(2);
      let Yvert = Yp.toFixed(2); 
      if(In2===0){
        dPath += `M${Xvert} ${Yvert} L ${Xvert} ${Yvert} `;
      }else{
        dPath += `L ${Xvert} ${Yvert} `;
      }   
    }else{
      let Yp = (max)*YbyUnit+46;
      let Xp = (_day*27)+30;   
      let Xvert = Xp.toFixed(2);
      let Yvert = Yp.toFixed(2);   
      if(In2===0){
        dPath += `M${Xvert} ${Yvert} L ${Xvert} ${Yvert} `;
      }else{
        dPath += `L ${Xvert} ${Yvert} `;
      }
    }   
  })

/*

  Object.keys(g).map((_date,In2)=>{
    var Yp = (max-g[_date])*YbyUnit+46;
    var Xp = (_date*27)+30;   
    var Xvert = Xp.toFixed(2);
    var Yvert = Yp.toFixed(2);    
    //pointsCircle.push({x:Xvert,y:Yvert,date:Util.parseDateShort(pointData.date),total:pointData.total})  
    if(In2===0){
      dPath += `M${Xvert} ${Yvert} L ${Xvert} ${Yvert} `;
    }else{
      dPath += `L ${Xvert} ${Yvert} `;
    } 
  })*/
  return dPath;
}



function createListYear(ing,year){   
  var gDays = {}
  Object.keys(ing).map((dt,In2)=>{    
    var _date = parseInt(dt)-(12*year);
    if(!gDays[_date]){
      gDays[_date] = ing[dt]['total']
    }
    else if(gDays[_date]){
      gDays[_date] += ing[dt]['total'];
    }    
  })
  return gDays;
}


function createUtilityAmmountListYear(ing,gst,year){   
  var gDays = {}
  Object.keys(ing).map((dt,In2)=>{    
    let _date = parseInt(dt)-(12*year);
    if(!gDays[_date]){
      gDays[_date] = ing[dt]['total']
    }
    else if(gDays[_date]){
      gDays[_date] += ing[dt]['total'];
    }    
  })
  
  Object.keys(gst).map((dt,In2)=>{    
    let _date = parseInt(dt)-(12*year); 
    if(!gDays[_date]){
      gDays[_date] = (gst[dt]['total'])*-1
    }
    else if(gDays[_date]){
      gDays[_date] += (gst[dt]['total'])*-1;
    }    
  }) 
  return gDays;
}






class GraphLineMonth extends Component {

  constructor(props) {
    super(props);  
    this.state = {        
      key:0,
      activeGraphtab:0,
    };
  }


  activeGraphtab(i){
    this.setState({activeGraphtab:i});
   }





  render() {
    const {graph,month,graphColor} = this.props;
    var l = Object.keys(graph).length;
    var Wgraph = 320;
    var Xgraph = 32;
    const _days = Array.from(Array(Math.floor(_dayPerMonth[month])).keys());
    var _max = sumMax_Month(graph,_days);
    var _min = sumMin_Month(graph,_days);
    const Moneys = createAmmountListMonth(_max,_min);

    
    var range = l>0?_max-_min:0;
    var YbyUnit = (26*8)/range;
    const dPath = createD_Path_List(graph,YbyUnit,_max,_days,_dayPerMonth[month]); 
   
    
    return (
          <div  className={'_graphHRM_'}  style={{position: 'relative', left: '0px', top: '0px', width:  `${Wgraph+20}px`, height: '100%',marginBottom:'50px'}} aria-label="Un gráfico.">
            <svg width={Wgraph+20} height="300" aria-label="Un gráfico." style={{overflow: 'hidden'}}>
              <defs id="_ABSTRACT_RENDERER_ID_32"><clipPath id="_ABSTRACT_RENDERER_ID_33"><rect x={Xgraph} y="45" width={Wgraph} height="210"></rect></clipPath></defs>
              <rect x="0" y="0" width={Wgraph} height="300" stroke="none" strokeWidth="0" fill="#ffffff"></rect>
              <g>
                <rect x={Xgraph} y="45" width={Wgraph} height="210" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
                <g clipPath="">
                  <g>
                  {Moneys && Moneys.map((mn,In2)=>{
                    var xIn = (In2*26)+46;
                    let colorFill =  In2%2===0?"#d6d6d6":"#efefef";       
                      return(
                         <rect x={Xgraph} y={xIn} width={Wgraph} height="1" stroke="none" strokeWidth="0" fill={colorFill} key={In2}></rect>                       
                      )
                  })} 
                  
                  </g>                  
                  <g>
                    {range!==0?<path d={dPath} stroke="#039be5" strokeWidth="2" fillOpacity="1" fill="none"  style={{stroke:graphColor}}></path>:<g>
                        <text textAnchor="middle" x={175} y="145" fontFamily="Arial" fontSize="19" stroke="none" strokeWidth="0" fill="#9e9e9e">{'Not Enough Data'}</text>
                      </g>}
                  </g>
                </g>
                <g></g>
                <g>
                  {_days.map((mnt,In2)=>{
                    var xIn = (In2*10)+30;
                    
                    if(In2%2>0){                      
                      if(_days.length===mnt+1){
                        return(                      
                          <g key={In2}>
                            <text textAnchor="middle" x={xIn+5} y="272.2" fontFamily="Arial" fontSize="10" stroke="none" strokeWidth="0" fill="#9e9e9e">{mnt+1}</text>
                          </g>
                        )
                      }else{ return null }
                     
                    }else{
                      return(                      
                        <g key={In2}>
                          <text textAnchor="middle" x={xIn} y="272.2" fontFamily="Arial" fontSize="10" stroke="none" strokeWidth="0" fill="#9e9e9e">{mnt+1}</text>
                        </g>
                      )
                    }
                  })}

                  {l>0 && Moneys && Moneys.map((mn,In2)=>{
                    var xIn = (In2*26)+50;  
                    let colorFill =  mn>=0?"#9e9e9e":"#c62828";        
                           
                      return(
                        <g key={In2}>
                          <text textAnchor="middle" x={'15'} y={xIn} fontFamily="Arial" fontSize="9" stroke="none" strokeWidth="0" fill={colorFill}>{mn}</text>
                        </g>
                      )
                  })}                 
                    
                  </g>
                </g>
                </svg>
            </div>
    );
  }
}





function sumMax_Month(g,days){
  var _max = 0;  
 if(days){
  days.map((_day,In2)=>{
    if(g[_day]){
      let _import = g[_day];
      if(_import>_max){
        _max = _import;
      }
    }else{
      let _import = 0;
      if(_import>_max){
        _max = _import;
      }
    }

  })
 }else{
  Object.keys(g).map(date=>{
    var _import = g[date];
    if(_import>_max){
      _max = _import;
    }
  }) 
 }  
 return _max;
}

function sumMin_Month(g,days){
  var _max = 1000000000;  
  if(days){ 
    days.map((_day,In2)=>{
      if(g[_day]){
        let _import = g[_day];
        if(_import<_max){
          _max = _import;
        }
      }else{
        let _import = 0;
        if(_import<_max){
          _max = _import;
        }
      }

    })
  }else{
    Object.keys(g).map(date=>{
      var _import = g[date];
      if(_import>_max){
        _max = _import;
      }
    }) 
  }
  return _max;
}

function createAmmountListMonth(max,min){  
  var y = [];
  var range = max-min;
  if(range!==0){
    let mtl = range/8;
    for(let i=0;i<=8;i++){
      if(mtl){
        y.push(Math.floor(max-(mtl*i)));
      }
    }
  }else{
    let mtl = Math.ceil(max*2/8);
    for(let i=0;i<=8;i++){
      if(mtl){
        y.push(Math.floor(max*2-(mtl*i)));
      }
    }
  }
   
 return y;
}





function createD_Path_List(g,YbyUnit,max,days){
  var dPath = '';
  days.map((_day,In2)=>{
   
    if(g[_day]){
      let Yp = (max-g[_day])*YbyUnit+46;
      let Xp = (_day*10)+30;   
      let Xvert = Xp.toFixed(2);
      let Yvert = Yp.toFixed(2); 
      if(In2===0){
        dPath += `M${Xvert} ${Yvert} L ${Xvert} ${Yvert} `;
      }else{
        dPath += `L ${Xvert} ${Yvert} `;
      }   
    }else{
      let Yp = (max)*YbyUnit+46;
      let Xp = (_day*10)+30;   
      let Xvert = Xp.toFixed(2);
      let Yvert = Yp.toFixed(2);   
      if(In2===0){
        dPath += `M${Xvert} ${Yvert} L ${Xvert} ${Yvert} `;
      }else{
        dPath += `L ${Xvert} ${Yvert} `;
      }
    }   
  })
  //Object.keys(g).map((_date,In2)=>{ })
  return dPath;
}

function createListMonth(ing){   
  var gDays = {}
  Object.keys(ing).map((dt,In2)=>{    
    var _date = (new Date(ing[dt]['date'])).getDate(); 
    if(!gDays[_date]){
      gDays[_date] = ing[dt]['import']
    }
    else if(gDays[_date]){
      gDays[_date] += ing[dt]['import'];
    }    
  })
  return gDays;
}


function createUtilityAmmountListMonth(ing,gst,month){   
  var gDays = {}
  Object.keys(ing).map((dt,In2)=>{    
    var _date = (new Date(ing[dt]['date'])).getDate();
    if(!gDays[_date]){
      gDays[_date] = ing[dt]['import']
    }
    else if(gDays[_date]){
      gDays[_date] += ing[dt]['import'];
    }    
  })
  
  Object.keys(gst).map((dt,In2)=>{    
    var _date = (new Date(gst[dt]['date'])).getDate();  
    if(!gDays[_date]){
      gDays[_date] = (gst[dt]['import'])*-1
    }
    else if(gDays[_date]){
      gDays[_date] += (gst[dt]['import'])*-1;
    }    
  }) 
  return gDays;
}



var _dayPerMonth = [31,Util.febMaxDays((new Date()).getFullYear()),31,30,31,30,31,31,30,31,30,31];









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

