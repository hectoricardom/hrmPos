

//import {Util, InputDate,InputText,InputSelect,Toast, Dialog} from '../ShareComponents';

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import './style.css';
import * as Util from '../../state/Util';
import Icons from '../Icons/Icons'


class FilterGroupByDate extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      active:0,
      validForm:true,
      asc:true      
    };
  }
  componentDidMount() {  
    
  }  
  componentWillUnmount(){
    
  }

 

  handlerSaveForm(i){ 
    if(typeof this.props.updChange === "function"){      
      this.props.updChange(i);
    }  
  }

  handlerInputValue(field,value){ 
    
  }

  handleSaveEdit(i){    
    if(typeof this.props.handleSaveEdit === "function"){      
      this.props.handleSaveEdit(i)
    }
  }

  clearFilter(){
    if(typeof this.props.clearFilter === "function"){      
      this.props.clearFilter();
    } 
  }


  dialogClose(){
    if(typeof this.props.closeView === "function"){      
      this.props.closeView();
    } 
  }

  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { list, active, year, month  } = this.props;
    let lng = localStorage.getItem('lng');
    var _arr = [];
    Util.ObjectKeys(list).map(yr=>{
      _arr = _arr.concat(Util.ObjectKeys(list[yr]['list']));
    })
    _arr = _arr.sort(function(a, b) {
      if(a > b) { return -1; }
      if(a < b) { return 1; }
      return 0;          
    })
    return (
      <div className="__form_group__">
        <div  className={`_form_group_cancel_`}>
        <div className={'__save__btn '}>
            <div className="center--Container grayStyle arrowBack" onClick={this.dialogClose.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv grayStyle "/>
              <Icons name={'arrowBack'} color={'#6f6f6f'} size={24}/>             
            </div> 
          </div>          
          <div className="flexSpace"/>
          <div className={'__save__btn '} >
            <div className="center--Container grayStyle" style={{"--color-tab--base--hover":'#777'}}>
              <div className="hoverDiv orangeFlex "/>
              <span className="text2D orangeFlex">{'Group by Date'}</span>              
            </div> 
          </div>       
        </div>
        <div className={'option--wrapper'}>          
          <div className="__body__">
            {_arr.map(mnt=>{
              var y = Math.floor(mnt/12);
              var m = mnt-(y*12);
              if(year===y){
                return (
                  <div className={`__sort_options-- __groupby  __sort_options-- ${month===m?"__active":''} `} key={Util.gen6CodeId()} >
                    <div className={'__gbItemWrapp__'} onClick={this.handlerSaveForm.bind(this,m)}>
                      <div  className={'__icons--'}>
                          <Icons name={month===m?"success":'calendar'} color={'#1967d2'} size={18}/>
                      </div>
                      <div  className={'__descr__'}>
                          {`${Util._monthNames[lng][m+1]}, ${y}`}
                      </div>
                    </div>
                    <div className="flexSpace"/>
                    {false && month===m?<div  className={'__icons-- _rmvFilter__'}  onClick={this.clearFilter.bind(this)}>
                        <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                    </div>:null}
                                    
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



function mapStateToProps6(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve,
    year: state.common.year,
    month: state.common.month  
  };
}

function mapDispatchToProps6(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps6, mapDispatchToProps6)(FilterGroupByDate);


