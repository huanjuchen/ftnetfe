import React from "react";
import MainPageItemCss from "../css/MainPageItem.module.css";


class MainPageItem extends React.Component {


    toFolderView(param) {
        let obj = {
            keyName: param
        }

        this.props.toFolderView(obj);
    }


    render() {
        return <div className={MainPageItemCss.itemBox}>
            <div onClick={() => {
                this.toFolderView(this.props.itemName)
            }} className={MainPageItemCss.itemText}>{this.props.itemName}</div>
        </div>
    }
}

export default MainPageItem;