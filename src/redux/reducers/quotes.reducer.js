const initialState = {
    favorites: [],
    quotes: [],
  };
  
  const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_QUOTES':
        console.log('Reducer check:', action.payload);
            // return action.payload;
            return {
                ...state, //Copy the current state
                quotes: action.payload, // Update the quotes property with the new data
              };

      case 'ADD_TO_FAVORITES':
        // Return a new state with the added quote in the favorites array
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      case 'REMOVE_FROM_FAVORITES':
        return {
          ...state,
          favorites: state.favorites.filter((quote) => 
          // Filter out the quote with a matching _id from favorites
          quote._id !== action.payload._id),
        };
      default:
        return state;
    }
  };
  
  export default quoteReducer;
  