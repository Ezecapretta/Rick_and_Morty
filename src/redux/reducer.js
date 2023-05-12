const initialState = {
    myFavorites: [],
    allCharacters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FAV':
            return {
                ...state,
                myFavorites: [...state.allCharacters, action.payload],
                allCharacters: [...state.allCharacters, action.payload]
            }
        case 'REMOVE_FAV':
            return {
                ...state,
                myFavorites: state.myFavorites.filter(fav => fav.id !== Number(action.payload))
            }
        case 'FILTER':
            const allCharactersFiltered = state.allCharactersFiltered.filter(char => char.gender === action.payload.gender)
            return {
                ...state,
                myFavorites: allCharactersFiltered
            }
        // case 'ORDER':
        //     const allCharactersCopy = [...state.allCharacters]
        //     return {
        //         ...state,
        //         myFavorites: 
        //         payload === 'A' ? allCharactersCopy.sort((a, b)=> a.id - b.id) : allCharactersCopy.sort((a, b)=> b.id - a.id)
        //     }
        default:
            return {...state}
    }
}

export default reducer