import { GET_ALL_POKEMONS, GET_ALL_TYPES, POST_POKEMON } from "../actions";

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
        case POST_POKEMON:
            return {
                ...state
            }
        default:
            return { ...state }
    }
}

export default rootReducer;