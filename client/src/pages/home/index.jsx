import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getAllTypes } from "../../redux/actions";
import css from './index.module.css'
import NavBar from '../../components/navBar'
import Pokecarta from '../pokeCard';
import Cargando from '../../imagenes/loading2.gif'

const Home = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllPokemons())
    }, []);
        
    React.useEffect(() => {
        dispatch(getAllTypes())
    }, []);

    const pokemons = useSelector((store) => store.pokemons);
    
    const [actual, setActual] = useState(0);

    const [buscar, setBuscar] = useState("");

    const [paginas, setPaginas] = useState(1)

    const filtrar = pokemons.filter((poke) => poke.nombre.includes(buscar))

    const porPagina = () => {
        if(buscar.length === 0) {
            return pokemons.slice(actual, actual + 12);
        } else {
            return filtrar.slice(actual, actual + 12);
        }
    };

    const siguiente = () => {
        if(filtrar.length > actual + 12) {
            setActual(actual + 12)
            setPaginas(paginas + 1)
        }
    };

    const anterior = () => {
        if (actual > 0) {
            setActual(actual - 12)
            setPaginas(paginas - 1)
        }
    };

    const busqueda = ({target}) => {
        setActual(0)
        setPaginas(1)
        setBuscar(target.value.toLowerCase())    
    }

    return (
        <div>
            <NavBar/>
            <div>
                <h1>Pokemons</h1>
            </div>
            <div>
                <input type="text" placeholder="Pokebusqueda" onChange={busqueda} ></input>
            </div>
            <div>
                <button onClick={anterior}>Anterior</button>
                <p>{
                    filtrar.length < 1 && buscar ? 0 : paginas
                } de {
                    filtrar.length < 1 && buscar ? 0 : 
                    filtrar.length < 1 ? Math.ceil(pokemons.length / 12) : Math.ceil(filtrar.length / 12)
                }</p>
                <button onClick={siguiente}>Siguiente</button>
            </div>
            <div>
                {pokemons.length === 0 ? <img src={Cargando} alt='Esperame'/> : porPagina()
                .map((pokemon) => {
                   return ( 
                        <Pokecarta
                            key={pokemon.id}
                            id={pokemon.id}
                            nombre={pokemon.nombre}
                            ataque={pokemon.ataque}
                            altura={pokemon.altura}
                            peso={pokemon.peso}
                            tipos={pokemon.tipos}
                            imagen={pokemon.imagen}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Home;