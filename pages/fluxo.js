import { Paper, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import api from "../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));
export default () => {
  const classes = useStyles();
  const [fluxos, setFluxos] = useState([]);
  const Load = async () =>{
    const {data} = await api.get('fluxo')
    setFluxos(data);
  }
  useEffect(Load);
  
  return (
    <div>
        <List>
          <ListItem>
            <Typography>helloworld</Typography>
          </ListItem>
        </List>
    </div>
  );
};
