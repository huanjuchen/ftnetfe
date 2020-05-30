import React from "react";
import PathItemCss from "../css/PathItem.module.css";
import FolderImg from "../img/folderImg.svg";

/**
 * 文件夹组件
 */
class PathItem extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    toFolderView(val) {
        this.props.toFolderView(val);
    }

    render() {
        return <div className={PathItemCss.pathItem}>
            <div className={PathItemCss.pathImg}>
                <img width="100%" height="100%" src={FolderImg} alt={"文件夹"}/>
            </div>
            <div className={PathItemCss.pathText} onClick={() => {
                this.toFolderView(this.props.path);
            }}>
                {this.props.path.name}</div>
        </div>
    }
}

export default PathItem;