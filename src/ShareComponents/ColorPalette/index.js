import { React,inject, observer, Link  } from '../../../../Utils/Sources'
import {Util } from '..'
import './style.css';

const _ColorPalette = observer(props =>{
    const setColorActive = e => {        
        if (typeof props.updState === 'function') {      
          props.updState({key:`active`,value:e});     
        }  
  
      };
    return (
      <div className="Hpalette">                
            {
                Object.keys(palette).map((pltC,ind)=>{
                    
                    return (
                    <div className="labels-and-palettes" key={Util.Base64.encode(`labels-and-palettes${ind}@$@${pltC}`)}>
                        {
                            pltC==='Shadows'?<div className="color-labels">
                            <div className="color-label ng-binding" ><div className="color-label-divider"></div></div>  
                        </div>:
                            <div className="color-labels">
                                <div className="color-label ng-binding" style={{}}>{pltC}<div className="color-label-divider"></div></div>  
                            </div>
                        } 
                        <div className="palette-container">
                        {
                            pltC==='Shadows'?
                            palette[pltC].map((clV,ind2)=>{
                                if(clV.Al){
                                    return (
                                        <div className="shades-container" key={Util.Base64.encode(`labels-and-palettes${ind2}@$@${clV.shw}`)}>
                                            <div className="shade">
                                                <span className="">{clV.Al}</span>
                                                <span className="ng-binding">{clV.shw}</span>
                                                <span/>
                                            </div>
                                        </div>                                       
                                    )
                                }else{
                                    return (
                                        <div className="shades-container"  key={Util.Base64.encode(`labels-and-palettes${ind2}@$@${clV.shw}`)}>
                                        <div className="shade">
                                            <span className="align-bottom">{clV.shw}</span>
                                            <span/>
                                        </div>
                                    </div>
                                    )
                                }                                
                            })
                            :
                            palette[pltC].map((clV,ind2)=>{
                                var classT = `color`
                                if(props.active===clV.hex){
                                    classT = `color Active`
                                }
                                return (                                    
                                    <div   key={Util.Base64.encode(`labels-and-palettes${ind2}@$@${clV.hex}`)} className={classT} style={{backgroundColor: clV.rgb }} onClick={()=>{setColorActive(clV.hex)}}></div>
                                )
                            })
                        }
                        
                            
                        
                        </div>
                    </div>
                    )
                })
            }
      </div>
    )  
  
})



@inject('commonStore')
@observer
export default class ColorPalette extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          active : null
        };
      }
  componentDidMount() {  
    var _th6 = this;    
  }  
  ref = r => {
    this.MS_Elem = r
  }

  updateState(e){ 
    var _th2 = this; 
    _th2.setState({[e.key]:e.value});
    if (typeof _th2.props.changeColor === 'function') {      
        _th2.props.changeColor(e);
    }    
  }
  render() {  
    var _th2 = this; 
    const {commonStore } = this.props;
    return (
      <div ref={this.ref}> 
        <_ColorPalette common={commonStore} active={_th2.state.active} updState={_th2.updateState.bind(_th2)}/>    
      </div>
    )
  }
}




