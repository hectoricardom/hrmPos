import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions from '../../state/dialogActions';
import './style.css';


class ViewSlideHRM extends Component {
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
                  var StyleDlg = {}; 
                  if(dlg.display){
                    StyleDlg = { opacity: 1, visibility: `visible`,zIndex:dlg.zIndex}                   
                  }                 
                  return (
                    <div ref={this.ref} key={dg} className={`ViewSlideHRM ${dlg.display?'show':''}`} id={dg} style={StyleDlg}>
                    {dlg.content?dlg.content:null}
                    </div> 
                  )
                }
                else{return(null)}
              })

            }   
                              
            </div>
         )
        
     
  }
}


function mapStateToPropsDialog(state, ownProps) {
  return {
    list: state.dialog.viewSlides,
    dialogObserve: state.dialog.dialogObserve
    
  };
}

function mapDispatchToPropsDialog(dispatch) {
  return {
    actions: bindActionCreators(dialogActions, dispatch)
  };
}

export default connect(mapStateToPropsDialog, mapDispatchToPropsDialog)(ViewSlideHRM);


/*
                    if(dlg.display){
                    StyleDlg = { opacity: 1, visibility: `visible`}
                    StyleOverlay={opacity: 1, visibility: `visible`};
                  }
                  */