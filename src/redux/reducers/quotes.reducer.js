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
                ...state,
                quotes: action.payload, // Update the quotes property with the new data
              };

      case 'ADD_TO_FAVORITES':
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      case 'REMOVE_FROM_FAVORITES':
        return {
          ...state,
          favorites: state.favorites.filter((quote) => quote._id !== action.payload._id),
        };
      default:
        return state;
    }
  };
  
  export default quoteReducer;
  