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

class FolderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: null,
                parentPath: null,
                subPaths: [],
                subFiles: []
            }
        };
        //数据是否已准备好
        this.isReady = false;
        //从共享目录key
        this.keyName = null;
        //目录的Name以及URL
        this.path = null;
        //是否正在加载
        this.isLoad = false;
    }

    /*
    data格式如下：
        {
            parentPath: "String",
            name: "String",
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
        let obj = {
            pathname: "/fileDetail",
            state: param
        };
        this.props.history.push(obj);
    }


    doUpdateFolderData(param) {
        if (FtConfig.dev) {
            console.log("doGetFolderData---param的值为: " + param);
        }

        this.keyName = null;
        this.path = null;
        this.isReady = null;
        if (param != null) {
            this.path = {url: param};
            this.isReady = true;
        }
        this.doGetData();
    }

    /**
     * 对跳转的传入的参数进行赋值
     */
    initCallParam() {
        let pls = this.props.location.state;
        if (FtConfig.dev) {
            console.log("pls=" + pls)
        }

        if (pls != null) {
            this.isReady = true;
            if (FtConfig.dev) {
                console.log("修改后的isReady = " + this.isReady);
            }
            let kn = this.props.location.state.keyName;
            let p = this.props.location.state.path;
            if (FtConfig.dev) {
                console.log("location的值: " + pls);
                console.log("keyName的值: " + kn);
                console.log("path的值: " + p);
            }
            this.keyName = kn;
            this.path = p;
        }
    }

    /**
     * 从后端获取数据
     */
    doGetData() {
        if (FtConfig.dev) {
            console.log("isReady = " + this.isReady);
            console.log("")
        }
        if (this.isReady) {
            /*
            处理参数
             */
            let param = "";
            if (this.keyName != null) {
                param = "?queryPath=" + this.keyName;
            } else if (this.path != null) {
                param = "?queryPath=" + this.path.url;
            } else {
                return;
            }
            this.isLoad = true;
            let url = "/path/json" + param;
            if (FtConfig.dev) {
                url = "/api" + url;
            }
            url = encodeURI(url);
            axios.get(url).then((response) => {
                if (response && response.data.code === 200) {
                    this.setState({data: response.data.data});
                    this.isLoad = false;
                }
            }).catch(error => {
                console.error(error);
                this.isLoad = false;
            });
        }
    }


    componentDidMount() {
        this.initCallParam();
        this.doGetData();
    }

    render() {
        //返回上一级组件
        let gbi = null;
        //子目录组件
        let spe = [];
        //子文件组件
        let sfe = [];

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
                sfe.push(<FileItem parentPath={this.path} parentKeyName={this.keyName} path={sf[i]}
                                   key={sf[i].name + "" + getRandomNum()} toFileDetail={(param) => {
                    this.toFileDetail(param)
                }}/>)
            }
        }


        return <div>
            {
                this.state.data.name != null ?
                    <FolderViewHeader title={this.state.data.name} toMain={(param) => {
                        this.doToMain(param)
                    }}/> : null
            }
            <div className="mainContainer">
                <div className={FvwCss.divideBox}/>
                <div className={FvwCss.folderView}>
                    {gbi}
                    {spe}
                    {sfe}
                </div>
            </div>
        </div>
    }

}

export default FolderView;