import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getAllTypes } from "../../redux/actions";
import c from './index.module.css'
import NavBar from '../../components/navBar'
import Pokecarta from '../pokeCard';
import Cargando from '../../imagenes/loading2.gif'
import { ordenar } from '../../components/filtros/components/ordenar.jsx';
import Pokeorden from '../../components/filtros/';
import pokebuscar from '../../imagenes/pokesearch.png'

const Home = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
    }, []);

    const pokemons = useSelector((store) => store.pokemons);

    const poketipos = useSelector((store) => store.tipos)
    
    const [actual, setActual] = useState(0);

    const [buscar, setBuscar] = useState("");

    const [paginas, setPaginas] = useState(1)

    const [ordenados, setOrdenados] = useState([])

    const [filtro, setFiltro] = useState("")

    const [ubicacion, setUbicacion] = useState("")

    const filtrar = pokemons.filter((poke) => poke.nombre.toLowerCase().includes(buscar))

    const porPagina = () => {
        if(!buscar) {
            return pokemons
        } else {
            return filtrar
        }
    };

    const listo = ordenar(porPagina(), ordenados)
    .filter(pokemon => ubicacion === "PREDEFINIDO" ? pokemon.nombre :
    ubicacion === "string" ? typeof pokemon.id === "string" : 
    ubicacion === "number" ? typeof pokemon.id === "number" : pokemon.nombre)
    .filter(pokemon => !filtro ? pokemon.nombre :
    typeof pokemon.id === "number" ? pokemon.tipos.includes(filtro) : 
    pokemon.tipos.map(tipo => tipo.nombre).includes(filtro))

    const siguiente = () => {
        if(listo.length > actual + 12) {
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
            <div className={c.container}>
                <div className={c.buscar}>
                    <input className={c.input} type="text" placeholder="Pokebusqueda" onChange= {busqueda}/>
                    <img className={c.imagen} src={pokebuscar} alt="Busqueda"/>
                </div>
                <div className={c.filtrado}>
                    <Pokeorden setOrdenados={setOrdenados} tipos={poketipos} setFiltro={setFiltro} setUbicacion={setUbicacion} setActual={setActual} setPaginas={setPaginas}/>
                </div>
                <div className={c.paginado}>
                    <button className={c.boton} onClick={anterior}>Anterior</button>
                    <span className={c.texto}>{
                        filtrar.length < 1 && buscar ? 0 : listo.length < 1 ? 0 : paginas
                    } de {
                        porPagina().length < 1 && buscar ? 0 : 
                        Math.ceil(listo.length / 12)
                    }</span>
                    <button className={c.boton} onClick={siguiente}>Siguiente</button>
                </div>
            </div>
            <div className={c.cartas}>
                {pokemons.length === 0 || poketipos.length === 0 || listo.length === 0 ? <img className={c.cargando} src={Cargando} alt='Esperame'/> : listo
                .slice(actual, actual + 12)
                .map((pokemon) => {
                   return ( 
                        <Pokecarta
                            key={pokemon.id}
                            id={pokemon.id}
                            nombre={pokemon.nombre}
                            vida={pokemon.vida}
                            ataque={pokemon.ataque}
                            altura={pokemon.altura}
                            peso={pokemon.peso}
                            tipos={pokemon.tipos}
                            imagen={pokemon.imagen}
                        />
                    )
                })}
            </div> 
            <div className={c.container}>
                <div className={c.paginado}>
                    <button className={c.boton} onClick={anterior}>Anterior</button>
                    <span className={c.texto}>{
                        filtrar.length < 1 && buscar ? 0 : listo.length < 1 ? 0 : paginas
                    } de {
                        porPagina().length < 1 && buscar ? 0 : 
                        Math.ceil(listo.length / 12)
                    }</span>
                    <button className={c.boton} onClick={siguiente}>Siguiente</button>
                </div>
            </div>
        </div>
    )
}

export default Home;