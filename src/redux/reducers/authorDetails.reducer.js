const authorDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_AUTHOR_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default authorDetails;