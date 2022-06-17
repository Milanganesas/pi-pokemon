import React, { useState } from 'react'
import { useSelector } from "react-redux";

export default Buscar = () => {

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

}