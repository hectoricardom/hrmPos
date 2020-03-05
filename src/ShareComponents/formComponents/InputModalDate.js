import { React, observer } from '../../../../Utils/Sources'
import {Util, Icons, Dialog, Calendar, MobileCalendar ,ModalDate} from '..'

import './style.css';



export const _InputModalDate =  observer(props =>{  

  const { common,form,field,idK,icon,placeholder,color,dob} = props.propS;
  const { formsObserves,forms,ScreenWidth,isMobile} = common;
  
  if(!forms[form]){
    forms[form] = {}
  }
  if(forms[form] && !forms[form][field]){
    forms[form][field] = ``
  }
  


  const handleKeyUp = e => {
    const { common } = props.propS; 
    if(e.keyCode && e.keyCode===13 || e.keyCode && e.keyCode===27){
      if(e.target.value.toLowerCase().indexOf(`add::`)===0 || e.target.value.toLowerCase().indexOf(`agregar::`)===0){
        if (typeof props.updState === 'function') {
          props.updState({key:`drowndropInputText`,value:''});
          common.CloseDialog(Util.Base64.encode(`_Input@$@Text${idK}`));
          common.OpenDialog(Util.Base64.encode(`_Dialod@$@81245asaf--aDASD24${idK}`));
        }else{
          common.CloseDialog(Util.Base64.encode(`_Input@$@Text${idK}`));
        }
        
      }           
    }    
  };

  const handleBack = e => {   
    const {propS} = props;
    const { common,idK } = propS;
    common.CloseDialog(Util.Base64.encode(`_Input@$@Text${idK}`));        
  };
  


  const handleClick = e => {   
    const {propS,staTe} = props;
    const { common,form,field,idK } = propS;  
    var cmp = staTe[`drowndropInputText`].toLowerCase();    
    if(staTe[`removeOption`] && cmp.indexOf('remove::')===0){      
      common.RmvGroups(e)
    }else{
      common.forms[form][field] = e.id;
      common.formChanged(); 
    }
    if (typeof props.updState === 'function') {
      props.updState({key:`drowndropInputText`,value:''});
    }       
    common.CloseDialog(Util.Base64.encode(`_Input@$@Text${idK}`)); 
  };  



  const handleStatus= e => {    
    const { common,idK } = props.propS;
    var r = Util.Base64.encode(`_Input@$@Text${idK}`);  
    common.OpenDialog(r);         
      
  } 

  const handleChange = e => {   
    const { common,form,field,idK } = props.propS;
    common.forms[form][field] = e;
    common.formChanged();
    common.CloseDialog(Util.Base64.encode(`_Input@$@Text${idK}`)); 
  };
  const handleUpdChange = e => { 
    const {propS} = props;  
    const { common,form,field,icon } = propS; 
    
    ////
    const validDateDDMMYYYY = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g
    const validDateMMDDYYYY = /^((0|1)\d{1})\/((0|1|2)\d{1})\/((19|20)\d{2})/g
    if (validDateMMDDYYYY.test(e.target.value)) {
      common.forms[form][field] = e.target.value;      
      common.formChanged();      
    }else if (validDateDDMMYYYY.test(e.target.value)) {
      common.forms[form][field] = e.target.value;
      common.formChanged();      
    }else
    {      
      
    }
    if (typeof props.updState === 'function') {      
      props.updState({key:`drowndropInputText`,value:e.target.value});       
    }
        
  };
  
  var labelField = common.forms[form][field] || placeholder ||'';
 
  
  if(ScreenWidth<=isMobile){
    
  }
  return (    
    <div className="inputStyle2">
      <div className="InputClassV2 greyColor" onClick={handleStatus}>  {labelField}   </div>
      <Dialog  common={common} Id={Util.Base64.encode(`_Input@$@Text${idK}`)}>
          <ModalDate common={common} form={form} field={field} color={color} Mid={Util.Base64.encode(`_Input@$@Text${idK}`)} dob={dob} placeholder={placeholder}/>
      </Dialog>
    </div>
)
})





export default class InputModalDate extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      removeOption:false
    };
  }
  componentWillMount() {    
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount() {  
     
  }
  updateState(e){    
    this.setState({[e.key]:e.value});
  }

  render() {  
    var _th0 = this;
    return (      
      <_InputModalDate propS={_th0.props} staTe={_th0.state} updState={_th0.updateState}/>          
    );
  }
}



