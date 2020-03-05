

//import {Util, InputDate,InputText,InputSelect,Toast, Dialog} from '../ShareComponents';

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as constants from '../../constants/Api';
import InputTextHRM from '../InputText';
import InputTextArea from '../InputTextArea';


import HRMDropDown from '../dropDownBox';
import InputDateHRM from '../InputDate';
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';
import * as pica from 'pica';

import './style.css';






class FormsFinancesContainer extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      cameraDevice:false,
      Id:Util.generateUUID(),
      type:{
        manual:false,
        upload:false,
        camera:false,
      },   
      form2Save:{
        title:{
          data:{},
          type:'string'
        },
        description:{
          data:{},
          type:'string'
        }, 
        import:{
          data:{},
          type:'float'
        }, 
        date:{
          data:{},
          type:'float'
        }        
      }   
    };
  }
    componentDidMount() {  
      ['imgSpirit.png','image_watch.png','form.png'].map(im2rqu=>{
        commonActions.getThumbnail(`/getStaticImg2Json/${im2rqu}`);
      })
     
      // "sudo cp -R /home/ubuntu/temp/InventoryHRM/imgSpirit.png /home/ubuntu/InventoryHRM/data/static/",
      // "sudo cp -R /home/ubuntu/temp/InventoryHRM/image_watch.png /home/ubuntu/InventoryHRM/data/static/",
      // "sudo cp -R /home/ubuntu/temp/InventoryHRM/form.png /home/ubuntu/InventoryHRM/data/static/",
    }  

    componentWillMount(){
      var _th = this;
      const {isMobile} = this.props;
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      //var cameraStream;

      false && isMobile && getUserMedia.call(navigator, {
          video: true,
          // audio: true //optional
      }, function (stream) {
        _th.setState({cameraDevice:true});
      },function (err) {
            _th.setState({cameraDevice:null});       
          }
      );
    }

    componentWillUnmount(){
      
    }

    handleSaveEdit(i){    
      if(typeof this.props.handleSaveEdit === "function"){      
        this.props.handleSaveEdit(i)
      }
    }
  
  
    CloseEditAction(){
      if(typeof this.props.closeDialog === "function"){      
        this.props.closeDialog();
        this.props.actions.UpdKeyValue({key:'isLoadingReceipt',value:false});
      }
    } 



    openView(k){
      var _th = this;
      var vw = _th.state.type;     
      Object.keys(vw).map(kOld=>{        
        if(kOld===k){         
          vw[kOld]=true
        }else{
          vw[kOld]=false
        }       
      })
      _th.setState({type:vw});  
    }



    LoadReceipt2Form(){
      const {formName,ImageProccesData} = this.props;

      var y2s = {image:ImageProccesData.image};


      Object.keys(this.state.form2Save).map(fld=>{
        let _type = this.state.form2Save[fld]['type']
        let arrV = Object.keys(this.state.form2Save[fld]['data']);
        if(_type === 'string'){          
          y2s[fld] = arrV.join('; ');
        }else if(_type === 'float'){
          arrV.map(vv=>{            
            y2s[fld] = parseFloat(vv.toString());
          });
        }        
      })

      //console.log(y2s)
      
      this.props.actions.UpdateFormbyName(formName,y2s);

      this.openView("manual");
      this.props.actions.UpdKeyValue({key:'ImageProccesData',value:{}});
      this.props.actions.UpdKeyValue({key:'ImageProccesDone',value:false});
      
    }



    dragOverHandler(){

    }

    dropHandler(){
      
    }



    compress(input) {
      var _th6_ = this; 
      const width = 1200;    
      const {formName} = this.props; 
      var UploadUrl =  `${constants.GRAPHQLURL}/uploadReceipt`;
      const reader = new FileReader();
      if(input){
        // console.log(input.size);
        const fileName = input.name;
        reader.readAsDataURL(input);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                    const elem = document.createElement('canvas');                                      
                    const scaleFactor = width / img.width;
                    elem.width = width;
                    elem.height = img.height * scaleFactor;                    
                    const ctx = elem.getContext('2d');
                    // img.width and img.height will contain the original dimensions
                    ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
                    ctx.canvas.toBlob((blob) => {                      
                      /*
                      var urlCreator = window.URL || window.webkitURL;
                      var imageUrl = urlCreator.createObjectURL(blob);
                      console.log(imageUrl)
                      */
                      const file = new File([blob], fileName, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                      });
                      // console.log(input.size, file.size,  file.size / input.size );
                      _th6_.props.actions.makeFileRequest(UploadUrl, [], file, formName);   
                    }, 'image/jpeg', 1);
                  

            }
            reader.onerror = error => console.log(error);
        };
    }
  }

  

