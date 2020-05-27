import React from "react";
import "../css/main.css"
import FileIcon from "../img/fileIcon.svg";
import EmptyIcon from "../img/empty.svg";
import FileDetailCss from "../css/FileDetail.module.css";
import Axios from "axios";
import FtConfig from "../ftconfig";


class FileDetailView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        this.parentPath=null;
        this.parentKeyName=null;
        this.ready = false;
        this.load = false;
        this.fileUrl = null;
    }

    /**
     * 初始化数据
     */
    initData() {
        let fl = this.props.location.state;
        if (fl != null) {
            this.fileUrl = fl.fileUrl;
            this.ready = true;
            this.parentPath=fl.parentPath;
            this.parentKeyName=fl.parentKeyName;
        }

    }

    doGetData() {
        if (this.ready) {

            let url = "/file/detail?fileUrl=" + this.fileUrl;
            if (FtConfig.dev) {
                url = "/api" + url;
            }
            url = encodeURI(url);
            this.load = true;
            Axios.get(url).then(response => {
                if (response && response.data.code === 200) {
                    this.setState({data: response.data.data});
                }
                this.load = false;
            }).catch(error => {
                this.load = false;
                console.error(error);
            })


        }
    }

    toMainPage(){
        this.props.history.push("/");
    }

    goBack(pkn,path){
        let stateObj={
            keyName:pkn,
            path:path
        }

        let obj={
            pathname:"/viewFolder",
            state:stateObj
        }

        this.props.history.push(obj)

    }


    componentDidMount() {
        this.initData();
        this.doGetData();
    }


    render() {
        let els = null;
        let downloadPre = "/file/down";
        if (FtConfig.dev) {
            downloadPre = "/api" + downloadPre;
        }


        if (this.state.data) {
            els = null;
            els = <div>
                <div className={FileDetailCss.fileImg}>
                    <img src={FileIcon} width={"25%"} height={"25%"} alt={"文件"}/>
                </div>
                <div className={FileDetailCss.fileViewBox}>
                    <div className={FileDetailCss.fileDesBox}>
                        <div className={FileDetailCss.fileTextBox}>
                            <b>文件名：</b>
                            {this.state.data.name}
                        </div>
                        <div className={FileDetailCss.fileTextBox}>
                            <b>大小：</b>
                            {this.state.data.size}
                        </div>
                        <div className={FileDetailCss.fileTextBox}>
                            <b>类型：</b>
                            {this.state.data.type}
                        </div>
                    </div>
                </div>
                <div className={FileDetailCss.fileHandleBox}>
                    <a href={encodeURI(downloadPre + "?path=" + this.state.data.url)}>
                        <button className={FileDetailCss.fileHandleBtn}>下载</button>
                    </a>
                    <button onClick={()=>{
                        this.goBack(this.parentKeyName,this.parentPath)
                    }} className={FileDetailCss.fileHandleBtn}>返回目录</button>
                    <button onClick={()=>{this.toMainPage()}} className={FileDetailCss.fileHandleBtn}>返回主页</button>
                </div>
            </div>
        } else {
            els = null;
            els = <div>
                <div className={FileDetailCss.fileImg}>
                    <img src={EmptyIcon} width={"25%"} height={"25%"} alt={"暂无数据"}/>
                </div>
                <div className={FileDetailCss.emptyTextBox}>
                    <div onClick={()=>{this.toMainPage()}} className={FileDetailCss.emptyText}>
                        暂无数据,点击返回首页
                    </div>
                </div>
            </div>
        }


        return <div className="mainContainer">
            {els}
        </div>
    }
}


export default FileDetailView;