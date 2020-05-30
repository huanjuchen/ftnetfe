import React from "react";
import ProgressCss from "../css/Progress.module.css"
// import {getRandomNum} from "../util/FtUtils"



class Progress extends React.Component {

    render() {
        let text = "null";
        if (this.props.sta === 0) {
            text = "处理中";
        } else if (this.props.sta === 1) {
            text = "上传中...进度" + this.props.pre + "%";
        } else if (this.props.sta === 2) {
            text = "合并中..."
        } else if (this.props.sta === 3) {
            text = "完成";
        } else if (this.props.sta === -1) {
            text = ""
        }


        return <div className={ProgressCss.progressBox}>
            <div className={ProgressCss.progressCol}>
                <div className={ProgressCss.progressItem}>
                    <div className={ProgressCss.progress} style={{width: this.props.pre + "%"}}/>
                </div>
            </div>
            <div className={ProgressCss.progressText}>
                {text}
            </div>
        </div>
    }
}

export default Progress;