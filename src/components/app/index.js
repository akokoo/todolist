import React, { useEffect } from 'react';
import { useAuth0 } from "../../react-auth0-spa";
import { useDispatch } from 'react-redux';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "../mainPage";
import TaskDetails from "../taskDetails";
import Loader from "../loader";
import { loadTasksList } from "./../../fetch";
import {tasksListLoaded} from "../../actions";    

const AppRouter = () => (
    <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/task-details' component={props => <TaskDetails {...props} />}/>
    </Switch>
);

const App = () => {
    const { isAuthenticated, loginWithRedirect, loading, getTokenSilently, user} = useAuth0();
    const dispatch = useDispatch();


    const getList = async () => {
        const token = await getTokenSilently();
        let list = await loadTasksList(user, token);
        dispatch(tasksListLoaded(list));

    };

    useEffect(() => {
        if (loading) {
            console.log('loading');
            return;
        } else if (!isAuthenticated)  {
            console.log('loginwithredirect');
            loginWithRedirect({});
        } else {
            console.log('getlist');
           getList();
        }
    }, );

    if (!loading && isAuthenticated) {
        return (
            <BrowserRouter>
                <div className="App">
                    <AppRouter/>
                </div>
            </BrowserRouter>
        );
    }
    return <Loader />;
};

export default App;