import { makeStyles } from '@material-ui/core/styles';
import bgJoin from '../../images/join.png';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    position: 'absolute',
    left: '35%',
  },
  join: {
    backgroundImage: `url(${bgJoin})`,
    backgroundSize: 'contain',
    backgroundRepeat:'no-repeat',
    backgroundPosition: "center",
    height: '300px',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  joinTitle: {
    marginTop:'-2rem',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  copyright: {
    fontSize:'10px',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    objectFit: 'contain'
  },
  buttonSubmit: {
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#000",
  },
  [theme.breakpoints.down('sm')]: {
    form: {
      overflow: "hidden",
    },
    paper: {
      left: '0%',
    },
    join: {
      left: '0%',
      width: '100%',
    },
  },
  [theme.breakpoints.up('md')]: {
    paper: {
      position: 'fixed',
      marginTop:'200px',
      width:'28%'
    },
  },
}));