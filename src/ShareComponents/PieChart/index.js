
import React, { Component } from 'react';
import './style.css';

const PieChart2 = (props =>{ 
    var title = props.data.title || '';
    var _list = props.data.slices || [];
    var texT =   props.data.text || '';
    var descP =   props.data.descr || '';
    return (
        <div className={'TtBase'}>
            <figure>
                <div className="figure-content">
                    <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut" aria-labelledby="beers-title beers-desc" role="img">
                        <title id="beers-title">{title}</title>
                        <desc id="beers-desc"></desc>
                        <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff" role="presentation"></circle>
                        <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="transparent" strokeWidth="3" role="presentation"></circle>
                        {
                            _list.map((sl,inD)=>{
                                var _StrokeDasharray = `${sl.size} 100`;
                                var _StrokeColor = `${sl.color}`
                                return(
                                <circle key={`${sl.color}--${inD}`} className="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke={_StrokeColor} strokeWidth="3" strokeDasharray={_StrokeDasharray} strokeDashoffset="0" aria-labelledby="donut-segment-1-title donut-segment-1-desc">
                                    <title id="donut-segment-1-title">{sl.title}</title>
                                    <desc id="donut-segment-1-desc">{sl.description}</desc>
                                </circle>)
                            })
                        }                       
                        <g className="chart-text">
                            <text x="50%" y="50%" className="chart-number">
                                {texT}
                            </text>
                            <text x="50%" y="50%" className="chart-label">
                                {descP}
                            </text>
                        </g>
                    </svg>
                </div>
                <figcaption className="figure-key">
                    <p className="sr-only">Donut chart showing 10 total beers. Two beers are Imperial India Pale Ales, four beers are Belgian Quadrupels, and three are Russian Imperial Stouts. The last remaining beer is unlabeled.</p>

                    <ul className="figure-key-list" aria-hidden="true" role="presentation">
                        {
                            _list.map((sl,inD)=>{
                                //var _StrokeDasharray = `${sl.size} 100`;
                                //var _StrokeColor = `${sl.color}`
                                return(
                                    <li key={`${sl.color}--${inD}`}>
                                    <span className="shape-circle" style={{backgroundColor:sl.color}}></span>{sl.title} {sl.description}
                                    </li>
                                )
                            })
                        }                    
                    </ul>
                </figcaption>
                </figure> 
       </div>
      )
  
});



export default class PieChart extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          lastHover:null
        };
      }
  componentDidMount() {  
  } 
  
  
 
  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { Id,data} = this.props;
    return (
      <div ref={this.ref}> 
        <PieChart2  Id={Id} data={data} visible={this.state.open}/>    
      </div>
    );
  }
}
