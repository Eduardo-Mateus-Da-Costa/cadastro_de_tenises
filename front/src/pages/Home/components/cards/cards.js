import {useState} from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FormDialog
        open={open}
        mode={1}
        setOpen={setOpen}
        title={props.name}
        color={props.color}
        cost={props.cost}
        size={props.size}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
        user_id={props.user_id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h2 className="titulo">{props.name}</h2>
        <h1>Cor: {props.color}</h1>
        <h1>Tamanho: {props.size}</h1>
        <h3>R${props.cost}</h3>
      </div>
    </>
  );
}
