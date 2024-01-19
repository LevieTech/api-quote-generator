// Check local storage for saved favorites
//When a user adds a quote to their favorites, the quote object (or its ID) is serialized to JSON (using JSON.stringify) and then stored in the browser's localStorage under the key 'favorites'.

//When the page is refreshed or revisited, the code checks localStorage for the presence of saved favorites using localStorage.getItem('favorites'). If there are saved favorites, they are deserialized (using JSON.parse) and loaded into the Redux store's favorites ARRAY.
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