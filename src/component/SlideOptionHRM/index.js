import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions from '../../state/dialogActions';
import * as Util from '../../state/Util';
import './style.css';


class SlideOptionHRM extends Component {
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
  componentWillUnmount(){
    
  }

  Close(i){
    var options = {id:i};
    this.props.actions.CloseSlideOption(options); 
  }


  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { list,dialogObserve } = this.props;    
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
                  _Style[`--s__${_cldg}_zIndex__`]=250;
                  _Style[`--overlay__${_cldg}_zIndex__`]=249;    
                  if(dlg.display){
                    if(dlg.height){
                      _Style[`--s__${_cldg}_heigth__`]=dlg.height+'px';
                    }
                    if(dlg.zIndex){
                      _Style[`--s__${_cldg}_zIndex__`]=dlg.zIndex;
                      _Style[`--overlay__${_cldg}_zIndex__`]=dlg.zIndex-1;                      
                    }
                  }
                  var ts = {
                    transform:`translate3d(0, var(--s__${_cldg}_heigth__), 0)`,
                    WebkitTransform: `translate3d(0, var(--s__${_cldg}_heigth__), 0)`,
                    MsTransform:`translate3d(0, var(--s__${_cldg}_heigth__), 0)`,
                    opacity: 1,
                    zIndex: `var(--s__${_cldg}_zIndex__)`};
                  var ovts = {opacity: 1,zIndex: `var(--overlay__${_cldg}_zIndex__)`};
                  return (
                      <div className={dlg.display?'active':''} style={_Style} key={dg}>
                        <div className="SlideOption" style={ts}>
                          {dlg.content?dlg.content:null}
                        </div>
                        {dlg.display?<div className={`SlideOptionOverlay ${dlg.display?'show':''}`}  style={ovts} onClick={this.Close.bind(this,dg)}/> :null}        
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
    list: state.dialog.options_slide,
    dialogObserve: state.dialog.dialogObserve    
  };
}

function mapDispatchToPropsDialog(dispatch) {
  return {
    actions: bindActionCreators(dialogActions, dispatch)
  };
}

export default connect(mapStateToPropsDialog, mapDispatchToPropsDialog)(SlideOptionHRM);

