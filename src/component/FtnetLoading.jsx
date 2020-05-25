import React from "react";

import FtnetLoadingCss from "../css/FtnetLoading.module.css"


// eslint-disable-next-line no-unused-vars
class FtnetLoading extends React.Component {


    render() {
        return <div className={FtnetLoadingCss.loadingBox}>
            <div className={FtnetLoadingCss.loadingBoxText}>加载中...</div>
        </div>
    }
}

export default FtnetLoading;