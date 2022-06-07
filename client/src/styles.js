import { makeStyles } from '@material-ui/core/styles';


export default makeStyles(() => ({
    bg: {
        height: "100vh",
        width: "100%",
        objectFit: "cover",
    },
    video: {
        objectFit: "cover",
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: "-1",
        marginTop: "-129px",
        marginLeft: "-8px",
        filter: "invert(95%) saturate(0%) brightness(50%)",
    },
  }));