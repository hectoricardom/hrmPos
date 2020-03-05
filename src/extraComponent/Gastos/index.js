
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';
import { withRouter} from 'react-router-dom';
import FormsFinances from '../FormsFinances';
import FilterGroupDate from '../FilterGroupDate';
import FilterGroupCategories from '../FilterGroupCategories';

import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';

import './style.css';
const _Type = `gastos`;

var sort_finance_List = ['date','title','group'];


class Gastos extends Component {


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
      key:0
    };
  }

  componentDidMount(){

    Util.changethemeKey('light',"--background--header--color","rgba(198, 40, 40,1)");     
    Util.changethemeKey('light',"--svg--header--color","#f9f9f9");    
    const {location} = this.props;
    var s = Util.parseQuery(location.search);
    if(s.tb=== _Type){ 
      this.setState({isInPath:true})
    }else{
      this.setState({isInPath:false})
    }
    this.calcFilterandSort(this.props.gastos,this.state.filters,this.state.date2F,this.state.catgory2F,this.state.key,this.state.asc);
  }

  componentWillReceiveProps(nextProps){
    var _initvalue = this.props.gettingObserve?this.props.gettingObserve:null;
    var next_initvalue = nextProps.gettingObserve?nextProps.gettingObserve:null;
    if(_initvalue!==next_initvalue){
      this.calcFilterandSort(this.props.gastos,this.state.filters,this.state.date2F,this.state.catgory2F,this.state.key,this.state.asc);
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
    var _cont = <SortOptionGastos sortList={sort_finance_List} _value={asc}  _active={key} updChange={this.handleOptionsSortChanges.bind(this)}/>
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
    this.setState({asc:!this.state.asc,key:i})
    this.close_sortOptions();
    this.calcFilterandSort(this.props.gastos,this.state.filters,this.state.date2F,this.state.catgory2F,i,!this.state.asc);
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
    var _cont = <FilterOptionGastos sortList={[]} updChange={this.handleOptionsFilterChanges.bind(this)} openCategories={this.handleOptionsFilterCategoriesChanges.bind(this)} clearFilter={this.handleclearFilter.bind(this)}  />
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
    this.calcFilterandSort(this.props.gastos,false,null,null,this.state.key,this.state.asc);    
  }





  handleOptionsFilterChanges(){
    this.close_filterOptions();
    const {gastos} = this.props;
    var formName = `groupDate_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterGroupDate updChange={this.handleGroupDateChanges.bind(this)} list={gastos.groupByMonth} active={this.state.date2F} closeView={this.close_GroupDate.bind(this)}/>
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
    this.setState({filter:true,date2F:i})
    this.close_GroupDate();
    this.calcFilterandSort(this.props.gastos,true,i,this.state.catgory2F,this.state.key,this.state.asc);
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




    
  handleOptionsFilterCategoriesChanges(){
    this.close_filterOptions();
    const {gastos,calendar} = this.props;
    var formName = `groupCategory_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <FilterGroupCategories updChange={this.handleGroupCategoryChanges.bind(this)} list={gastos.GroupbyMonthXCategories[calendar.year]} active={this.state.date2F} closeView={this.close_GroupCategory.bind(this)} clearFilter={this.handleclearFilter.bind(this)}  />
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
    this.setState({filter:true,catgory2F:i})
    this.close_GroupCategory();
    this.calcFilterandSort(this.props.gastos,true,this.state.date2F,i,this.state.key,this.state.asc);
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
    var _cont = <ActionsOptionGastos handle_Delete={this.open_Delete_Dialog.bind(this)} handle_Edit={this.OpenEditAction.bind(this)} _close={this.close_actionsOptions.bind(this)} />
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
    console.log(i)
    var formName = `upd_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    this.close_actionsOptions();
    var _content = this.state.isInPath ?<div className="__form__"><FormsFinances formName={formName} type={_Type} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.CloseEditAction.bind(this)}/> </div>:null;
    this.props.actions.UpdateFormbyName(formName,i);
    var options = {id:_id,zIndex:300,content:_content};
    this.props.dialogActions.OpenView(options);  
    this.close_actionsOptions();  
  }


  CloseEditAction(){
    var formName = `upd_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id};
    this.props.dialogActions.CloseView(options);
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
    const {isMobile} = this.props;
    var formName = `add_${_Type}`;
    var _contentAdd = this.state.isInPath ?<div className="__form__"><FormsFinances formName={formName} type={_Type} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.CloseAddSlide.bind(this)}/> </div>:null;
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id,zIndex:300,content:_contentAdd};
    if(isMobile){
      this.props.dialogActions.OpenView(options);
    }else{
      this.props.dialogActions.OpenDialog(options);
    }
    
    
  }

  CloseAddSlide(){
    const {isMobile} = this.props;
    var formName = `add_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id};
    if(isMobile){
      this.props.dialogActions.CloseView(options);
    }else{
      this.props.dialogActions.CloseDialog(options);
    }
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


  
  open_Delete_Dialog(){   
   
    this.close_actionsOptions();
    const {gastosObj} = this.props;
    var _id2Delete = this.state.id2edit?this.state.id2edit.id:null;     
    var item = gastosObj[_id2Delete];
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


  DeleteConfirm(){
    var _id = this.state.id2edit?this.state.id2edit.id:null;  
    if(_id && _Type===`gastos`){
      this.props.actions.RmvGastos({id:_id});
    }
    this.close_Delete_Dialog();    
  }
   






calcFilterandSort(data, filter, date2F, catgory2F,_key,_asc){
  const {calendar} = this.props;
  var _date2F = date2F;
  var _catgory2F = catgory2F;
  var _filter_ = filter;
  
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


  var _list = [];
  var key = sort_finance_List[_key]
  var __hli = data?data._root_:[];
  if(filter){  
    if(_date2F){
      let yy =  Math.floor(_date2F/12);
      let fil_list = data.groupByMonth[yy]['list'][_date2F];
      __hli = fil_list?fil_list['list']:[];
    }
    if(_catgory2F){
      let  fil_list = data.GroupbyMonthXCategories?data.GroupbyMonthXCategories[calendar.year]?data.GroupbyMonthXCategories[calendar.year][_catgory2F]?data.GroupbyMonthXCategories[calendar.year][_catgory2F]['list']:{}:{}:{};
      __hli = joinArrayfromObject(fil_list);
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
  this.setState({_list:_list});
}






/***********
   * 
   * 
   * 
   * 
   * Render Secction
   * 
   * 
   */










  render() {
    const {formObserve,gettingObserve,filterObserve,calendar ,isMobile, categories} = this.props;   
   
    
/*
    const forms = formsAll[`FilterGastos`]; 
    const {Resume_Year} = calendar;
    var colorTheme = `198, 40, 40`; 
    const lng = localStorage.getItem('lng');
    var tt = 0;   
    var gbyMonth = {};

    */
    const {limit,_list,isInPath} = this.state;  
    var key = sort_finance_List[this.state.key]
    // var  = window.location.hash.split('/').pop()===_Type?true:false;   
    var _icon = this.state.asc?'arrow_down_large':'arrow_up_large';
   
    return (
        <div  className="finance__Wrapper" >
          <div  className="finance__sort" > 
            <div className={`_sort__Wrapper`}  onClick={this.open_sortOptions.bind(this)}>
              <div className={"__value_sort"}><span>{key}</span></div>
              <div className={`__icon_sort`}>
                <Icons name={_icon} color={'#555'} size={18}/>
              </div>
            </div>   
            <div className="flexSpace"/>
            <div className={`__add__menu__btn__ `}  onClick={this.OpenAddSlide.bind(this)}>
                <Icons name={'add'} color={'#555'} size={18}/>
                <span>Add</span>
            </div>
            <div className={`_filter__Wrapper`}  onClick={this.open_filterOptions.bind(this)}>
              <div className={`__icon_filter`}>
                <Icons name={'filter'} color={'#555'} size={24}/>
              </div>
            </div>      
          </div>
          <div className={`finance__Container  ${isMobile?'':'_desktop'}`} container-data={`${_Type}`}>
          {
              isInPath  && !isMobile ?
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

                  :null}
            {
              isInPath && _list && _list.length>0?_list.map((s,ind_)=>{
               
               if(ind_<=limit){
                  return(
                  <div className={`__Item_Finance`} key={s.id}>
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
                    <div className={'__actions--Desktop_wrapp'}>
                      <div className={'__actions--Desktop'}  onClick={this.OpenEditAction.bind(this,s)}>
                        <Icons name={'note'} color={'#555'} size={24} />
                      </div>
                      <div className={'__actions--Desktop'}  onClick={this.open_Delete_Dialog.bind(this,s.id)}>
                        <Icons name={'delete'} color={'#555'} size={24} />
                      </div>
                    </div>
                  </div>
                )
               }else{
                 return null
               }
                
              }):null
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
    gastos:state.common.filters["gastos"],
    gastosObj:state.common["gastos"],
    groups: state.common.filters["groups"],
    categories: state.common.categories,
    calendar:state.common.calendar,
    isMobile: state.common.isMobile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Gastos));






function joinArrayfromObject(a){
  var h = [];
  Util.ObjectKeys(a).map(m=>{

    a[m]['list'].map(g=>{
      h.push(g)
    })
  })
  return h;
}



export class SortOptionGastos extends Component {
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






class FilterOptionGastos extends Component {
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





class ActionsOptionGastos extends Component {
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
                    <div className={'__icons--'} onClick={this.handleConfirmDelete.bind(this)}>
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
  if (typeof this.props.deleteConfirm === 'function') { this.props.deleteConfirm();}  
}

  render() {
    var _th6_ = this;
    const {item,categories} = this.props;
    var style2Print = {"--delete_color-error-light":'#fce8e6',"--delete_color-error-text":"#ea4335"};    
    return(
      <div className="__dialog__2__delete_" style={style2Print} >
        <div className="_container_" >
            <div  className="_title_dialog_" >              
             <span className="_label_"> Eliminar Gasto </span>
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
                  <div className={`__delete__menu__btn__ `}  onClick={this.deleteConfirm.bind(this)}>
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






