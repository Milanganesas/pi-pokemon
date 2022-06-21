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

    React.useEffect(() => {
        if(id) {
            dispatch(getId(id)) 
        }
        return () => {dispatch(borrar())}
    }, []);

    const pokemon = useSelector((store) => store.pokemon)
    return (
        <div>
            <NavBar/>
            <div>
            { pokemon.nombre ? 
                <div>
                    <h1>Poke Detalles</h1>
                    <h3>Yo soy: {pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1)}</h3>
                    <p>Vida: {pokemon.vida}</p>
                    <p>Ataque: {pokemon.ataque}</p>
                    <p>Defensa: {pokemon.defensa}</p>
                    <p>Velocidad: {pokemon.velocidad}</p>
                    <p>Altura: {pokemon.altura / 10} m</p>
                    <p>Peso: {pokemon.peso / 10} kg</p>
                    <img src={pokemon.imagen} alt={pokemon.nombre}/>
                </div> :
                <img src={Cargando} alt="Esperame"/>
                }
                <Link to = '/home'><button>Casita</button></Link>
            </div>
        </div>
    )
}

export default Detalles;