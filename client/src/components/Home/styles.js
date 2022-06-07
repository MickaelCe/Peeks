import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      },
      appBarSearch: {
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
        background: "rgba(  253, 251, 251, 0.15  )",
        borderRadius: "10px",
        border: "1px solid rgba(  253, 251, 251, 0.15  )",
      },
      pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
      },
      mainContainer: {
        marginTop:"10rem",
      },
       reactButton: {
         position: "fixed",
         right: '3rem',
         bottom: '3rem',
         padding: '1rem 3rem',
         borderRadius: '20px',
         color: "#fff",
         backgroundColor: "#000",
      },
      searchButton: {
        color: "#fff",
        backgroundColor: "#000",
      },
      
  [theme.breakpoints.down('sm')]: {
        mainContainer: {
        flexDirection:"column-reverse"
      }
  },
  [theme.breakpoints.up('lg')]: {
    appBarSearch: {
      position: 'fixed',
      width:'30%'
    },
    formControl: {
      position: 'fixed',
      marginTop: '200px',
      width: '30%',
      background: "none",
    },
  },
}
));