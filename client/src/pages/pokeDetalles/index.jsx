import React from "react";
import { Link } from "react-router-dom";
import NavBar from '../../components/navBar';

const Detalles = () => {

    return (
        <div>
            <NavBar/>
            <div>
                <h1>Poke Detalles</h1>
                <Link to = '/home'><button>Casita</button></Link>
            </div>
        </div>
    )
}

export default Detalles;