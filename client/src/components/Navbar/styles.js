import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  
  appBar: {
    margin: '0 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    background: "rgba(  253, 251, 251, 0.15  )",
    backdropFilter: "blur( 7px )",
  },
  heading: {
    color: '#000',
    textDecoration: 'none',
    fontFamily: 'Pacifico',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  logout: {
    color: "#fff",
    backgroundColor: "#000",
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color:"#000",
  },
  profileNameAndImg: {
    display: 'flex',
    alignItems: 'center',
    color:"#fff",
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: '15px',
  },
  palette: {
    primary: {
      main: '#000',
    },
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      padding: '10px 0px',
    },
    image: {
      width: '50px',
    },
},
[theme.breakpoints.down('xs')]: {
  userName: {
    display: 'none',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  brandContainer: {
    display: 'flex',
    flexDirection:'row-reverse',
    alignItems: 'center',
  },
  heading: {
    fontSize:'2rem',
  },
}
}));