const searchQuotes = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUOTES':
        case 'SET_AUTHOR_RESULTS':
            return action.payload;
          
        case 'SET_SEARCH_AUTHOR_RESULTS':
            return { ...state, authorSearchResults: action.payload };
          
            default:
                return state;
    }  
};
export default searchQuotes;

// const searchQuotes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'SET_SEARCH_QUOTES':
//             return { ...state, results: action.payload };
//             return action.payload;
//         default:
//             return state;