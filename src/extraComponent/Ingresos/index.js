
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';
//import MonthGroup from '../MonthGroup';

import FormsFinancesContainer from '../FormsFinances';
import * as Print2 from '../../state/printDoc';
import {FormsFinancesRdx} from '../FormsFinances';

import DetailsFinancesContainer from '../DetailsFinances';



import FilterGroupDate from '../FilterGroupDate';
import { withRouter} from 'react-router-dom';
import LoadingColorSpinner from '../Icons/LoadingColorSpinner';
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';

import './style.css';

import FilterGroupCategories from '../FilterGroupCategories';


import { GraphMultiLine} from '../GraphMultiLineHRM';

import Menu222 from '../Menu222';

import InputTextHRM from '../InputText';


import HRMDropDown from '../dropDownBox';


import RadioBoxHRM from '../radioBoxHRM';





import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

var sort_finance_List = ['date','title','group'];
var _Type = `ingresos`;

const monthsList_Short =[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];


class Ingresos extends Component {


  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      asc:false,
      actionsheight:325,
      limit:50,
      id2edit:null,
      filters:{},  
      isInPath:false, 
      cameraDevice:null,
      totalPerMonth:0,
      editingSection:'metrica',
      filterByDate:'by month',
      key:0
    };
  }

  componentDidMount(){
    
    Util.changethemeKey('light',"--background--header--color","rgba(198, 40, 40,1)");     
    Util.changethemeKey('light',"--svg--header--color","#f9f9f9");
    const {location, data, month, operation} = this.props;
    var s = Util.parseQuery(location.search);
    _Type = operation;
    if(s.tb=== operation){ 
      this.setState({isInPath:true})
    }else{
      this.setState({isInPath:false})
    }
    this.verifyData();
    //var data = this.props[this.props.operation];
    this.calcFilterandSort(data,this.state.filters,month,this.state.catgory2F,this.state.key,this.state.asc);

        
  }


  verifyData(){
    const {month, year, data, operation} = this.props;
    if(!this.props.data){ 
      if(operation==="gastos"){
        this.props.actions.getGastos(year);
      }else if(operation==="ingresos"){
        this.props.actions.getIngresos(year);
      }
    }else{
      this.calcFilterandSort(data,this.state.filters,month,this.state.catgory2F,this.state.key,this.state.asc);
    }  
  }

  
  componentWillReceiveProps(nextProps){
    var _initvalue = this.props.gettingObserve?this.props.gettingObserve:null;
    var next_initvalue = nextProps.gettingObserve?nextProps.gettingObserve:null;  
    if(_initvalue!==next_initvalue){     
      this.verifyData()
    }
    if(!nextProps.data){      
      this.verifyData()
    }
  }

  /***********
   * 
   * 
   * 
   * 
   * handle Sort Options
   * 
   * 
   */


  open_sortOptions(){    
    var formName = `sort_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    const {asc,key} = this.state;    
    var _cont = <SortOptionIngresos sortList={sort_finance_List} _value={asc}  _active={key} updChange={this.handleOptionsSortChanges.bind(this)}/>
    var options = {id:_id,zIndex:150,height:420,content:_cont};
    this.props.dialogActions.OpenSlideOption(options);
  }

  close_sortOptions(){
    var formName = `sort_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseSlideOption(options);
  }

  handleOptionsSortChanges(i,s){
    const {month, data} = this.props;
    this.setState({asc:!this.state.asc,key:i})
    this.close_sortOptions();
    this.calcFilterandSort(data,this.state.filters,month,this.state.catgory2F,i,!this.state.asc);
  }

  /***********
   * 
   * 
   * 
   * 
   * handle Filters Options
   * 
   * 
   */



  open_filterOptions(){    
    var formName = `filters_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterOptionIngresos sortList={[]} updChange={this.handleOptionsFilterChanges.bind(this)}  openCategories={this.handleOptionsFilterCategoriesChanges.bind(this)}  clearFilter={this.handleclearFilter.bind(this)} />
    var options = {id:_id,zIndex:150,height:450,content:_cont};
    this.props.dialogActions.OpenSlideOption(options);
  }

  close_filterOptions(){
    var formName = `filters_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseSlideOption(options);
  }





  handleclearFilter(i){
    this.setState({filter:false,date2F:null,catgory2F:null})
    this.close_filterOptions();
   
    this.calcFilterandSort(this.props.data,false,null,null,this.state.key,this.state.asc);    
  }




  
  handleOptionsFilterChanges(){
    this.close_filterOptions();    
    var formName = `groupDate_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterGroupDate updChange={this.handleGroupDateChanges.bind(this)} list={this.props.data.groupByMonth} active={this.state.date2F} closeView={this.close_GroupDate.bind(this)} />
    var options = {id:_id,zIndex:500,height:450,content:_cont};
    this.props.dialogActions.OpenView(options);    
  }
     
  close_GroupDate(){
    var formName = `groupDate_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id};
    this.props.dialogActions.CloseView(options); 
  }







    
  handleOptionsFilterCategoriesChanges(){
    this.close_filterOptions();
    const {data,calendar} = this.props;
    var formName = `groupCategory_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterGroupCategories updChange={this.handleGroupCategoryChanges.bind(this)} list={data.GroupbyMonthXCategories[calendar.year]} active={this.state.date2F} closeView={this.close_GroupCategory.bind(this)} clearFilter={this.handleclearFilter.bind(this)}  />
    var options = {id:_id,zIndex:500,height:450,content:_cont};
    this.props.dialogActions.OpenView(options);    
  }
     
  close_GroupCategory(){
    var formName = `groupCategory_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id};
    this.props.dialogActions.CloseView(options); 
  }


  handleGroupCategoryChanges(i){
    const {month} = this.props;
    this.setState({filter:true,catgory2F:i})
    this.close_GroupCategory();
    this.calcFilterandSort(this.props.data,true,month,i,this.state.key,this.state.asc);
  }


  


  handleCategoryChanges(i,t){
    const {month} = this.props;
    if(this.state.catgory2F===i){
      i=null;
      t=0;
    }
    this.setState({filter:true,catgory2F:i,totalPerMonth:t})    
    this.calcFilterandSort(this.props.data,true,month,i,this.state.key,this.state.asc);
  }


  
  /***********
   * 
   * 
   * 
   * 
   * handle Actions Options
   * 
   * 
   */





  open_actionsOptions(i){    
    this.setState({id2edit:i});
    var formName = `options_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <ActionsOptionIngresos handle_Delete={this.open_Delete_Dialog.bind(this)} handle_Edit={this.OpenEditAction.bind(this)} _close={this.close_actionsOptions.bind(this)} />
    var options = {id:_id,zIndex:150,height:450,content:_cont};
    this.props.dialogActions.OpenSlideOption(options);

  }

  close_actionsOptions(){
    var formName = `options_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseSlideOption(options);
  }





  /***********
   * 
   * 
   * 
   * 
   * handle Edit Action
   * 
   * 
   */

  OpenEditAction(i){    
    if(typeof i !== "string"){
      i = null;
    }
    var i2edit = i?i:this.state.id2edit?this.state.id2edit:null;
    var formName = `upd_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    this.close_actionsOptions();
    var _content = <div className="__form__">
      <FormsFinancesRdx formName={formName} type={_Type} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.CloseEditAction.bind(this)}/> </div>;
    //this.props.actions.UpdateFormbyName(formName,i2edit);
    this.props.actions.UpdKeyValue({key:'detailByID',value:{}})
    if(i && _Type==="gastos"){
      this.props.actions.getGastosById(i2edit,formName);
    }else if(i && _Type==="ingresos"){
      this.props.actions.getIngresosById(i2edit,formName);
    }

    var options = {id:_id,zIndex:300,content:_content};
    this.props.dialogActions.OpenSlideView(options);    
  }


  CloseEditAction(){
    var formName = `upd_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id};
    this.props.dialogActions.CloseSlideView(options);
  }

  /***********
   * 
   * 
   * 
   * 
   * handle Add Action
   * 
   * 
   */


  
  OpenAddSlide(){
    var formName = `add_${_Type}`;
    var _contentAdd = <div className="__form__"><FormsFinancesContainer formName={formName} type={_Type} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.CloseAddSlide.bind(this)}/> </div>;
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id,zIndex:300,content:_contentAdd};
    this.props.dialogActions.OpenSlideView(options);
  }

  CloseAddSlide(){
    var formName = `add_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id};
    this.props.dialogActions.CloseSlideView(options);
  }



  OpenDetailSlide(i){ 
    this.props.actions.UpdKeyValue({key:'detailByID',value:{}})
    var formName = `details_${_Type}`;
    if(i && _Type==="gastos"){
      this.props.actions.getGastosById(i,formName);
    }else if(i && _Type==="ingresos"){
      this.props.actions.getIngresosById(i,formName);
    }
    
    var _contentAdd =<div className="__form__">
      <DetailsFinancesContainer 
        formName={formName} 
        type={_Type}        
        closeDialog={this.CloseDetailSlide.bind(this)}
      /> 
    </div>;
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id,zIndex:300,content:_contentAdd};
    this.props.dialogActions.OpenSlideView(options);
  }

  CloseDetailSlide(){
    var formName = `details_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id};
    this.props.dialogActions.CloseSlideView(options);
  }


  handleSaveEdit(){

  }


  /***********
   * 
   * 
   * 
   * 
   * handle Scroll on container-data
   * 
   * 
   */


  onOpen(){   
    var y = document.querySelector(`[container-data=${_Type}]`);
    y.style.overflowX ='hidden';
   }
   
   onClose(){
    var y = document.querySelector(`[container-data=${_Type}]`);
    y.style.overflowX ='scroll';
   }



   


