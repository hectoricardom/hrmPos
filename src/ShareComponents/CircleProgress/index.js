import { React  } from '../../../../Utils/Sources'

import './style.css';


export default class CircleProgress extends React.Component {
  componentWillMount() {
    
  }
  componentDidMount() {  
    var _th6 = this;
  }
  render() {
    const {progress,color,widthBar} =  this.props;
    var strokeDashoffset = 125-(progress*1.25);
    var strokeWidth = widthBar || 4;
    var StyleStroke = {stroke: color || `rgb(0, 174, 239)`, strokeDashoffset:strokeDashoffset, strokeWidth: `${strokeWidth}px`}
    var Icon = null
    if(progress>99){
      StyleStroke = {fill: color || `rgb(0, 174, 239)`, strokeDashoffset:strokeDashoffset, strokeWidth: `${strokeWidth}px`}
      Icon = <polyline points="25,10 15,20 35,35" fill="transparent" stroke="#fff" strokeLinecap="round" strokeWidth="6px"/>
    }
    
    
    return(
      <div className={`CircleProgressContainer`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height={`100%`} width={`100%`}>          
            <circle  cx="24" cy="24" r="20" fill="transparent"  strokeLinecap="round" strokeDasharray="125"  strokeDashoffset="0" style={StyleStroke}></circle>
            {Icon}
        </svg>      
      </div>
    )
  }
}

