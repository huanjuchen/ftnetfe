import React from "react";
import UploadViewCss from "../css/UploadView.module.css";
import store from "../store";
import FtConfig from "../ftconfig";
import axios from "axios"


class UploadView extends React.Component {

    constructor(props) {
        super(props);
        this.path = null;

        this.inputFile = React.createRef();
        this.doUpload = this.doUpload.bind(this);
        //每个文件片段5MB
        this.fragmentSize = 5242880;
        this.successCount = 0;

        this.uploadUrl = "/file/upload";
        this.mergeUrl = "/file/merge";

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


    doUpload() {
        //上传的文件
        let mainFile = this.inputFile.current.files[0];
        //文件名
        let fileName = null;
        //文件大小 字节
        let fileSize;

        let path = this.path;


        let total = 0;
        if (mainFile != null && path != null) {
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
                formData.append("sequence", i + 1);
                formData.append("md5", null);
                formData.append("file", fragmentFile);
                this.doUpload0(formData, path, fileName, total);
                // let result=this.doUpload0(formData);
                // if (FtConfig.dev){
                //     console.log("result= "+result);
                // }
                // if (!result){
                //     alert("上传失败");
                //     break;
                // }
            }
        }
    }

    // async doUpload0(formData){
    //     let url="/file/upload";
    //     if (FtConfig.dev){
    //         url="/api"+url;
    //     }
    //     let config={
    //         headers:{
    //             "content-type":"multipart/form-data;charset=utf-8"
    //         }
    //     }
    //     await axios.post(url,formData,config).then(response=> {
    //         if (response&&response.data.code===200){
    //             if (FtConfig.dev){
    //                 console.log("response.data.code= "+response.data.code);
    //             }
    //             return true;
    //         }
    //         return  false;
    //     }).catch(error=>{
    //         console.error(error);
    //         return false;
    //     });
    // }


    doUpload0(formData, path, name, total) {
        let config = {
            headers: {
                "content-type": "multipart/form-data;charset=utf-8"
            }
        }
        axios.post(this.uploadUrl, formData, config).then(response => {
            if (response && response.data.code === 200) {
                this.successCount++;
                if (FtConfig.dev) {
                    console.log("成功片段总数= " + this.successCount);
                }
                if (this.successCount === total) {
                    this.doMerge0(path,name, total);
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

        axios.post(this.mergeUrl,formData).then(response => {
            if (response && response.data.code === 200) {
                if (FtConfig.dev) {
                    console.log("合并成功");
                }
            }
        }).catch(error => {
            console.log("合并失败");
        })
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


    render() {
        return <div className={UploadViewCss.uploadViewBox}>
            <div className={UploadViewCss.infoBox}/>

            <div className={UploadViewCss.BtnGroup}>
                <input type={"file"} ref={this.inputFile} className={UploadViewCss.fileSelect}/>
            </div>
            <div className={UploadViewCss.BtnGroup}>
                <div className={UploadViewCss.handleBtn} onClick={this.doUpload}>上传</div>
                <div className={UploadViewCss.handleBtn}>返回文件夹</div>
                <div className={UploadViewCss.handleBtn}>返回首页</div>
            </div>
        </div>
    }

}

export default UploadView;
