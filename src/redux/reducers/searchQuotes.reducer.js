const searchQuotes = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUOTES':
            return action.payload;
        // default:
        //     return state;
         
        case 'SET_SEARCH_BY_AUTHOR':
            return action.payload;
        default: 
            return state;   
    }
}

export default searchQuotes;