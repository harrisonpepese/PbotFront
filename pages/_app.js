import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));
export default function MyApp({ Component, pageProps }) {
    const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Pbot</Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={11} md={10} lg={9} xl={8}>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </div>
  );
}
