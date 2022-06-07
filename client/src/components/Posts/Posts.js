import React from 'react';
import { Grid, Card, CardHeader,CardContent} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';
    

function Posts({ setCurrentId, setOpen }) {

  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return 'Nothing to show';

  return (
    isLoading ? (
      <Card className={classes.card}>
      <CardHeader
          avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          }
          action={null}
          title={
            <React.Fragment>
              <Skeleton animation="wave" height={10} width={80} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width={80} style={{ marginBottom: 6 }} />
            </React.Fragment>
          }
      />
      <Skeleton animation="wave" height={500} variant="rect" />
      <CardContent>
        <React.Fragment>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={20} width="80%" />
        </React.Fragment>
      </CardContent>
      </Card>
      
    ) : (
        <Grid className={classes.container} container alignItems='stretch' spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12}>
              <Post post={post} setCurrentId={setCurrentId} setOpen={setOpen} />
            </Grid>
          ))}
        </Grid>
      )
  );
}

export default Posts