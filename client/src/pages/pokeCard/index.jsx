import React from "react";
import { Link } from "react-router-dom";
import c from "./index.module.css"

const Pokecarta = (props) => {
    const colorTipo = {
        bug: "#26de81",
        dragon: "#ffeaa7",
        electric: "#fed330",
        fairy: "#FF0069",
        fighting: "#30336b",
        fire: "#f0932b",
        flying: "#81ecec",
        grass: "#00b894",
        ground: "#EFB549",
        ghost: "#a55eea",
        ice: "#74b9ff",
        normal: "#95afc0",
        poison: "#6c5ce7",
        psychic: "#a29bfe",
        rock: "#2d3436",
        water: "#0190FF",
        unknown: "#CC5E5E"
      };

    const colorEstilo = colorTipo[typeof props.id === "number" ? props.tipos[0] : props.tipos[0].nombre]

    return ( 
        <div className={c.container} style={{background: `radial-gradient(
            circle at 50% 0%, ${colorEstilo} 36%, #ffffff 36%
        )`}}>
            <div className={c.card} key={props.id}>
                <p className={c.vida}>
                    <span>Vida </span>
                    {props.vida}
                </p> 
                <img className={c.imagen} src={props.imagen} alt={props.nombre}/>
                <h2 className={c.nombre}>{props.nombre.toUpperCase()}</h2>
                <h3 className={c.caracteristicas}>Caracteristicas</h3>
                <div className={c.estadisticas} >
                    <div>
                        <h4>{props.altura / 10} m</h4>
                        <p className={c.altura}>Altura</p>
                    </div>
                    <div>
                        <h4>{props.peso / 10} m</h4>
                        <p className={c.peso}>Peso</p>
                    </div>
                </div>
                <div className={c.tipos}>{typeof props.id === "number" ?
                props.tipos.map(tipo => {return (<span className={c.span} style={{background: `${colorEstilo}`}} key={Math.random() * 10}>{tipo.toUpperCase()}</span>)}) : 
                props.tipos.map(tipo => {return (<span className={c.span} style={{background: `${colorEstilo}`}} key={Math.random() * 10}>{tipo.nombre.toUpperCase()}</span>)})}</div>
            </div>
            <Link to = {`/detalle/${props.id}`}><button className={c.boton}>Estadisticas</button></Link>
        </div>
    )
}

export default Pokecarta;