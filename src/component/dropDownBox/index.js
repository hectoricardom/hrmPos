import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as Util from '../../state/Util';
import Icons from '../Icons/Icons';
import './style.css';



class HRMDropDown extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false, 
      agree :false,
      index:null,
      text:null,
      tab_visible :false,    
    };
  }
  componentDidMount() {  
    const _th = this;
    const {forms,form,field} = _th.props;    
    var i = forms[form]?forms[form][field]:null; 
    i && _th.setState({index:i});
    setTimeout(()=>{
      _th.setState({active:true});
    },250);
  }  
  
  componentWillReceiveProps(nextProps){
    var _initvalue = this.props.initvalue?this.props.initvalue:null;
    var next_initvalue = nextProps.initvalue?nextProps.initvalue:null;
    if(_initvalue!==next_initvalue){
      this.setState({index:next_initvalue});
    }
  }


  componentWillUnmount(){
    
  }

  OpenTabView(){
    const {tab_visible} = this.state;
    this.setState({tab_visible:!tab_visible});
  }

  handleChange = e => {
    var v = e.target.value;
    if(v===''){
      this.setState({text:null});
    }else{
      this.setState({text:v});
    }
    
    
  }

  handleSetItem(i){
    const {tab_visible} = this.state;
    const {form,field} = this.props;
    this.setState({tab_visible:!tab_visible,index:i});
    this.props.actions.UpdateForm(form,field,i);
    if (typeof this.props.OnChange === 'function') { 
      this.props.OnChange(i);
    }
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() { 
     const {title,list} = this.props;
     const {index} = this.state;
     var valid = index?list[index]?list[index].name?true:false:false:false;     
      return (                         
              <div className={`drop-box-container mqn2-be2 ${this.state.active?"active":""} ${valid?"selected":""} ${this.state.tab_visible?'dp-open':''}`}>
                <div className="drop-box-header">
                  <div className="leftIcon">      
                    <div className="material-icons"><Icons name={'success'} className="material-icons" color={'#4285f4'} size={24}/></div>                               
                    <div className="qty">{Util.ObjectKeys(list).length}</div>
                  </div>
                  <div className="center-label">
                    <span onClick={this.OpenTabView.bind(this)}>{index?list[index]?list[index].name:title:title}</span>
                    {/*<input type="text" placeholder="search" onChange={this.handleChange}/>*/}         
                  </div>
                  <div className="status-Icon" onClick={this.OpenTabView.bind(this)}>
                    <div className="material-icons"><Icons name={'arrow_right'} className="material-icons" color={'#7e7e7e'} size={24}/></div>
                  </div>
                </div>
                <div className="dp-open--box">
                {Util.ObjectKeys(list).map((s,i)=>{
                    return(
                      <div key={i} className="info--wrapper ak--dp--items" mqn-inview-fade-in=""  onClick={()=>this.handleSetItem(s)}>
                        <span className="info">  
                        {list[s].name}                    
                        </span>  
                      </div>     
                    )
                  })
                  }                         
                </div>
              </div>
      ) 
  }
}
function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HRMDropDown);
