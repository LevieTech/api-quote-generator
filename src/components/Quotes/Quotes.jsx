import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

function Quotes() {

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSubmit = () => {
        dispatch({ type: 'SET_SEARCH', payload: search })
    }

    const randomQuote = () => {
        dispatch({ type: 'GET_RANDOM' });
    }
    

    return (
        <center>
            <div className="quotesDiv">
                <h2>Hello! This is where the quotes will be</h2>

                <input type="search" value={search} onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
                <div>
                    <button onClick={randomQuote}>Random</button>
                </div>
            </div>
        </center>
    )
} //! End Quotes ()

export default Quotes;