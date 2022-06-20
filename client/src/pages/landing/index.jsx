import React from 'react'
import { Link } from 'react-router-dom'
import { getAllTypes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import CSS from './index.module.css'

const Landing = () => {
    
    return (
        <section>
            <div>
                <h1>Pokedex</h1>
            </div>
            <div>
                <Link to = '/home'><button>Pokentrada</button></Link>
            </div>
        </section>
    )
};

export default Landing;