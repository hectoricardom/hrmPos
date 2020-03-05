import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import {GRAPHQLURL} from '../../constants/Api';
import WithScroll from '../scroll-decorator';

import InputTextHRM from '../InputText';
//import InputTextCode from '../InputTextCode';
import * as Util from '../../state/Util';
import './style.css';


var _1year = 60000*60*24*365;





class Login extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false,
      brand:null,
      model:null,
      color:null,
      code:false,
      viewport:false,
      phonecode:'',
      provider:null        
    };
  }
  componentDidMount() {  
   this.scrollhandler()
   var _15Min = 60000*15;
   if(localStorage.getItem('_codeValidation_') &&  parseInt(localStorage.getItem('_codeValidation_'))+_15Min>(new Date()).getTime()){
      this.setState({
         code:true,
         phonecode:localStorage.getItem('_codeValidationPhone_'),
      })
   }


  }  
  componentWillUnmount(){
    
  }
 
  updBrands(i){
    this.setState({brand:i,model:null,color:null})
    
  }
 
  updProvider(i){
    this.setState({provider:i,model:null,color:null})
  }

 
   

  updColor(i){
    this.setState({color:i})
  }


 handleSomethingWrong(){
   this.setState({active:false})  
 }



 handleSentEmail(){
   var email =  this.props.forms['Login']?this.props.forms['Login']['email']:null;
   if(email){
      Util.fetchPostUrl(`${GRAPHQLURL}/generateToken?email=${email}`) 
      .then(res => {       
         if(res.status=== 200){
            // "token sent"
            this.setState({code:true,phonecode:res.phone,errorCode:null})
            localStorage.setItem('_codeValidation_',(new Date()).getTime());
            localStorage.setItem('_codeValidationPhone_',res.phone);
            localStorage.setItem('_email_',email);
         }else{
            this.setState({code:false,errorCode:res.status,errorMsg:res.err})   
            localStorage.setItem('_codeValidation_',null);   
            localStorage.setItem('_codeValidationPhone_',null);     
            //this.setState({code:false,errorCode:res.status})
         }        
      }).catch(error => {      
         this.setState({code:false})
      });     
   }   
 }





 handleConfirmToken(_code){
   Util.fetchPostUrl(`${GRAPHQLURL}/verifyToken?code=${_code}`) 
   .then(res => {   
     if(res && res.token){         
      var h = new RegExp('=','g')
      var _token = res.token.replace(h,'@');
      //var _expire = (new Date((new Date()).getTime()+_1year));
      //document.cookie = `jwt_hrm_fincance=${_token}; expires=${_expire}; path=/`;  
      window.localStorage.setItem('jwt_hrm_fincance',_token); 
      localStorage.setItem('_codeValidation_',null);
      localStorage.setItem('_codeValidationPhone_',null);
      this.props.actions.getUserProfile(); 
      this.setState({code:false,phonecode:null,errorCode:null})
     }else{
      this.setState({errorCode:939,errorMsg:res.err})
     }
   }).catch(error => {      
     console.log(error); //eslint-disable-line
   });
    
 }


 tryDiferentEmail(i){
   localStorage.setItem('_codeValidation_',null);
   localStorage.setItem('_codeValidationPhone_',null); 
   this.setState({code:false});
 }




 handleConfirmToken2(i){
   //this.props.actions.sendToken(i); 
 }
   ref = d => {
      this.elm = d
   }
  
   handlerCodeInput(i){
      var _i = i.toUpperCase();
      this.props.actions.UpdateForm('Login','code',_i);    
      if(_i.length>5){
         this.handleConfirmToken(_i);

      } 
   }




   handlerEmailInput(i){   
    this.props.actions.UpdateForm('Login','email',i);
 }

   scrollhandler(i){
      
      if(!this.state.viewport){         
        if(Util.isInViewport(this.elm)){
          this.setState({viewport:true});
        }      
      }    
    }

  render() {
   const {code, phonecode, errorCode, errorMsg} = this.state;
   var _email_ =  this.props.forms['Login']?this.props.forms['Login']['email']:localStorage.getItem('_email_')?localStorage.getItem('_email_'):null;
   return (
       <div className="loadingLoging"> 
         <WithScroll scrollhandler={this.scrollhandler.bind(this)}/>
         <div ref={this.ref} className="c-tabs-content"  is-in-viewport={`${this.state.viewport}`}>
            <div className="left_Section left_SectionTextMedia left_SectionTextMedias lSectionNoPadding center_Tabs_Section" aria-hidden={true} aria-labelledby="" key={'8543845'} role="tabpanel">                                             
               <div className="--auto--margin grid--middle u-grid--override center_Tab_Content_Slide  desktop--6-12 tablet--8-12 mobile--11-12">                                                  
                                                  <div className="grid__item desktop--4-12 tablet--11-12 --auto--margin">
                                                    <div className="left_Section__text cascade-text desktop--10-12 tablet--8-12 mobile--12-12 --auto--margin">
                                                      <h3 className="beta cascade-text__item white-Color-Text"  btn-dt-id={`${Util.Base64.encode(`datePickbutton${984823}`)}`}>{`${code?'Introducir el código de verificación':'Login'}`}</h3>
                                                      <div className="text-normal cascade-text__item  white-backColor">
                                                         {/*<div className="flexContainerH"  style={{maxWidth: `360px`}}>
                                                            <div className="flexContainerSldH" style={{transform: `translate3d(${code?'-100%':'0'}, 0px, 0px)`}}>
                                                            </div>
                                                         </div> 
                                                         */}    
                                                               <div className={`OptionContM islogin ${code?'':'isloginActive'}`} style={{minWidth: `100%`}}> 
                                                                  <div  className="text-description">{`Se enviara un codigo al telefono relacionado a este correo`}</div>
                                                                  <div className={`email--login`}>            
                                                                     <InputTextHRM icon={`more_vert`} form={'Login'} field={`email`} email={true} placeholder={'Email'} OnChange={this.handlerEmailInput.bind(this)}  initvalue={_email_}/>
                                                                  </div>  
                                                                  <div className="center--padding--btn-login">
                                                                     <div className="center--Container grayStyle" onClick={this.handleSentEmail.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
                                                                        <div className="hoverDiv orangeFlex "/>
                                                                        <span className="text2D orangeFlex">{`Login`}</span>              
                                                                     </div>   
                                                                  </div>
                                                               </div>
                                                               <div className={`OptionContM iscode ${code?'isCodeActive':''}`} style={{minWidth: `100%`}}> 
                                                                  <div  className="text-description">Escribe el código de 6 dígitos enviado a tu número de teléfono terminado en {phonecode}</div>
                                                                  <div className={'code--input'}> 
                                                                     <InputTextHRM icon={`more_vert`} form={'Login'} field={`code`} placeholder={'Code'} OnChange={this.handlerCodeInput.bind(this)} />           
                                                                    {/* <InputTextCode icon={`more_vert`} form={'Login'} field={`code`} email={true} placeholder={'Email'} OnChange={this.handlerCodeInput.bind(this)} /> */}
                                                                  </div>  
                                                                  <div className="center--padding--btn-login">
                                                                     <div className="center--Container grayStyle" onClick={this.handleConfirmToken.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
                                                                        <div className="hoverDiv orangeFlex "/>
                                                                        <span className="text2D orangeFlex">{`Verificar el codigo`}</span>              
                                                                     </div>   
                                                                  </div>
                                                                  <div className="center--padding--btn-login">
                                                                     <div className="center--Container grayStyle" onClick={this.tryDiferentEmail.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
                                                                        <div className="hoverDiv grayBck "/>
                                                                        <span className="text2D grayBck">{`Probar con otro correo`}</span>              
                                                                     </div>   
                                                                  </div>
                                                               </div>
                                                                                                                                                               
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

//    hectoricardom@yahoo.com




function mapStateToProps(state, ownProps) {
   return {
     forms: state.common.forms,
     _phones:state.common.phones,
     phonecode:state.common.phonecode,
     formObserve: state.common.formObserve
   };
 }
 
 function mapDispatchToProps(dispatch) {
   return {
     actions: bindActionCreators(commonActions, dispatch)
   };
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(Login);