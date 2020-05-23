import React from "react";
import axios from "axios";
import "../css/main.css";
import mainPageCss from "../css/mainPage.module.css";
import PathItem from "./PathItem";
import BannerImg from "../img/banner.png";


class MainPage extends React.Component {
    constructor() {
        super();
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


    render() {
        let elms = [];
        let pathKey = this.state.pathKey;
        for (let i = 0; i < pathKey.length; i++) {
            elms.push(<PathItem key={i} keyName={pathKey[i]}/>)
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