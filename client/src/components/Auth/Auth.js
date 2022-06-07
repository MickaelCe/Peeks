import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signup, signin } from '../../actions/auth';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };


function Auth({ setCurrentRoute }) {

  const client_id = "716405849969-smuv9g6dlrhg8r1b8sc7cm3sh1jhsbr3.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: client_id,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
    setCurrentRoute(window.location.pathname);
  });

  
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history, setCurrentRoute));
    } else {
      dispatch(signin(formData, history, setCurrentRoute));
    };
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  };

  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp)
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push('/Peeks');
      setCurrentRoute('');
    } catch (error) {
      console.log(error);
    }
  }

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In unsuccessful.");
  }


  return (
    <Container className={classes.auth} component="main" maxWidth='xs'>
      <Paper className={classes.paper} elevation={0}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name='lastName' label="Last Name" handleChange={handleChange} half/>
                </>
              )}
            <Input name='email' label="Email Address" handleChange={handleChange} type="email" />
            <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
          </Grid>
          <Button type='submit' fullWidth variant='contained' className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
          <GoogleLogin
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have and account ? Sign In" : "Don't have an account ? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth