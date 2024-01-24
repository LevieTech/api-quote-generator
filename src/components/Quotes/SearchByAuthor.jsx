import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';

function SearchByAuthor() {
    const [author, setAuthor] = useState('');
    const dispatch = useDispatch();

const handleSubmit = () => {
    // Dispatch an action to update the search query by author
    console.log('Author being searched:', author);
    dispatch({ type: 'SET_SEARCH_BY_AUTHOR', payload: author });
};

//Access results specifically by author from Redux state 
const authorSearchResults = useSelector((state) => state.authorSearchResults);

    return(
        <div>
            <Typography varient="h2">
                Search by Author
            </Typography>
                <form onSubmit={handleSubmit}>
            <TextField 
            fullWidth
            variant='standard'
            type='text'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder= "Enter author's name">
            </TextField>
                <Button
                type="submit">
                    Search
                </Button>
                </form>

            {authorSearchResults ? (
                authorSearchResults.map((quote) => (
                    <div
                    key={quote.id}>
                        <Typography
                            varient="body1">
                                {quote.content}
                            </Typography>
                        <Typography
                            varient="body2">
                                {quote.author}
                        </Typography>
                    </div>
                ))
            ) : (
                <Typography variant="body1">No results found.</Typography>
            )}


        </div>
    )

}// end searchbyauthor function

export default SearchByAuthor;