import React from "react";
import FvhCss from "../css/FolderViewHeader.module.css";
import HomeImg from "../img/home.svg"


/**
 * FolderView的头部
 * 用于显示文件夹名
 * 以及首页按钮
 */
class FolderViewHeader extends React.Component {


    /**
     * 调用父组件方法
     * 跳转到MainPage
     * @param param
     */
    toMainPage(param) {
        this.props.toMain(param);
    }


    render() {
        return <div className={FvhCss.headerBox}>
            <div className={FvhCss.homeImg} onClick={() => {
                this.toMainPage(null)
            }}>
                <img src={HomeImg} width="100%" height="100%" alt={"首页"}/>
            </div>
            <div className={FvhCss.headerText}>{this.props.title}</div>
        </div>
    }
}

export default FolderViewHeader;