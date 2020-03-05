import React, { Component } from 'react';
import './style.css';


export default class Dialog extends Component {
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
    const { Id, children,rmvbckColor } = this.props;
    var _h = this.state.height;
    var _w = this.state.width;
    if(this.state.visible){ 
      var StyleDlg = {},StyleOverlay={}
      if(this.state.display){
        StyleDlg = { opacity: 1,width:_w+'px', visibility: `visible`,height:_h+'px',minHeight:_h+'px',marginTop: `-${_h/2}px`,marginLeft: `-${_w/2}px`}
        StyleOverlay={opacity: 1, visibility: `visible`};
      }
      if(rmvbckColor){
        StyleDlg['backgroundColor']='transparent';
        StyleDlg['boxShadow']='none';
        
      }
      
     
      return (
        <div>           
          <div ref={this.ref} className="h_Dialog" id={Id} style={StyleDlg}>
            {children}
          </div>
          <div className="h_DialogOverlay" onClick={this.Close.bind(this)} style={StyleOverlay}/>        
        </div>
      )
    }
    else{return(null)}
  }
}




