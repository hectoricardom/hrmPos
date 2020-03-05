
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';

import KidsListFloat from '../KidsFloat';
import InputDateHRM from '../InputDate';

import './style.css';

import Icons from '../Icons/Icons';
import SlideOption from '../SlideOption';
import * as Util from '../../state/Util';
import * as Print2 from '../../state/printDoc';



const jsPDF = window.jsPDF;
const _Type = `attendances`;

var sort_finance_List = ['name','group'];


class Attendances extends Component {


  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      asc:true,
      actionsheight:325,
      limit:50,
      date2Prknt:null,
      id2edit:null,
      filters:{},   
      key:0
    };
  }

  componentDidMount(){
    Util.changethemeKey('light',"--background--header--color","rgba(198, 40, 40,1)");     
    Util.changethemeKey('light',"--svg--header--color","#f9f9f9");
    //this.props.actions.getAttendances()  
    const {location} = this.props;
    var s = Util.parseQuery(location.search);
    if(s.tb=== _Type){ 
      this.setState({isInPath:true})
    }else{
      this.setState({isInPath:false})
    }
  }


  sortOptions(){
    this._refSort.Open('attendances_Slide29sort0832189sa77fds');
  }

  filterOptions(){
    this._refFilter.Open('attendances_Slide29filter0832hdds');
  }






  /***********
   * 
   * 
   * 
   * 
   * handle Action Oprtions
   * 
   * 
   */


  actionsOptions(i){
    var formName = 'options_attendances';    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var _cont = <ActionsOptionAttendances 
    handle_Delete={this.open_Delete_Dialog.bind(this)} 
    handle_Edit={this.handleEditActionChanges.bind(this)}
    _close={this.closeActionsOptions.bind(this)} 
    handleAddKid={this.handleAddKid_Dialog.bind(this)} 
    handleRemoveKid={this.handleRemoveKid_Dialog.bind(this)}
    confirmPrint={this.open_Delete_Dialog.bind(this)}
    />
    var options = {id:_id,zIndex:150,height:365,content:_cont};
    this.props.dialogActions.OpenSlideOption(options);    
    //this._refActions.Open('attendances_Slide297634action74');
    this.setState({id2edit:i});
  }

  closeActionsOptions(){
    var formName = 'options_attendances';    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseSlideOption(options);  
  }



  handleOptionsActionChanges(){
    var _id = this.state.id2edit?this.state.id2edit.id:null;      
    if(_id && _Type===`attendances`){
      //this.props.actions.RmvAttendances({id:_id});
    }
    this.closeActionsOptions();    
  }



  handleEditActionChanges(i){
    var formName = 'updattendances';    
    this.closeActionsOptions();
    this.props.actions.UpdateFormbyName(formName,this.state.id2edit);
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id,zIndex:300,content:this._content};
    this.props.dialogActions.OpenView(options);    
  }

  /***********
   * 
   * 
   * handle Add or Remove Kid
   * 
   * 
   * 
   * 
   */


 
  handleAddKid_Dialog(i){
    const {attendances,kids} = this.props;
    var attendancesArray = Util.convertObj2Array(attendances);
    var attendancebyGroup = Util.convertArray2ObjGroupby(attendancesArray,'group');
    var _cont = <KidsListFloat add={true} kidsObject={kids} attendancebyGroup={attendancebyGroup} _id={this.state.id2edit} _close={this.closeKid_Dialog.bind(this)}/>;
    var formName = 'AddattendancesKid';
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id,zIndex:300,content:_cont};
    this.props.dialogActions.OpenView(options);
    this.closeActionsOptions(); 
  }



  handleRemoveKid_Dialog(i){
    const {attendances,kids} = this.props;
    var attendancesArray = Util.convertObj2Array(attendances);
    var attendancebyGroup = Util.convertArray2ObjGroupby(attendancesArray,'group');
    var _cont = <KidsListFloat add={false} kidsObject={kids} attendancebyGroup={attendancebyGroup} _id={this.state.id2edit} _close={this.closeKid_Dialog.bind(this)}/>;
    var formName = 'RmvattendancesKid';
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id,zIndex:300,content:_cont};
    this.props.dialogActions.OpenView(options);
    this.closeActionsOptions();     
  }




  closeKid_Dialog(i){
    var _id = Util.Base64.encode(`_${i}_`);
    var options = {id:_id};
    this.props.dialogActions.CloseView(options);     
  }





  /***********
   * 
   * 
   * 
   *  handle Add new Attendance
   * 
   * 
   * 
   */




  OpenAddSlide(){
    var formName = 'addattendances';    
    var _id = Util.Base64.encode(`03-68_${formName}4thg3n_${_Type}_mobile_87jgs_0428364`); 
    var options = {id:_id,zIndex:300,content:this._contentAdd};
    this.props.dialogActions.OpenView(options);
  }

  _dialogAddClose(){
    var formName = 'addattendances';    
    var _id = Util.Base64.encode(`03-68_${formName}4thg3n_${_Type}_mobile_87jgs_0428364`); 
    var options = {id:_id};
    this.props.dialogActions.CloseView(options);
  }
  



  
  /***********
   * 
   * 
   * 
   *  handle Add new Attendance
   * 
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


  _dialogClose(){
    var formName = 'updattendances';
    var _id = Util.Base64.encode(`03-68_${formName}4thg3n_${_Type}__87jgs_0428364`);
    var options = {id:_id};
    this.props.dialogActions.CloseView(options); 
    //this._refDialog.Close();
   }






  
  


  handlerInputValue(f,v){
    this.setState({date2Prknt:v});
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
    this.closeActionsOptions(); 
    const {categories} = this.props;
    var _id2Delete = this.state.id2edit?this.state.id2edit:null;
    var item = categories[_id2Delete];
    var _titl = item.name;
    var formName = `_delete_dialog_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`);
    var _cont = <OpenPrintDialog2 close={this.close_Print_Dialog.bind(this)} title={_titl}  printConfirm={this.printConfirm.bind(this)}/>
    var options = {id:_id,zIndex:150,height:'50vh',content:_cont};
    this.props.dialogActions.OpenDialog(options);

  }


  close_Print_Dialog(){
    var formName = `_delete_dialog_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseDialog(options);
    this.props.actions.UpdKeyValue({key:'printError',value:false});
  }



  printConfirm(){
   
    const {attendances,kids,categories,thumbnailJsonBlob} = this.props;
    const {id2edit,date2Prknt} = this.state;
    var attendancesArray = Util.convertObj2Array(attendances);
    var attendancebyGroup = Util.convertArray2ObjGroupby(attendancesArray,'group');
    let list = Util.convertObj2Array(attendancebyGroup[id2edit]);
    let title = categories[id2edit]?categories[id2edit].name:'';
    let _kids = []
    list.map(k=>{
      kids[k.kid] && kids[k.kid]['id'] && _kids.push(kids[k.kid]);
    })
    if(_kids.length>0){
      var imgb64 = thumbnailJsonBlob && thumbnailJsonBlob['imgSpirit.png']?thumbnailJsonBlob['imgSpirit.png']:{};
      Print2.handlePdfAttendanceById(_kids,title,date2Prknt,imgb64);
      this.close_Print_Dialog();
    }else{
      this.props.actions.UpdKeyValue({key:'printError',value:true});
    }
  }



  handlerConfirmPrintAll(){
    var formName = `_printAll_dialog_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`);
    //var _cont = <OpenDeleteDialog2 close={this.close_Delete_Dialog.bind(this)} item={item} title={_id2Delete}  deleteConfirm={this.DeleteConfirm.bind(this)}/>
    var _cont = <OpenPrintDialogAll2 close={this.close_PrintAll_Dialog.bind(this)} printConfirm={this.printConfirmAll.bind(this)}/>
    var options = {id:_id,zIndex:150,height:'50vh',content:_cont};
    this.props.dialogActions.OpenDialog(options);

  }


  close_PrintAll_Dialog(){
    var formName = `_printAll_dialog_${_Type}`;    
    var _id = Util.Base64.encode(`_${formName}_`); 
    var options = {id:_id};
    this.props.dialogActions.CloseDialog(options);
    this.props.actions.UpdKeyValue({key:'printError',value:false});
    //this.props.actions.UpdKeyValue({key:'printloading',value:false});
  }



  printConfirmAll(){
    this.close_PrintAll_Dialog(); 
    //this.props.actions.UpdKeyValue({key:'printloading',value:true});
    const {attendances, kids, categories, thumbnailJsonBlob} = this.props;
    const {date2Prknt} = this.state;
    var attendancesArray = Util.convertObj2Array(attendances);
    var attendancebyGroup = Util.convertArray2ObjGroupby(attendancesArray,'group');
    var imgb64 = thumbnailJsonBlob && thumbnailJsonBlob['imgSpirit.png']?thumbnailJsonBlob['imgSpirit.png']:{};    
    Print2.handlePdfAttendanceAll(attendancebyGroup,kids,categories,date2Prknt,imgb64);  
    
  }



  DeleteConfirm(){
    var _id = this.state.id2edit?this.state.id2edit.id:null;  
    if(_id && _Type===`attendances`){
      //this.props.actions.RmvAttendances({id:_id});
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
    var _tlt = i.name
    const {attendances,kids} = this.props;
    var attendancesArray = Util.convertObj2Array(attendances);
    var attendancebyGroup = Util.convertArray2ObjGroupby(attendancesArray,'group');
    var att = attendancebyGroup[i.id];
    var _content = <DetailView item={i} title={_tlt} close={this.Close_detailOptions.bind(this)} _id={i.id} kids={kids} attendancebyGroup={att} rmvConfirm={this.handleRmvKid.bind(this)} />
    var _id = Util.Base64.encode(`_${formName}_`);     
    var options = {id:_id,zIndex:300,content:_content};
    this.props.dialogActions.OpenView(options);
  }



  Close_detailOptions(){
    var formName = `details_${_Type}`;
    var _id = Util.Base64.encode(`_${formName}_`);
    var options = {id:_id};
    this.props.dialogActions.CloseView(options);
  }


 
  handleRmvKid(e){
    var aG = {id:e}
    this.props.actions.RmvAttendance(aG); 
    this.Close_detailOptions();  
  };


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
    const {formsAll,formObserve,filterObserve,categories} = this.props;
    const lng = localStorage.getItem('lng');    
    const {limit} = this.state;    
    var list  = [];
    Util.ObjectKeys(categories).map(ct=>{
      if(categories[ct]['type']=== `attendance`){
        list.push(categories[ct])
      }
    })
    var labelField = formsAll['attendance']?formsAll['attendance'][`date`]:'wg4v';
    
    return (
        <div  className="finance__Wrapper" >
          <div  className="finance__sort" > 
            <div className={`_sort__Wrapper`} >
              <div className="center--Container dateWFormated">    
                <Icons name={'calendar'} color={'#555'} size={18}/>                            
                <span>{Util.weekdate2pretyfy(labelField)}</span>
              </div>
              
            </div>   
            <div className="flexSpace"/>
            <InputDateHRM icon={'date'} form={'attendance'} field={`date`} placeholder={'Date to print'} date={true} dateChange={this.handlerInputValue.bind(this,`date`)} button_float={true}/> 
            <div className={`_filter__Wrapper printer`}   onClick={this.handlerConfirmPrintAll.bind(this)}>
              <div className={`__icon_filter`}>
              <Icons name={'printer'} color={'#555'} size={18}/>      
              </div>
            </div>      
          </div>
          <div className="finance__Container" container-data={`${_Type}`}>
            {
              this.state.isInPath && list.map((s,ind_)=>{
               if(ind_<=limit){
                  
                 return(                  
                  <div className={'__Item_Finance'}  key={s.id} >                    
                    <div className={'__details--'}  onClick={this.open_detailOptions.bind(this,s)}>                      
                      <div className={'__categories__'}> {s.name}</div>
                                        
                   
                      <div className="flexSpace"/>
                      <div  className={'__money--'}></div>
                    </div>
                    <div className="flexSpace"/>
                    <div className={'__actions--'}  onClick={this.actionsOptions.bind(this,s.id)}>
                      <Icons name={'more_vert'} color={'#555'} size={24} />
                    </div>
                  </div>
                )
               }else{
                 return null
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
    formsAll: state.common.forms,
    formObserve: state.common.formObserve,
    filterObserve: state.common.filterObserve,
    attendances:state.common.attendances,
    kids: state.common.kids,
    thumbnailJsonBlob: state.common.thumbnailJsonBlob,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Attendances));







export class SortOptionAttendances extends Component {
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









class FilterOptionAttendances extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      confirmprint:false,
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









class ActionsOptionAttendances extends Component {
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


  handleAddKid(i){
    if(typeof this.props.handleAddKid === "function"){      
      this.props.handleAddKid()
    }
  }
 
  handleRemoveKid(i){
    if(typeof this.props.handleRemoveKid === "function"){      
      this.props.handleRemoveKid()
    }
  }

  handlePrint(i){
    this.setState({confirmprint:!this.state.confirmprint});
  }

  handleConfirmPrint(i){
    this.setState({confirmprint:false});
    if(typeof this.props.confirmPrint === "function"){
      this.props.confirmPrint();
    }
    if(typeof this.props._close === "function"){
      this.props._close();
    }
  }

  handleDelete(i){
    this.setState({confirmDelete:!this.state.confirmDelete});   
  }

  handleConfirmDelete(i){
    this.setState({confirmDelete:false});
    if(typeof this.props.handle_Delete === "function"){
      this.props.handle_Delete()
    }
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
            {this.state.editSecction?<div onClick={this.goback.bind(this)} className={'__back__icon'}><Icons name={'arrowBack'} color={'#1967d2'} size={18}/></div>:<h5>Options</h5>}             
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
              <div className="flexContainerH delete"  style={{maxWidth: `360px`}}>
                <div className="flexContainerSldH" style={{transform: `translate3d(${this.state.confirmprint?'-100%':'0'}, 0px, 0px)`}}>  
                  <div className={`__action_options--`} onClick={this.handleConfirmDelete.bind(this)}>            
                    <div className={'__icons--'}>
                      <Icons name={'printer'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {'print shift'}
                    </div>
                  </div>
                  <div className={`__action_options-- handlePrint`} >            
                    <div className={'__icons--'} onClick={this.handlePrint.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {'Are you sure you want to print it?'}
                    </div>
                    <div className={'__icons--'} onClick={this.handleConfirmPrint.bind(this)}>
                      <Icons name={'success'} color={'#1967d2'} size={18}/>
                    </div>
                  </div>
                </div>        
              </div>                   
              {/*<div className="flexContainerH delete"  style={{maxWidth: `360px`}}>
                <div className="flexContainerSldH" style={{transform: `translate3d(${this.state.confirmDelete?'-100%':'0'}, 0px, 0px)`}}>  
                  <div className={`__action_options--`} onClick={this.handleConfirmDelete.bind(this)}>            
                    <div className={'__icons--'}>
                      <Icons name={'delete'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {'remove shift'}
                    </div>
                  </div>
                  <div className={`__action_options-- confirmDelete`} >            
                    <div className={'__icons--'} onClick={this.handleDelete.bind(this)}>
                      <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                    </div>
                    <div  className={'__descr__'}>
                        {'Are you sure you want to remove it?'}
                    </div>
                    <div className={'__icons--'} onClick={this.handleConfirmDelete.bind(this)}>
                      <Icons name={'success'} color={'#1967d2'} size={18}/>
                    </div>
                  </div>
                </div>        
              </div>*/}
              <div className={`__action_options--  `} onClick={this.handleAddKid.bind(this)}>
                <div  className={'__icons--'}>
                  <Icons name={'addKid'} color={'#1967d2'} size={18}/>
                </div>
                <div  className={'__descr__'}>
                  {'Add Kid to this Shift'}
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
                <div className="_delete_callout-message">{`Se eliminará el documento ${'item'}`} </div>
              </div>
            </div>
            <div className="resume_2_detail_">
              <div className={'__detailsLeft'}>           
              {/*
               <div  className={'__money__'}> {item}</div>        
                <div  className={'__title__'}> {item}</div>   
                 */}                                        
              </div>
              <div className="flexSpace"/>
              <div className={'__detailsRight'}>
                {/*
                <div  className={'__date__'}> {Util.date2pretyfy(item.dob)}</div>   
              */}  
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


