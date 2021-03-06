import React from "react";
import c from "./index.module.css"

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
        <div className={c.container}>
            <select className={c.select} onChange={pokeorden}>
                <option value="PREDEFINIDO">Predefinido</option>
                <option value="ASC">Nombre ASC</option>
                <option value="DSC">Nombre DSC</option>
                <option value="AASC">Ataque ASC</option>
                <option value="ADSC">Ataque DSC</option>
                <option value="DASC">Defensa ASC</option>
                <option value="DDSC">Defensa DSC</option>
                <option value="VASC">Velocidad ASC</option>
                <option value="VDSC">Velocidad DSC</option>
                <option value="ALASC">Altura ASC</option>
                <option value="ALDSC">Altura DSC</option>
                <option value="PASC">Peso ASC</option>
                <option value="PDSC">Peso DSC</option>
            </select>
            <select className={c.select} onChange={pokefiltro}>
                <option value={""}>Predefinido</option>
                {tipos.map(tipo => {
                    return (
                        <option key={tipo.id} value={tipo.nombre}>{tipo.nombre.charAt(0).toUpperCase() + tipo.nombre.slice(1)}</option>
                    )
                    })}
            </select>
            <select className={c.select} onChange={pokeubicacion}>
                <option value="PREDEFINIDO">Predefinido</option>
                <option value="string">Creados</option>
                <option value="number">Existentes</option>
            </select>
        </div>
    )
};

export default Pokeorden;