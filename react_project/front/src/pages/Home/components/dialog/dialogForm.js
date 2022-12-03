import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    name: props.title,
    cost: props.cost,
    color: props.color,
    size: props.size,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const addTenis = () => {
    Axios.post("http://localhost:3001/createTenis", {
        user_id: props.user_id,
        name: editValues.name,
        tamanho: editValues.size,
        cor: editValues.color,
        preco: editValues.cost,
    }).then((response) => {
        if(response.data.auth){
          handleClose();
          window.location.reload();
        }else{
          alert("Falha no cadastro");
        }
    });
};

  const editTenis = () => {
    Axios.put("http://localhost:3001/updateTenis", {
      id: props.id,
      name: editValues.name,
      preco: editValues.cost,
      cor: editValues.color,
      tamanho: editValues.size,
      user_id: props.user_id,
    }).then((response) => {
      if (response.data.auth) {
        handleClose();
        window.location.reload();
      } else {
        alert("Falha na edição");
      }
    });
    handleClose();
  };

  const deleteTenis = () => {
    Axios.delete(`http://localhost:3001/deleteTenis/${props.id}/${props.user_id}`).then((response) => {
      if (response.data.auth) {
        handleClose();
        window.location.reload();
      } else {
        alert("Falha na exclusão");
      }
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {props.mode == 0 ? (
          <DialogTitle id="form-dialog-title">Adicionar Tênis</DialogTitle>
        ) : (
          <DialogTitle id="form-dialog-title">Editar Tênis</DialogTitle>)}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do tênis"
            defaultValue={props.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            margin="dense"
            id="cost"
            label="preço"
            defaultValue={props.cost}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            margin="dense"
            id="color"
            label="Cor"
            defaultValue={props.color}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            margin="dense"
            id="size"
            label="Tamanho"
            defaultValue={props.size}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          {props.mode == 0 ? (<></>) :
          (<Button color="primary" onClick={() => deleteTenis()}>
          Excluir
        </Button>)}
          <Button color="primary" onClick={() => {
              if(props.mode == 0){
                addTenis();
              }else{
                editTenis();
              }
          }}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
