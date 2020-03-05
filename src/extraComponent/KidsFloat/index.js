
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';

import './style.css';


import Icons from '../Icons/Icons';
import * as Util from '../../state/Util';



class KidsListFloat extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      valid : true,
    };
  }
  componentWillMount() {    
  }

  componentDidMount() {  
      
  }

  handleBack = e => {
    var id = this.props.add?'AddattendancesKid':'RmvattendancesKid';    
    if (typeof this.props._close === 'function') { 
      this.props._close(id);
    }
  };
  

  handleClick = e => {    
    if (typeof this.props.onChange === 'function') { 
      this.props.onChange();
    } 
  };
  
  handleAddKid = e => {  
    var aG = {kid:e,group:this.props._id}  
    this.props._commonActions.AddAttendance(aG);
    this.handleBack(); 
  }; 

  handleRmvKid = e => {  
    var aG = {id:e}
    this.props._commonActions.RmvAttendance(aG);
    this.handleBack(); 
  };

  

  
  refT = r => {
    this._TextPopup = r
  }

 
  render() {     
    const {formObserve,kidsObject, attendancebyGroup, _id, add } = this.props;    
    var heightStyle = {height:`100vh`};
    var kidOnGroup = attendancebyGroup?attendancebyGroup[_id]?Util.convertArray2Obj(attendancebyGroup[_id],'kid'):{}:{};

    if(add){
      let list = []
      Util.ObjectKeys(kidsObject).map(kd=>{
        if(!kidOnGroup[kd]){
          list.push(kidsObject[kd]);
        }
      })
      return (    
        <div className="DateContainerBox" style={heightStyle}>  
          <div className="InputDateContainer1" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>
            <div className="inputWrapperCalendar">
              <div className="center--Container Icon" onClick={this.handleBack.bind(this)}>
                <Icons name={'arrowBack'} color={'#777'} size={24}/>
              </div>               
              <div className="flexSpace"/>
              <div className={'__kids_relation__'}><h5>{add?'Add kid to Shift':'Remove kid from Shift'}</h5></div>
            </div>              
          </div>   
          <div className="finance__Wrapper">      
            <div className="finance__Container">        
            {list.map(kds=>{
                return (
                  <div className={'__Item_Finance'}  key={kds.id}  onClick={this.handleAddKid.bind(this,kds.id)}>
                    <div className={'__details--'}>                      
                      <div className={'__categories__'}> {kds.name}</div>                                        
                    </div>
                  </div> 
                )
              })} 
            </div> 
          </div>
        </div>
    )
    }else{       
      return (    
        <div className="DateContainerBox" style={heightStyle}>  
          <div className="InputDateContainer1" style={{padding: `8px 8px 19px`, borderBottom: `1px solid #eee`}}>
            <div className="inputWrapperCalendar">
              <div className="center--Container Icon" onClick={this.handleBack.bind(this)}>
                <Icons name={'arrowBack'} color={'#777'} size={24}/>
              </div>               
              <div className="flexSpace"/>
              <div className={'__kids_relation__'}><h5>{add?'Add kid to Shift':'Remove kid from Shift'}</h5></div>
            </div>              
          </div>     
          <div className="finance__Wrapper">      
            <div className="finance__Container">        
            {Util.ObjectKeys(kidOnGroup).map(k=>{
              var _iD_= k && kidOnGroup[k]?kidOnGroup[k].id?kidOnGroup[k].id:null:null;
              var kds = kidsObject[k];
              if(_iD_ && kds){
                return (
                  <div className={'__Item_Finance'}  key={kds.id} onClick={this.handleRmvKid.bind(this,_iD_)} >
                    <div className={'__details--'}>                      
                      <div className={'__categories__'}> {kds.name}</div>                                        
                    </div>
                  </div> 
                )
              }else{
                return null
              }                
            })} 
            </div> 
          </div>
        </div>
    )
    }
    
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
    dialogActions: bindActionCreators(dialogActions, dispatch),
    _commonActions: bindActionCreators(commonActions, dispatch),    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KidsListFloat);



