import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Quotes from './Quotes';


function SearchQuotes() {

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch({ type: 'SET_SEARCH', payload: search })
        dispatch({ type: 'SET_AUTHOR', payload: search }) // This is a dispatch to search by authors
    }

    return (
        <center>
            <div className="quotesDiv">
                <h2>Search for a quote by keyword!</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth variant="standard" style={{ maxWidth: '25%', }} type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
                    <Button variant="contained" className="btn" type="submit">Submit</Button>
                </form>
                <br /><br />
                <Quotes search={search}/>
            </div>
        </center>
    )
} //! End Quotes ()

export default SearchQuotes;