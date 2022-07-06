import React from "react";
import { Link } from "react-router-dom";
import c from "./index.module.css"
import img from '../../imagenes/pokemon.png'

const navBar = () => {
    return (
        <div className={c.navBar}>
            <div>
                <img className={c.logo} src={img} alt="Logo"/>
            </div>
            <div className={c.items}>
                <Link className={c.link} to = '/home'>PoKeCaSa</Link>
                <Link className={c.link} to = '/crear'>PoKrEaTe</Link>
            </div>
        </div>
    )
}

export default navBar;