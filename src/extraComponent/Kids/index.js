
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';
//import MonthGroup from '../MonthGroup';
import FormsKids from '../FormsKids';
import { withRouter} from 'react-router-dom';


import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';

import './style.css';
const _Type = `kids`;

var sort_kids_List = ['name','group'];


class Kids extends Component {


  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      asc:true,
      actionsheight:325,
      limit:90,
      id2edit:null,
      filters:{},   
      key:0,
      activeGraphtab:0,
    };
  }

  componentDidMount(){
    Util.changethemeKey('light',"--background--header--color","rgba(198, 40, 40,1)");     
    Util.changethemeKey('light',"--svg--header--color","#f9f9f9");
    //this.props.actions.getKids()  
    const {location} = this.props;
    var s = Util.parseQuery(location.search);
    if(s.tb=== _Type){ 
      this.setState({isInPath:true})
    }else{
      this.setState({isInPath:false})
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
    var _cont = <SortOptionKids sortList={sort_kids_List} updChange={this.handleOptionsSortChanges.bind(this)}/>
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
    this.close_sortOptions();
    this.setState({asc:s,key:i})
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
    var _cont = <FilterOptionKids sortList={[]} updChange={this.handleOptionsFilterChanges.bind(this)}/>
    var options = {id:_id,zIndex:150,height:250,content:_cont};
    this.props.dialogActions.OpenSlideOption(options);
  }

  close_filterOptions(){
    var formName = `filters_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseSlideOption(options);
  }



  handleOptionsFilterChanges(i){
    this.close_filterOptions();
    this.setState({filters:i})
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
    var _cont = <ActionsOptionKids handle_Delete={this.open_Delete_Dialog.bind(this)} handle_Edit={this.OpenEditAction.bind(this)} _close={this.close_actionsOptions.bind(this)} />
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
    var formName = `upd_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    this.close_actionsOptions();
    var _content = this.state.isInPath ?<div className="__form__"><FormsKids formName={formName} type={_Type} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.CloseEditAction.bind(this)}/> </div>:null;
    this.props.actions.UpdateFormbyName(formName,this.state.id2edit);
    var options = {id:_id,zIndex:300,content:_content};
    this.props.dialogActions.OpenView(options);    
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
    var formName = `add_${_Type}`;
    var _contentAdd = this.state.isInPath ?<div className="__form__"><FormsKids formName={formName} type={_Type} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.CloseAddSlide.bind(this)}/> </div>:null;
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id,zIndex:300,content:_contentAdd};
    this.props.dialogActions.OpenView(options);
  }

  CloseAddSlide(){
    var formName = `add_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id};
    this.props.dialogActions.CloseView(options);
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
    const {kids} = this.props;
    console.log(kids)
    var _id2Delete = this.state.id2edit?this.state.id2edit.id:null;     
    var item = kids[_id2Delete];
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
    if(_id && _Type===`kids`){
      this.props.actions.RmvKids({id:_id});
    }
    this.close_Delete_Dialog();    
  }
   

 


/***********
   * 
   * 
   * 
   * 
   * Details Secction
   * 
   * 
   */






  open_detailOptions(i){     
    var formName = `details_${_Type}`;
    var _contentAdd = <DetailView item={i} close={this.Close_detailOptions.bind(this)} />
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id,zIndex:300,content:_contentAdd};
    this.props.dialogActions.OpenView(options);
  }



  Close_detailOptions(){
    var formName = `details_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id};
    this.props.dialogActions.CloseView(options);
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
    const {kids,formObserve,gettingObserve,filterObserve} = this.props; 
    const lng = localStorage.getItem('lng');
    const {limit} = this.state;
    



   

   var _list = [];
    var key = sort_kids_List[this.state.key]
    var __hli = kids?Util.convertObj2Array(kids):[];
    if(__hli){
      if(this.state.asc){
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
    var _icon = this.state.asc?'arrow_down_large':'arrow_up_large';  
    var _now = (new Date()).getTime();
    var _15days = 60000*60*24*15;
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
          <div className="finance__Container" container-data={`${_Type}`}>
            {
              
              this.state.isInPath && _list && _list.length>0?_list.map((s,ind_)=>{               
               if(ind_<=limit){
                  
                  var _3CStatus = s.contract3C?s.contract3C>_now+_15days?2:s.contract3C<=_now?0:1:1;
                  var _vaccinationsStatus = s.vaccinations?s.vaccinations>_now+_15days?2:s.vaccinations<=_now?0:1:1;                  
                  return(
                  <div className={'__Item_Finance'} key={s.id}>
                    <div className={'__details--'}  onClick={this.open_detailOptions.bind(this,s)} >                      
                      <div className={'__categories__'}> {s.name}</div>
                      <div  className={'__title__'}> {s.address}</div>  
                      <div  className={'__date__'}><Icons name={'calendar'} color={'#555'} size={18}/>  <h5>{Util.date2pretyfy(s.dob)}</h5></div>                                          
                    </div>
                    <div className="flexSpace"/>
                    <div  className={'__money--'}> </div>
                    <div className="flexSpace"/>  
                    {_vaccinationsStatus<2?
                    <div className={`__actions-- ${_vaccinationsStatus?_vaccinationsStatus===2?"_success":"_info":"_problem"}`}  onClick={this.open_detailOptions.bind(this,s)}>
                      <Icons name={'security'} color={'#555'} size={24} />
                    </div>: null}
                    {_3CStatus<2?
                    <div className={`__actions-- ${_3CStatus?_3CStatus===2?"_success":"_info":"_problem"}`}  onClick={this.open_detailOptions.bind(this,s)}>
                      <Icons name={'contract'} color={'#555'} size={24} />
                    </div>: null}
                    
                    <div className={'__actions--'}  onClick={this.open_actionsOptions.bind(this,s)}>
                      <Icons name={'more_vert'} color={'#555'} size={24} />
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
    kids:state.common.kids,   
    categories: state.common.categories,
    calendar:state.common.calendar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Kids));






export class SortOptionKids extends Component {
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


  changeSort(i){
    if(this.state.active!==i){
      this.setState({active:i});
      this.props.updChange(i,this.state.asc)
    }else{
      this.setState({asc:!this.state.asc});
      if(typeof this.props.updChange === "function"){
        this.props.updChange(i,!this.state.asc)
      }
    }
    
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { sortList } = this.props;   
    
    return (
        <div className={'option--wrapper'}>
          <div className={'__header--'}>
            <h5>
              Sort by
            </h5>              
          </div>
          <div className="__body__"> 
            {sortList?sortList.map((srt,indX)=>{
              var _icon = this.state.asc?'arrow_down_large':'arrow_up_large';
              return(
                <div className={`__sort_options--  ${this.state.active===indX?'__active':''}`} onClick={this.changeSort.bind(this,indX)}>
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






class FilterOptionKids extends Component {
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


  changeSort(i){
    if(this.state.active!==i){
      this.setState({active:i});
      this.props.updChange(i,this.state.asc)
    }else{
      this.setState({asc:!this.state.asc});
      if(typeof this.props.updChange === "function"){
        this.props.updChange(i,!this.state.asc)
      }
    }
    
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { sortList } = this.props;   
    
    return (
        <div className={'option--wrapper'}>
          <div className={'__header--'}>
            <h5>
              Filters
            </h5>              
          </div>
          <div className="__body__"> 
            {sortList?sortList.map((srt,indX)=>{
              var _icon = this.state.asc?'arrow_down_large':'arrow_up_large';
              return(
                <div className={`__sort_options--  ${this.state.active===indX?'__active':''}`} key={srt} onClick={this.changeSort.bind(this,indX)}>
                  <div  className={'__icons--'}>
                  {this.state.active===indX?<Icons name={_icon} color={'#1967d2'} size={18}/>:null}
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





class ActionsOptionKids extends Component {
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
    var h = this.state.editSecction?2:325;
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
    const { sortList } = this.props;   
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
  if (typeof this.props.deleteConfirm === 'function') { this.props.deleteConfirm();}  
}

  render() {
    var _th6_ = this;
    const {item,categories} = this.props;
    var style2Print = {"--delete_color-error-light":'#fce8e6',"--delete_color-error-text":"#ea4335"};    
    console.log(item)
    return(
      <div className="__dialog__2__delete_" style={style2Print} >
        <div className="_container_" >
            <div  className="_title_dialog_" >              
             <span className="_label_"> Eliminar Kid </span>
              <div  className="_close_btn_"  onClick={_th6_._close.bind(_th6_)}>
                X
              </div>
            </div>
            <div className="_delete_callout">
              <div className="_delete_callout-body">
                <div className={`_delete_callout-icon `}>
                  <Icons name={'alert'} color={'var(--_delete_color-error-text)'} size={24}/> 
                </div>
                <div className="_delete_callout-message">{`Se eliminará el documento ${item.name}`} </div>
              </div>
            </div>
            <div className="kids_2_detail_">
              <div className={'__detailsLeft'}>           
                <div  className={'__money__'}> {item.parentName}</div>        
                <div  className={'__title__'}> {item.address}</div>   
                                                       
              </div>
              <div className="flexSpace"/>
              <div className={'__detailsRight'}>
                <div  className={'__date__'}> {Util.date2pretyfy(item.dob)}</div>   
                 
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






class DetailView extends Component {
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



  render() {
    var _th6_ = this;
    const {item} = this.props;
    var style2Print = {"--printcolor-error-light":'#e8f0fe',"--printcolor-error-text":"#4285f4"}
    // let yellowStyle  = {"--printcolor-error-light":'#fef7e0',"--printcolor-error-text":"#fbbc04"};    
    // let redStyle = style2Print = {"--printcolor-error-light":'#fce8e6',"--printcolor-error-text":"#ea4335"}
   
    var _now = (new Date()).getTime();
    var _15days = 60000*60*24*15;
    var _3CStatus = item.contract3C?item.contract3C>_now+_15days?2:item.contract3C<=_now?0:1:1;
    var _vaccinationsStatus = item.vaccinations?item.vaccinations>_now+_15days?2:item.vaccinations<=_now?0:1:1;
    
    return(
      <div className="__dialog__2__print_ detailsView" style={style2Print} >
        <div className="_container_" >
            <div  className="_title_dialog_" >              
             <span className="_label_">Kid Detail For</span>
              <div  className="_close_btn_"  onClick={_th6_._close.bind(_th6_)}>
                X
              </div>
            </div>
            <div className="printcallout">
              <div className="printcallout-body">
                <div className={`printcallout-icon error`}>
                  <Icons name={'alert'} color={'var(--printcolor-error-text)'} size={24}/> 
                </div>
                <div className="printcallout-message ">{`${item.name}`}</div>
              </div>
            </div>            
            <div className="_label__category__">
              {'Date of birth'}
            </div>
            <div className="kids_2_detail_">
              <div className={'__detailsRight'}>
                <div  className={'__date__'}> {Util.date2pretyfy(item.dob)}</div>                 
              </div> 
              <div className="flexSpace"/>              
            </div>
            <div className="_label__category__">
              {'Address'}
            </div>
            <div className="kids_2_detail_">
              <div className={'__detailsLeft'}>
                <div  className={'__date__'}> {item.address}</div>                 
              </div> 
              <div className="flexSpace"/>              
            </div>
            <div className="_label__category__">
              {'Parent Name'}
            </div>
            <div className="kids_2_detail_">
              <div className={'__detailsLeft'}>
                <div  className={'__date__'}> {item.parentName}</div>                 
              </div> 
              <div className="flexSpace"/>              
            </div>
            <div className="_label__category__">
              {'Email'}
            </div>
            <div className="kids_2_detail_">
              <div className={'__detailsLeft'}>
                <div  className={'__date__'}> {item.email}</div>                 
              </div> 
              <div className="flexSpace"/>              
            </div>
            <div className="_label__category__">
              {'PhoneNumber'}
            </div>
            <div className="kids_2_detail_">
              <div className={'__detailsLeft'}>
                <div  className={'__date__'}> {item.cellphone}</div>                 
              </div> 
              <div className="flexSpace"/>              
            </div>
            <div className={`printcallout ${_vaccinationsStatus?_vaccinationsStatus===2?"_success":"_info":"_problem"}`}>
              <div className="printcallout-body">
                <div className={`printcallout-icon error`}>
                  <Icons name={_vaccinationsStatus?_vaccinationsStatus===2?"success":"info":"problem"} color={'var(--printcolor-error-text)'} size={24}/> 
                </div>
                <div className="printcallout-message ">{`vaccinations : ${Util.date2pretyfy(item.vaccinations)}`}</div>
              </div>
            </div>
            <div className={`printcallout ${_3CStatus?_3CStatus===2?"_success":"_info":"_problem"}`}>
              <div className="printcallout-body">
                <div className={`printcallout-icon error`}>
                  <Icons name={_3CStatus?_3CStatus===2?"success":"info":"problem"} color={'var(--printcolor-error-text)'} size={24}/> 
                </div>
                <div className="printcallout-message ">{`4C contract :  ${Util.date2pretyfy(item.contract3C)}`}</div>
              </div>
            </div>
            <div className={'_action_container_'}>
                <div>{_3CStatus+_vaccinationsStatus<4? 
                    Util.emailValidate(item.email)?
                  <div className={`__print__all__btn__ `}  >
                    <Icons name={'email'} color={'#555'} size={18}/>
                    <span>Send Notification to Parent's</span>
                  </div>:
                  <div className={`printcallout ${"_problem"}`}>
                    <div className="printcallout-body">
                      <div className={`printcallout-icon error`}>
                        <Icons name={"problem"} size={24}/> 
                      </div>
                      <div className="printcallout-message ">{`you can't send a notification to parents becouse the email is not valid`}</div>
                    </div>
                  </div>
                  :null }
                </div>
            </div>
            
        </div>                
      </div>
    )
  }
}



