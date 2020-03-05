



import React, { Component } from 'react';
import {InputCheckBox, WeekDayPicker } from '../ShareComponents';
import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';
import InputTextHRM from '../InputText';
import './style.css';
import { GRAPHQLURL } from '../../constants/Api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';



class Setting extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          index:1,
          sent:false,
          visible:false,
          email:'',
          lastHover:null
        };
    }
    
    componentWillMount(){
        window.localStorage.setItem('c_id',3);
    }

    componentDidMount() {  
        
        Util.changethemeKey('light',"--background--header--color","#039be5");     
        Util.changethemeKey('light',"--svg--header--color","#f9f9f9");
        const { userDetail} = this.props; 
        this.updateInd = this.updateInd.bind(this);   
        this.updateLng = this.updateLng.bind(this); 
        this.props.actions.UpdateFormbyName('userDetail',userDetail);
    }  
    componentWillUnmount(){
    
    }

    updateInd(i){        
        if(this.state.visible){
            this.setState({visible:false,index:i});

        }else{
            this.setState({visible:true,index:i});
        }
    }
    updateLng(e){
        this.props.actionsCommon.languageUpd(e);
        
        this.updateInd();
    }
    
    updateFunction(e){
        var d={id:'3295827309857'};
        d[e.key]=e.value;
        this.props.actionsCommon.UpdProfile(d);
        setTimeout(()=>{
            window.location.href = (`${GRAPHQLURL}`);             
        },650);        
    }
    updateProfile(){        
        const {forms} = this.props; 
        var f = forms['userDetail']
        f['id']='3295827309857';
       if(f){
        this.props.actionsCommon.UpdProfile(f);
        this.updateInd();
       }
                 
    }
    ref = r => {
        this.Elm = r
    }

    render() {  
        const { email ,lng, userDetail, formObserve} = this.props;    
        //pattern="[0-9 ]*"
        var _lng = lng || window.localStorage.getItem('lng') || 'es';
        var Dtheme = 94;        
        var Elm2Render =  null;
        if(this.state.index===0){
            Elm2Render =  <LanguageOption updateInd={this.updateInd.bind(this)} updateLng={this.updateLng.bind(this)}/>;
        }
        if(this.state.index===1){
            Elm2Render =  <DarkThemeOption updateInd={this.updateInd.bind(this)}/>;
        }   
        if(this.state.index===2){
            Elm2Render =  <FunctionsOption userDetail={userDetail} updateFunction={this.updateFunction.bind(this)} updateInd={this.updateInd.bind(this)}/>;
        }     
        if(this.state.index===3){
            Elm2Render =  <ProfileOption userDetail={userDetail} updateFunction={this.updateProfile.bind(this)} updateInd={this.updateInd.bind(this)}/>;
        }
        if(this.state.index===4){
            Elm2Render =  <PrinterOption userDetail={userDetail} updateFunction={this.updateProfile.bind(this)} updateInd={this.updateInd.bind(this)}/>;
        }        
        var OrT = 'right',InitPs = '110';        
        var _Style={opacity:1,transform: `translate3d(${InitPs}%, 0, 0)`}
        _Style[OrT]=0;        
        if(this.state.visible){          
          _Style['transform']=`translate3d(0, 0, 0)`;           
        }
        var LngList = {'es':192,'en':193}
        var colorRT =  `198, 40, 40`;
        var IconSty = {width: '24px',  height: '24px',borderRadius: '24px',backgroundColor: 'var(--background--header--color)',padding: '5px',marginLeft: `15px`};
            return (
                <div ref={this.ref} style={{paddingTop:'60px'}}> 
                    <div className="itemList" onClick={()=>this.updateInd(3)}> 
                        <div className="contentIcon">   
                        <Icons name={'profile'} color={`var(--background--color)`} size={24} style={IconSty}  ripple={true}/>                   
                        </div>
                        <div className="label_link">  
                            {Util.translatetext(46)}                 
                        </div>
                        <div className="value_link">
                        </div>
                        <div className="Act_Icon">     
                            <Icons name={'arrow_right'} color={`var(--background--color)`} size={24} style={{}}  ripple={true}/>            
                        </div>                        
                    </div>
                    <div className="itemList" onClick={()=>this.updateInd(2)}> 
                        <div className="contentIcon">   
                        <Icons name={'setting'} color={`var(--background--color)`} size={24} style={IconSty}  ripple={true}/>                   
                        </div>
                        <div className="label_link">  
                            {Util.translatetext(67)}              
                        </div>
                        <div className="value_link">
                        </div>
                        <div className="Act_Icon">     
                            <Icons name={'arrow_right'} color={`var(--background--color)`} size={24} style={{}}  ripple={true}/>            
                        </div>                        
                    </div>
                    <div className="itemList" onClick={()=>this.updateInd(0)}> 
                        <div className="contentIcon">    
                            <Icons name={'language'} color={`var(--background--color)`} size={24} style={IconSty}  ripple={true}/>                
                        </div>
                        <div className="label_link">    
                            {Util.translatetext(91)}:              
                        </div>
                        <div className="value_link">  
                            {Util.translatetext(LngList[_lng])}
                        </div>
                        <div className="Act_Icon">     
                            <Icons name={'arrow_right'} color={`var(--background--color)`} size={24} style={{}}  ripple={true}/>            
                        </div>
                    </div>                      
                    <div className="itemList" onClick={()=>this.updateInd(1)}> 
                        <div className="contentIcon">   
                        <Icons name={'theme'} color={`var(--background--color)`} size={24} style={IconSty}  ripple={true}/>                   
                        </div>
                        <div className="label_link">  
                            {Util.translatetext(92)}:                 
                        </div>
                        <div className="value_link">     
                            {Util.translatetext(Dtheme)}:
                        </div>
                        <div className="Act_Icon">     
                            <Icons name={'arrow_right'} color={`var(--background--color)`} size={24} style={{}}  ripple={true}/>            
                        </div>                        
                    </div> 
                    <div className="itemList" onClick={()=>this.updateInd(4)}> 
                        <div className="contentIcon">   
                        <Icons name={'printer'} color={`var(--background--color)`} size={24} style={IconSty}  ripple={true}/>                   
                        </div>
                        <div className="label_link">  
                            {Util.translatetext(59)}              
                        </div>
                        <div className="value_link">
                        </div>
                        <div className="Act_Icon">     
                            <Icons name={'arrow_right'} color={`var(--background--color)`} size={24} style={{}}  ripple={true}/>            
                        </div>                        
                    </div>                   
                    <div className="SlideActionMenu" style={_Style}>
                        {Elm2Render}                   
                    </div>                            
                </div>
            );  
        }
    
    }

    function mapStateToProps(state, ownProps) {
    return {
        forms: state.common.forms,
        lng: state.common.lng,
        formObserve: state.common.formObserve,
        userDetail:state.common.user,
        validationForms:state.common.validationForms
    };
    }

    function mapDispatchToProps(dispatch) {
    return {
        actionsCommon: bindActionCreators(commonActions, dispatch),
        actions: bindActionCreators(commonActions, dispatch)
    };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Setting);














    const LanguageOption = (props =>{
        var CurrLng = window.localStorage.getItem('lng');
        const updateInd = e =>{
            if (typeof props.updateInd === 'function') {
              props.updateInd();
            }
        }
        const setLng = e =>{
            window.localStorage.setItem('lng',e);
            if (typeof props.updateLng === 'function') {
              props.updateLng(e);
            }
        }
        
        return(
            <div>     
                <div className="InputSelectContainer">                  
                    <div className="IconHeaderRenderer" onClick={updateInd}><Icons name={`arrowBack`} style={{top: '5px',position: 'relative'}} ripple={true} color={'#777'} size={24}/></div>
                    <h2 className="simpleMenuHeader"> {Util.translatetext(95)}  </h2>
                </div>
                <div>
                    {
                        [{id:'es',lng:192},{id:'en',lng:193}].map((cl,i)=>{  
                            var Icon =  null;
                            if(CurrLng===cl.id){
                                Icon =  <Icons name={'succes'} color={`#777`}  size={24}/>
                            }                         
                            return(
                                <div  key={i} className="itemList"  onClick={()=>setLng(cl.id)}> 
                                    <div className="contentIcon">    
                                        {Icon}              
                                    </div>
                                    <div className="label_link">    
                                        {Util.translatetext(cl.lng)}             
                                    </div>                                    
                                </div>
                            )
                        })
                    }
                </div> 
            </div>
        )
    })

    
    const DarkThemeOption = (props =>{
        var CurrLng = window.localStorage.getItem('lng');
        const updateInd = e =>{
            if (typeof props.updateInd === 'function') {
              props.updateInd();
            }
        }
        const setLng = e =>{
            //window.localStorage.setItem('lng',e);
            if (typeof props.updateLng === 'function') {
              //props.updateLng(e);
            }
        }
        return(
            <div style={{"--checkBox--button--color": 'rgb(255, 255, 255)',"--checkBox--button--Active--color": '#777'}}>     
                <div className="InputSelectContainer">                  
                    <div className="IconHeaderRenderer" onClick={updateInd}><Icons name={`arrowBack`} style={{top: '5px',position: 'relative'}} ripple={true} color={'#777'} size={24}/></div>
                    <h2 className="simpleMenuHeader"> {Util.translatetext(92)}  </h2>
                </div>
                <div className="themeContent">
                    <div className="descriptionRenderer">{Util.translatetext(96)}</div>
                    <div className="descriptionRenderer">{Util.translatetext(97)}</div>
                    <div className="toggleItemRenderer">
                        <div className="labelDt">{Util.translatetext(92)}</div>
                        <div className="">
                            <InputCheckBox updChange={setLng}/>
                        </div>
                    </div>               
                </div> 
            </div>
        )
    })



    const FunctionsOption = (props =>{
        var CurrLng = window.localStorage.getItem('lng');
        const updateInd = e =>{
            if (typeof props.updateInd === 'function') {
              props.updateInd();
            }
        }
        const setLng = e =>{
            //window.localStorage.setItem('lng',e);
            if (typeof props.updateLng === 'function') {
              //props.updateLng(e);
            }
        }
        const UpdFinansas = e =>{
            if (typeof props.updateFunction === 'function') {
                props.updateFunction({key:`Finansas`,value:e});
            }
        }
        const UpdDaycare = e =>{
            if (typeof props.updateFunction === 'function') {
                props.updateFunction({key:`Daycare`,value:e});
            }
        }
        const UpdAlmacen = e =>{
            if (typeof props.updateFunction === 'function') {
              props.updateFunction({key:`Almacen`,value:e});
            }
        }

        return(
            <div style={{"--checkBox--button--color": 'rgb(255, 255, 255)',"--checkBox--button--Active--color": 'rgb(21, 101, 192)'}}>     
                <div className="InputSelectContainer">                  
                    <div className="IconHeaderRenderer" onClick={updateInd}><Icons name={`arrowBack`} style={{top: '5px',position: 'relative'}} ripple={true} color={'#777'} size={24}/></div>
                    <h2 className="simpleMenuHeader"> {Util.translatetext(67)}  </h2>
                </div>
                <div className="themeContent">
                    <div className="descriptionRenderer">{Util.translatetext(98)}</div>
                    <div className="toggleItemRenderer">
                        <div className="labelDt">{Util.translatetext(42)}</div>
                        <div className="">
                            <InputCheckBox updChange={UpdFinansas} initvalue={props.userDetail['Finansas']}/>
                        </div>
                    </div>
                    <div className="toggleItemRenderer">
                        <div className="labelDt">{Util.translatetext(12)}</div>
                        <div className="">
                            <InputCheckBox updChange={UpdDaycare} initvalue={props.userDetail['Daycare']}/>
                        </div>
                    </div> 
                    <div className="toggleItemRenderer">
                        <div className="labelDt">{Util.translatetext(41)}</div>
                        <div className="">
                            <InputCheckBox updChange={UpdAlmacen} initvalue={props.userDetail['Almacen']}/>
                        </div>
                    </div>               
                </div> 
            </div>
        )
    })



    const ProfileOption = (props =>{
        const updateInd = e =>{
            if (typeof props.updateInd === 'function') {
              props.updateInd();
            }
        }
        const saveForm = e =>{
            if (typeof props.updateFunction === 'function') {
                props.updateFunction();
              }
        }
        return(
            <div style={{"--checkBox--button--color": 'rgb(255, 255, 255)',"--checkBox--button--Active--color": '#777'}}>     
                <div className="InputSelectContainer">                  
                    <div className="IconHeaderRenderer" onClick={updateInd}><Icons name={`arrowBack`} style={{top: '5px',position: 'relative'}} ripple={true} color={'#777'} size={24}/></div>
                    <div className="JoinDivsContainer"> 
                        <h2 className="simpleMenuHeader"> {Util.translatetext(46)}  </h2>
                        <div className="IconHeaderRenderer" onClick={saveForm}><Icons name={`save`} style={{top: '5px',position: 'relative'}} ripple={true} color={'#777'} size={24}/></div>
                    </div>
                </div>
                <div className="themeContent">
                    <div className="descriptionRenderer">{'Esta opcion le permite agregar o editar informacion de su perfil'}</div>
                    <div className="descriptionRenderer">{''}</div>
                    <div className="toggleItemRenderer">
                        <div className="labelDt">{Util.translatetext(32)}</div>
                        <div className="">
                            <div className={`_form_group_field_`}>            
                                <InputTextHRM icon={`textFormat`} form={'userDetail'} field={`name`} minLength={6} placeholder={Util.translatetext(32)} />
                            </div>
                        </div>
                    </div>     
                    <div className="toggleItemRenderer">
                        <div className="labelDt">{Util.translatetext(31)}</div>
                        <div className="">
                            <div className={`_form_group_field_`}>            
                                <InputTextHRM icon={`more_vert`} form={'userDetail'} field={`phone`} phone={true} placeholder={Util.translatetext(31)} />
                            </div>    
                               
                        </div>
                    </div>
                    <WeekDayPicker form={'work'} field={`days`} color={`hsla(0, 0%, 53.3%, .8)`}/>           
                </div> 
            </div>
        )
    })


    const PrinterOption = (props =>{        
        var sizePdf = window.localStorage.getItem('size-pdf-assistance');
        
        const updateInd = e =>{
            if (typeof props.updateInd === 'function') {
              props.updateInd();
            }
        }
        const setLng = e =>{
            window.localStorage.setItem('size-pdf-assistance',e);
            if (typeof props.updateInd === 'function') {
                props.updateInd();
            }
        }
        var title_pdf = window.localStorage.getItem('title-pdf-assistance')===true || window.localStorage.getItem('title-pdf-assistance')==='true';
        const titlePdf = e =>{
            if(title_pdf){  
                window.localStorage.setItem('title-pdf-assistance',false);  
            }
            else{
                window.localStorage.setItem('title-pdf-assistance',true);
            }
            if (typeof props.updateInd === 'function') {
                props.updateInd();
            }
        }
        return(
            <div style={{"--checkBox--button--color": 'rgb(255, 255, 255)',"--checkBox--button--Active--color": 'rgb(0, 104, 91)'}}>     
                <div className="InputSelectContainer">                  
                    <div className="IconHeaderRenderer" onClick={updateInd}><Icons name={`arrowBack`} style={{top: '5px',position: 'relative'}} ripple={true} color={'#777'} size={24}/></div>
                    <h2 className="simpleMenuHeader"> {Util.translatetext(59)}  </h2>
                </div>
                <div className="themeContent">
                    <div className="descriptionRenderer">{Util.translatetext(97)}</div>
                    <div className="descriptionRenderer">{Util.translatetext(99)}</div>
                    <div className="toggleItemRenderer">
                        <div className="labelDt">{Util.translatetext(18)}</div>
                        <div className="">
                            <InputCheckBox updChange={titlePdf} initvalue={title_pdf}/>
                        </div>
                    </div>               
                </div> 
                <div className="themeContent">
                    <div className="descriptionRenderer">{Util.translatetext(100)}</div>
                    <div className="">
                    {
                        [{id:'a4',lng:'A4'},{id:'a5',lng:'A5'},{id:'letter',lng:'letter'}].map((cl,i)=>{
                            var Icon =  null;
                            if(sizePdf===cl.id){
                                Icon =  <Icons name={'succes'} color={`#777`}  size={24}/>
                            }                         
                            return(
                                <div  key={i} className="itemList"  onClick={()=>setLng(cl.id)}> 
                                    <div className="contentIcon">    
                                        {Icon}              
                                    </div>
                                    <div className="label_link">    
                                        {cl.lng}             
                                    </div>                                    
                                </div>
                            )
                        })
                    }
                    </div>               
                </div>
            </div>
        )
    })