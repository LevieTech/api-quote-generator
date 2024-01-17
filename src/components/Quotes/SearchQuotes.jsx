import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
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
                <form>
                    <TextField fullWidth variant="standard" style={{ maxWidth: '60%', }} type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
                    <Button className="btn" onClick={handleSubmit}>Submit</Button>
                </form>
                <br /><br />
                <Quotes />
            </div>
        </center>
    )
} //! End Quotes ()

export default SearchQuotes;