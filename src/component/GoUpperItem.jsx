import React from "react";
import GoUpperItemCss from "../css/GoUpperItem.module.css";
import GoUpperIconImg from "../img/GoUpperIcon.svg";



/**
 * 返回上一级
 * 组件
 */
class GoUpperItem extends React.Component{


    doGoUpper(param){
        this.props.toFolderView({url:param})
    }


    render() {
        return <div onClick={()=>{this.doGoUpper(this.props.pathUrl)}} className={GoUpperItemCss.GoBackItemBox}>
            <div className={GoUpperItemCss.GoBackItemIcon}>
                <img src={GoUpperIconImg} width="100%" height="100%" alt={"上一级"}/>
            </div>
            <div className={GoUpperItemCss.GoBackItemText}>返回上一级</div>
        </div>
    }
}

export default GoUpperItem;