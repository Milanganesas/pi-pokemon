import React from "react";
import { Link } from "react-router-dom";
import c from "./index.module.css"
import img from '../../imagenes/pokemon.png'

const navBar = () => {
    return (
        <>
            <nav className={c.nav}>
                <div className={c.logo}>
                    <img src={img} alt="Pokemon" width="150vw"/>
                </div>
                <div className={c.container}>
                    <ul>
                        <li className={c.one}><Link className={c.link} to = '/'>PoKeDeX</Link></li>
                        <li className={c.two}><Link className={c.link} to = '/home'>PoKeCaSa</Link></li>
                        <li className={c.three}><Link className={c.link} to = '/crear'>CreaTe Uno!</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default navBar;