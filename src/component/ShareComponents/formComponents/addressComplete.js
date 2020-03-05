

import { React, observer } from '../../../../Utils/Sources'
import {Util, Icons, SelectPopup } from '..'

import './style.css';


export  const _AddressAutoComplete =  observer(props =>{
  const {propS,staTe} = props;
  const { common,form,field,idK,option,placeholder,clearButton, addButton,addFunction,color,icon} = propS;
  const { formsObserves,forms,ScreenWidth,isMobile} = common;
  var colorTheme = color || `#c2185b`;
  if(!forms[form]){
    forms[form] = {}
  }
  if(forms[form] && !forms[form][field]){
    forms[form][field] = ``
  }
  
  const handleStatus= e => {   
    
    const { common,idK,option } = props.propS;
    const { ScreenWidth} = common;
    if (typeof props.updState === 'function') {      
      props.updState({key:`ScreenWidth`,value:ScreenWidth});       
    }
    var r = Util.Base64.encode(`_Input@$@#AutoCompleteAddress${idK}`);    
    var y  = document.getElementsByClassName('addressG');        
    var h = option;
    var cmp = props.staTe[`drowndropInputText`].toLowerCase();
    if(cmp){   
      option.map(o=>{
        if(cmp.toString().indexOf('remove::')===0){
         cmp = cmp.substring(8,cmp.lenght);                 
        }
        if(o.name.toLowerCase().indexOf(cmp)>=0){
          h.push(o);
        }
      })      
    }
    var heiG = 64
    if(y.length>0){      
      var Arr = Util.list2Array(y);
      Arr.map(inP=>{
        if(inP.contains(e.target)){
          var fC  = document.getElementsByClassName('addressG')[0];       
          var b = inP.getBoundingClientRect();
          var cnt = fC.getBoundingClientRect();          
          common.OpenSelectPopup(r,b,cnt.right,heiG);
          setTimeout(()=>{
            var inF  = document.getElementsByClassName('InputClass');
            var InpArr = Util.list2Array(inF);
            InpArr.map(ia=>{
              if(inP.contains(ia)){
                ia.focus();                
              }
            })          
          },5)
        } 
      });
      
    }    
  } 
  const handleChange = e => { 
    const {propS} = props;  
    const { common,form,field,icon } = propS;
    var query = e.target.value.split(' ').join('+'); 
    const StreetMap = `https://www.openstreetmap.org/geocoder/search_osm_nominatim?query=${query}`
    Util.fetchGet(StreetMap).then(s=>{
      console.log(s)
    })
    common.geocoder.geocode( {'address': e.target.value }, function(results, status) {      
      if(status==="OK"){
        var addlist = [];
        results.map(ad=>{          
          addlist.push(ad.formatted_address)
        })            
        if (typeof props.updState === 'function') {      
          props.updState({key:`list`,value:addlist});       
        }
      }else{
        var addlist = [];
        if (typeof props.updState === 'function') {      
          props.updState({key:`list`,value:addlist});       
        }
      }
    })
    common.forms[form][field] = e.target.value;
    if (typeof props.updState === 'function') {      
      props.updState({key:`drowndropInputText`,value:e.target.value});       
    }
    common.formChanged();    
  };

  const handleCearData = e => { 
    const {propS} = props;  
    const { common,form,field,icon } = propS;     
    common.forms[form] = {};
    if (typeof props.updState === 'function') {      
      props.updState({key:`drowndropInputText`,value:``});       
    }
    common.formChanged();    
    common.CloseSelectPopup(Util.Base64.encode(`_Input@$@#AutoCompleteAddress${idK}`));
  };



  const handleAddOption = e =>{
    const {propS} = props;  
    const { common,idK } = propS;
    if (typeof props.updState === 'function') {
      props.updState({key:`drowndropInputText`,value:''});      
    }
    if (typeof props.propS.addFunction === 'function') {
      common.CloseSelectPopup(Util.Base64.encode(`_Input@$@#AutoCompleteAddress${idK}`));
      props.propS.addFunction();
    }
  }

  const handleKeyUp = e => {
    const { common } = props.propS; 
    if(e.keyCode && e.keyCode===13 || e.keyCode && e.keyCode===27){
      if(e.target.value.toLowerCase().indexOf(`add::`)===0 || e.target.value.toLowerCase().indexOf(`agregar::`)===0){
        if (typeof props.updState === 'function') {
          props.updState({key:`drowndropInputText`,value:''});
          common.CloseSelectPopup(Util.Base64.encode(`_Input@$@#AutoCompleteAddress${idK}`));
          common.OpenDialog(Util.Base64.encode(`_Dialod@$@81245asaf--aDASD24${idK}`));
        }else{
          common.CloseSelectPopup(Util.Base64.encode(`_Input@$@#AutoCompleteAddress${idK}`));
        }
        
      }           
    }    
  };

  const handleBack = e => {   
    const {propS} = props;
    const { common,idK } = propS; 
    common.CloseSelectPopup(Util.Base64.encode(`_Input@$@#AutoCompleteAddress${idK}`));        
  };
  


  const handleClick = e => {   
    const {propS,staTe} = props;
    const { common,form,field,idK } = propS;  
    common.forms[form][field] = e;
    common.formChanged();
    if (typeof props.updState === 'function') {
      props.updState({key:`drowndropInputText`,value:''});
      props.updState({key:`list`,value:[]});
    }       
    common.CloseSelectPopup(Util.Base64.encode(`_Input@$@#AutoCompleteAddress${idK}`)); 
  };  

  var _option = staTe.list;
  var labelField = common.forms[form][field] || placeholder || '';
  var rmvIcon = null;  
  var ItemClass = `InputSelectClass`
  var cmp = staTe[`drowndropInputText`].toLowerCase();
  var rmvOpt = staTe[`removeOption`];
 
  var _clearButton=null; 
  if(clearButton){
    _clearButton = <div className="IconInputSelect" onClick={()=>{handleCearData()}}><Icons name={'cancel'} color={'#777'} size={32}/></div>
  }
  var iconBack = <div className="IconInputTextModal"><Icons name={icon} color={'#777'} size={24}/></div>
  var heightStyle = {}  
  if(staTe.ScreenWidth<=isMobile){
    iconBack = <div className="IconInputTextModal" onClick={handleBack}><Icons name={`arrowBack`} color={'#777'} size={24}/></div>
    heightStyle = {height:`100vh`}
  }
// 
  return (    
    <div className="inputStyle2 addressG">         
         <div className="InputClassV2 greyColor" onClick={handleStatus}>  {labelField}   </div>
          <SelectPopup common={common} Id={Util.Base64.encode(`_Input@$@#AutoCompleteAddress${idK}`)}>
              <div className="SelectContainer" style={heightStyle}>
                <div className="InputSelectContainer borderBottom">                  
                  {iconBack}
                  <div className="input2Alg">                 
                    <input placeholder={placeholder} className="InputClass"  value={staTe[`drowndropInputText`]} onChange={handleChange} onKeyUp={handleKeyUp}
                    style={{}}/>
                  </div>
                  {_clearButton}
                </div>
                <div className="OptionCont">                
                {_option.map((opt,inDx)=>{
                  return(
                    <div key={`${inDx}--${opt}`} placeholder={placeholder} className={ItemClass} onClick={()=>{handleClick(opt)}}>
                      {opt}  {rmvIcon}                    
                    </div>
                  )                  
                })}
             </div>
              </div>
          </SelectPopup>         
        </div>    

    ) 
})


export default class AddressAutoComplete extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      drowndropInputText : ``,
      list:[],
      ScreenWidth:0,
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
      <_AddressAutoComplete propS={_th0.props} staTe={_th0.state} updState={_th0.updateState}/>          
    );
  }
}

