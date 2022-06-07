import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardHeader, Avatar, CardActions, CardContent, CardMedia, Button, Typography, IconButton, ButtonBase} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';
    

function Post({ post, setCurrentId, setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);
 

  const openPost = () => {
    history.push(`/posts/${post._id}`)
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };


  return (
    <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar alt={post.name} className={classes.purple}>{post.name.charAt(0)}</Avatar>
      }
        action={
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <IconButton aria-label="settings" onClick={() => { setOpen(true);setCurrentId(post._id) }}>
                    <MoreHorizIcon fontSize='medium'/>
                  </IconButton>
                )}
      title={post.name}
      subheader={moment(post.createdAt).fromNow()}
        />
    <ButtonBase className={classes.cardAction} onClick={openPost}>    
    <CardMedia className={classes.media} image={post.selectedFile ? post.selectedFile : "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} title={post.title} />
    <CardContent>
        <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</ Typography>
        <Typography variant="h5" gutterBottom>{post.title}</ Typography>
        <Typography variant="h6" color="textSecondary" component="p" gutterBottom>{post.message}</ Typography>
        </CardContent>
    </ButtonBase>
    <CardActions className={classes.cardActions}>
      <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
        <Likes />
      </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
         )}
      </CardActions>
    </Card>
  )
}

export default Post