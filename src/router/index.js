import React from 'react';
import { HashRouter,Route } from 'react-router-dom';
import Home from '../contain/home'

class RouterParent extends React.Component{
    render(){
        return (
            <HashRouter>
                <Route component={Home} path={`/`}></Route>
            </HashRouter>
        )
    }
}

export default RouterParent;