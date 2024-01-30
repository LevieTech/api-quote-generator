import axios from 'axios';
import { takeEvery, put} from 'redux-saga/effects';

function* getQuote(action) {
    try {
        console.log('quote saga console.log checking payload', action.payload);
        // const quotes = yield axios.post(`/api/search/quotes&query=${action.payload}`);
        const quotes = yield axios.get(`/api/quotes/${action.payload}`);
        console.log('Checking quotes.data', quotes.data)
        yield put({ type: 'SET_SEARCH_QUOTES', payload: quotes.data });

    } catch (error) {
        console.log('Error in getQuote', error);
    }
}

function* nextPage(action) {
    try {
        console.log('Checking the payload:', action.payload)
        const next = yield axios.get(`/api/quotes/${action.payload}`);
        yield put({ type: 'SET_SEARCH_QUOTES', payload: next.data });
    } catch (error) {
        console.log('Error in nextPage', error);
    }
}

function* getAuthor(action) {
    try {
        console.log('quote saga console.log', action.payload);
        const author = yield axios.get(`/api/authors/${action.payload}`);
        console.log('Checking quotes.data', author.data)
        yield put({ type: 'SET_AUTHOR_DETAILS', payload: author.data });
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

function* quoteSaga(){
    yield takeEvery('SET_SEARCH', getQuote);
    yield takeEvery('NEXT_PAGE', nextPage);
    yield takeEvery('GET_RANDOM', getRandomQuote);
    yield takeEvery('SET_AUTHOR', getAuthor);
}

export default quoteSaga;