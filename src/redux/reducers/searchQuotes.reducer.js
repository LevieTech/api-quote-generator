const searchQuotes = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUOTES':
            return { ...state, results: action.payload };
            // return action.payload;
        // default:
        //     return state;
         
        case 'SET_SEARCH_BY_AUTHOR':
            // return action.payload;
            return { ...state,author: action.payload, keyword: '', results: []}; 
            default:
                return state; 
            }
};

export default searchQuotes;