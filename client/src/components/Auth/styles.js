import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    background: "rgba(253, 251, 251, 0.15 )",
    backdropFilter: "blur( 7px )",
    borderRadius: '7px',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
      color: "#fff",
      backgroundColor: "#000",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
    backgroundColor: "#000",
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    color: "#fff",
    backgroundColor: "#000",
  },
  auth: {
    marginTop: "8rem",
  },
  bg: {
    height: "100vh",
    width: "100%",
    objectFit: "contain",
  },
}));