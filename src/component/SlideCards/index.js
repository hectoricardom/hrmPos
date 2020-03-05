

import React, { Component } from 'react';
import './style.css';


export default class SlideCards extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      widthList:[],
      matrix:0,
      last_index:1,
      next_index:1,
      index:0
    };
  }



  componentWillMount(){  
    this.updSlide = this.updSlide.bind(this)
  }

  componentDidMount(){  
   
  }

 
  updSlide(i){   
    var _th = this;    
    if(i!==_th.state.index){
      var tr = _th.state.index-i>0?980:-980;
      _th.setState({matrix:tr,next_index:i})
      setTimeout(()=>{
        var nI = i+1<_th.props.children.length?i+1:0;
        var lnI = _th.state.next_index;
        _th.setState({index:i,next_index:nI,matrix:0,last_index:lnI})
      },100);
    }    
  }

  ref = r => {
    this.SM = r
  }
  

  render() {     
    var _th = this;   
   
  
    var slides_control = {position: 'relative', transform: `matrix(1, 0, 0, 1, 0, 0)`}
    const {next_index, index, matrix} = _th.state;
    const {updSlide} = _th;
    const {h, dots, activeTab} = _th.props;
    var hh = h || 200;
    let activeIndex = activeTab || index;
    return (
          <div className="slides-container">
            <div className="slides-control" style={slides_control}>
            {_th.props.children.map((sl,i)=>{
              var classN = `tabs-tab`
              var sliderStyle = {display: 'none', zIndex: 0,  visibility: 'hidden', opacity: 0, transform: 'matrix(1, 0, 0, 1, 0, 0)'};
              if(0===i){
                classN += ` tabs-tab-first`             
              } 
              if(activeIndex===i){
                sliderStyle = {display: 'block', zIndex: 10, visibility: 'inherit', opacity: 1, transform: `matrix(1, 0, 0, 1, ${matrix}, 0)`};  
                classN += ` tab-is-active`             
              }
              if(next_index===i){
                sliderStyle = {display: 'block', zIndex: 0, visibility: 'hidden', opacity: 0, transform: `matrix(1, 0, 0, 1, ${matrix*-1}, 0)`};
              }
             // console.log(activeIndex,i)
             // console.log(sl)
             // console.log('*********')
              return(
                  <div key={i} className={classN} data-card-index={`${i}`} style={sliderStyle}>
                  {activeIndex===i?
                    sl:null}
                  </div>
                )
            })}
            </div>
            {dots?
            <ul className="slides-pagination" style={{zIndex: 100}}>
              {_th.props.children.map((sl,i)=>{
                var classN = index===i?"slides-pagination-item active":"slides-pagination-item";                
                return(
                  <li  key={i} className={classN}>
                    <a className="slides-pagination-link" data-slides-pagination-item={`${i}`} onClick={()=>updSlide(i)}></a>
                  </li>
                )
              })}
            </ul>
            :null}
          </div>
      );
     
  }  
}



