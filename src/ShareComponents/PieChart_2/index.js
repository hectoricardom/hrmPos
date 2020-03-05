
import React, { Component } from 'react';
import './style.css';


const data = {
    size: 310,
    sectors: [
        {
            percentage: 0.458,
            label: 'Thing 1'
        },
        {
            percentage: 0.083,
            label: "Thing Two"
        },
        {
            percentage: 0.083,
            label: "Another Thing"
        },
        {
            percentage: 0.083,
            label: "Pineapple"
        }
        ,
        {
            percentage: 0.083,
            label: "Mango"
        }
      
    ]
}

export default class PieChart22 extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          open:false,
          sectors:[],
          lastHover:null
        };
      }
  componentDidMount() {  
    var _th6_ = this; 
    var sectors = calculateSectors(data);
    this.setState({sectors:sectors})
  } 
  
  



 
  ref = r => {
    this.MS_Elem = r
  }
  render() {  
    const { Id,data} = this.props;
   
    var sectors = this.state.sectors;
    //var d = `M ${sector.L} , ${sector.L} L${sector.L} ,0 A ${sector.L} , ${sector.L} 0 0,1 ${sector.X}, ${sector.Y} z`;
    
    return (
      <div ref={this.ref}> 


       
<svg width="900" height="500" aria-label="A chart." style={{overflow: 'hidden'}}>   
    <rect x="0" y="0" width="900" height="500" stroke="none" strokeWidth="0" fill="#ffffff"></rect>    
    <g>
        <text text-anchor="start" x="161" y="70.9" fontFamily="Arial" fontSize="14" fontHeight="bold" stroke="none" strokeWidth="0" fill="#000000">My Daily Activities</text>
        <rect x="161" y="59" width="579" height="14" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
    </g>
    <g>
        <rect x="542" y="96" width="198" height="106" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
        <g column-id="Work"><rect x="542" y="96" width="198" height="14" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
            <g>
                <text text-anchor="start" x="561" y="107.9" fontFamily="Arial" fillOpacity="14" stroke="none" strokeWidth="0" fill="#222222">Work</text>
            </g>
            <circle cx="549" cy="103" r="7" stroke="none" strokeWidth="0" fill="#3366cc">
            </circle>
        </g>
    </g>    

    {
        sectors.map((sector,i)=>{
            var dPath = `M ${sector.L} , ${sector.L} L${sector.lastX} ,${sector.lastY} A ${sector.L} , ${sector.L} 0 0,${sector.arcSweep} ${sector.X}, ${sector.Y} z`;

            var rotate = `rotate(${sector.R},${sector.L},${sector.L})`
            
                return(
                    <g transform={rotate}>
                        <path d={dPath} stroke={sector.color} strokeWidth="1" fill={sector.color}></path>
                        <text text-anchor="start" x="324" y="341.9845131804535" fontFamily="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
                    </g>
                    )
            
            
        })
        
    }
</svg>



      </div>
    );
  }
}




