import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Quotes from './Quotes';


function SearchQuotes() {

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();


    const handleSubmit = () => {
        dispatch({ type: 'SET_SEARCH', payload: search })
    }


    return (
        <center>
            <div className="quotesDiv">
                <h2>Search for a quote by keyword!</h2>
                <br />
                <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
                <button className="btn" onClick={handleSubmit}>Submit</button>
                <br /><br />
                <Quotes />
            </div>
        </center>
    )
} //! End Quotes ()

export default SearchQuotes;