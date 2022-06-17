import React from "react";
import { Link } from "react-router-dom";

const navBar = () => {
    return (
        <>
            <nav>
                <Link to = '/'>Pokedex</Link>
                <Link to = '/home'>Pokecasa</Link>
                <Link to = '/crear'>Create uno!</Link>
            </nav>
        </>
    )
}

export default navBar;