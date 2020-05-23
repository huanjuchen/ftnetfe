import React from "react";
import PathItemCss from "../css/pathItem.module.css";
import FolderImg from "../img/folderImg.png"


class PathItem extends React.Component{

    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    doSomething(){
        console.log("Hello Mother Fuck");
    }


    render(){
        return <div className={PathItemCss.pathItem}>
            <img className={PathItemCss.pathImg} src={FolderImg} alt={"文件夹"}/>
            <div className={PathItemCss.pathText}>
                <a>
                    {this.props.keyName}
                </a>
            </div>
        </div>

    }
}

export default PathItem;