import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EstadoPage(props) {
  const { estado = {} } = props;
  const classes = useStyles();
  const [fluxo, setFluxo] = useState({ estados: [] });
  const [nome, setNome] = useState(estado.nome || null);
  const [textoInicial, setTextoInicial] = useState(estado.textoInicio || null);
  const [textoFalha, setTextoFalha] = useState(estado.textoFalha || null);
  const [Tipo, setTipo] = useState(estado.tipo || null);
  const [tipoEntrada, setTipoEntrada] = useState(estado.tipoEntrada || null);
  const [proximoEstado, setProximoEstado] = useState(
    estado.proximoEstado || null
  );
  const [estadoFalha, setEstadoFalha] = useState(estado.estadoFalha || null);

  const loadFluxo = () => {
    api.get("fluxo/5ece80189d30ebfb95af6fb6").then((res) => {
      setFluxo(res.data);
    });
  };

  const Submit = () => {
    if (estado._id) {
      api
        .post(`fluxo/${fluxo._id}/estado/${estado._id}`, {
          nome,
          textoInicial,
          textoFalha,
          tipo: Tipo,
          tipoEntrada,
          proximoEstado,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      api
        .post(`fluxo/${fluxo._id}/estado`, {
          nome,
          textoInicial,
          textoFalha,
          tipo: Tipo,
          tipoEntrada,
          proximoEstado,
        })
        .then((res) => {
          console.log(res);
        });
    }
  };

  useEffect(loadFluxo);

  return (
    <form>
      <div className={classes.root}>
        <TextField label="Nome" value={nome}
          onChange={(e) => setNome(e.target.value)}></TextField>
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
        <TextField
          label="texto inicial"
          multiline
          rows={3}
          value={textoInicial}
          onChange={(e) => setTextoInicial(e.target.value)}
        ></TextField>
        <TextField
          label="texto falha"
          multiline
          rows={3}
          value={textoFalha}
          onChange={(e) => setTextoFalha(e.target.value)}
        ></TextField>
      </div>
      <div className={classes.root}>
        <FormControl>
          <InputLabel>Proximo Estado</InputLabel>
          <Select
            value={proximoEstado}
            onChange={(e) => setProximoEstado(e.target.value)}
          >
            {fluxo.estados.map((e) => (
              <MenuItem value={e._id}>{e.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Estado Falha</InputLabel>
          <Select
            value={estadoFalha}
            onChange={(e) => setEstadoFalha(e.target.value)}
          >
            {fluxo.estados.map((e) => (
              <MenuItem value={e._id}>{e.nome}</MenuItem>
            ))}
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
      <div>
        <Button onClick={Submit}>Criar</Button>
      </div>
    </form>
  );
}
