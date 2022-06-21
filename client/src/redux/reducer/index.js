import { GET_ALL_POKEMONS, GET_ALL_TYPES, GET_ID, BORRAR } from "../actions";

const initialState = {
    pokemons: [],
    pokemon: {},
    tipos: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
            }
        case GET_ALL_TYPES: 
            return {
                ...state,
                tipos: action.payload,
            }
        case GET_ID:
            return {
                ...state,
                pokemon: action.payload
            }
        case BORRAR:
            return {
                ...state,
                pokemon: action.payload
            }
        default:
            return { ...state }
    }
}

export default rootReducer;