function calculateSectors( data ) {
    var sectors = [];
    var colors = [
        "rgb(51, 102, 204)", "rgb(220, 57, 18)", "rgb(255, 153, 0)", "rgb(16, 150, 24)", "rgb(16, 150, 24)"
    ];    
    var l = data.size / 2
    var d = data.size // Angle
    var a = 0 // Angle
    var aRad = 0 // Angle in Rad
    var z = 0 // Size z
    var x = 0 // Side x
    var y = 0 // Side y
    var X = 0 // SVG X coordinate
    var Y = 0 // SVG Y coordinate
    var R = 0 // Rotation
    var st = 0,
    lastX = l,
    lastY = 0;
    var angles = 360;       






    data.sectors.map( function(item, key ) {
         
        var arcSweep = 0;
        var per = item.percentage;
        st = per;
        a = 360 * per;

        
        var aCalc = 0;
        var factor = l/(90);
        var x2 = 0,y2=0;
        if(a<=90){
            x2= l+a*(factor)
            y2= a*(factor)
        }
        if(a>90&&a<=180){
            let a90= a-90;
            x2= d-(a90*factor);
            y2= a*(factor)
        }
        if(a>180&&a<=270){
            let a180 = a-180;
            x2= l-(a180)*(factor)
            y2= l-(x2)*(factor)
        }

        
        
        aCalc = ( a > 180 ) ? 360 - a : a;  
        aRad = aCalc * Math.PI / 180;

        z = Math.sqrt( 2*l*l - ( 2*l*l*Math.cos(aRad) ) );          

        
        if( aCalc <= 90 ) {
            x = l*Math.sin(aRad);
        }
        else {
            x = l*Math.sin((180 - aCalc) * Math.PI/180 );
        }
        
        
        
        y = Math.sqrt( z*z - x*x );
        Y = y;
        
        if( a <= 180 ) {
            X = l + x;
            arcSweep = 0;
        }
        else {
            X = l - x;
            arcSweep = 1;
        }
        
        
        sectors.push({
            percentage: item.percentage,
            label: item.label,
            color: colors[key],
            arcSweep: arcSweep,
            X:X,
            Y:Y,
            R:R,
            L:l,
            lastX :lastX,
            lastY:lastY
        });
        lastX = x;
        lastY = y;
        R = R + a;
    })


    return sectors
}




function calculateRadiansSectors( data ) {
    var sectors = [];
    var colors = [
        "rgb(51, 102, 204)", "rgb(220, 57, 18)", "rgb(255, 153, 0)", "rgb(16, 150, 24)", "rgb(16, 150, 24)"
    ];    
    var l = data.size / 2
    var a = 0 // Angle    
    var y = 0 // Side y   
    var R = 0 // Rotation
    var lastX = l,
    lastY = 0;  

    data.sectors.map( function(item, key ) {
        
        var arcSweep = 0;
        var per = item.percentage;        
        a = 360 * per;
        var radians = a*Math.PI/180;
        var x = Math.sin(radians) * l;        
        var cy = Math.cos(radians) * l;
        y = l - cy;
        var sweep = radians > Math.PI ? 1: 0;
        var path = `M ${l} ${l} l 0 ${-l} a ${l} ${l} 0 ${sweep} 1 ${x} ${y} Z`;       
        sectors.push({
            percentage: item.percentage,
            label: item.label,
            color: colors[key],
            arcSweep: arcSweep,
            d: path,
            R:R,
            L:l,
            lastX :lastX,
            lastY:lastY
        });
        lastX = x;
        lastY = y;
        R = R + a;
    })


    return sectors
}






