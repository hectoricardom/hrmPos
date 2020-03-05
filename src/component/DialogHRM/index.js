import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions from '../../state/dialogActions';
import './style.css';
import * as Util from '../../state/Util';

class DialogHRM extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,
      height:0,
      width:null,
      orientation:false
    };
  }
  componentDidMount() {  
  }  

  componentWillMount(){
  }

  componentWillUnmount(){
  }

  
 

  Close(_id){
    var _th6 = this;      
    var options = {id:_id};
    _th6.props.actions.CloseDialog(options);
  }
  


  ref = r => {
    this.MS_Elem = r
  }


  render() {  
    var _th6 = this;   
    const { list,dialogObserve } = _th6.props;    
    var _list = Object.keys(list);   
    return (
            <div>       
            {
              _list.map((dg)=>{
                var dlg = list[dg];
                
                if(dlg && dlg.visible){
                  
                  var _Style={}
                  var _cldg =Util.cleanbase64(dg);
                  _Style[`--s__${_cldg}_heigth__`]='750px';
                  _Style[`--s__${_cldg}_width__`]='80vw';
                  _Style[`--s__${_cldg}_zIndex__`]=250;
                  _Style[`--overlay__${_cldg}_zIndex__`]=249;    
                  if(dlg.display){
                    if(dlg.height){
                      _Style[`--s__${_cldg}_heigth__`]=dlg.height;
                    }
                    if(dlg.width){
                      _Style[`--s__${_cldg}_width__`]=dlg.width; 
                    }
                    if(dlg.zIndex){
                      _Style[`--s__${_cldg}_zIndex__`]=dlg.zIndex;
                      _Style[`--overlay__${_cldg}_zIndex__`]=dlg.zIndex-1;
                    }
                  }
                  var ts = {
                    //transform:`translate3d(0, var(--s__${_cldg}_heigth__), 0)`,
                    marginTop:`calc( var(--s__${_cldg}_heigth__) / -2)`,
                    marginLeft:`calc( var(--s__${_cldg}_width__) / -2)`,
                    top:`50%`,
                    left:`50%`,
                    height:`var(--s__${_cldg}_heigth__)`,
                    width:`var(--s__${_cldg}_width__)`,
                    opacity: 1,
                    zIndex: `var(--s__${_cldg}_zIndex__)`
                  };
                  var ovts = {opacity: 1,zIndex: `var(--overlay__${_cldg}_zIndex__)`};
                 
                  return (
                      <div className={dlg.display?'active':''} style={_Style} key={dg}>
                        <div className="DialogHRM" style={ts}>
                          {dlg.content?dlg.content:null}
                        </div>
                        {dlg.display?<div className={`DialogHRMOverlay ${dlg.display?'show':''}`}  style={ovts} onClick={_th6.Close.bind(_th6,dg)}/> :null}        
                      </div>
                    ) 
                }
              })
            }                  
            </div>
         )
        
     
  }
}


function mapStateToPropsDialog(state, ownProps) {
  return {
    list: state.dialog.dialogs,
    dialogObserve: state.dialog.dialogObserve
    
  };
}

function mapDispatchToPropsDialog(dispatch) {
  return {
    actions: bindActionCreators(dialogActions, dispatch)
  };
}

export default connect(mapStateToPropsDialog, mapDispatchToPropsDialog)(DialogHRM);


/*
                    if(dlg.display){
                    StyleDlg = { opacity: 1, visibility: `visible`}
                    StyleOverlay={opacity: 1, visibility: `visible`};
                  }
                  */