buildform2save(field,v){
  var frm = this.state.form2Save;
  if(!frm[field]['data']){
    frm[field]['data']={}
  }
  if(frm[field]['data']){
    if(frm[field]['data'][v]){
      delete frm[field]['data'][v];
    }else{
      frm[field]['data'][v] = v;
    }
    this.setState({form2Save:frm});
  }

}


buildform2saveFloat(field,v){
  var frm = this.state.form2Save;
  if(frm[field]['data']){
    if(frm[field]['data'][v]){
      delete frm[field]['data'][v];
    }else{
      frm[field]['data'] = {}
      frm[field]['data'][v] = parseFloat(v.toString());
    }
    this.setState({form2Save:frm});
  }
}




    fileCheckInput(e){   
      var _th6_ = this; 
     
       const {active,Id,label,form2Save} = this.state;
       var input = document.querySelector(`input[upload-type-label="upload_${Id}"]`);
      
       if(input && input.files && input.files[0]){
        var file = input.files[0];       
        _th6_.openView("upload");
        _th6_.compress(file)
       //  
        if(!label){
          var __ext_ = file.name.split('.').pop();
          var __lbl_ = file.name.split(`.${__ext_}`)[0];
          _th6_.setState({fileName:file.name,label:__lbl_});
        }else{
          _th6_.setState({fileName:file.name});
        }
         /*
        var reader = new FileReader();
        reader.addEventListener('load', _th6_.readFile.bind(_th6_));
        reader.readAsText(file);
        */
       
       }
  }

  render(){
    var _th6_ = this;
    const {formName, type, ImageProccesData, ImageProccesDone, isLoadingReceipt, isMobile, thumbnailJsonBlobObserve } = this.props; 
    var inputFileStyle ={opacity:`0`,height:`100%`,width:`100%`}    
    
    var style2PrintGreen = {"--printcolor-error-light":'#e6f4ea',"--printcolor-error-text":"#34a853"}
    var style2Print = {"--printcolor-error-light":'var(--calendar--back--color--)',"--printcolor-error-text":"var(--color-base--hover)"}
    var style2Print22 = {"--printcolor-error-light":'#fff',"--printcolor-error-text":"var(--color-base--hover)"}
    let _arrowBack = isMobile?'arrowBack':'cancel';

    return (
    <div className={`_form_view_operation_`}>
      {
    this.state.type.manual?
      
        <FormsFinancesRdx formName={formName} type={type} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.CloseEditAction.bind(this)}/> 
      :this.state.type.upload?
        <div>
          <div  className={`_form_group_cancel_`}>
            <div className={'__save__btn '}>
                <div className="center--Container grayStyle arrowBack" onClick={this.CloseEditAction.bind(this)} style={{"--color-tab--base--hover":'#4d4d4d'}}>
                  <div className="hoverDiv grayStyle "/>
                  <Icons name={_arrowBack} color={'#1967d2'} size={24}/>             
                </div> 
              </div>          
              <div className="flexSpace"/>
              <div className={'__save__btn '} >
                <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
                  <div className="hoverDiv orangeFlex "/>
                  <span className="text2D orangeFlex">{'Upload a Recepit'}</span>              
                </div> 
              </div>       
            </div>
          {ImageProccesDone?
          <div className={'_recommend_form_from_receipt_'} style={style2PrintGreen}>
            <div className={'_recommend_field_'}>
              <h5>{'Title'}</h5>
              {Object.keys(ImageProccesData.title).map((dtitle,indTt)=>{
                var active = this.state.form2Save['title'] && this.state.form2Save['title']['data'] && this.state.form2Save['title']['data'][dtitle]?true:false;
                return (
                <div key={indTt}  className={active?`field_recommend_active`:''} onClick={this.buildform2save.bind(this,'title',dtitle)}>
                  {active?<Icons name={'success'} color={'#1967d2'} size={18}/>:null} 
                  <p>{dtitle}</p>
                </div>
                )
              })}              
            </div>
            <div className={'_recommend_field_'}>
              <h5>{'Import'}</h5>
              {Object.keys(ImageProccesData.import).map((d_import,ind_import)=>{                 
                 var active = this.state.form2Save['import'] && this.state.form2Save['import']['data'] && this.state.form2Save['import']['data'][d_import]?true:false;
                return (
                  <div key={ind_import}  className={active?`field_recommend_active`:''}  onClick={this.buildform2saveFloat.bind(this,'import',d_import)}>
                    {active?<Icons name={'success'} color={'#1967d2'} size={18}/>:null} 
                    <p>{d_import}</p>
                  </div>
                  )
              })}               
            </div>
            <div className={'_recommend_field_'}>
              <h5>{'Date'}</h5>
              {Object.keys(ImageProccesData.date).map((d_date,ind_date)=>{                 
                 var active = this.state.form2Save['date'] && this.state.form2Save['date']['data'] && this.state.form2Save['date']['data'][d_date]?true:false;
                 return (
                  <div key={ind_date}  className={active?`field_recommend_active`:''}  onClick={this.buildform2saveFloat.bind(this,'date',d_date)}>
                    {active?<Icons name={'success'} color={'#1967d2'} size={18}/>:null} 
                    <p>{Util.date2pretyfy(d_date)}</p>
                  </div>
                  )
              })}
            </div>
            <div className={'_recommend_field_'}>
              <h5>{'Description'}</h5>
              {Object.keys(ImageProccesData.description).map((d_descr,ind_descr)=>{
                 
                 var active = this.state.form2Save['description'] && this.state.form2Save['description']['data'] && this.state.form2Save['description']['data'][d_descr]?true:false;
                 return (
                  <div key={ind_descr} className={active?`field_recommend_active`:''}  onClick={this.buildform2save.bind(this,'description',d_descr)}>
                    {active?<Icons name={'success'} color={'#1967d2'} size={18}/>:null} 
                    <p>{d_descr}</p>
                  </div>
                  )
              })}
            </div>
            <div className={'__save__btn _loadRecepit_'} >
                <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#4d4d4d'}}  onClick={this.LoadReceipt2Form.bind(this)}>
                  <div className="hoverDiv orangeFlex "/>
                  <span className="text2D orangeFlex">{'Load Recepit'}</span>              
                </div> 
              </div>

              <div className="printcallout">
              <div className="printcallout-body">
                <div className={`printcallout-icon `}>
                  <Icons name={'alert'} color={'var(--printcolor-error-text)'} size={24}/> 
                </div>
                <div className="printcallout-message">{`Tenga en cuenta que debe verificar la informacion, esta no es 100% precisa.\n `} </div>
              </div>
            </div>
          </div>
          :
          <div  className="upload__Video_wrapper" upload-type={`${true}`}>
           
            <div className="upload__Video_options"> 
            {isLoadingReceipt?
              <div className="upload__Video" >                 
                <div className="_icon_receipt_upload">
                  <svg class="" fill="#1967d2" height="96" viewBox="0 0 24 24" width="96">
                    <g>
                      <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path>
                    </g>
                    
                    <g className="scanner_laser">
                      <rect  className="overlayGraph"  x={0} y={0} width={48} height={1} strokeWidth={1.75} strokeOpacity={0.05} fill="transparent" style={{stroke:'b71c1c',fill:'none'}}></rect>
                      <rect  className="overlayGraph"  x={0} y={1} width={48} height={1} strokeWidth={1.75}  strokeOpacity={0.1} fill="transparent" style={{stroke:'b71c1c',fill:'none'}}></rect>
                      <rect  className="overlayGraph"  x={0} y={2} width={48} height={1} strokeWidth={1.75}  strokeOpacity={0.05} fill="transparent" style={{stroke:'b71c1c',fill:'none'}}></rect>
                      <rect  className="overlayGraph"  x={0} y={1} width={48} height={1} strokeWidth={1.5}  strokeOpacity={1} fill="transparent" style={{stroke:'none',fill:'b71c1c'}}></rect>                    
                    </g>
                  </svg>    
                </div>
              </div>
            :
            null}
            </div>
          </div>
          }
      </div>
      :
        <div style={style2Print22}>
          <div  className={`_form_group_cancel_`}>
            <div className={'__save__btn '}>
                <div className="center--Container grayStyle arrowBack" onClick={this.CloseEditAction.bind(this)} style={{"--color-tab--base--hover":'#4d4d4d'}}>
                  <div className="hoverDiv grayStyle "/>
                  <Icons name={_arrowBack} color={'#1967d2'} size={24}/>             
                </div> 
              </div>          
              <div className="flexSpace"/>
              <div className={'__save__btn '} >
                <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
                  <div className="hoverDiv orangeFlex "/>
                  <span className="text2D orangeFlex">{'Adding a new Operation'}</span>              
                </div> 
              </div>       
            </div>
          <div  className={`card2GroupAddForm`}>
          <div className={`card2AddForm ${isMobile?'isMobile':''}`} onClick={this.openView.bind(this,'manual')}>
              <div className="printcallout">
                <div className="printcallout-body">
                  {/*<div className={`printcallout-icon ${''}`}>
                    <Icons name={'formFill'} color={'var(--printcolor-error-text)'} size={48}/> 
                  </div> 
                  */}
                  <div className={`printcallout-icon ${''}`}>
                    <img alt={''} src={commonActions.getThumbnail(`/getStaticImg2Json/${'form.png'}`)}/> 
                  </div>  
                  <div className="printcallout-message">{`rellene el formulario manualmente`} </div>
                </div>
              </div>
            
          </div>              
          <div  className={`card2AddForm ${isMobile?'isMobile':''}`}>
          {!ImageProccesDone?
          <input type={`file`} style={inputFileStyle} id={this.state.Id} onChange={_th6_.fileCheckInput.bind(_th6_,formName)}  accept="image/*" upload-type-label={`upload_${this.state.Id}`}/>
         :<div className={`uploadingWrapp`} onClick={this.openView.bind(this,'upload')}></div>}   
            <div className="printcallout">
                <div className="printcallout-body">
      {/*
       <div className={`printcallout-icon ${''}`}>
                    <Icons name={'g_vision'} color={'var(--printcolor-error-text)'} size={48}/> 
                  </div>  
      */}
                 
      
                  <div className={`printcallout-icon ${''}`}>
                    <img alt={''} src={commonActions.getThumbnail(`/getStaticImg2Json/${'image_watch.png'}`)}/> 
                  </div>              
                  <div className="printcallout-message">{`Puede subir una foto de su recibo e intentaremos rellenar el formulario automaticamente`} </div>
                </div>
              </div> 
          </div>
          </div>
        </div>
    }
  </div>
    )  
}
  
}





