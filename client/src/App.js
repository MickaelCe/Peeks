import React, { useState } from "react";
import { Container} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import bg from "./images/bg.mp4";
import useStyles from './styles';


const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const [currentRoute, setCurrentRoute] = useState('');



    return (

        <Router>
            {currentRoute === '/auth' ? (
            <React.Fragment>
                <video className={classes.video} src={bg} autoPlay loop muted />
            </React.Fragment>) : null}
            
            <Container maxWidth="xl">
                    <Navbar setCurrentRoute={setCurrentRoute}/>
                    <Switch>
                        <Route exact path='/Peeks' component={() => <Redirect to="/posts" />}/>
                        <Route exact path='/posts' component={Home} />
                        <Route exact path='/posts/search' component={Home} />
                        <Route exact path='/posts/:id' component={PostDetails}/>
                    <Route exact path='/auth' component={() => (!user ? <Auth setCurrentRoute={setCurrentRoute}/> : <Redirect to="/posts"/>)}/>
                    </Switch>
                </Container>
            </Router>

    );
}

export default App;