import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { Link } from 'react-router-dom';

function Form({ currentId, setCurrentId, setOpen}) {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

 const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name}, history));
    }
    clear();
    setOpen(false);
  }



  if (!user?.result?.name) {
    return (
      <Paper className={`${classes.paper} ${classes.join}`} elevation={0}>
        <Typography variant="h5" >Comment like and share with <span style={{fontFamily: 'Pacifico'}}>Peeks</span> !</Typography>
        <Typography variant="h6" className={classes.joinTitle} align="center">
          <Button component={ Link } to="/auth" variant="contained" className="button" color="primary">JOIN NOW</Button>
        </Typography>
        <Typography variant="h6" className={classes.copyright}>Copyright © Peeks</Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>
          {currentId ? 'Edit' : 'Share' }
        </Typography>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
        <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
        <div className={classes.fileInput}>
          <FileBase type="file"  multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64})}/>
        </div>
        <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Share</Button>
        <Button variant="contained" color="secondary" size="small" className='button' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form