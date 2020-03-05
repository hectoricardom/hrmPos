import React, { Component } from 'react';
import './style.css';
import TabsHRM from '../TabsHRM';
import IngresosMobile from '../IngresosMobile';

import Ingresos from '../Ingresos';

import Groups from '../Groups';
import * as Util from '../../state/Util';
import CarouselHRM from '../carouselHRM';
import SlideCards from '../SlideCards';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';

const _tabs = ['gastos' ,'ingresos','contractors','groups'];

class Finances extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,
      index:0,
      orientation:false
    };
  }


  
  componentDidMount() {  
    window.localStorage.setItem('c_id',1); 
   
    var ind = null;
    
    /*
    _tabs.map((t,i)=>{
      if(t===section){
        ind=i;
      }
    })
*/
    const {location, history} = this.props;
    var s = Util.parseQuery(location.search);
    
    if(s.tb){    
      _tabs.map((t,_i)=>{
        if(t===s.tb){
          ind=_i;
        }
      })
    } 



    if(ind){
      this.setState({index:ind});
      this.SldCard.updSlide(ind);
    }
  }  

  componentWillMount(){   
  
  }
  

  componentWillUnmount(){
    
  }

  UpdateIndex(i){
    this.setState({index:i});
    this.SldCard.updSlide(i)
  }


  ref = r => {
    this.SldCard = r
  }
  

  render() {
    const {isMobile} = this.props;

      return (
        <div className="finance_wrapper_comp_">
          <TabsHRM data={_tabs} UpdateIndex={this.UpdateIndex.bind(this)}  pth={'finances'} initValue={this.state.index}/>
          <SlideCards  ref={this.ref}>
            {isMobile?<IngresosMobile _indX={this.state.index+1}  operation={'gastos'}/>:<Ingresos _indX={this.state.index+1}  operation={'gastos'}/>}  
            {isMobile?<IngresosMobile _indX={this.state.index+1}  operation={'ingresos'}/>:<Ingresos _indX={this.state.index+1}  operation={'ingresos'}/>} 
            <div/>
            <Groups  _indX={this.state.index+1}/> 
          </SlideCards>
        </div>
      ) 
  }
}



function mapStateToProps(state, ownProps) {
  return {
    /*
    formsAll: state.common.forms,
    formObserve: state.common.formObserve,    
    gettingObserve:state.common.gettingObserve,
    filterObserve: state.common.filterObserve,
    data:state.common.filters[ownProps.operation],
    groups: state.common.filters["groups"],
    dataObj: state.common[ownProps.operation],
    categories: state.common.categories,
    calendar: state.common.calendar,
    year: state.common.year,
    month: state.common.month,
    */
    isMobile: state.common.isMobile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch)
  };
}

export default  connect(mapStateToProps, mapDispatchToProps)(Finances);










//   <CarouselHRM  activeTab={this.state.index}>  </CarouselHRM> 
        












