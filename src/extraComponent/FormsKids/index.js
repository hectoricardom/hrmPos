

//import {Util, InputDate,InputText,InputSelect,Toast, Dialog} from '../ShareComponents';

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import InputTextHRM from '../InputText';
import InputDateHRM from '../InputDate';
import './style.css';


import * as Util from '../../state/Util';



class FormsKids extends Component {
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

  week2print(e){ 
    console.log(e)     
    
  }

  handlerSaveForm(){ 
    const {forms, formName,type } = this.props; 
    var _2s = forms[formName]?forms[formName]:null;
    delete _2s['owners'];
    var _2validate = {
      name:{minLength:6},
      //address:{required:true},
      //parentName:{required:true},
      //cellphone:{required:true},
      //email:{required:true},      
      dob:{required:true},
      vaccinations:{required:true},
      contract3C:{required:true},
    }
    var _Valid = Util.validations(_2validate,_2s); 
    console.log(_Valid)
    if(_Valid.valid){
      if(_2s.id){
        delete _2s['owners'];
        if(type==='kids'){
          this.props.actions.UpdKids(_2s);
        }
        
        this.props.actions.UpdateFormbyName(formName,{});
        //forms[formName]={};   var scroll = scrollPosition;window.scrollTo(0,scroll);
      }else{
        delete _2s['owners'];
        if(type==='kids'){
          this.props.actions.AddKids(_2s);
        }        
        this.props.actions.UpdateFormbyName(formName,{});
      }
      this.dialogClose();      
    }else{
      console.log(_Valid.msg)
    };
    //this.props.actions.UpdateForm(formName,field,value);
  }

  handlerInputValue(field,value){ 
    
  }

  handleSaveEdit(i){    
    if(typeof this.props.handleSaveEdit === "function"){      
      this.props.handleSaveEdit(i)
    }
  }


  dialogClose(){
    if(typeof this.props.closeDialog === "function"){      
      this.props.closeDialog();
    }      
    
  }

  ref = r => {
    this.MS_Elem = r
  }



  render() {  
    const { formName, forms, categories, categoriesby  } = this.props;
    const { validForm } = this.state;
    return (
      <div className="__form_group__">
        <div  className={`_form_group_cancel_`}>
          <div className={'__save__btn '}>
            <div className="center--Container grayStyle" onClick={this.dialogClose.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv grayStyle "/>
              <span className="text2D grayStyle">{`Cancel`}</span>              
            </div> 
          </div>
          <div className="flexSpace"/>
          {validForm?
          <div className={'__save__btn '} >
            <div className="center--Container grayStyle" onClick={this.handlerSaveForm.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv orangeFlex "/>
              <span className="text2D orangeFlex">{`Save`}</span>              
            </div> 
          </div> :null}         
        </div>
        <div className={`_form_group_field_`}>  
          <InputTextHRM icon={`kid`} form={formName} field={`name`} placeholder={Util.translatetext(32)} minLenght={7} maxLenght={50}  OnChange={this.handlerInputValue.bind(this,`name`)}  initvalue={forms[formName]?forms[formName][`name`]:null}/>
        </div>
        <div className={`_form_group_field_`}> 
          <InputTextHRM icon={`home`} form={formName} field={`address`} placeholder={Util.translatetext(30)}  OnChange={this.handlerInputValue.bind(this,`address`)}  initvalue={forms[formName]?forms[formName][`address`]:null}/>
        </div>
        <div className={`_form_group_field_`}> 
          <InputTextHRM icon={`parents`} form={formName} field={`parentName`} placeholder={Util.translatetext(37)} minLenght={7} maxLenght={50}  OnChange={this.handlerInputValue.bind(this,`parentName`)}  initvalue={forms[formName]?forms[formName][`parentName`]:null}/>
        </div>
        <div className={`_form_group_field_`}> 
          <InputTextHRM icon={`phoneNumber`}  form={formName} field={`cellphone`} phone={true} placeholder={Util.translatetext(31)}  OnChange={this.handlerInputValue.bind(this,`cellphone`)}  initvalue={forms[formName]?forms[formName][`cellphone`]:null}/>
        </div>
        <div className={`_form_group_field_`}> 
          <InputTextHRM icon={`email`}  form={formName} field={`email`} email={true} placeholder={'email'}  OnChange={this.handlerInputValue.bind(this,`email`)}  initvalue={forms[formName]?forms[formName][`email`]:null}/>
        </div>
        <div className={`_form_group_field_`}>            
          <InputDateHRM icon={'date'} form={formName} field={`dob`} modalDate={true} dob={true} placeholder={Util.translatetext(27)} date={true} dateChange={this.handlerInputValue.bind(this,`dob`)} initvalue={forms[formName]?forms[formName][`dob`]:null}/>
        </div>
        <div className={`_form_group_field_`}>            
          <InputDateHRM icon={'security'} form={formName} field={`vaccinations`} modalDate={true}  placeholder={Util.translatetext(34)} date={true} dateChange={this.handlerInputValue.bind(this,`vaccinations`)} initvalue={forms[formName]?forms[formName][`vaccinations`]:null}/>
        </div>
        <div className={`_form_group_field_`}>            
          <InputDateHRM icon={'contract'} form={formName} field={`contract3C`} modalDate={true} placeholder={Util.translatetext(35)} date={true} dateChange={this.handlerInputValue.bind(this,`contract3C`)} initvalue={forms[formName]?forms[formName][`contract3C`]:null}/>
        </div>
      </div>
      ) 
  }
}         



function mapStateToProps6(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve,
    filterObserve: state.common.filterObserve,
    gastos:state.common.filters["gastos"],
    categoriesby: state.common.filters["groups"],
    categories: state.common.categories,
    calendar:state.common.calendar,
  };
}

function mapDispatchToProps6(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps6, mapDispatchToProps6)(FormsKids);