function mapStateToProps_errDialog(state, ownProps) {
  return {
    categories:state.common.categories
  };
}

const OpenDeleteDialog2 = connect(mapStateToProps_errDialog)(OpenDeleteDialog);










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














class OpenPrintDialogAll extends Component {
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
    const {title,printloading} = this.props;
    var style2Print = {"--printcolor-error-light":'#fbe9e7',"--printcolor-error-text":"#ff5722"}
    // let yellowStyle  = {"--printcolor-error-light":'#fef7e0',"--printcolor-error-text":"#fbbc04"};    
    // let redStyle = style2Print = {"--printcolor-error-light":'#fce8e6',"--printcolor-error-text":"#ea4335"}
    
    return(
      <div className="__dialog__2__print_" style={style2Print} >
        <div className="_container_" >
            <div  className="_title_dialog_" >              
             <span className="_label_">Print All</span>
              <div  className="_close_btn_"  onClick={_th6_._close.bind(_th6_)}>
                X
              </div>
            </div>
            <div className="printcallout">
              <div className="printcallout-body">
                <div className={`printcallout-icon`}>
                  <Icons name={'alert'} color={'var(--printcolor-error-text)'} size={24}/> 
                </div>
                <div className="printcallout-message">{printloading?'Loading':`Desea Imprimir todos los documentos de asistencia ?`} </div>
              </div>
            </div>
            <div className="resume_2_print">
              {'Print All Documents'}
            </div>
            <div className={'_action_container_'}>
                <div>{printloading?null:
                  <div className={`__print__all__btn__ `}  onClick={this.printDocument.bind(this)}>
                    <Icons name={'printer'} color={'#555'} size={18}/>
                    <span>Print All</span>
                  </div>} 
                </div>
            </div>
            
        </div>                
      </div>
    )
  }
}


