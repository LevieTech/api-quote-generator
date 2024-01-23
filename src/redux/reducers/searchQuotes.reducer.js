const initialState = {
    authorSearchResults: [], // Initialize as an empty array
  };

const searchQuotes = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH_QUOTES':
            return { ...state, results: action.payload };
            // return action.payload;
        // default:
        //     return state;
               
        case 'SET_SEARCH_BY_AUTHOR':
            return { ...state, authorSearchResults: action.payload };
          
            default:
                return state;
    }  
};

export default searchQuotes;