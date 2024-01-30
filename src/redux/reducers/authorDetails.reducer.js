const initialState = {
    name: '',
    bio: '',
    link: '',
    // other properties...
  };
  
  const authorDetails = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTHOR_DETAILS':
        return {
          ...state,
          name: action.payload.name,
          bio: action.payload.bio,
          link: action.payload.link,
          // other properties...
        };
      default:
        return state;
    }
  };
  
  export default authorDetails;
  


// const authorDetails = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_AUTHOR_DETAILS':
//             console.log('Reducer: SET_AUTHOR_DETAILS, Payload:', action.payload);
//             return action.payload;
//         default:
//             return state;
//     }
// }

// export default authorDetails;