import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EstadoPage(props) {
  const { fluxo, estado = {} } = props;
  const classes = useStyles();
  const [nome, setNome] = useState(estado.nome || null);
  const [textoInicio, setTextoInicio] = useState(estado.textoInicio || null);
  const [textoFalha, setTextoFalha] = useState(estado.textoFalha || null);
  const [Tipo, setTipo] = useState(estado.tipo || null);
  const [tipoEntrada, setTipoEntrada] = useState(estado.tipoEntrada || null);
  const [proximoEstado, setProximoEstado] = useState(
    estado.proximoEstado || null
  );
  const [estadoFalha, setEstadoFalha] = useState(estado.estadoFalha || null);

  const Submit = () => {
    if (estado._id) {
      api.post(`fluxo/${fluxo}/estado/${estado._id}`, {}).then((res) => {
        console.log(res);
      });
    } else {
      api.post(`fluxo/${fluxo}/estado`, {}).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <form>
      <div className={classes.root}>
        <TextField label="Nome"></TextField>
        <FormControl>
          <InputLabel>Tipo Entrada</InputLabel>
          <Select
            value={tipoEntrada}
            onChange={(e) => setTipoEntrada(e.target.value)}
          >
            <MenuItem value={0}>texto</MenuItem>
            <MenuItem value={1}>numero</MenuItem>
            <MenuItem value={2}>telefone</MenuItem>
            <MenuItem value={3}>Cep</MenuItem>
            <MenuItem value={4}>CPF/CNPJ</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.root}>
        <TextField label="texto inicial" multiline rows={3}></TextField>
        <TextField label="texto falha" multiline rows={3}></TextField>
      </div>
      <div className={classes.root}>
        <FormControl>
          <InputLabel>Proximo Estado</InputLabel>
          <Select
            value={proximoEstado}
            onChange={(e) => setProximoEstado(e.target.value)}
          >
            <MenuItem value={0}>texto</MenuItem>
            <MenuItem value={1}>numero</MenuItem>
            <MenuItem value={2}>telefone</MenuItem>
            <MenuItem value={3}>Cep</MenuItem>
            <MenuItem value={4}>CPF/CNPJ</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Estado Falha</InputLabel>
          <Select
            value={estadoFalha}
            onChange={(e) => setEstadoFalha(e.target.value)}
          >
            <MenuItem value={0}>texto</MenuItem>
            <MenuItem value={1}>numero</MenuItem>
            <MenuItem value={2}>telefone</MenuItem>
            <MenuItem value={3}>Cep</MenuItem>
            <MenuItem value={4}>CPF/CNPJ</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.root}>
        <FormControl>
          <InputLabel>Tipo Estado</InputLabel>
          <Select value={Tipo} onChange={(e) => setTipo(e.target.value)}>
            <MenuItem value={"info"}>info</MenuItem>
            <MenuItem value={"dado"}>dado</MenuItem>
            <MenuItem value={"opcoes"}>opcoes</MenuItem>
            <MenuItem value={"integracao"}>integracao</MenuItem>
          </Select>
        </FormControl>
      </div>
    </form>
  );
}
