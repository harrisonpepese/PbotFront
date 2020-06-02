import {Button,IconButton,ListItemText, TextField, ListItemSecondaryAction, ListItem, FormControl, List, MenuItem, ListSubheader, InputLabel, Select } from "@material-ui/core"
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete"

export default (props) => {
  const { opcoes, state, estados } = props;
  const [input, setInput] = useState('');
  const statecopy =()=>{
    return opcoes.slice(0)
  }
  const proximoEstado = (index, data) => {
    const o = statecopy();
    o[index].ProximoEstado = data;
    save(o);
  }
  const textoOpcao = (index, data) => {
    const o = statecopy();
    o[index].TextoOpcao = data;
    save(o);
  }
  const addRespostaValida = (index, texto) => {
    const o = statecopy(0);
    o[index].RespostasValidas.push({texto})
    save(o);
    setInput('');
  }
  const removeRespostaValida = (index, data) => {
    const o = statecopy();
    o[index].RespostasValidas.splice(data, 1)
    save(o);
  }
  const intencao = (index, data) => {
    const o = statecopy();
    o[index].ProximoEstado = data;
    save(o);
  }
  const save = (o) => {
    state(o)
  }
  return (
    <div>
      {
        opcoes.map((o, i) => (
          <div key={i}>
            <div>
              <TextField multiline label="Texto" value={o.TextoOpcao} rows={3} onChange={(e) => textoOpcao(i, e.target.value)} />
            </div>
            <div>
              <FormControl>
                <InputLabel>Proximo Estado</InputLabel>
                <Select
                  value={o.proximoEstado}
                  onChange={(e) => proximoEstado(i, e.target.value)}
                >
                  {estados.map((e) => (
                    <MenuItem value={e._id}>{e.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <List subheader={
                <ListSubheader>Respostas Validas</ListSubheader>
              }>
                <ListItem>
                  <TextField value={input} label="texto" onChange={e=>setInput(e.target.value)}/>
                  <ListItemSecondaryAction>
                    <Button onClick={e=>addRespostaValida(i,input)}>Criar</Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {
                  o.RespostasValidas.map((r,y) => (
                    <ListItem>
                      <ListItemText>
                        {r.texto}
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton onClick={e=>removeRespostaValida(i,y)}>
                          <DeleteIcon/>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                }
              </List>
            </div>
          </div>
        ))
      }
    </div>
  )
}