/***********
   * 
   * 
   * 
   * 
   * handle Delete Action
   * 
   * 
   */


  
  open_Delete_Dialog(i){   
   
    this.close_actionsOptions();
    const {dataObj} = this.props;
    var _id2Delete = i?i:this.state.id2edit?this.state.id2edit.id:null;     
    var item = dataObj[_id2Delete];
    var formName = `_delete_dialog_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`);
    var _cont = <OpenDeleteDialog2 close={this.close_Delete_Dialog.bind(this)} item={item} title={_id2Delete}  deleteConfirm={this.DeleteConfirm.bind(this)}/>
    var options = {id:_id,zIndex:150,height:'50vh',content:_cont};
    this.props.dialogActions.OpenDialog(options);

  }


  close_Delete_Dialog(){
    var formName = `_delete_dialog_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseDialog(options);
    this.props.actions.UpdKeyValue({key:'printError',value:false});
  }


  DeleteConfirm(i){
    var _id = i?i:this.state.id2edit?this.state.id2edit.id:null;   
    if(_id && _Type===`ingresos`){
      this.props.actions.RmvIngresos({id:_id});
    }
    if(_id && _Type===`gastos`){
      this.props.actions.RmvGastos({id:_id});
    }

    this.close_Delete_Dialog();    
  }
   






  



calcFilterandSort(data, filter, date2F, catgory2F,_key,_asc,editingSection){
  const {year,month} = this.props;
  var _date2F = (date2F)+(year*12);
  var _catgory2F = catgory2F;
  var _filter_ = filter;
  var _editingSection = editingSection?editingSection:this.state.editingSection;
  var totalPerMonth = 0;
  this.setState({isLoadingData:true});
  /*
  if(data && Util.ObjectKeys(data.groupByMonth).length>0 && !_date2F){
    var _arr = [];
    Util.ObjectKeys(data.groupByMonth).map(yr=>{
      _arr = _arr.concat(Util.ObjectKeys(data.groupByMonth[yr]['list']));
    })
    var t = _arr.reduce((a,c)=>{
      if(a<c){
        return a = c;
      }
      return a;
    },0)
    _date2F = t;
    _filter_ = true;
    this.setState({filter:_filter_,date2F:_date2F});     
  }
*/

  var _list = [];
  var key = sort_finance_List[_key]
  var __hli = data?data._root_:[];
  
  if(data && filter){ 
    if(_editingSection==="categories" && _catgory2F){
      let  fil_list = data.GroupbyMonthXCategories?data.GroupbyMonthXCategories[year]?data.GroupbyMonthXCategories[year][_catgory2F]?data.GroupbyMonthXCategories[year][_catgory2F]['list']:{}:{}:{};
      __hli = joinArrayfromObject(fil_list);
      let DataTotalPerMonth = data && data.GroupbyMonthXCategories && data.GroupbyMonthXCategories[year] && data.GroupbyMonthXCategories[year][_catgory2F] && data.GroupbyMonthXCategories[year][_catgory2F]['total']?data.GroupbyMonthXCategories[year][_catgory2F]['total']:0; 
      totalPerMonth = DataTotalPerMonth;
    }
    else if(_date2F && data.groupByMonth && data.groupByMonth[year] && data.groupByMonth[year]['list']){ 
      let fil_list = data.groupByMonth[year]['list'][_date2F];
      __hli = fil_list?fil_list['list']:[];
      let DataTotalPerMonth = data && data.groupByMonth && data.groupByMonth[year] && data.groupByMonth[year]['list'] && data.groupByMonth[year]['list'][_date2F] && data.groupByMonth[year]['list'][_date2F]['total']?data.groupByMonth[year]['list'][_date2F]['total']:0; 
      totalPerMonth = DataTotalPerMonth;
    }

  }

  if(__hli){
    if(_asc){
      _list = __hli.sort(function(a, b) {
        if(a[key] < b[key]) { return -1; }
        if(a[key] > b[key]) { return 1; }
        return 0;          
      })
    }else{
      _list = __hli.sort(function(a, b) {
        if(a[key] > b[key]) { return -1; }
        if(a[key] < b[key]) { return 1; }
        return 0;          
      })
    } 
  }
  this.setState({_list:_list, totalPerMonth:totalPerMonth});
  setTimeout(()=>{
    this.setState({isLoadingData:false});
  },120)

 
}





updYear(v){ 
  const {month,operation} = this.props;
  this.props.actions.UpdKeyValue({key:'year',value:v});
  this.props.actions.getIngresos(v);
  this.props.actions.getGastos(v);
  if(operation==="ingresos"){
    
  }else if(operation==="gastos"){
   
  }
  
  this.calcFilterandSort(this.props.data,true,month,this.state.catgory2F,this.state.key,this.state.asc);
}
  
  
handleGroupDateChanges(i){
  var _th = this;
  const {year, formsAll} = this.props;
  this.props.actions.UpdKeyValue({key:'month',value:i});
  var m = i+(year*12);
  this.setState({filter:true,date2F:m})
  this.close_GroupDate();    
  if(this.state.editingSection==="filters" && formsAll['searchFilters'] && formsAll['searchFilters'][`key`]){
    this.setState({isLoadingData:true});
      setTimeout(()=>{
        _th.calcFiltersByValue();
    },20)
  }else{
    _th.calcFilterandSort(_th.props.data,true,i,_th.state.catgory2F,_th.state.key,_th.state.asc);
  }
  
}


updFiltersTab(i){
  const {month} = this.props;  
  if(i!=="categories"){
    this.setState({editingSection:i,catgory2F:false});
  }
  else{
    this.setState({editingSection:i});
  }
  this.calcFilterandSort(this.props.data,true,month,this.state.catgory2F,this.state.key,this.state.asc,i);

}



open_Print_Dialog(){}

/***********
   * 
   * 
   * 
   * 
   * Render Secction
   * 
   * 
   */

  handleValuecategory2filter(e){
    var _th = this;
    const {forms} = _th.props;
    let _category2filter = forms && forms['searchFilters'] && forms['searchFilters'][`category2filter`];
    if(!_category2filter){
      this.setState({catgory2F:null});
    }
        
  }




  handlerInputValue(){
    var _th = this;
    this.setState({isLoadingData:true});
    setTimeout(()=>{
      _th.calcFiltersByValue();
    },20)
  }

calcFiltersByValue(){
  var _th = this;
  const { formsAll, data, month, year} = this.props;  
  var _date2F = (month)+(year*12);
  var _list_ = null;  
  let formName = 'searchFilters'; 
  let totalPerMonth = 0;
  const forms = formsAll;    
  if(this.state.editingSection==="filters" && forms[formName] && forms[formName][`key`]){
    let _v = forms[formName]?forms[formName][`value`]?forms[formName][`value`]:null:null;
    var data2Flt = []; 
    var tt2 = 0;  
    if(_v && forms[formName][`key`]){
      var dt2filter = [];      
      if(dt2filter){ 
        if(this.state.filterByDate==='by year'){
          dt2filter = data?data.groupByMonth?data.groupByMonth[year]?data.groupByMonth[year]['list']?data.groupByMonth[year]['list']:{}:{}:{}:{};
          Object.keys(dt2filter).map(mn=>{
            let month2Filt = dt2filter[mn]?dt2filter[mn]['list']?dt2filter[mn]['list']:[]:[];
            
            month2Filt.map(s=>{
              
              let _k = s[forms[formName][`key`]];         
              if(_k && _k.toString().toLowerCase().indexOf(_v.toString().toLowerCase())>=0){
                data2Flt.push(s);
                tt2 += s.import;
              }
              
            })
          })
          _list_ = data2Flt;
          totalPerMonth = tt2;
        }else{
          dt2filter = data?data.groupByMonth?data.groupByMonth[year]?data.groupByMonth[year]['list']?data.groupByMonth[year]['list'][_date2F]?data.groupByMonth[year]['list'][_date2F]['list']?data.groupByMonth[year]['list'][_date2F]['list']:[]:[]:[]:[]:[]:[];
          dt2filter.map((s,ind_)=>{
            let _k = s[forms[formName][`key`]];         
            if(_k && _k.toString().toLowerCase().indexOf(_v.toString().toLowerCase())>=0){
              data2Flt.push(s);
              tt2 += s.import;
            }
          })
        }
        _list_ = data2Flt;
        totalPerMonth = tt2;
      }else{
        _list_ = null;
      }

    }else{
      _list_ = null;
    }
  }
  setTimeout(()=>{
    _th.setState({filteredData:_list_, totalPerMonth:totalPerMonth, isLoadingData:false});
  },120)
 
}




  updRadioChange(i){
    var _th = this;
   

    if(this.state.filterByDate!==i){
      _th.setState({filterByDate:i, isLoadingData:true});
      setTimeout(()=>{
        _th.calcFiltersByValue();
      },20)
    }
   
  }


  handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
    console.log(dataUri);
  }



  PrintConfirm(i){
    const {year,month,categories} = this.props;
    const {_list, totalPerMonth, catgory2F} = this.state;
    Print2.PrintMonthResume2(_list, totalPerMonth, categories, monthsList_Short[month], year,catgory2F); 
          
  }





  render() {
    const {formObserve,gettingObserve,filterObserve, formsAll, data, year, isMobile, categories, month, graphColor} = this.props;    
    
    const {limit, _list,  isLoadingData} = this.state;   

    let _list_ = _list;
    var _date2F = (month)+(year*12);
    const forms = formsAll;     
    
  

  let formName = 'searchFilters'
  let _key2Graph = 'total';  
  let month2flt2 = year*12+month;
  let IngresosMonthTotal  = data?data.groupByMonth?data.groupByMonth[year]?data.groupByMonth[year]['list'][month2flt2]?data.groupByMonth[year]['list'][month2flt2]?data.groupByMonth[year]['list'][month2flt2]['list']:{}:{}:{}:{}:{};  

  let multiGraph ={}
     
  let _dataList = createListMonth(IngresosMonthTotal,_key2Graph, month);
  multiGraph['data']={data:_dataList,color:graphColor}

 
  let _width = 560;

  let _height = 300;



 let _margin = 30;
 let xAxle =  createXAxleListMonths(month,_width,_margin);



 let _graph = <GraphMultiLine graph={multiGraph} axleX={xAxle} margin={_margin} WidthGraph={_width} HeightGraph={_height}/>



    var key = sort_finance_List[this.state.key]


    var _icon = this.state.asc?'arrow_down_large':'arrow_up_large';
    let listCt= data?data.GroupbyMonthXCategories?data.GroupbyMonthXCategories[year]?data.GroupbyMonthXCategories[year]:{}:{}:{};




    if(this.state.editingSection==="categories" && !this.state.catgory2F){
      _list_ = null;
    }


    let totalPerMonth = 0;
    if(data && data.groupByMonth && data.groupByMonth[year] && this.state.editingSection==="metrica"){
      let fil_list = data.groupByMonth[year]['list'][_date2F];
      totalPerMonth = fil_list?fil_list['total']:0;
    }

  let filters_Keys = {
    "title":{name:"title"},
    "description":{name:"description"},
    "import":{name:"import"},
  }

  let _v = null;

 
  if(this.state.editingSection==="categories"){
    if(!this.state.catgory2F){
      _list_ = null;
    }
    let _category2filter = forms && forms[formName] && forms[formName][`category2filter`];
    if(!_category2filter){
      _list_ = null;
      //this.setState({catgory2F:null});
    }
    totalPerMonth = this.state.totalPerMonth;
  }

  if(this.state.editingSection==="filters"){
    _list_ = this.state.filteredData;
    totalPerMonth = this.state.totalPerMonth;
  }



 
    return (
        <div  className="finance__Wrapper" >
      
      {/*
          <Camera   onTakePhoto = { (dataUri) => {this.handleTakePhoto(dataUri)} }/>
      */}

          <div  className={`graph_Container  ${this.state.editingSection==="categories"?'':'isVisible'}`} style={{minHeight:this.state.editingSection==="categories"?0:20}}>
            {this.state.editingSection==="categories"?null:
            <MonthPicker updMonth={this.handleGroupDateChanges.bind(this)} 
              year={year} 
              isOnlyYear={this.state.editingSection==="filters" && this.state.filterByDate==='by year'?true:false} 
              updYear={this.updYear.bind(this)} 
              month={month}
            />}
          </div>
          <div>
              {!isLoadingData && totalPerMonth?<div  className={`_Month_Total`}>{`Total : ${totalPerMonth.toFixed(2)}`}</div>:isLoadingData?<LoadingColorSpinner stroke={'var(--color-base--hover)'} width={40} height={40}/>:<div  className={`_Month_Total`}/>}
          </div>
          <div className={`_filters_metricas_operations`}>     
            <Menu222 updFiltersTab={this.updFiltersTab.bind(this)}  editingSection={this.state.editingSection}   />
            <div className="flexSpace"/>
            <div  className={`graph_Container  ${this.state.editingSection==="metrica"?'isVisible':''}`} style={{width:this.state.editingSection==="metrica"?_width:0}}>
              {this.state.editingSection==="metrica"?
                <div>
                  {_graph}
                </div> 
              :null}
            </div>
           
            <div  className={`categories_Filter_Container  ${this.state.editingSection==="categories"?'isVisible':''}`} style={{width:this.state.editingSection==="categories"?'100%':0}}>
              {this.state.editingSection==="categories"?
                <div className={``}>
                  <div   className={`_filters_search_form_Key`}>
                    <h5>search categories</h5>
                    <InputTextHRM icon={`money`} form={formName} field={`category2filter`} placeholder={'search'} OnChange={this.handleValuecategory2filter.bind(this,`category2filter`)}  initvalue={forms[formName]?forms[formName][`category2filter`]:null}/>
                  </div>
                  <div className={`categories_Items_List`}>
                  {Object.keys(listCt).map(ctg=>{    
                    let _category2filter = forms && forms[formName] && forms[formName][`category2filter`];
                   
                    let categoryName = categories[ctg]?categories[ctg]['name']?categories[ctg]['name']:'':'';
                    let categoryTotal = listCt[ctg]?listCt[ctg]['total']?listCt[ctg]['total']:0:0;
                    if(_category2filter && _category2filter.length>1 && categoryName.toLowerCase().indexOf(_category2filter.toLowerCase())>=0){
                      return (
                        <div key={ctg} className={`categories_Items_ ${ctg===this.state.catgory2F?'_categoryActive':''}`}  onClick={this.handleCategoryChanges.bind(this,ctg,categoryTotal)}>
                          {categoryName}
                          {/*
                          <div className={`${ctg===this.state.catgory2F?'_categoryActiveTotal':''}`}>{ctg===this.state.catgory2F?`$${categoryTotal.toFixed(2)}`:null}</div>
                          */}
                        </div>
                      )
                    }else{
                      return null;
                    }
                    
                  })
                  }  
                   </div>                 
                </div> 
              :null}
            </div>
            <div  className={`_Filter_Container  ${this.state.editingSection==="filters"?'isVisible':''}`} style={{width:this.state.editingSection==="filters"?_width:0}}>
              {this.state.editingSection==="filters"?
                <div className={`_filters_wrappers_search`} >
                  <div className={`radioBtnContainer`}>
                    <RadioBoxHRM labels={['by month','by year']} updChange={this.updRadioChange.bind(this)} initvalue={this.state.filterByDate}/>
                  </div>                
                  <div  className={`_filters_search_form_Key`} >
                    <h5>Escoja el campo por el cual desea filtrar</h5>
                    <HRMDropDown icon={`bubbles`} form={formName} field={`key`} list={filters_Keys} title={'Filter By'} OnChange={this.handlerInputValue.bind(this,`key`)}  initvalue={forms[formName]?forms[formName][`key`]:'title'}/>
                  </div>
                   
                  <div   className={`_filters_search_form_Key`}>
                    <h5>Escriba algun valor para comparar</h5>
                    <InputTextHRM icon={`money`} form={formName} field={`value`} placeholder={'search'} OnChange={this.handlerInputValue.bind(this,`value`)}  initvalue={forms[formName]?forms[formName][`value`]:null}/>
                  </div>
                   
                </div> 
              :null}
            </div>
            <div className="flexSpace"/>
          </div>

          <div  className="finance__sort" >               
             {this.state.editingSection==="filters"?null:
              <div className={`__print__menu__btn__  _operations_Monthly`}  onClick={this.PrintConfirm.bind(this)}>
                <Icons name={'printer'} color={'#555'} size={18}/>
                <span>Print</span>
              </div>
              }
            <div className="flexSpace"/>
            <div className={`__add__menu__btn__ `}  onClick={this.OpenAddSlide.bind(this)}>
                <Icons name={'add'} color={'#555'} size={18}/>
                <span>Add</span>
            </div>     
          </div>
           <div className={`finance__Container  ${isMobile?'':'_desktop'}`} container-data={`${_Type}`}>
           {
             !isMobile ?
           <table className={`gridList`}> 
              <thead>
                <tr className={`header`}>
                    <th className={`date`}>
                      {'Date'}
                    </th>
                    <th className={`category`}>
                      {'Category'}
                    </th>
                    <th className={`title`}>
                      {'Title'}
                    </th>
                    <th className={`import`}>
                      {'Import'}
                    </th>
                </tr>
                <tr> 
                  <th className={`header_separator`}><div  className={`_separator`}></div></th>  
                  <th className={`header_separator`}><div  className={`_separator`}></div></th>  
                  <th className={`header_separator`}><div  className={`_separator`}></div></th>  
                  <th className={`header_separator`}><div  className={`_separator`}></div></th>  
                         
                </tr>
              </thead>

              <tbody>                
             
      
              {
              !isLoadingData && _list_ && _list_.length>0?_list_.map((s,ind_)=>{
               return(
                 <tr key={`${ind_}@$__@${s.id}`} >
                    <td className={`date`}>
                      {Util.date2pretyfy(s.date)}
                    </td>
                    <td className={`category`}>
                      {categories[s.group]?categories[s.group].name:''}
                    </td>
                    <td className={`title`} onClick={this.OpenDetailSlide.bind(this,s.id)}>
                      {s.title}
                    </td>
                    <td className={`import`}>
                      ${s.import}
                    </td>
                    <td className={`__actions--Desktop_wrapp`}>
                      <div className={'__actions--Desktop'}  onClick={this.OpenEditAction.bind(this,s.id)}>
                          <Icons name={'note'} color={'#555'} size={24} />
                        </div>
                        <div className={'__actions--Desktop'}  onClick={this.open_Delete_Dialog.bind(this,s.id)}>
                          <Icons name={'delete'} color={'#555'} size={24} />
                      </div>
                    </td>
                  </tr>
                  )
                
                })
                :null
                }

              </tbody>
            </table>:null
           }

           {
              false   && !isMobile ?
             <div className={`__Item__label`} >
                <div className={'__details--'}>                      
                      <div  className={'__date--'}> {`Date`}</div>                     
                      <div className={'__categories__'}> {'Group'}</div>
                      <div className="flexSpace"/>
                      <div  className={'__title__'}> {'Title'}</div> 
                                        
                </div>
                <div className="flexSpace"/>
                <div  className={'__money--'}> {'Amount'}</div>
                <div className="flexSpace"/>
              </div>
              :null
              }
            
            {
               false &&  !isLoadingData && _list_ && _list_.length>0?_list_.map((s,ind_)=>{
               
               if(ind_<=limit){
                  return(

                  <div className={'__Item_Finance'} key={s.id}>
                    <div className={'__details--'}>
                      <div  className={'__date--'}> {Util.date2pretyfy(s.date)}</div>                     
                      <div className={'__categories__'}> {categories[s.group]?categories[s.group].name:''}</div>
                      <div className="flexSpace"/>
                      <div  className={'__title__'}> {s.title}</div> 
                                        
                    </div>
                    <div className="flexSpace"/>
                    <div  className={'__money--'}> ${s.import}</div>
                    <div className="flexSpace"/>
                    <div className={'__actions--'}  onClick={this.open_actionsOptions.bind(this,s)}>
                      <Icons name={'more_vert'} color={'#555'} size={24} />
                    </div>
                    <div className="flexSpace"/>   
                   
                  </div>
                )
               }else{
                 return null
               }
                
              }):null
            }

            {isLoadingData?<div><LoadingColorSpinner stroke={'var(--color-base--hover)'}/></div>:<div className="noResultsWrapper">
                {_v  && !totalPerMonth ?<div className="noResults">
                
                 <p> {`La búsqueda de "${_v}" no arrojó coincidencias.`} </p>
                 <p>Sugerencias:</p>
                 <ul>
                   <li>Intenta con otras palabras claves</li>
                 {/*
                   <li>¿Buscas una película o un programa?</li>
                   <li>Intenta con el título de una película o un programa, o con un nombre del elenco o la dirección</li>
                   <li>Intenta con un género, como comedia, romance, deportes o drama</li>
                 */}
                 </ul>                   
               </div>
                :null}
             </div>
                }

          </div>
                  
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    formsAll: state.common.forms,
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
    isMobile: state.common.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Ingresos));







function joinArrayfromObject(a){
  var h = [];
  Util.ObjectKeys(a).map(m=>{

    a[m]['list'].map(g=>{
      h.push(g)
    })
  })
  return h;
}





export class MonthPicker extends Component {

  constructor(props) {
    super(props);  
    this.state = {
      active:0
    };
  }

  

  componentDidMount(){
    const {month} = this.props; 
    this.setState({active:month});
  }

 
  updYear(i){  
    if(typeof this.props.updYear === "function"){
      this.props.updYear(i)
   }
  }

  active(i){
    //const {year} = this.props; 
    
    //var m = i+year*12;
    this.setState({active:i});
    if(typeof this.props.updMonth === "function"){
      this.props.updMonth(i)
   }
  }

  render(){

    const {year,isOnlyYear,month} = this.props; 
    const monthsList_Short =[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];

    return (
      <div className="month-selector__range" data-month-selector-active-index="2">
          <div className="month-selector__range__icons">
            <div className="month-selector__range__icons__icon month-selector__range__icons__icon--2">2019</div>           
          </div>
          <div className="month-selector_">
           
            <div className={`month-selector_year left ${year===2019?'active':''}`} onClick={this.updYear.bind(this,2019)}>2019</div>
            
            <ul className="month-selector__range__list">
              {!isOnlyYear?monthsList_Short.map((mnth,in4)=>{              
                return(
                    <li key={Util.gen6CodeId()} className={`month-selector__range__list__item ${in4===month?'active':''}`} data-month-selector-trigger="" onClick={this.active.bind(this,in4)}>{mnth}</li>
                )
              }):null}
            </ul>
              }
            <div className={`month-selector_year right ${year===2020?'active':''}`} onClick={this.updYear.bind(this,2020)}>2020</div>
          </div>
        </div>
    )

  }
}











export class SortOptionIngresos extends Component {

    constructor(props) {
      super(props);  
      this.state = {
        visible :false,
        active:0,
        asc:false      
      };
    }
    componentDidMount() {  
      
    }  
    componentWillUnmount(){
      
    }
  
  
  
    changeSort(i){      
      if(typeof this.props.updChange === "function"){
         this.props.updChange(i)
      }
   }
  
  
   ref = r => {
     this.MS_Elem = r
   }
  
  
   render() {  
     const { sortList,_value,_active } = this.props; 
      
      return (
          <div className={'option--wrapper'}>
            <div className={'__header--'}>
              <h5>
                Sort by
              </h5>              
            </div>
            <div className="__body__"> 
              {sortList?sortList.map((srt,indX)=>{
                var _icon = _value?'arrow_down_large':'arrow_up_large';
                return(
                  <div className={`__sort_options--  ${_active===indX?'__active':''}`} onClick={this.changeSort.bind(this,indX)}>
                    <div  className={'__icons--'}>
                      <Icons name={_icon} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                      {srt}
                    </div>                
                  </div>
                )
              })
              :null
              }
            </div>          
          </div>
        ) 
    }
  }
  




class FilterOptionIngresos extends Component {
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

  clearFilters(){
    if(typeof this.props.clearFilter === "function"){
      this.props.clearFilter()
    }
  }

  openGroupDate(){
    if(typeof this.props.updChange === "function"){
      this.props.updChange()
    }
  }
  openCategories(){
    if(typeof this.props.openCategories === "function"){
      this.props.openCategories()
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
            <div className="flexSpace"/>  
            <div  className={'__clearBtn__'} onClick={this.clearFilters.bind(this)}>
                  {'Clear Filters'}
            </div>              
          </div>
          <div className="__body__">
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.openGroupDate.bind(this)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Group by Date'}
              </div>                
            </div> 
            <div className={`__sort_options-- __groupby`} key={Util.gen6CodeId()} onClick={this.openCategories.bind(this)}>
              <div  className={'__icons--'}>
                  <Icons name={'calendar'} color={'#1967d2'} size={18}/>
              </div>
              <div  className={'__descr__'}>
                  {'Group by Category'}
              </div>                
            </div>           
          </div> 
        </div>
      ) 
  }
}





class ActionsOptionIngresos extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      confirmDelete:false,
      editSecction:false,
      asc:true      
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
    
  }
  handleConfirmDelete(i){
    this.setState({confirmDelete:false});
    if(typeof this.props.handle_Delete === "function"){
      this.props.handle_Delete(i)
    }
  }

  handleDelete(i){
    this.setState({confirmDelete:!this.state.confirmDelete});    
    //if(typeof this.props.handle_Delete === "function"){   //this.props.handle_Delete()  }
    /*if(this.state.active!==i){
      this.setState({active:i});
      this.props.updChange(i,this.state.asc)
    }else{
      this.setState({asc:!this.state.asc});      
    }
    delete
    */
  }



  handleEdit(i){
    //var h = this.state.editSecction?2:325;
    //this.setState({editSecction:!this.state.editSecction});
    if(typeof this.props.handle_Edit === "function"){      
      this.props.handle_Edit(2)
    }

    /*if(this.state.active!==i){
      this.setState({active:i});
      this.props.updChange(i,this.state.asc)
    }else{
      this.setState({asc:!this.state.asc});      
    }
    delete
    */
  }

  handlerEmailInput(e){

  }

  goback(e){
    this.setState({editSecction:false}); 
    if(typeof this.props.handle_Edit === "function"){
      this.props.handle_Edit(325)
    }
  }

  handleSaveEdit(e){    
    if(typeof this.props._close === "function"){ 
      this.setState({editSecction:false})     
      this.props._close()
      this.props.handle_Edit(325)
    }
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    //const { sortList } = this.props;   
    const { editSecction } = this.state; 
    return (
        <div className={`option--wrapper ${editSecction?'is_forms_active':''}`}>
          <div className={'__header--'}>
            {this.state.editSecction?<div onClick={this.goback.bind(this)} className={'__back__icon'}><Icons name={'arrowBack'} color={'#1967d2'} size={18}/></div>:<h5>Filters</h5>}             
            <div className="flexSpace"/>
            <div className={'__save__btn '}>
              <div className="center--Container grayStyle" onClick={this.handleSaveEdit.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
                <div className="hoverDiv orangeFlex "/>
                <span className="text2D orangeFlex">{`Save`}</span>              
              </div> 
            </div>                        
          </div>
          <div className="__body__">
            <div className="__menu__">
              <div className={`__action_options--  `} onClick={this.handleEdit.bind(this)}>
                <div  className={'__icons--'}>
                  <Icons name={'note'} color={'#1967d2'} size={18}/>
                </div>
                <div  className={'__descr__'}>
                  {'edit'}
                </div>                
              </div>            
              <div className="flexContainerH delete"  style={{maxWidth: `360px`}}>
                <div className="flexContainerSldH" style={{transform: `translate3d(${this.state.confirmDelete?'-100%':'0'}, 0px, 0px)`}}>  
                  <div className={`__action_options--`} onClick={this.handleConfirmDelete.bind(this)}>            
                    <div className={'__icons--'}>
                      <Icons name={'delete'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {'remove'}
                    </div>
                  </div>
                  <div className={`__action_options-- confirmDelete`} >            
                    <div className={'__icons--'} onClick={this.handleDelete.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {'Are you sure you want to remove it?'}
                    </div>
                    <div className={'__icons--'} onClick={this.handleConfirmDelete.bind(this,)}>
                      <Icons name={'success'} color={'#1967d2'} size={18}/>
                    </div>
                  </div>
                </div>        
              </div>
            </div>
          </div>
        </div>
      ) 
  }
}












class OpenDeleteDialog extends Component {
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
    
  }
  componentDidMount(){     
    
  }
  sendReport(){       
   
  }




  _close(e){    
    if (typeof this.props.close === 'function') { this.props.close();}  
 }

 deleteConfirm(e){    
  if (typeof this.props.deleteConfirm === 'function') { this.props.deleteConfirm(this.props.title);}  
}

  render() {
    var _th6_ = this;
    const {item,categories} = this.props;
    var style2Print = {"--delete_color-error-light":'#fce8e6',"--delete_color-error-text":"#ea4335"};    
    return(
      <div className="__dialog__2__delete_" style={style2Print} >
        <div className="_container_" >
            <div  className="_title_dialog_" >              
             <span className="_label_"> Eliminar Ingreso </span>
              <div  className="_close_btn_"  onClick={_th6_._close.bind(_th6_)}>
                X
              </div>
            </div>
            <div className="_delete_callout">
              <div className="_delete_callout-body">
                <div className={`_delete_callout-icon `}>
                  <Icons name={'alert'} color={'var(--_delete_color-error-text)'} size={24}/> 
                </div>
                <div className="_delete_callout-message">{`Se eliminará el documento ${categories[item.group]?categories[item.group].name:''}`} </div>
              </div>
            </div>
            <div className="resume_2_detail_">
              <div className={'__detailsLeft'}>                 
                  <div  className={'__title__'}> {item.title}</div>   
                  <div  className={'__money__'}> ${item.import}</div>                                       
              </div>
              <div className="flexSpace"/>
              <div className={'__detailsRight'}>
                <div  className={'__date__'}> {Util.date2pretyfy(item.date)}</div>   
                 
              </div>          
            </div>
            <div className={'_action_container_'}>
                <div>
                  <div className={`__delete__menu__btn__ `}  onClick={this.deleteConfirm.bind(this,)}>
                    <span>Delete</span>
                  </div>
                </div>
            </div>
            
        </div>                
      </div>
    )
  }
}


function mapStateToProps_PrintDialog(state, ownProps) {
  return {
    categories:state.common.categories
  };
}

const OpenDeleteDialog2 = connect(mapStateToProps_PrintDialog)(OpenDeleteDialog);







function createListMonth(ing,_key,m){
  var gDays = {}
  const _days = m?Array.from(Array(Math.floor(_dayPerMonth[m])).keys()):[];
  _days.map((mnt,In0)=>{
    if(!gDays[mnt]){
      gDays[mnt+1] =0
    }
  })   
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


var _dayPerMonth = [31,Util.febMaxDays((new Date()).getFullYear()),31,30,31,30,31,31,30,31,30,31];



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

