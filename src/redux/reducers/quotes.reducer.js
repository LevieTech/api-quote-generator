const quoteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_QUOTES':
            console.log('Reducer check:', action.payload);
            return action.payload;
        default:
            return state;
    }
 }


 export default quoteReducer;