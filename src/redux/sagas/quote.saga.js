import axios from 'axios';
import { takeEvery, put} from 'redux-saga/effects';

function * getQuote(action){
    try{
        const quotes = yield axios.get(`/search/quotes/${action.payload}`);
        console.log('Checking quotes.data', quotes.data)
        yield put({ type: 'SET_QUOTES', payload: quotes.data });

    } catch (error){
        console.log('Error in getQuote in quote.saga', error)
    }
}

function* quoteSaga(){
    yield takeEvery('SET_SEARCH', getQuote);
}

export default quoteSaga;