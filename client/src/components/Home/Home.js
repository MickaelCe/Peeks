import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Modal} from '@material-ui/core';
import { useDispatch } from "react-redux";
import { getPostsBySearch } from '../../actions/posts';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput  from 'material-ui-chip-input';
import useStyles from './styles';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {

    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [open, setOpen] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchPost();
        }
    };

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
  const body = (
        <div>
            <Form currentId={currentId} setCurrentId={setCurrentId} setOpen={setOpen}/>
        </div>
      );

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(',')}`);
        } else {
            history.push('/Peeks');
        }
    }

    

  return (
    <Grow in>
    <Container maxWidth="xl">
        <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12} lg={7}>
                      <Posts setCurrentId={setCurrentId} setOpen={setOpen}/>
            </Grid>
            <Grid item xs={12} sm={12} lg={4} >
                      <AppBar className={classes.appBarSearch} position="static" color='inherit' elevation={0}>
                          <TextField
                              name='search'
                              variant='outlined'
                              label="Search"
                              fullWidth
                              value={search}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => {
                              setSearch(e.target.value);
                              }}
                          />
                          <ChipInput
                              style={{margin: '10px 0'}}
                              value={tags}
                              onAdd={handleAdd}
                              onDelete={handleDelete}
                              label="Search Tags"
                              variant='outlined'
                          />
                      <Button onClick={searchPost} className={classes.searchButton} variant="contained">Search</Button>
                      {(!searchQuery && !tags.length) && (
                        <Pagination page={page} />
                      )}
                      </AppBar>
                      <Button type="button" className={classes.reactButton} onClick={handleOpen} variant="contained">
                        Share Now
                      </Button>
                        <Modal
                        open={open}
                        onClose={handleClose}
                        >
                        {body}
                        </Modal>
            </Grid>
        </Grid>
    </Container>
    </Grow>
  )
}

export default Home;