// Check local storage for saved favorites
const savedFavorites = JSON.parse(localStorage.getItem('favorites'));

const initialState = {
  favorites: savedFavorites || [], // Initialize with stored favorites, if any
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
                const updatedFavoritesAdd = [...state.favorites, action.payload];
                localStorage.setItem('favorites', JSON.stringify(updatedFavoritesAdd)); // Update local storage
                return {
                  ...state,
                  favorites: updatedFavoritesAdd,
                };
                case 'REMOVE_FROM_FAVORITES':
                  const updatedFavoritesRemove = state.favorites.filter((quote) => quote._id !== action.payload._id);
                  localStorage.setItem('favorites', JSON.stringify(updatedFavoritesRemove)); // Update local storage
                  return {
                    ...state,
                    favorites: updatedFavoritesRemove,
                  };
      default:
        return state;
    }
 }


 export default quoteReducer;