import React from "react";
import FvwCss from "../css/FolderView.module.css"
import "../css/main.css"
import FolderViewHeader from "../component/FolderViewHeader";
import FtConfig from "../ftconfig";
import GoUpperItem from "../component/GoUpperItem";
import PathItem from "../component/PathItem";
import FileItem from "../component/FileItem";
import {getRandomNum} from "../util/FtUtils";

import axios from "axios";
import store from "../store";
import actionType from "../store/actionType";

class FolderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: null,
                url: null,
                parentPath: null,
                subPaths: [],
                subFiles: []
            }
        };
        //数据是否已准备好
        this.isReady = false;
        //从共享目录key
        this.shareKey = null;
        //目录的Name以及URL
        this.path = null;
        //是否正在加载
        this.load = false;
        this.toUpload = this.toUpload.bind(this);
    }

    /*
    data格式如下：
        {
            parentPath: "String",
            name: "String",
            url:"String",
            subPaths: [Array, Array, Array],
            subFiles: [Array, Array, Array]
        }
    */


    /**
     * 跳转到MainPage
     * @param param
     */
    doToMain(param) {
        this.props.history.push("/");
    }

    /**
     * 跳转到文件详情页面
     * @param param
     */
    toFileDetail(param) {
        store.dispatch({type: actionType.update_detailView, value: param})
        this.props.history.push("/fileDetail");
    }


    /**
     * 转到登录页面
     */
    toUpload() {
        let obj = {
            path: this.state.data.url
        }
        store.dispatch({type: actionType.update_uploadView, value: obj});
        this.props.history.push("/uploadView");
    }


    doUpdateFolderData(param) {
        if (FtConfig.dev) {
            console.log("doGetFolderData---param的值为: " + JSON.stringify(param));
        }

        this.shareKey = null;
        this.path = null;
        this.ready = false;
        if (param != null) {
            let obj = {
                path: param
            }
            store.dispatch({type: actionType.update_folderView, value: obj});
        }

        this.initParam();
        this.doGetData();
    }


    /**
     * 从数据容器中获取数据
     */
    initParam() {
        let fvd = store.getState().FolderView;
        if (FtConfig.dev) {
            console.log("fvd的值: " + JSON.stringify(fvd));
        }
        if (fvd.path != null) {
            this.path = fvd.path;
            this.ready = true
        } else if (fvd.shareKey != null) {
            this.shareKey = fvd.shareKey;
            this.ready = true;
        }
    }


    /**
     * 从后端获取数据
     */
    doGetData() {
        if (FtConfig.dev) {
            console.log("isReady = " + this.isReady);
        }
        if (this.ready) {
            /*
            处理参数
             */
            let param = "";
            if (this.shareKey != null) {
                param = "?queryPath=" + this.shareKey;
            } else if (this.path != null) {
                param = "?queryPath=" + this.path.url;
            } else {
                return;
            }
            this.load = true;
            let url = "/path/json" + param;
            if (FtConfig.dev) {
                url = "/api" + url;
            }
            url = encodeURI(url);
            axios.get(url).then((response) => {
                if (response && response.data.code === 200) {
                    this.setState({data: response.data.data});
                    this.load = false;
                }
            }).catch(error => {
                console.error(error);
                this.load = false;
            });
        }
    }


    componentDidMount() {
        this.initParam();
        this.doGetData();
    }

    render() {
        //返回上一级组件
        let gbi = null;
        //子目录组件
        let spe = [];
        //子文件组件
        let sfe = [];

        let ab;
        let p = this.state.data.parentPath;
        let sp = this.state.data.subPaths;
        let sf = this.state.data.subFiles;
        if (p != null) {
            gbi = <GoUpperItem key={p + "" + getRandomNum()} pathUrl={p} toFolderView={(param) => {
                this.doUpdateFolderData(param)
            }}/>
        }

        if (sp != null && sp.length > 0) {
            spe = [];

            for (let i = 0; i < sp.length; i++) {
                spe.push(<PathItem path={sp[i]} key={sp[i].name + "" + getRandomNum()} toFolderView={(param) => {
                    this.doUpdateFolderData(param)
                }}/>)
            }
        }

        if (sf != null) {
            sfe = [];
            for (let i = 0; i < sf.length; i++) {
                sfe.push(<FileItem path={sf[i]}
                                   key={sf[i].name + "" + getRandomNum()} toFileDetail={(param) => {
                    this.toFileDetail(param)
                }}/>)
            }
        }

        if (this.state.data.url != null) {
            ab = <div className={FvwCss.addBtn} onClick={this.toUpload}>
                上传
            </div>
        }


        return <div>
            {
                this.state.data.name != null ?
                    <FolderViewHeader title={this.state.data.name} toMain={(param) => {
                        this.doToMain(param)
                    }}/> : <FolderViewHeader toMain={(param) => {
                        this.doToMain(param)
                    }}/>
            }
            <div className="mainContainer">
                <div className={FvwCss.divideBox}/>
                <div className={FvwCss.folderView}>
                    {gbi}
                    {spe}
                    {sfe}
                </div>

            </div>
            {ab}
        </div>
    }

}

export default FolderView;