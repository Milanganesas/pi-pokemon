export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const GET_ID = 'GET_ID';
export const BORRAR = 'BORRAR'

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const pokeDatos = await fetch('http://localhost:3001/pokemons');
            const datos = await pokeDatos.json();
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: datos
            });
        } catch (error) {
            return error;
        }
    }
}

export const getAllTypes = () => {
    return async (dispatch) => {
        try {
            const pokeDatos = await fetch('http://localhost:3001/');
            const datos = await pokeDatos.json();
            dispatch({
                type: GET_ALL_TYPES,
                payload: datos
            });
        } catch (error) {
            return error;
        }
    }
}

export const getId = (id) => {
    return async (dispatch) => {
        try {
            const pokeDatos = await fetch(`http://localhost:3001/pokemons/${id}`);
            const datos = await pokeDatos.json();
            dispatch({
                type: GET_ID,
                payload: datos
            });
        } catch (error) {
            return error;
        }
    }
}

export const borrar = () => {
    return {
        type: BORRAR,
        payload: {}
    }
}