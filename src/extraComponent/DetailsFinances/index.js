

//import {Util, InputDate,InputText,InputSelect,Toast, Dialog} from '../ShareComponents';

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as constants from '../../constants/Api';
/*
import InputTextHRM from '../InputText';
import InputTextArea from '../InputTextArea';


import HRMDropDown from '../dropDownBox';
import InputDateHRM from '../InputDate';

*/
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';


import './style.css';






class DetailsFinancesContainer extends Component {
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
      }   
    };
  }
    componentDidMount() {  
      
    }  

    componentWillMount(){
      var _th = this;
      const {isMobile} = this.props;
      /*
      isMobile && navigator.getUserMedia({ audio: true, video: true},
          function (stream) {
            
            //console.log(stream)
            _th.setState({cameraDevice:true});
            if(stream.getVideoTracks().length > 0 && stream.getAudioTracks().length > 0){
                //code for when none of the devices are available                       
            }else{
              _th.setState({cameraDevice:true});
              // code for when both devices are available
            }
          },
          function (err) {
            _th.setState({cameraDevice:null});       
          }
        );
        */
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
      this.props.actions.UpdateFormbyName(formName,ImageProccesData);

      this.openView("manual");
      this.props.actions.UpdKeyValue({key:'ImageProccesData',value:{}});
      this.props.actions.UpdKeyValue({key:'ImageProccesDone',value:false});
    }



    dragOverHandler(){

    }

    dropHandler(){
      
    }


    fileCheckInput(e){   
      var _th6_ = this;   
      const {formName} = this.props; 
      var UploadUrl =  `${constants.GRAPHQLURL}/uploadReceipt`;
       const {active,Id,label} = this.state;
       var input = document.querySelector(`input[upload-type-label="upload_${Id}"]`);
       
       if(input && input.files && input.files[0]){
        var file = input.files[0];
        _th6_.props.actions.makeFileRequest(UploadUrl, [], file,formName);    
        if(!label){
          var __ext_ = file.name.split('.').pop();
          var __lbl_ = file.name.split(`.${__ext_}`)[0];
          this.setState({fileName:file.name,label:__lbl_});
        }else{
          this.setState({fileName:file.name});
        }
         /*
        var reader = new FileReader();
        reader.addEventListener('load', _th6_.readFile.bind(_th6_));
        reader.readAsText(file);
        */
       
       }
  }

  openreceiptImage(url){
    //const {webP } = this.props;    
    //var url = commonActions.getThumbnail(`/getReceipt?imgId=${id}&webp=${webP}`)
   
    // var url = `https://hrmfinance.com/getReceipt?imgId=${id}&webp=true`;
    window.open(url);
  }



  render(){
    var _th6_ = this;
    const {thumbnailJsonBlobObserve, detailByID, isMobile, webP } = this.props;    
    //var inputFileStyle ={opacity:`0`,height:`100%`,width:`100%`}    
    
    //var style2PrintGreen = {"--printcolor-error-light":'#e6f4ea',"--printcolor-error-text":"#34a853"}
    var style2Print = {"--printcolor-error-light":'var(--calendar--back--color--)',"--printcolor-error-text":"var(--color-base--hover)"}
    let _arrowBack = isMobile?'arrowBack':'cancel';

    var urlReceipt = detailByID && detailByID.image && commonActions.getThumbnail(`/getReceipt?imgId=${detailByID.image}&webp=${webP}`);

    let _description_ = detailByID && detailByID.description && detailByID.description.split(';').join('\n');
    return (
    <div className={`_form_view_operation_`}>
      {    
        <div style={style2Print}>
          <div  className={`_form_group_cancel_ line_separator_`}>
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
                  <span className="text2D orangeFlex">{'View Details'}</span>              
                </div> 
              </div>       
          </div>
          {detailByID && detailByID.id ?         
             
             <div className={'_recommend_form_from_receipt_'} style={style2Print}>
             <div className={'_recommend_field_'}>
               <h5>{'Title'}</h5>
               <p>{detailByID.title}</p>
             </div>
             <div className={'_recommend_field_'}>
               <h5>{'Import'}</h5>
               <p>{detailByID.import}</p>
             </div>
             <div className={'_recommend_field_'}>
               <h5>{'Date'}</h5>
               <p>{Util.date2pretyfy(detailByID.date)}</p>
             </div>
             <div className={'_recommend_field_'}>
               <h5>{'Description'}</h5>
               <p>{_description_}</p>
             </div>
             
             {detailByID.image && urlReceipt?
             <div className={`receipt_view`} onClick={this.openreceiptImage.bind(this,urlReceipt)}>
             <div className="printcallout">
               <div className="printcallout-body">
                 <div className={`printcallout-icon ${''}`}>
                   <Icons name={'receipt'} color={'var(--printcolor-error-text)'} size={48}/> 
                 </div>
                 <div className="printcallout-message msg_receipt">{`ver recibo`} </div>
               </div>
             </div>
           
         </div>
             :null}
           </div>
           : null
          }   
      </div>
    }
  </div>
    )  
}
  
}





export default connect(mapStateToProps6, mapDispatchToProps6)(DetailsFinancesContainer);




function mapStateToProps6(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve,
    filterObserve: state.common.filterObserve,
    categoriesby: state.common.filters["groups"],
    categories: state.common.categories,
    calendar:state.common.calendar,
    detailByID: state.common.detailByID,
    thumbnailJsonBlobObserve: state.common.thumbnailJsonBlobObserve,
    webP: state.common.webP,
    isMobile: state.common.isMobile
  };
}

function mapDispatchToProps6(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}



