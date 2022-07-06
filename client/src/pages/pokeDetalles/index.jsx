import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getId, borrar } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import NavBar from '../../components/navBar';
import Cargando from '../../imagenes/loading2.gif'
import c from './index.module.css'

const Detalles = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const pokemon = useSelector((store) => store.pokemon)

    React.useEffect(() => {
        if(id) {
            dispatch(getId(id)) 
        }
        return () => {dispatch(borrar())}
    }, []);

    const colorTipo = {
        steel: "#565554", 
        dark: "#000000",
        shadow: "#511730",
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
        rock: "#B5BD89",
        water: "#0190FF",
        unknown: "#CC5E5E"
      };
    
    let colorEstilo;
    pokemon.nombre ? colorEstilo = colorTipo[pokemon.tipos[0]] : console.log("esperar")

    let rotate;

    const mover = (e) => {
        rotate = [e.clientX, e.clientY]
       
    }

    console.log(rotate)

    return (
        <div>
            <NavBar/>
            { pokemon.nombre ? 
            <div onMouseMove={(e) => mover(e)} className={c.container} style={{background: `radial-gradient(
                circle at 50% 0%, ${colorEstilo} 35%, #ffffff 36%
            )`, transform: rotate}}>
                <div className={c.card}>
                    <h2 className={c.nombre}>{pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1)}</h2>
                    <div className={c.estadisticas}> 
                        <div>
                            <h4>{pokemon.vida}</h4>
                            <p>Vida</p>
                        </div>
                        <div>
                            <h4>{pokemon.ataque}</h4>
                            <p>Ataque</p>
                        </div>
                        <div>
                            <h4>{pokemon.defensa}</h4>
                            <p>Defensa</p>
                        </div>
                        <div>
                            <h4>{pokemon.velocidad}</h4>
                            <p>Velocidad</p>
                        </div>
                        <div>
                            <h4>{pokemon.altura / 10} m</h4>
                            <p>Altura</p>
                        </div>
                        <div>
                            <h4>{pokemon.peso / 10} m</h4>
                            <p>Peso</p>
                        </div>
                    </div>
                    <div className={c.tipos}>{pokemon.tipos.map(tipo => {return (<span className={c.span} style={{background: `${colorEstilo}`}} key={Math.random() * 10}>{tipo.toUpperCase()}</span>)})}
                    </div>
                    <img id="imagen" className={c.imagen} src={pokemon.imagen} alt={pokemon.nombre}/>
                    <Link to = '/home'><button className={c.boton}>Casita</button></Link>
                </div>
            </div> :
            <div className={c.cargando}>
                <img src={Cargando} alt="Esperame"/>
            </div>
            }
        </div>
    )
}

export default Detalles;