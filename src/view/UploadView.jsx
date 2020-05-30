import React from "react";
import UploadViewCss from "../css/UploadView.module.css";
import store from "../store";
import FtConfig from "../ftconfig";
import Progress from "../component/Progress";
import axios from "axios";
import {getFileSizeStr} from "../util/FtUtils"


class UploadView extends React.Component {

    constructor(props) {
        super(props);
        this.path = null;

        this.inputFile = React.createRef();
        this.doUpload = this.doUpload.bind(this);

        this.toFolderView = this.toFolderView.bind(this);
        this.toMainPage = this.toMainPage.bind(this);
        this.fileInputChange = this.fileInputChange.bind(this);
        this.doSelectFile = this.doSelectFile.bind(this);


        //每个文件片段5MB
        this.fragmentSize = 5242880;
        this.successCount = 0;

        this.uploadUrl = "/file/upload";
        this.mergeUrl = "/file/merge";
        this.state = {
            progressPre: 0,
            progressSta: -1,
            fileName: null,
            fileSize: 0
        }

        this.uploadFile = null;


    }


    init() {
        let sp = store.getState().UploadView.path;
        if (sp != null) {
            this.path = sp;
        }
        if (FtConfig.dev) {
            this.uploadUrl = "/api" + this.uploadUrl;
            this.mergeUrl = "/api" + this.mergeUrl;
        }
    }

    fileInputChange() {
        this.uploadFile = this.inputFile.current.files[0];


        if (this.uploadFile != null) {
            let fn = this.uploadFile.name;
            let fs = this.uploadFile.size;
            if (FtConfig.dev) {
                console.log("文件名：" + fn);
                console.log("大小: " + getFileSizeStr(fs));
            }

            this.setState({fileName: fn, fileSize: fs});
        }

    }


    doUpload() {
        //复位
        this.successCount = 0;
        //上传的文件
        let mainFile = this.inputFile.current.files[0];
        //文件名
        let fileName = null;
        //文件大小 字节
        let fileSize;

        let path = this.path;
        let total = 0;
        if (mainFile != null && path != null) {
            this.setState({progressSta: 0, progressPre: 0});
            fileName = mainFile.name;
            fileSize = mainFile.size;
            total = this.getFragmentTotal(fileSize);
            if (FtConfig.dev) {
                console.log("fileSize= " + fileSize);
                console.log("fileName= " + fileName);
                console.log("total= " + total);
            }

            /*
            开始切片
             */

            for (let i = 0; i < total; i++) {
                let start = i * this.fragmentSize;
                let end = (i + 1) * this.fragmentSize >= fileSize ? fileSize : (i + 1) * this.fragmentSize;
                let fragmentFile = mainFile.slice(start, end);
                /*
                封装表单
                 */
                let formData = new FormData();
                formData.append("path", path);
                formData.append("name", fileName);
                formData.append("total", total);
                // formData.append("md5", null);
                formData.append("sequence", i + 1);
                formData.append("file", fragmentFile);
                this.setState({progressSta: 1, progressPre: 0});
                this.doUpload0(formData, path, fileName, total, i + 1);
            }
        }
    }

    async doUpload0(formData, path, name, total, seq) {
        let config = {
            headers: {
                "content-type": "multipart/form-data;charset=utf-8"
            }
        }
        await axios.post(this.uploadUrl, formData, config).then(response => {
            if (response && response.data.code === 200) {
                this.successCount++;
                if (FtConfig.dev) {
                    console.log("成功片段总数= " + this.successCount + "\t片段编号= " + seq);
                }
                this.setState({progressSta: 1, progressPre: Math.floor(this.successCount / total * 100)});
                if (this.successCount === total) {
                    this.doMerge0(path, name, total);
                }
            }
        }).catch(error => {
            console.error(error);
        });
    }

    doMerge0(path, name, total) {
        let formData = new FormData();
        formData.append("path", path);
        formData.append("name", name);
        formData.append("total", total);

        this.setState({progressSta: 2, progressPre: 100});
        axios.post(this.mergeUrl, formData).then(response => {
            if (response && response.data.code === 200) {
                if (FtConfig.dev) {
                    console.log("合并成功");
                }
                this.setState({progressSta: 3, progressPre: 100});
            }
        }).catch(error => {
            console.log("合并失败");
        })
    }

    doSelectFile() {
        if (FtConfig.dev) {
            console.log("点击选择文件按钮");
        }
        this.inputFile.current.click();
    }


    /**
     * 获取片段总数
     */
    getFragmentTotal(size) {
        let total = size / this.fragmentSize;
        if (size % this.fragmentSize !== 0) {
            total = total + 1;
        }
        return Math.floor(total);
    }


    componentDidMount() {
        this.init();
    }


    toMainPage() {
        if (FtConfig.dev) {
            console.log("返回首页");
        }
        this.props.history.push("/");
    }

    toFolderView() {
        this.props.history.push("/viewFolder");
    }


    render() {
        let info = this.uploadFile == null ? null : <div>
            <div><b>文件名：</b>{this.state.fileName}</div>
            <div><b>大小：</b>{getFileSizeStr(this.state.fileSize)}</div>
        </div>


        return <div className={UploadViewCss.uploadViewBox}>
            <div className={UploadViewCss.infoBox}>
                <div className={UploadViewCss.fileInfoBox}>
                    <div className={UploadViewCss.fileInfoCol}>
                        {info}
                    </div>
                </div>

                <Progress sta={this.state.progressSta} pre={this.state.progressPre}/>
            </div>
            <div className={UploadViewCss.BtnGroup}>
                <input type={"file"} ref={this.inputFile} onChange={this.fileInputChange}
                       style={{display: "none"}}/>
                <div className={UploadViewCss.selectBtn} onClick={this.doSelectFile}>
                    选择文件
                </div>
                <div className={UploadViewCss.handleBtn} onClick={this.doUpload}>上传</div>
                <div className={UploadViewCss.handleBtn} onClick={this.toFolderView}>返回</div>
                <div className={UploadViewCss.handleBtn} onClick={this.toMainPage}>首页</div>
            </div>
        </div>
    }

}

export default UploadView;
