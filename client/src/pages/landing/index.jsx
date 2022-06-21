import React from 'react'
import { Link } from 'react-router-dom'
import c from './index.module.css'
import img from '../../imagenes/5FBP.gif'
import img2 from '../../imagenes/5FBP.png'

const Landing = () => {
    
    return (
        <section className={c.container}>
            <div className={c.img}>
            <img src={img2} alt="Entrada" width="90%"/>
            </div>
            <div className={c.link} >
                <Link to = '/home'><img src={img} alt="Entrada" width="90%"/></Link>
            </div>
        </section>
    )
};

export default Landing;