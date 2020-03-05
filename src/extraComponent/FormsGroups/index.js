

//import {Util, InputDate,InputText,InputSelect,Toast, Dialog} from '../ShareComponents';

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import InputTextHRM from '../InputText';
import HRMDropDown from '../dropDownBox';
import './style.css';
import * as Util from '../../state/Util';



class FormsGroups extends Component {
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
    const {forms, formName } = this.props; 
    var _2s = forms[formName]?forms[formName]:null;
    delete _2s['owners'];
    var _2validate = {
      name:{minLength:6},      
      type:{required:true},
    }
    var _Valid = Util.validations(_2validate,_2s); 
    if(_Valid.valid){
      if(_2s.id){
        delete _2s['owners'];
        this.props.actions.UpdCategory(_2s);        
        this.props.actions.UpdateFormbyName(formName,{});
        //forms[formName]={};   var scroll = scrollPosition;window.scrollTo(0,scroll);
      }else{
        delete _2s['owners'];
        this.props.actions.AddCategory(_2s);       
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
    const { formName, forms  } = this.props;
    const { validForm } = this.state;
    var typeList = {'gastos':{name:'gastos'},'ingresos':{name:'ingresos'},'attendance':{name:'asistencia'}};
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
          <InputTextHRM icon={`textFormat`} form={formName} field={`name`} minLength={6} placeholder={Util.translatetext(18)} OnChange={this.handlerInputValue.bind(this,`name`)}  initvalue={forms[formName]?forms[formName][`name`]:null}/>
        </div>        
        <div className={`_form_group_field_`}>                 
          <HRMDropDown icon={`bubbles`} form={formName} field={`type`} list={typeList} title={`type`} OnChange={this.handlerInputValue.bind(this,`type`)}  initvalue={forms[formName]?forms[formName][`type`]:null}/>
        </div>
      </div>
      ) 
  }
}



function mapStateToProps6(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve,       
  };
}

function mapDispatchToProps6(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps6, mapDispatchToProps6)(FormsGroups);


