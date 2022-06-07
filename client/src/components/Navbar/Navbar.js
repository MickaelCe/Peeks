import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import '../../index.css';
import useStyles from './styles';
import logo from "../../images/logo2.svg";


function Navbar({setCurrentRoute}) {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        history.push('/Peeks');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);


  return (
      <AppBar className={classes.appBar} position="fixed" color="inherit" elevation={0}>
        <div className={classes.brandContainer}>
              <Typography component={Link} to="/Peeks" onClick={() => setCurrentRoute('')} className={classes.heading} variant="h2" align="center">
                  Peeks
              </Typography>
        <Link to="/Peeks" onClick={() => setCurrentRoute('')}><img  className={classes.image} src={logo} alt="So_cial" height="60" /></Link>
        </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                  <div className={classes.profile}>
                      <div className={classes.profileNameAndImg}>
                      <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                      <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                      </div>
                      <Button variant='contained' className={classes.logout} onClick={logout}><ExitToAppIcon /></Button>
                    </div>
                    ) : (
                    <Button component={ Link } to="/auth" variant="contained" className="button" color="primary">Sign In</Button>
                    )}
            </Toolbar>
      </AppBar>
  )
}

export default Navbar