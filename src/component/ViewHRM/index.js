import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions from '../../state/dialogActions';
import './style.css';


class ViewHRM extends Component {
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
    this.Open = this.Open.bind(this);
    this.Close = this.Close.bind(this);
  }



  Open(){    
    var _th6 = this;
    _th6.setState({visible:true});     
    setTimeout(()=>{  
        _th6.setState({display:true});
        setTimeout(()=>{  
          var el = _th6.MS_Elem?_th6.MS_Elem.children[0]?_th6.MS_Elem.children[0].getBoundingClientRect():null:null;
          if(el){
            _th6.setState({height:el.height,width:el.width});   
          }         
        },5)
        //bodyOverflow(true);  
    },25)    
  }

  Close(e){
    var _th6 = this;      
    _th6.setState({display:false});     
    setTimeout(()=>{  
        _th6.setState({visible:false});
        //enableScroll()    
    },25)
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
                  var StyleDlg = {},StyleOverlay={}; 
                  if(dlg.display){
                    StyleDlg = { opacity: 1, visibility: `visible`,zIndex:dlg.zIndex}
                    StyleOverlay={opacity: 1, visibility: `visible`};
                  }                 
                  return (
                    <div ref={this.ref} key={dg} className="ViewHRM" id={dg} style={StyleDlg}>
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
    list: state.dialog.views,
    dialogObserve: state.dialog.dialogObserve
    
  };
}

function mapDispatchToPropsDialog(dispatch) {
  return {
    actions: bindActionCreators(dialogActions, dispatch)
  };
}

export default connect(mapStateToPropsDialog, mapDispatchToPropsDialog)(ViewHRM);


/*
                    if(dlg.display){
                    StyleDlg = { opacity: 1, visibility: `visible`}
                    StyleOverlay={opacity: 1, visibility: `visible`};
                  }
                  */