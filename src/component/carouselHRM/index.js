import React, { Component } from 'react';


import * as Util from '../../state/Util';


import './style.css';

export default class CarouselHRM extends Component {
   constructor(props) {
     super(props);      
     this.state = {      
       active:0,
       activeTab:1,
       asc:false,
       key:0,      
     };
   }
 
  
    componentWillMount() {      
      
    }
 
    componentDidMount(){     
       
    }


    render() { 
      var _th6_ = this;
      const {children,activeTab} = _th6_.props;      
      
      var itemWidth = 100/children.length;      
      var translate3d = itemWidth * activeTab;

      var totalWidth = children.length*100;
      var carousel_element_Style = {
         transform:`translate3d(-${translate3d}%, 0, 0)`,
         WebkitTransform: `translate3d(-${translate3d}%, 0, 0)`,
         MsTransform:`translate3d(-${translate3d}%, 0, 0)`,
         width:totalWidth+'%'
      }
      var carousel_slide_Style = {
         width:itemWidth+'%'
      }     
      return(
         <div className="" carousel={`true`}>
            <div className="carousel-wrapper">
               <div className="carousel-element grab" style={carousel_element_Style}>
                  {
                     children.map((tbs,in3)=>{
                        return (
                        <div className={`carousel-slide ${activeTab===in3?'active':''}`} style={carousel_slide_Style} key={Util.genId()}>                         
                           {tbs}
                        </div> 
                        ) 
                     })
                  }
                                
               </div>               
            </div>
         </div>
      )
    }
   }
 





