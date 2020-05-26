import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "./view/MainPage"
import FolderView from "./view/FolderView";
import FileDetailView from "./view/FileDetailView";

class App extends React.Component {

    render() {
        return <Router>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/viewFolder" component={FolderView}/>
                <Route exact path="/fileDetail" component={FileDetailView}/>
            </Switch>
        </Router>
    }
}

export default App;