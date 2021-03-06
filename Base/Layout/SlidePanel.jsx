/*
滑动面板
create by wangzy
date:2016-04-05
desc:滑动面板
*/
let React=require("react");
require("../../sass/Base/Layout/SlidePanel.scss");
var Toolbar=require("../Buttons/Toolbar.jsx");
class SlidePanel extends  React.Component{
    constructor(props) {
        super(props);
        this.slideHandler=this.slideHandler.bind(this);
        this.buttonClick=this.buttonClick.bind(this);
    }
    static propTypes= {
        title: React.PropTypes.string,//标题
        width:React.PropTypes.number,//自定义宽度
        buttons: React.PropTypes.array,//自定义按钮
        buttonClick: React.PropTypes.func,//按钮的单击事件,
    }
    static defaultProps={
        title:"",
        width:document.body.clientWidth,
        buttons:[],
        buttonClick:null,
        url:null
    }
    state={
        panelwidth:0,//总宽度
        containerwidth:0,//容器宽度
        leftwidth:0,//左侧滑块宽度
        rightwidth:0,//右侧内容宽度
        overlayOpacity:0,//遮盖层透明度
    }
     open() {//打开事件，用于外部调用
       this.slideHandler();
   }
    close() {//关闭事件,用于外部调用
        this.slideHandler();
    }
    slideHandler() {
        if(this.state.panelwidth!=0)
        {//关闭时，外面宽度等过渡效果完成后再设置
            this.setState({
                containerwidth: this.state.containerwidth == 0 ? this.props.width - 34 : 0,
                rightwidth: this.state.rightwidth == 0 ? this.props.width - 70 : 0,
                leftwidth:this.state.leftwidth==36?0:36,
                overlayOpacity:this.state.overlayOpacity==0?0.5:0
            });
            setTimeout(()=>{
                this.setState({
                    panelwidth:0
                })
            },700)
        }
       else
        {//打开时，立即将外面宽度设置
            this.setState({
                containerwidth: this.state.containerwidth == 0 ? this.props.width - 34 : 0,
                rightwidth: this.state.rightwidth == 0 ? this.props.width - 70 : 0,
                leftwidth:this.state.leftwidth==36?0:36,
                overlayOpacity:this.state.overlayOpacity==0?0.5:0,
                panelwidth:this.props.width
            });
        }

    }
    buttonClick(name,title) {
        if (this.props.buttonClick != null) {
            this.props.buttonClick(name, title);
        }
    }
    render() {
            return <div className={"wasabi-slidepanel "}  style={{width:this.state.panelwidth}}>
                <div className="overlay" style={{width:this.state.panelwidth,opacity:this.state.overlayOpacity}}></div>
                <div className="container" style={{width:this.state.containerwidth}}>
                    <div className={"container-left "} onClick={this.slideHandler} style={{width:this.state.leftwidth}}></div>
                    <div className="container-right" style={{width:this.state.rightwidth}}>
                        <div className="header">
                            <div className="title">{this.props.title}</div>
                            <div className="arrow-left"></div>
                            <div  className="arrow-right"></div>
                            <div className="buttoncontainer"><Toolbar buttons={this.props.buttons}
                                                              buttonClick={this.buttonClick}></Toolbar></div>

                        </div>
                        <div className="body">
                            {
                                this.props.children
                            }

                        </div>
                    </div>
                </div>
            </div>
        }
    };
module.exports=SlidePanel;