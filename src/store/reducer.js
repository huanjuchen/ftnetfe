import actionType from "./actionType";


const defaultState = {
    MainPage: {
        sharePath: [],
    },
    FolderView: {
        shareKey: null,
        path: null
    },
    FileDetailView: {
        fileUrl: null
    },
    UploadView:{
        path: null
    }

}


export default (state = defaultState, action) => {
    /*
    reducer不应该修改state
    Object.assign：合并第二个及之后的对象到第一个对象
     */

    let nState = null;
    /*
    更新SharePath的值
     */
    if (action.type === "change_mainPage_sharePath") {
        nState = Object.assign({}, state);
        nState.MainPage.sharePath = action.value;
        return nState;
    } else if (actionType.update_folderView === action.type) {
        nState = Object.assign({}, state);
        nState.FolderView = action.value;
        return nState;
    }else if (actionType.update_detailView===action.type){
        nState = Object.assign({}, state);
        nState.FileDetailView=action.value;
        return nState;
    }else if (actionType.update_uploadView===action.type){
        nState = Object.assign({}, state);
        nState.UploadView=action.value;
        return nState;
    }
    return state;
}