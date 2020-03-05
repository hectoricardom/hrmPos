
import { React, observer } from '../../../../Utils/Sources'
import './style.css';

const _ToolTip = observer(props =>{  
    const {visible,text,orientation,opacity} = props;
    var _ttW = 0;
    if(text.length>0){
         _ttW = text.length*7+35;
    }
    var toolTipStyle = {right: `20px`, left: `auto`, top: `-10px`,bottom: `auto`, width:`${_ttW}px`}
    if(orientation==='right'){
        toolTipStyle = {right: `auto`, left: `25px`, top: `-10px`,bottom: `auto`, width:`${_ttW}px`}
    }        
    var _opacity = opacity || `0.75`;
    if(visible && props.text.length>0){        
        if(orientation==='right'){
          toolTipStyle = { right: `auto`, left: `25px`, top: `-10px`,bottom: `auto`,opacity:_opacity, visibility: `visible`, width:`${_ttW}px`, transition:`opacity 250ms cubic-bezier(0.8, 0, 0.6, 1) 750ms, transform 250ms cubic-bezier(0.8, 0, 0.6, 1) 750ms`}
        }else{
            toolTipStyle = { right: `20px`, left: `auto`, top: `-10px`,bottom: `auto`,opacity:_opacity, visibility: `visible`, width:`${_ttW}px`, transition:`opacity 250ms cubic-bezier(0.8, 0, 0.6, 1) 750ms, transform 250ms cubic-bezier(0.8, 0, 0.6, 1) 750ms`}
        }  
    }    
    

    return (
        <div className={'TtBase'}>
            <div className={`tooltip`} style={toolTipStyle}>      
                <div className="tooltipText" >
                    {props.text}
                </div>
            </div>
            {props.chilD}
       </div>
      )
  
});



@observer
export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          lastHover:null
        };
      }
  componentDidMount() {  
    var _th6_ = this;    
    if(this.MS_Elem.children[0]){
        _th6_.MS_Elem.children[0].addEventListener('mouseover', _th6_.hoverOpen.bind(_th6_))
        _th6_.MS_Elem.children[0].addEventListener('mouseout', _th6_.hoverClose.bind(_th6_))      
    }
    
  } 
  
  
  hoverOpen=e=>{
    var _th6_ = this;
    if(window.outerWidth<=715){
        this.setState({open:false});  
    }else{        
        var Cdt = new Date()
        if(_th6_.state.lastHover+6<Cdt.getTime()){
            this.setState({lastHover:Cdt.getTime()});
            this.setState({open:true});            
        }
    }
    this.setState({dmt:e.target.getBoundingClientRect()});
  }
  hoverClose=e=>{
    var _th6_ = this;
    var Cdt = new Date()
    if(_th6_.state.lastHover+6<Cdt.getTime()){
        this.setState({open:false});
    }    
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const {commonStore, Id, text , orientation, children,opacity} = this.props;
    return (
      <div ref={this.ref}> 
        <_ToolTip common={commonStore} Id={Id} chilD={children} visible={this.state.open} text={text} orientation={orientation} opacity={opacity}/>    
      </div>
    );
  }
}




