import React from "react";
import axios from "axios";
import "../css/main.css";
import mainPageCss from "../css/MainPage.module.css";
import BannerImg from "../img/banner.png";
import FtnetLoading from "../component/FtnetLoading";
import MainPageItem from "../component/MainPageItem";
import {getRandomNum} from "../util/FtUtils";
import actionType from "../store/actionType";


import FtConfig from "../ftconfig";
import store from "../store";


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
            sharePaths: [],
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
        if (FtConfig.dev) {
            console.log("doHandleBannerSize被执行");
        }
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
        this.setState({bannerHeight: bh, bannerWidth: bw});
    }

    /*
    从后台拉取数据
     */
    doGetData() {
        // let sharePaths = store.getState().MainPage.sharePath
        // if (!sharePaths || sharePaths.length === 0) {
        this.setState({isLoad: true, success: false});
        let url = "/indexData";
        if (FtConfig.dev) {
            url = "/api" + url;
        }

        axios.get(url).then((response) => {
            // store.dispatch({type: "change_mainPage_sharePath", value: response.data.data});
            this.setState({isLoad: false, success: true, sharePaths: response.data.data});
        });
        // }
    }

    /*
    跳转到目录查看页面
     */
    toFolder(param) {
        if (FtConfig.dev) {
            console.log("toFolder传入的值: " + param);
        }
        let obj = {
            shareKey: param
        }
        store.dispatch({type: actionType.update_folderView, value: obj});
        this.props.history.push("/viewFolder");
    }

    render() {
        let elms = [];
        let pathKey = this.state.sharePaths;
        // let pathKey = store.getState().MainPage.sharePath;
        if (this.state.isLoad) {
            /*
            正在加载
             */
            elms = [];
            elms.push(<FtnetLoading key={getRandomNum()}/>)
        } else {
            /*
            加载完成
             */
            elms = [];
            for (let i = 0; i < pathKey.length; i++) {
                // elms.push(<PathItem toFolderView={(param)=>{this.toFolder(param)}} key={i} keyName={pathKey[i]}/>)
                let el = <MainPageItem toFolderView={(param) => {
                    this.toFolder(param)
                }} key={pathKey[i] + "" + getRandomNum()} itemName={pathKey[i]}/>
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