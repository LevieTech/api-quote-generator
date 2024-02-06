const initialState = {
  // ... other initial state properties
  authorDetails: {
    name: 'Unknown',
    bio: 'No bio available',
    link: 'No link available',
    description: 'No description available',
  },
};

const authorDetails = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTHOR_DETAILS':
      console.log('SET_AUTHOR_DETAILS action payload:', action.payload);
      return {
        ...state,
        authorDetails: action.payload,
        // name: action.payload.name,
        // bio: action.payload.bio,
        // link: action.payload.link,
        // description: action.payload.description,
      };
    default:
      return state;
  }
};

export default authorDetails;



