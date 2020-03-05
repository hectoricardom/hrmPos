import React, { Component } from 'react';
import './style.css';
import TabsHRM from '../TabsHRM';
import Kids from '../Kids';
import Attendance from '../Attendance';
import Groups from '../Groups';
import * as Util from '../../state/Util';
import CarouselHRM from '../carouselHRM';

import SlideCards from '../SlideCards';

var _tabs = ['kids' ,'attendances','groups'];
var _Type = 'daycare'
export default class Daycare extends Component {
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
    window.localStorage.setItem('c_id',2); 
    var ind = null;
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
      this.SldCard.updSlide(ind)
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
      return (
        <div className="finance_wrapper_comp_">
          <TabsHRM data={_tabs} UpdateIndex={this.UpdateIndex.bind(this)} pth={'daycare'} initValue={this.state.index}/>
          <SlideCards  ref={this.ref}>
            <Kids _indX={this.state.index+1}/>
            <Attendance _indX={this.state.index+1}/>                         
            <Groups  _indX={this.state.index+1}/>  
          </SlideCards>              
        </div>
      ) 
  }
}
