export default connect(mapStateToProps6, mapDispatchToProps6)(FormsFinancesContainer);




class FormsFinances extends Component {
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
    var _2s = forms && forms[formName]?forms[formName]:null;
    delete _2s['owners'];
    _2s['import'] = parseFloat(_2s['import']?_2s['import'].toString():'0');
    var _2validate = {
      title:{minLength:6},
      import:{minValue:1},
      date:{date:true},
      group:{required:true},
    }
    var _Valid = Util.validations(_2validate,_2s); 
    if(_Valid.valid){
      if(_2s.id){
        delete _2s['owners'];
        if(type==='gastos'){
          this.props.actions.UpdGastos(_2s);
        }
        else if(type==='ingresos'){
          this.props.actions.UpdIngresos(_2s);
        }
        this.props.actions.UpdateFormbyName(formName,{});
        //forms[formName]={};   var scroll = scrollPosition;window.scrollTo(0,scroll);
      }else{
        delete _2s['owners'];
        if(type==='gastos'){
          this.props.actions.AddGastos(_2s);
        }
        else if(type==='ingresos'){
          this.props.actions.AddIngresos(_2s);
        }
        this.props.actions.UpdateFormbyName(formName,{});
      }
      this.dialogClose();      
    }else{
      //console.log(_Valid.msg)
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
    const { formName, forms, categories, type, isMobile  } = this.props;
    

    var _frmName = forms && forms[formName]?forms[formName]:{}; 
   
    var filtered_categories = {};
    Util.ObjectKeys(categories).map(r=>{
      if(categories[r]['type']===type){
        filtered_categories[r]=categories[r];
      }
    })
    const { validForm } = this.state;
    return (
      <div className="__form_group__  _addOpr_">
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
          <InputTextHRM icon={`textFormat`} form={formName} field={`title`} minLength={6} placeholder={Util.translatetext(18)} OnChange={this.handlerInputValue.bind(this,`title`)}  initvalue={_frmName[`title`]}/>
        </div>            
        <div className={`_form_group_field_`}>            
          <InputTextHRM icon={`money`} form={formName} field={`import`} minValue={1} number={true} placeholder={Util.translatetext(36)} OnChange={this.handlerInputValue.bind(this,`import`)}  initvalue={_frmName[`import`]}/>
        </div>
        <div className={`_form_group_field_`}>            
          <InputDateHRM icon={'date'} form={formName} field={`date`} placeholder={Util.translatetext(20)} date={true} dateChange={this.handlerInputValue.bind(this,`date`)} />
        </div>  
        <div className={`_form_group_field_ e_textArea`}>            
          <InputTextArea _rw={isMobile?4:4} icon={`more_vert`} form={formName} field={`description`} placeholder={Util.translatetext(19)} OnChange={this.handlerInputValue.bind(this,`description`)} initvalue={_frmName[`description`]}  charLimit={130}/>                    
        </div>      
        <div className={`_form_group_field_`}>                 
          <HRMDropDown icon={`bubbles`} form={formName} field={`group`} list={filtered_categories} title={Util.translatetext(33)} OnChange={this.handlerInputValue.bind(this,`group`)}  initvalue={_frmName[`group`]}/>
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
    categoriesby: state.common.filters["groups"],
    categories: state.common.categories,
    thumbnailJsonBlobObserve: state.common.thumbnailJsonBlobObserve,
    calendar:state.common.calendar,
    ImageProccesData: state.common.ImageProccesData,
    ImageProccesDone: state.common.ImageProccesDone,
    isLoadingReceipt: state.common.isLoadingReceipt,
    isMobile: state.common.isMobile
  };
}

function mapDispatchToProps6(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

 export const FormsFinancesRdx = connect(mapStateToProps6, mapDispatchToProps6)(FormsFinances);




 {/*
              <div className="upload__Video"  onDrop={_th6_.dropHandler.bind(_th6_)} onDragOver={_th6_.dragOverHandler.bind(_th6_)}>
               
                <div className="_icon_receipt_upload">
                <svg class="" fill="#1967d2" height="96" viewBox="0 0 24 24" width="96">
                    <g>
                      <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path>
                    </g>
                    <g className="">
                      <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z" style={{stroke:'#7d7d7d',fill:'var(--color-base--hover)'}}></path>                
                    </g>
                  </svg>     
                </div>
              </div>
               */}