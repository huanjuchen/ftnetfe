import React from "react";
import MainPageItemCss from "../css/MainPageItem.module.css";


class MainPageItem extends React.Component {


    toFolderView(param) {
        this.props.toFolderView(param);

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