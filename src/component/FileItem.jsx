import React from "react";
import FileItemCss from "../css/FileItem.module.css";
import FileIcon from "../img/fileIcon.svg";

class FileItem extends React.Component {

    toFileDetails(fileUrl) {

        this.props.toFileDetail({fileUrl:fileUrl});
    }


    render() {
        return <div className={FileItemCss.fileItem} onClick={() => {
            this.toFileDetails(this.props.path.url)
        }}>
            <div className={FileItemCss.fileImg}>
                <img width="100%" height="100%" src={FileIcon} alt={"文件"}/>
            </div>
            <div className={FileItemCss.fileText}>{this.props.path.name}</div>
        </div>
    }
}

export default FileItem;