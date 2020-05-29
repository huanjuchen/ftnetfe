import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "./view/MainPage"
import FolderView from "./view/FolderView";
import FileDetailView from "./view/FileDetailView";
import UploadView from "./view/UploadView";
import store from "./store";
import {Provider} from "react-redux";


class App extends React.Component {

    render() {
        return <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/viewFolder" component={FolderView}/>
                    <Route exact path="/fileDetail" component={FileDetailView}/>
                    <Route exact path="/uploadView" component={UploadView}/>
                </Switch>
            </Router>
        </Provider>
    }
}

export default App;