function mapStateToProps_PrintAllDialog(state, ownProps) {
  return {
    printloading: state.common.printloading
  };
}

const OpenPrintDialogAll2 = connect(mapStateToProps_PrintAllDialog)(OpenPrintDialogAll);














class DetailView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active:false,
      _Id:null
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


 _2Remove(i){ 
  if(this.state._Id!==i){
    this.setState({_Id:i});   
  }else{
    this.setState({_Id:null});   
  }
}

rmvConfirm(i){  
 if (typeof this.props.rmvConfirm === 'function') { this.props.rmvConfirm(i);}
}



  render() {
    var _th6_ = this;
    const {item, title, _id, attendancebyGroup, kids} = this.props;
    var style2Print = {"--printcolor-error-light":'#e6f4ea',"--printcolor-error-text":"#34a853"}
    // let blueStyle = {"--printcolor-error-light":'#e8f0fe',"--printcolor-error-text":"#4285f4"}
    // let yellowStyle  = {"--printcolor-error-light":'#fef7e0',"--printcolor-error-text":"#fbbc04"};    
    // let redStyle =  {"--printcolor-error-light":'#fce8e6',"--printcolor-error-text":"#ea4335"}
   
    var _now = (new Date()).getTime();
    var _15days = 60000*60*24*15;
    var _3CStatus = item.contract3C?item.contract3C>_now+_15days?2:item.contract3C<=_now?0:1:1;
    var _vaccinationsStatus = item.vaccinations?item.vaccinations>_now+_15days?2:item.vaccinations<=_now?0:1:1;
    return(
      <div className="__dialog__2__print_ detailsView _kids_list_title_" style={style2Print} >
        <div className="_container_" >
            <div  className="_title_dialog_" >              
             <span className="_label_">Kids In</span>
              <div  className="_close_btn_"  onClick={_th6_._close.bind(_th6_)}>
                X
              </div>
            </div>
            <div className="printcallout">
              <div className="printcallout-body">
                <div className={`printcallout-icon error`}>
                  <Icons name={'alert'} color={'var(--printcolor-error-text)'} size={24}/> 
                </div>
                <div className="printcallout-message ">{`${title}`}</div>
              </div>
            </div>     


            <div className="_label__category__">
              {'Kids'}
            </div>

            {attendancebyGroup && attendancebyGroup.map((kOg)=>{
              var _kidName = kids[kOg.kid]?kids[kOg.kid].name:'';              
              if(_kidName){
                return(
                  <div className={`kids_2_detail_  ${this.state._Id===kOg.id?'_active2Rmv':''}`} key={kOg.kid}>
                    <div className={'__detailsRight'}  onClick={_th6_._2Remove.bind(_th6_,kOg.id)}>
                      <div  className={'__date__'}> {_kidName}</div>                 
                    </div> 
                    <div className="flexSpace"/>   
                    <div className={`_icon_error`}  onClick={_th6_.rmvConfirm.bind(_th6_,kOg.id)}>
                      <Icons name={'delete'} color={'var(--printcolor-error-text)'} size={24}/> 
                    </div>           
                  </div>
                )
              }else{
                return null;
              }
              
            })}
        </div>                
      </div>
    )
  }
}

















function parse_range_date(dt) {
  var date = !isNaN(dt)?new Date(parseInt(dt.toString())):new Date(); 
  var ws = new Date(date.setDate(date.getDate() + (0-date.getDay())));
  var we = new Date(date.setDate(date.getDate() + (6-date.getDay())));   
  return {
    "Iwk": `${ws.getMonth()+1}/${ws.getDate()}/${we.getFullYear()}`,
    "ewk": `${we.getMonth()+1}/${we.getDate()}/${we.getFullYear()}`,
  } 
}





