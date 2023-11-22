import axios from 'axios';
import { takeEvery, put} from 'redux-saga/effects';

function* getQuote(action){
    try{
        console.log('Checking payload', action.payload);
        const quotes = yield axios.get(`/api/search/quotes?query=${action.payload}`);
        console.log('Checking quotes.data', quotes.data)
        yield put({ type: 'SET_QUOTES', payload: quotes.data.data });

    } catch (error){
        console.log('Error in getQuote', error);
    }
}

function* getRandomQuote() {
    try {
        const quotes = yield axios.get(`/api/quotes/random`);
        yield put({ type: 'SET_QUOTES', payload: quotes.data })
    } catch (error){
        console.log('Error in getQuote in quote.saga', error);
    }
}

function* quoteSaga(){
    yield takeEvery('SET_SEARCH', getQuote);
    yield takeEvery('GET_RANDOM', getRandomQuote);
}

export default quoteSaga;