const palette = {
    "Shadows": [
        {shw:50,Al:null},{shw:100,Al:null},{shw:200,Al:null},
        {shw:300,Al:null},{shw:400,Al:null},{shw:500,Al:null},
        {shw:600,Al:null},{shw:700,Al:null},{shw:800,Al:null},
        {shw:900,Al:null},{shw:100,Al:'A'},{shw:200,Al:'A'},
        {shw:400,Al:'A'},{shw:700,Al:'A'}
    ],
    "Red":[{ hex:"#FFEBEE" ,label:"Red 50"  ,rgb: `rgb(255, 235, 238)` },
        { hex:"#FFCDD2" ,label:"Red 100"  ,rgb: `rgb(255, 205, 210)` },
        { hex:"#EF9A9A" ,label:"Red 200"  ,rgb: `rgb(239, 154, 154)` },
        { hex:"#E57373" ,label:"Red 300"  ,rgb: `rgb(229, 115, 115)` },
        { hex:"#EF5350" ,label:"Red 400"  ,rgb: `rgb(239, 83, 80)` },
        { hex:"#F44336" ,label:"Red 500"  ,rgb: `rgb(244, 67, 54)` },
        { hex:"#E53935" ,label:"Red 600"  ,rgb: `rgb(229, 57, 53)` },
        { hex:"#D32F2F" ,label:"Red 700"  ,rgb: `rgb(211, 47, 47)` },
        { hex:"#C62828" ,label:"Red 800"  ,rgb: `rgb(198, 40, 40)` },
        { hex:"#B71C1C" ,label:"Red 900"  ,rgb: `rgb(183, 28, 28)` },
        { hex:"#FF8A80" ,label:"Red A100"  ,rgb: `rgb(255, 138, 128)` },
        { hex:"#FF5252" ,label:"Red A200"  ,rgb: `rgb(255, 82, 82)` },
        { hex:"#FF1744" ,label:"Red A400"  ,rgb: `rgb(255, 23, 68)` },
        { hex:"#D50000" ,label:"Red A700"  ,rgb: `rgb(213, 0, 0)` },
        ],
    "Pink":[
        { hex:"#FCE4EC" ,label:"Pink 50"  ,rgb:" rgb(252, 228, 236)"},
        { hex:"#F8BBD0" ,label:"Pink 100"  ,rgb:" rgb(248, 187, 208)"},
        { hex:"#F48FB1" ,label:"Pink 200"  ,rgb:" rgb(244, 143, 177)"},
        { hex:"#F06292" ,label:"Pink 300"  ,rgb:" rgb(240, 98, 146)"},
        { hex:"#EC407A" ,label:"Pink 400"  ,rgb:" rgb(236, 64, 122)"},
        { hex:"#E91E63" ,label:"Pink 500"  ,rgb:" rgb(233, 30, 99)"},
        { hex:"#D81B60" ,label:"Pink 600"  ,rgb:" rgb(216, 27, 96)"},
        { hex:"#C2185B" ,label:"Pink 700"  ,rgb:" rgb(194, 24, 91)"},
        { hex:"#AD1457" ,label:"Pink 800"  ,rgb:" rgb(173, 20, 87)"},
        { hex:"#880E4F" ,label:"Pink 900"  ,rgb:" rgb(136, 14, 79)"},
        { hex:"#FF80AB" ,label:"Pink A100"  ,rgb:" rgb(255, 128, 171)"},
        { hex:"#FF4081" ,label:"Pink A200"  ,rgb:" rgb(255, 64, 129)"},
        { hex:"#F50057" ,label:"Pink A400"  ,rgb:" rgb(245, 0, 87)"},
        { hex:"#C51162" ,label:"Pink A700"  ,rgb:" rgb(197, 17, 98)"},
        ],
        
"Purple": [{ hex:"#F3E5F5",label:"Purple 50" ,rgb:"rgb(243, 229, 245)"},{ hex:"#E1BEE7",label:"Purple 100" ,rgb:"rgb(225, 190, 231)"},{ hex:"#CE93D8",label:"Purple 200" ,rgb:"rgb(206, 147, 216)"},{ hex:"#BA68C8",label:"Purple 300" ,rgb:"rgb(186, 104, 200)"},{ hex:"#AB47BC",label:"Purple 400" ,rgb:"rgb(171, 71, 188)"},{ hex:"#9C27B0",label:"Purple 500" ,rgb:"rgb(156, 39, 176)"},{ hex:"#8E24AA",label:"Purple 600" ,rgb:"rgb(142, 36, 170)"},{ hex:"#7B1FA2",label:"Purple 700" ,rgb:"rgb(123, 31, 162)"},{ hex:"#6A1B9A",label:"Purple 800" ,rgb:"rgb(106, 27, 154)"},{ hex:"#4A148C",label:"Purple 900" ,rgb:"rgb(74, 20, 140)"},{ hex:"#EA80FC",label:"Purple A100" ,rgb:"rgb(234, 128, 252)"},{ hex:"#E040FB",label:"Purple A200" ,rgb:"rgb(224, 64, 251)"},{ hex:"#D500F9",label:"Purple A400" ,rgb:"rgb(213, 0, 249)"},{ hex:"#AA00FF",label:"Purple A700" ,rgb:"rgb(170, 0, 255)"}],

"Deep Purple": [{ hex:"#EDE7F6",label:"Deep Purple 50" ,rgb:"rgb(237, 231, 246)"},{ hex:"#D1C4E9",label:"Deep Purple 100" ,rgb:"rgb(209, 196, 233)"},{ hex:"#B39DDB",label:"Deep Purple 200" ,rgb:"rgb(179, 157, 219)"},{ hex:"#9575CD",label:"Deep Purple 300" ,rgb:"rgb(149, 117, 205)"},{ hex:"#7E57C2",label:"Deep Purple 400" ,rgb:"rgb(126, 87, 194)"},{ hex:"#673AB7",label:"Deep Purple 500" ,rgb:"rgb(103, 58, 183)"},{ hex:"#5E35B1",label:"Deep Purple 600" ,rgb:"rgb(94, 53, 177)"},{ hex:"#512DA8",label:"Deep Purple 700" ,rgb:"rgb(81, 45, 168)"},{ hex:"#4527A0",label:"Deep Purple 800" ,rgb:"rgb(69, 39, 160)"},{ hex:"#311B92",label:"Deep Purple 900" ,rgb:"rgb(49, 27, 146)"},{ hex:"#B388FF",label:"Deep Purple A100" ,rgb:"rgb(179, 136, 255)"},{ hex:"#7C4DFF",label:"Deep Purple A200" ,rgb:"rgb(124, 77, 255)"},{ hex:"#651FFF",label:"Deep Purple A400" ,rgb:"rgb(101, 31, 255)"},{ hex:"#6200EA",label:"Deep Purple A700" ,rgb:"rgb(98, 0, 234)"}],

"Indigo": [{ hex:"#E8EAF6",label:"Indigo 50" ,rgb:"rgb(232, 234, 246)"},{ hex:"#C5CAE9",label:"Indigo 100" ,rgb:"rgb(197, 202, 233)"},{ hex:"#9FA8DA",label:"Indigo 200" ,rgb:"rgb(159, 168, 218)"},{ hex:"#7986CB",label:"Indigo 300" ,rgb:"rgb(121, 134, 203)"},{ hex:"#5C6BC0",label:"Indigo 400" ,rgb:"rgb(92, 107, 192)"},{ hex:"#3F51B5",label:"Indigo 500" ,rgb:"rgb(63, 81, 181)"},{ hex:"#3949AB",label:"Indigo 600" ,rgb:"rgb(57, 73, 171)"},{ hex:"#303F9F",label:"Indigo 700" ,rgb:"rgb(48, 63, 159)"},{ hex:"#283593",label:"Indigo 800" ,rgb:"rgb(40, 53, 147)"},{ hex:"#1A237E",label:"Indigo 900" ,rgb:"rgb(26, 35, 126)"},{ hex:"#8C9EFF",label:"Indigo A100" ,rgb:"rgb(140, 158, 255)"},{ hex:"#536DFE",label:"Indigo A200" ,rgb:"rgb(83, 109, 254)"},{ hex:"#3D5AFE",label:"Indigo A400" ,rgb:"rgb(61, 90, 254)"},{ hex:"#304FFE",label:"Indigo A700" ,rgb:"rgb(48, 79, 254)"}],

"Blue": [{ hex:"#E3F2FD",label:"Blue 50" ,rgb:"rgb(227, 242, 253)"},{ hex:"#BBDEFB",label:"Blue 100" ,rgb:"rgb(187, 222, 251)"},{ hex:"#90CAF9",label:"Blue 200" ,rgb:"rgb(144, 202, 249)"},{ hex:"#64B5F6",label:"Blue 300" ,rgb:"rgb(100, 181, 246)"},{ hex:"#42A5F5",label:"Blue 400" ,rgb:"rgb(66, 165, 245)"},{ hex:"#2196F3",label:"Blue 500" ,rgb:"rgb(33, 150, 243)"},{ hex:"#1E88E5",label:"Blue 600" ,rgb:"rgb(30, 136, 229)"},{ hex:"#1976D2",label:"Blue 700" ,rgb:"rgb(25, 118, 210)"},{ hex:"#1565C0",label:"Blue 800" ,rgb:"rgb(21, 101, 192)"},{ hex:"#0D47A1",label:"Blue 900" ,rgb:"rgb(13, 71, 161)"},{ hex:"#82B1FF",label:"Blue A100" ,rgb:"rgb(130, 177, 255)"},{ hex:"#448AFF",label:"Blue A200" ,rgb:"rgb(68, 138, 255)"},{ hex:"#2979FF",label:"Blue A400" ,rgb:"rgb(41, 121, 255)"},{ hex:"#2962FF",label:"Blue A700" ,rgb:"rgb(41, 98, 255)"}],

"Light Blue": [{ hex:"#E1F5FE",label:"Light Blue 50" ,rgb:"rgb(225, 245, 254)"},{ hex:"#B3E5FC",label:"Light Blue 100" ,rgb:"rgb(179, 229, 252)"},{ hex:"#81D4FA",label:"Light Blue 200" ,rgb:"rgb(129, 212, 250)"},{ hex:"#4FC3F7",label:"Light Blue 300" ,rgb:"rgb(79, 195, 247)"},{ hex:"#29B6F6",label:"Light Blue 400" ,rgb:"rgb(41, 182, 246)"},{ hex:"#03A9F4",label:"Light Blue 500" ,rgb:"rgb(3, 169, 244)"},{ hex:"#039BE5",label:"Light Blue 600" ,rgb:"rgb(3, 155, 229)"},{ hex:"#0288D1",label:"Light Blue 700" ,rgb:"rgb(2, 136, 209)"},{ hex:"#0277BD",label:"Light Blue 800" ,rgb:"rgb(2, 119, 189)"},{ hex:"#01579B",label:"Light Blue 900" ,rgb:"rgb(1, 87, 155)"},{ hex:"#80D8FF",label:"Light Blue A100" ,rgb:"rgb(128, 216, 255)"},{ hex:"#40C4FF",label:"Light Blue A200" ,rgb:"rgb(64, 196, 255)"},{ hex:"#00B0FF",label:"Light Blue A400" ,rgb:"rgb(0, 176, 255)"},{ hex:"#0091EA",label:"Light Blue A700" ,rgb:"rgb(0, 145, 234)"}],

"Cyan":[{ hex:"#E0F7FA",label:"Cyan 50" ,rgb:"rgb(224, 247, 250)"},{ hex:"#B2EBF2",label:"Cyan 100" ,rgb:"rgb(178, 235, 242)"},{ hex:"#80DEEA",label:"Cyan 200" ,rgb:"rgb(128, 222, 234)"},{ hex:"#4DD0E1",label:"Cyan 300" ,rgb:"rgb(77, 208, 225)"},{ hex:"#26C6DA",label:"Cyan 400" ,rgb:"rgb(38, 198, 218)"},{ hex:"#00BCD4",label:"Cyan 500" ,rgb:"rgb(0, 188, 212)"},{ hex:"#00ACC1",label:"Cyan 600" ,rgb:"rgb(0, 172, 193)"},{ hex:"#0097A7",label:"Cyan 700" ,rgb:"rgb(0, 151, 167)"},{ hex:"#00838F",label:"Cyan 800" ,rgb:"rgb(0, 131, 143)"},{ hex:"#006064",label:"Cyan 900" ,rgb:"rgb(0, 96, 100)"},{ hex:"#84FFFF",label:"Cyan A100" ,rgb:"rgb(132, 255, 255)"},{ hex:"#18FFFF",label:"Cyan A200" ,rgb:"rgb(24, 255, 255)"},{ hex:"#00E5FF",label:"Cyan A400" ,rgb:"rgb(0, 229, 255)"},{ hex:"#00B8D4",label:"Cyan A700" ,rgb:"rgb(0, 184, 212)"}],

"Teal":[{ hex:"#E0F2F1",label:"Teal 50" ,rgb:"rgb(224, 242, 241)"},{ hex:"#B2DFDB",label:"Teal 100" ,rgb:"rgb(178, 223, 219)"},{ hex:"#80CBC4",label:"Teal 200" ,rgb:"rgb(128, 203, 196)"},{ hex:"#4DB6AC",label:"Teal 300" ,rgb:"rgb(77, 182, 172)"},{ hex:"#26A69A",label:"Teal 400" ,rgb:"rgb(38, 166, 154)"},{ hex:"#009688",label:"Teal 500" ,rgb:"rgb(0, 150, 136)"},{ hex:"#00897B",label:"Teal 600" ,rgb:"rgb(0, 137, 123)"},{ hex:"#00796B",label:"Teal 700" ,rgb:"rgb(0, 121, 107)"},{ hex:"#00695C",label:"Teal 800" ,rgb:"rgb(0, 105, 92)"},{ hex:"#004D40",label:"Teal 900" ,rgb:"rgb(0, 77, 64)"},{ hex:"#A7FFEB",label:"Teal A100" ,rgb:"rgb(167, 255, 235)"},{ hex:"#64FFDA",label:"Teal A200" ,rgb:"rgb(100, 255, 218)"},{ hex:"#1DE9B6",label:"Teal A400" ,rgb:"rgb(29, 233, 182)"},{ hex:"#00BFA5",label:"Teal A700" ,rgb:"rgb(0, 191, 165)"}],

"Green":[{ hex:"#E8F5E9",label:"Green 50" ,rgb:"rgb(232, 245, 233)"},{ hex:"#C8E6C9",label:"Green 100" ,rgb:"rgb(200, 230, 201)"},{ hex:"#A5D6A7",label:"Green 200" ,rgb:"rgb(165, 214, 167)"},{ hex:"#81C784",label:"Green 300" ,rgb:"rgb(129, 199, 132)"},{ hex:"#66BB6A",label:"Green 400" ,rgb:"rgb(102, 187, 106)"},{ hex:"#4CAF50",label:"Green 500" ,rgb:"rgb(76, 175, 80)"},{ hex:"#43A047",label:"Green 600" ,rgb:"rgb(67, 160, 71)"},{ hex:"#388E3C",label:"Green 700" ,rgb:"rgb(56, 142, 60)"},{ hex:"#2E7D32",label:"Green 800" ,rgb:"rgb(46, 125, 50)"},{ hex:"#1B5E20",label:"Green 900" ,rgb:"rgb(27, 94, 32)"},{ hex:"#B9F6CA",label:"Green A100" ,rgb:"rgb(185, 246, 202)"},{ hex:"#69F0AE",label:"Green A200" ,rgb:"rgb(105, 240, 174)"},{ hex:"#00E676",label:"Green A400" ,rgb:"rgb(0, 230, 118)"},{ hex:"#00C853",label:"Green A700" ,rgb:"rgb(0, 200, 83)"}],

"Light Green":[{ hex:"#F1F8E9",label:"Light Green 50" ,rgb:"rgb(241, 248, 233)"},{ hex:"#DCEDC8",label:"Light Green 100" ,rgb:"rgb(220, 237, 200)"},{ hex:"#C5E1A5",label:"Light Green 200" ,rgb:"rgb(197, 225, 165)"},{ hex:"#AED581",label:"Light Green 300" ,rgb:"rgb(174, 213, 129)"},{ hex:"#9CCC65",label:"Light Green 400" ,rgb:"rgb(156, 204, 101)"},{ hex:"#8BC34A",label:"Light Green 500" ,rgb:"rgb(139, 195, 74)"},{ hex:"#7CB342",label:"Light Green 600" ,rgb:"rgb(124, 179, 66)"},{ hex:"#689F38",label:"Light Green 700" ,rgb:"rgb(104, 159, 56)"},{ hex:"#558B2F",label:"Light Green 800" ,rgb:"rgb(85, 139, 47)"},{ hex:"#33691E",label:"Light Green 900" ,rgb:"rgb(51, 105, 30)"},{ hex:"#CCFF90",label:"Light Green A100" ,rgb:"rgb(204, 255, 144)"},{ hex:"#B2FF59",label:"Light Green A200" ,rgb:"rgb(178, 255, 89)"},{ hex:"#76FF03",label:"Light Green A400" ,rgb:"rgb(118, 255, 3)"},{ hex:"#64DD17",label:"Light Green A700" ,rgb:"rgb(100, 221, 23)"}],

"Lime":[{ hex:"#F9FBE7",label:"Lime 50" ,rgb:"rgb(249, 251, 231)"},{ hex:"#F0F4C3",label:"Lime 100" ,rgb:"rgb(240, 244, 195)"},{ hex:"#E6EE9C",label:"Lime 200" ,rgb:"rgb(230, 238, 156)"},{ hex:"#DCE775",label:"Lime 300" ,rgb:"rgb(220, 231, 117)"},{ hex:"#D4E157",label:"Lime 400" ,rgb:"rgb(212, 225, 87)"},{ hex:"#CDDC39",label:"Lime 500" ,rgb:"rgb(205, 220, 57)"},{ hex:"#C0CA33",label:"Lime 600" ,rgb:"rgb(192, 202, 51)"},{ hex:"#AFB42B",label:"Lime 700" ,rgb:"rgb(175, 180, 43)"},{ hex:"#9E9D24",label:"Lime 800" ,rgb:"rgb(158, 157, 36)"},{ hex:"#827717",label:"Lime 900" ,rgb:"rgb(130, 119, 23)"},{ hex:"#F4FF81",label:"Lime A100" ,rgb:"rgb(244, 255, 129)"},{ hex:"#EEFF41",label:"Lime A200" ,rgb:"rgb(238, 255, 65)"},{ hex:"#C6FF00",label:"Lime A400" ,rgb:"rgb(198, 255, 0)"},{ hex:"#AEEA00",label:"Lime A700" ,rgb:"rgb(174, 234, 0)"}],

"Yellow":[{ hex:"#FFFDE7",label:"Yellow 50" ,rgb:"rgb(255, 253, 231)"},{ hex:"#FFF9C4",label:"Yellow 100" ,rgb:"rgb(255, 249, 196)"},{ hex:"#FFF59D",label:"Yellow 200" ,rgb:"rgb(255, 245, 157)"},{ hex:"#FFF176",label:"Yellow 300" ,rgb:"rgb(255, 241, 118)"},{ hex:"#FFEE58",label:"Yellow 400" ,rgb:"rgb(255, 238, 88)"},{ hex:"#FFEB3B",label:"Yellow 500" ,rgb:"rgb(255, 235, 59)"},{ hex:"#FDD835",label:"Yellow 600" ,rgb:"rgb(253, 216, 53)"},{ hex:"#FBC02D",label:"Yellow 700" ,rgb:"rgb(251, 192, 45)"},{ hex:"#F9A825",label:"Yellow 800" ,rgb:"rgb(249, 168, 37)"},{ hex:"#F57F17",label:"Yellow 900" ,rgb:"rgb(245, 127, 23)"},{ hex:"#FFFF8D",label:"Yellow A100" ,rgb:"rgb(255, 255, 141)"},{ hex:"#FFFF00",label:"Yellow A200" ,rgb:"rgb(255, 255, 0)"},{ hex:"#FFEA00",label:"Yellow A400" ,rgb:"rgb(255, 234, 0)"},{ hex:"#FFD600",label:"Yellow A700" ,rgb:"rgb(255, 214, 0)"}],

"Amber":[{ hex:"#FFF8E1",label:"Amber 50" ,rgb:"rgb(255, 248, 225)"},{ hex:"#FFECB3",label:"Amber 100" ,rgb:"rgb(255, 236, 179)"},{ hex:"#FFE082",label:"Amber 200" ,rgb:"rgb(255, 224, 130)"},{ hex:"#FFD54F",label:"Amber 300" ,rgb:"rgb(255, 213, 79)"},{ hex:"#FFCA28",label:"Amber 400" ,rgb:"rgb(255, 202, 40)"},{ hex:"#FFC107",label:"Amber 500" ,rgb:"rgb(255, 193, 7)"},{ hex:"#FFB300",label:"Amber 600" ,rgb:"rgb(255, 179, 0)"},{ hex:"#FFA000",label:"Amber 700" ,rgb:"rgb(255, 160, 0)"},{ hex:"#FF8F00",label:"Amber 800" ,rgb:"rgb(255, 143, 0)"},{ hex:"#FF6F00",label:"Amber 900" ,rgb:"rgb(255, 111, 0)"},{ hex:"#FFE57F",label:"Amber A100" ,rgb:"rgb(255, 229, 127)"},{ hex:"#FFD740",label:"Amber A200" ,rgb:"rgb(255, 215, 64)"},{ hex:"#FFC400",label:"Amber A400" ,rgb:"rgb(255, 196, 0)"},{ hex:"#FFAB00",label:"Amber A700" ,rgb:"rgb(255, 171, 0)"}],

"Orange":[{ hex:"#FFF3E0",label:"Orange 50" ,rgb:"rgb(255, 243, 224)"},{ hex:"#FFE0B2",label:"Orange 100" ,rgb:"rgb(255, 224, 178)"},{ hex:"#FFCC80",label:"Orange 200" ,rgb:"rgb(255, 204, 128)"},{ hex:"#FFB74D",label:"Orange 300" ,rgb:"rgb(255, 183, 77)"},{ hex:"#FFA726",label:"Orange 400" ,rgb:"rgb(255, 167, 38)"},{ hex:"#FF9800",label:"Orange 500" ,rgb:"rgb(255, 152, 0)"},{ hex:"#FB8C00",label:"Orange 600" ,rgb:"rgb(251, 140, 0)"},{ hex:"#F57C00",label:"Orange 700" ,rgb:"rgb(245, 124, 0)"},{ hex:"#EF6C00",label:"Orange 800" ,rgb:"rgb(239, 108, 0)"},{ hex:"#E65100",label:"Orange 900" ,rgb:"rgb(230, 81, 0)"},{ hex:"#FFD180",label:"Orange A100" ,rgb:"rgb(255, 209, 128)"},{ hex:"#FFAB40",label:"Orange A200" ,rgb:"rgb(255, 171, 64)"},{ hex:"#FF9100",label:"Orange A400" ,rgb:"rgb(255, 145, 0)"},{ hex:"#FF6D00",label:"Orange A700" ,rgb:"rgb(255, 109, 0)"}],

"Deep Orange":[{ hex:"#FBE9E7",label:"Deep Orange 50" ,rgb:"rgb(251, 233, 231)"},{ hex:"#FFCCBC",label:"Deep Orange 100" ,rgb:"rgb(255, 204, 188)"},{ hex:"#FFAB91",label:"Deep Orange 200" ,rgb:"rgb(255, 171, 145)"},{ hex:"#FF8A65",label:"Deep Orange 300" ,rgb:"rgb(255, 138, 101)"},{ hex:"#FF7043",label:"Deep Orange 400" ,rgb:"rgb(255, 112, 67)"},{ hex:"#FF5722",label:"Deep Orange 500" ,rgb:"rgb(255, 87, 34)"},{ hex:"#F4511E",label:"Deep Orange 600" ,rgb:"rgb(244, 81, 30)"},{ hex:"#E64A19",label:"Deep Orange 700" ,rgb:"rgb(230, 74, 25)"},{ hex:"#D84315",label:"Deep Orange 800" ,rgb:"rgb(216, 67, 21)"},{ hex:"#BF360C",label:"Deep Orange 900" ,rgb:"rgb(191, 54, 12)"},{ hex:"#FF9E80",label:"Deep Orange A100" ,rgb:"rgb(255, 158, 128)"},{ hex:"#FF6E40",label:"Deep Orange A200" ,rgb:"rgb(255, 110, 64)"},{ hex:"#FF3D00",label:"Deep Orange A400" ,rgb:"rgb(255, 61, 0)"},{ hex:"#DD2C00",label:"Deep Orange A700" ,rgb:"rgb(221, 44, 0)"}],

"Brown":[{ hex:"#EFEBE9",label:"Brown 50" ,rgb:"rgb(239, 235, 233)"},{ hex:"#D7CCC8",label:"Brown 100" ,rgb:"rgb(215, 204, 200)"},{ hex:"#BCAAA4",label:"Brown 200" ,rgb:"rgb(188, 170, 164)"},{ hex:"#A1887F",label:"Brown 300" ,rgb:"rgb(161, 136, 127)"},{ hex:"#8D6E63",label:"Brown 400" ,rgb:"rgb(141, 110, 99)"},{ hex:"#795548",label:"Brown 500" ,rgb:"rgb(121, 85, 72)"},{ hex:"#6D4C41",label:"Brown 600" ,rgb:"rgb(109, 76, 65)"},{ hex:"#5D4037",label:"Brown 700" ,rgb:"rgb(93, 64, 55)"},{ hex:"#4E342E",label:"Brown 800" ,rgb:"rgb(78, 52, 46)"},{ hex:"#3E2723",label:"Brown 900" ,rgb:"rgb(62, 39, 35)"}],

"Grey":[{ hex:"#FAFAFA",label:"Grey 50" ,rgb:"rgb(250, 250, 250)"},{ hex:"#F5F5F5",label:"Grey 100" ,rgb:"rgb(245, 245, 245)"},{ hex:"#EEEEEE",label:"Grey 200" ,rgb:"rgb(238, 238, 238)"},{ hex:"#E0E0E0",label:"Grey 300" ,rgb:"rgb(224, 224, 224)"},{ hex:"#BDBDBD",label:"Grey 400" ,rgb:"rgb(189, 189, 189)"},{ hex:"#9E9E9E",label:"Grey 500" ,rgb:"rgb(158, 158, 158)"},{ hex:"#757575",label:"Grey 600" ,rgb:"rgb(117, 117, 117)"},{ hex:"#616161",label:"Grey 700" ,rgb:"rgb(97, 97, 97)"},{ hex:"#424242",label:"Grey 800" ,rgb:"rgb(66, 66, 66)"},{ hex:"#212121",label:"Grey 900" ,rgb:"rgb(33, 33, 33)"}],

"Blue Grey":[{ hex:"#ECEFF1",label:"Blue Grey 50" ,rgb:"rgb(236, 239, 241)"},{ hex:"#CFD8DC",label:"Blue Grey 100" ,rgb:"rgb(207, 216, 220)"},{ hex:"#B0BEC5",label:"Blue Grey 200" ,rgb:"rgb(176, 190, 197)"},{ hex:"#90A4AE",label:"Blue Grey 300" ,rgb:"rgb(144, 164, 174)"},{ hex:"#78909C",label:"Blue Grey 400" ,rgb:"rgb(120, 144, 156)"},{ hex:"#607D8B",label:"Blue Grey 500" ,rgb:"rgb(96, 125, 139)"},{ hex:"#546E7A",label:"Blue Grey 600" ,rgb:"rgb(84, 110, 122)"},{ hex:"#455A64",label:"Blue Grey 700" ,rgb:"rgb(69, 90, 100)"},{ hex:"#37474F",label:"Blue Grey 800" ,rgb:"rgb(55, 71, 79)"},{ hex:"#263238",label:"Blue Grey 900" ,rgb:"rgb(38, 50, 56)"}]


    }