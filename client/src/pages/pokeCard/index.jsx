import React from "react";
import { Link } from "react-router-dom";

const Pokecarta = (props) => {
    return ( 
        <div key={props.id}>
        <h2>{props.nombre.toUpperCase()}</h2> 
        <h3>Caracteristicas</h3>
        <p>Altura: {props.altura}</p>
        <p>Peso: {props.peso}</p>
        <p>Tipos: {typeof props.id === "number" ? props.tipos.join(", ").toUpperCase() : props.tipos.map(tipo => tipo.nombre).join(", ").toUpperCase()}</p>
        <img src={props.imagen} alt={props.nombre} />
        <Link to = {`/detalle/${props.id}`}><button>Estadisticas</button></Link>
        </div>
    )
}

export default Pokecarta;