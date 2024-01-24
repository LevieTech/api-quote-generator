import axios from 'axios';
import { takeEvery, put} from 'redux-saga/effects';

function* getQuote(action) {
    try {
        console.log('quote saga console.log', action.payload);
        // const quotes = yield axios.post(`/api/search/quotes&query=${action.payload}`);
        const quotes = yield axios.get(`/api/quotes/${action.payload}`);
        console.log('Checking quotes.data', quotes.data)
        yield put({ type: 'SET_SEARCH_QUOTES', payload: quotes.data });

    } catch (error) {
        console.log('Error in getQuote', error);
    }
}

function* getRandomQuote() {
    try {
        const quotes = yield axios.get(`/api/random/`);
        yield put({ type: 'SET_QUOTES', payload: quotes.data })
        yield put({ type: 'SET_FAVORITES' }); // Dispatch action to initialize favorites
    } catch (error) {
        console.log('Error in getRandomQuote', error);
    }
}

function* searchByAuthor(action){
    try{
        console.log('Searching for author:', action.payload);
        const quotes = yield axios.get(`/api/search/authors/${action.payload}`);
        console.log('Response from server:', quotes.data); 
        yield put ({ type: 'SET_SEARCH_BY_AUTHOR', payload: quotes.data})
    } catch (error) {
        console.error('Error in searchByAuthor', error);
    }
}

function* quoteSaga(){
    yield takeEvery('SET_SEARCH', getQuote);
    yield takeEvery('GET_RANDOM', getRandomQuote);
    yield takeEvery('SET_SEARCH_BY_AUTHOR',searchByAuthor );
}

export default quoteSaga;