/*
transform=rotate(162,115,115)

 0.15  --        d: path("M 115 115 L 230 115 A 115 115 0 0 1 226.387 86.4007 Z");


 0.45  --    M 115 , 115 L115 ,0 A 115 , 115 1 0,1 150.53695435311894, 224.37149937394264 z


    {
    
    <g>
        <path d="M191.2474227514835,267.48650635663057L191.2474227514835,298.2865063566306A154,123.2,0,0,1,186,266.4L186,235.6A154,123.2,0,0,0,191.2474227514835,267.48650635663057" stroke="#730073" strokeWidth="1" fill="#730073"></path>
        <path d="M340,235.6L340,266.4L191.2474227514835,298.2865063566306L191.2474227514835,267.48650635663057" stroke="#730073" strokeWidth="1" fill="#730073"></path>
        <path d="M340,235.6L191.2474227514835,267.48650635663057A154,123.2,0,0,1,340,112.39999999999999L340,235.6A0,0,0,0,0,340,235.6" stroke="#990099" strokeWidth="1" fill="#990099"></path>
        <text text-anchor="start" x="225.9254422466341" y="184.19496130385247" fontFamily="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">29.2%</text>
    </g>
    <g>
        <path d="M231.1055556972717,322.7155554421827L231.1055556972717,353.5155554421827A154,123.2,0,0,1,191.2474227514835,298.2865063566306L191.2474227514835,267.48650635663057A154,123.2,0,0,0,231.1055556972717,322.7155554421827" stroke="#0c7112" strokeWidth="1" fill="#0c7112"></path>
        <path d="M340,235.6 L340,266.4L231.1055556972717,353.5155554421827L231.1055556972717,322.7155554421827" stroke="#0c7112" strokeWidth="1" fill="#0c7112"></path>
        <path d="M340,235.6 L231.1055556972717,322.7155554421827A154,123.2,0,0,1,191.2474227514835,267.48650635663057L340,235.6A0,0,0,0,0,340,235.6" stroke="#109618" strokeWidth="1" fill="#109618"></path>
        <text text-anchor="start" x="218.64261564909316" y="287.9459290885666" fontFamily="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
    </g>    
    <g>
        <path d="M300.1418670542118,354.6020617988132L300.1418670542118,385.40206179881324A154,123.2,0,0,1,231.1055556972717,353.51555544218263L231.1055556972717,322.7155554421827A154,123.2,0,0,0,300.1418670542118,354.6020617988132" stroke="#bf7300" strokeWidth="1" fill="#bf7300"></path>
        <path d="M340,235.6 L340,266.4L300.1418670542118,385.40206179881324L300.1418670542118,354.6020617988132" stroke="#bf7300" strokeWidth="1" fill="#bf7300"></path>
        <path d="M340,235.6 L300.1418670542118,354.6020617988132A154,123.2,0,0,1,231.1055556972717,322.7155554421827L340,235.6A0,0,0,0,0,340,235.6" stroke="#ff9900" strokeWidth="1" fill="#ff9900"></path>
        <text text-anchor="start" x="262.04294164590334" y="324.203962906308" fontFamily="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
    </g>
    <g>
        <path d="M379.8581329457882,354.6020617988132L379.8581329457882,385.40206179881324A154,123.2,0,0,1,300.1418670542118,385.4020617988132L300.1418670542118,354.6020617988132A154,123.2,0,0,0,379.8581329457882,354.6020617988132" stroke="#a52b0e" strokeWidth="1" fill="#a52b0e"></path>
        
        <path d="M340,235.6 L379.8581329457882,354.6020617988132 A154,123.2,0,0,1,300.1418670542118,354.6020617988132L340,235.6A0,0,0,0,0,340,235.6" stroke="#dc3912" strokeWidth="1" fill="#dc3912"></path>
        <text text-anchor="start" x="324" y="341.9845131804535" fontFamily="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
    </g>
     }

<svg style="width: <diameter>px; height: <diameter>px;">
    <path fill="#61C0BF" d="M<radius>,<radius> L<radius>,0 A<radius>,<radius> 1 0,1 <X>, <Y> z"></path>
</svg>

<defs id="_ABSTRACT_RENDERER_ID_0">
        <filter id="_ABSTRACT_RENDERER_ID_1">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"></feGaussianBlur>
            <feOffset dx="1" dy="1"></feOffset>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.1"></feFuncA>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
    </defs>



1.27 factor



1.0008
Y 0.017543091585008507 1.2787999999999997 X 117.00863219844742 116.2788
45
Y 33.682720163547074 57.49999999999999 X 196.31727983645294 172.5
90
Y 115.00000000000001 114.99999999999999 X 230 230





1.0008
Y 0.017543091585008507 1.2787999999999997 X 117.00863219844742 116.2788
2.0016
Y 0.07016701406666946 2.5575999999999994 X 119.01665156874432 117.5576
3.0024
Y 0.15785571196494658 3.8364 X 121.0234454697124 118.8364
3.996
Y 0.2795744588254254 5.106 X 123.01398550353058 120.106
5.004
Y 0.4383097297804061 6.393999999999999 X 125.03090835518637 121.394









1.0008 1.2777777777777777
Y,0.017543091585008507,1.2787999999999997,X,117.00863219844742 , 116.2788
2.0016 1.2777777777777777
Y,0.07016701406666946,2.5575999999999994,X,119.01665156874432 , 117.5576
4.0032 1.2777777777777777
Y,0.2805824317319913,5.115199999999999,X,123.02840163406061 , 120.1152
8.0064 1.2777777777777777
Y,1.120960570396175,10.230399999999998,X,131.01762712110522 , 125.2304
16.0128 1.2777777777777777
Y,4.461989192882984,20.460799999999995,X,146.72299113900925 , 135.4608
32.0256 1.2777777777777777
Y,17.501707248794048,40.92159999999999,X,175.98428412796324 , 155.92159999999998
64.0512 1.2777777777777777
Y,64.67970279304602,81.84319999999998,X,218.40632325445006 , 196.84319999999997
128.1024 1.2777777777777777
Y,185.96291633050123,163.68639999999996,X,205.4945551172571 , 181.3136
256.2048 1.2777777777777777
Y,142.4219914064397,92.47635555555551,X,3.3172601190983215 , 17.62720000000003



0.017543091585008507
0.07016701406666946
0.2805824317319913
1.120960570396175
4.461989192882984
17.501707248794048
64.67970279304602
185.96291633050123
142.4219914064397

        
<svg width="900" height="500" aria-label="A chart." style={{overflow: 'hidden'}}>
   {/*   <defs id="_ABSTRACT_RENDERER_ID_0">
        <filter id="_ABSTRACT_RENDERER_ID_1">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"></feGaussianBlur>
            <feOffset dx="1" dy="1"></feOffset>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.1"></feFuncA>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
    </defs>
    <rect x="0" y="0" width="900" height="500" stroke="none" strokeWidth="0" fill="#ffffff"></rect>
    <g>
        <text text-anchor="start" x="161" y="70.9" font-family="Arial" fontSize="14" font-weight="bold" stroke="none" strokeWidth="0" fill="#000000">My Daily Activities</text>
        <rect x="161" y="59" width="579" height="14" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
    </g>
    <g>
        <rect x="542" y="96" width="198" height="106" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
        <g column-id="Work"><rect x="542" y="96" width="198" height="14" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
            <g>
                <text text-anchor="start" x="561" y="107.9" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#222222">Work</text>
            </g>
            <circle cx="549" cy="103" r="7" stroke="none" strokeWidth="0" fill="#3366cc">
            </circle>
        </g>
        <g column-id="Eat">
            <rect x="542" y="119" width="198" height="14" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
            <g>
                <text text-anchor="start" x="561" y="130.9" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#222222">Eat</text>
            </g>
            <circle cx="549" cy="126" r="7" stroke="none" strokeWidth="0" fill="#dc3912"></circle>
        </g>
    </g> 
      
    <g>
        <path d="M494,235.6L494,266.4A154,123.2,0,0,1,379.8581329457882,385.4020617988132L379.8581329457882,354.6020617988132A154,123.2,0,0,0,494,235.6" stroke="#264d99" strokeWidth="1" fill="#264d99"></path>
        <path d="M340,235.6L340,266.4L379.8581329457882,385.40206179881324L379.8581329457882,354.6020617988132" stroke="#264d99" strokeWidth="1" fill="#264d99"></path>
        <path d="M340,235.6L340,112.39999999999999A154,123.2,0,0,1,379.8581329457882,354.6020617988132L340,235.6A0,0,0,0,0,340,235.6" stroke="#3366cc" strokeWidth="1" fill="#3366cc"></path>
        <text text-anchor="start" x="437.8416236784184" y="228.39896761992614" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">45.8%</text>
    </g>
 
    
    <g>
        <path d="M191.2474227514835,267.48650635663057L191.2474227514835,298.2865063566306A154,123.2,0,0,1,186,266.4L186,235.6A154,123.2,0,0,0,191.2474227514835,267.48650635663057" stroke="#730073" strokeWidth="1" fill="#730073"></path>
        <path d="M340,235.6L340,266.4L191.2474227514835,298.2865063566306L191.2474227514835,267.48650635663057" stroke="#730073" strokeWidth="1" fill="#730073"></path>
        <path d="M340,235.6L191.2474227514835,267.48650635663057A154,123.2,0,0,1,340,112.39999999999999L340,235.6A0,0,0,0,0,340,235.6" stroke="#990099" strokeWidth="1" fill="#990099"></path>
        <text text-anchor="start" x="225.9254422466341" y="184.19496130385247" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">29.2%</text>
    </g>
    <g>
        <path d="M231.1055556972717,322.7155554421827L231.1055556972717,353.5155554421827A154,123.2,0,0,1,191.2474227514835,298.2865063566306L191.2474227514835,267.48650635663057A154,123.2,0,0,0,231.1055556972717,322.7155554421827" stroke="#0c7112" strokeWidth="1" fill="#0c7112"></path>
        <path d="M340,235.6L340,266.4L231.1055556972717,353.5155554421827L231.1055556972717,322.7155554421827" stroke="#0c7112" strokeWidth="1" fill="#0c7112"></path>
        <path d="M340,235.6L231.1055556972717,322.7155554421827A154,123.2,0,0,1,191.2474227514835,267.48650635663057" stroke="#109618" strokeWidth="1" fill="#109618"></path>
        <text text-anchor="start" x="218.64261564909316" y="287.9459290885666" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
    </g>    
    <g>
        <path d="M300.1418670542118,354.6020617988132L300.1418670542118,385.40206179881324A154,123.2,0,0,1,231.1055556972717,353.51555544218263L231.1055556972717,322.7155554421827A154,123.2,0,0,0,300.1418670542118,354.6020617988132" stroke="#bf7300" strokeWidth="1" fill="#bf7300"></path>
        <path d="M340,235.6L340,266.4L300.1418670542118,385.40206179881324L300.1418670542118,354.6020617988132" stroke="#bf7300" strokeWidth="1" fill="#bf7300"></path>
        <path d="M340,235.6L300.1418670542118,354.6020617988132A154,123.2,0,0,1,231.1055556972717,322.7155554421827  L340,235.6A0,0,0,0,0,340,235.6" stroke="#ff9900" strokeWidth="1" fill="#ff9900"></path>
        <text text-anchor="start" x="262.04294164590334" y="324.203962906308" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
    </g> }
    <g>
        <path d="M340,235.6L340,112.39999999999999A154,123.2,0,0,1,379.8581329457882,354.6020617988132L340,235.6A0,0,0,0,0,340,235.6" stroke="#3366cc" strokeWidth="1" fill="#3366cc"></path>
        <text text-anchor="start" x="437.8416236784184" y="228.39896761992614" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">45.8%</text>
    </g>


    <g>
       <path d="M340,235.6L231.1055556972717,322.7155554421827A154,123.2,0,0,1,191.2474227514835,267.48650635663057" stroke="#109618" strokeWidth="1" fill="#109618"></path>
        <text text-anchor="start" x="218.64261564909316" y="287.9459290885666" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
    </g>  
     <g>
       <path d="M340,235.6L300.1418670542118,354.6020617988132A154,123.2,0,0,1,231.1055556972717,322.7155554421827  L340,235.6A0,0,0,0,0,340,235.6" stroke="#ff9900" strokeWidth="1" fill="#ff9900"></path>
        <text text-anchor="start" x="262.04294164590334" y="324.203962906308" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
    </g>
    <g>    
    <path d="M340,235.6 L379.8581329457882,354.6020617988132A154,123.2,0,0,1,300.1418670542118,354.6020617988132" stroke="#dc3912" strokeWidth="1" fill="#dc3912"></path>
        <text text-anchor="start" x="324" y="341.9845131804535" font-family="Arial" fontSize="14" stroke="none" strokeWidth="0" fill="#ffffff">8.3%</text>
    </g>

</svg>

*/


