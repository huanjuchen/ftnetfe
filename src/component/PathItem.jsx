import React from "react";
import PathItemCss from "../css/PathItem.module.css";
import FolderImg from "../img/folderImg.png";


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
            <img className={PathItemCss.pathImg} src={FolderImg} alt={"文件夹"}/>
            <div className={PathItemCss.pathText} onClick={() => {
                this.toFolderView(this.props.path.url);
            }}>
                { this.props.path.name}</div>
        </div>
    }
}

export default PathItem;