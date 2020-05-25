import React from "react";
import axios from "axios";
import "../css/main.css";
import mainPageCss from "../css/MainPage.module.css";
import BannerImg from "../img/banner.png";
import FtnetLoading from "../component/FtnetLoading";
import MainPageItem from "../component/MainPageItem";

import FtConfig from "../ftconfig";


/**
 * 主页面
 */
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            success: true,
            pathKey: [],
            bannerHeight: 0,
            bannerWidth: 0
        }
    }
    componentDidMount() {
        this.doHandlerBannerSize();
        this.doGetData();
    }

    /*
    处理banner图片尺寸
     */
    doHandlerBannerSize() {
        let ih = window.innerHeight;
        let bh;
        if (ih <= 767) {
            bh = ih / 3;
        } else if (ih <= 991) {
            bh = ih / 4;
        } else {
            bh = ih / 5;
        }
        let bw = bh * 1.34;
        this.setState({bannerHeight: bh});
        this.setState({bannerWidth: bw});
    }
    /*
    从后台拉取数据
     */
    doGetData() {
        this.setState({isLoad: true});
        this.setState({success: false});
        axios.get("/indexData").then((response) => {
            this.setState({pathKey: response.data.data});
            this.setState({isLoad: false});
            this.setState({success: true});
        });
    }

    /*
    跳转到目录查看页面
     */
    toFolder(param){
        if (FtConfig.dev){
            console.log("toFolder传入的值: "+param);
        }

        let path={
            pathname:"/viewFolder",
            state:param
        }

        this.props.history.push(path);
    }


    render() {
        let elms = [];
        let pathKey = this.state.pathKey;
        if (this.state.isLoad){
            /*
            正在加载
             */
            elms=[];
            elms.push(<FtnetLoading key={1}/>)
        }else {
            /*
            加载完成
             */
            elms=[];
            for (let i = 0; i < pathKey.length; i++) {
                // elms.push(<PathItem toFolderView={(param)=>{this.toFolder(param)}} key={i} keyName={pathKey[i]}/>)
                let el=<MainPageItem toFolderView={(param)=>{this.toFolder(param)}} key={pathKey[i]} itemName={pathKey[i]} />
                elms.push(el);
            }
        }


        return <div className="mainContainer">
            <div className={mainPageCss.banner}>
                <img src={BannerImg} width={this.state.bannerWidth} height={this.state.bannerHeight} alt={"banner"}/>
            </div>
            {elms}
        </div>
    }
}

export default MainPage;