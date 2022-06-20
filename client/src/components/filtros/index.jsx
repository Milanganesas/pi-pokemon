import React from "react";

const Pokeorden = ({setOrdenados, tipos, setFiltro, setUbicacion, setActual, setPaginas}) => {
    
    const pokeorden = (e) => {
        setOrdenados(e.target.value)
        setActual(0)
        setPaginas(1)
    }
    
    const pokefiltro = (e) => {
        setFiltro(e.target.value)
        setActual(0)
        setPaginas(1)
    }

    const pokeubicacion = (e) => {
        setUbicacion(e.target.value)
        setActual(0)
        setPaginas(1)
    }

    return (
        <div>
            <select onChange={pokeorden}>
                <option value="PREDEFINIDO">Predefinido</option>
                <option value="ASC">Nombre ASC</option>
                <option value="DSC">Nombre DSC</option>
                <option value="AASC">Ataque ASC</option>
                <option value="ADSC">Ataque DSC</option>
            </select>
            <select onChange={pokefiltro}>
                <option value={""}>Predefinido</option>
                {tipos.map(tipo => {
                    return (
                        <option key={tipo.id} value={tipo.nombre}>{tipo.nombre.charAt(0).toUpperCase() + tipo.nombre.slice(1)}</option>
                    )
                    })}
            </select>
            <select onChange={pokeubicacion}>
                <option value="PREDEFINIDO">Predefinido</option>
                <option value="string">Creados</option>
                <option value="number">Existentes</option>
            </select>
        </div>
    )
};

export default Pokeorden;