export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const POST_POKEMON = 'POST_POKEMON';

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