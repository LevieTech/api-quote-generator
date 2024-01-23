import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';

function SearchByAuthor() {
    const [author, setAuthor] = useState('');
    const dispatch = useDispatch();

const handleSubmit = () => {
    // Dispatch an action to update the search query by author
    dispatch({ type: 'SET_SEARCH_BY_AUTHOR', payload: author });
};

//Access results specifically by author from Redux state 
const authorSearchResults = useSelector((state) => state.authorSearchResults);

    return(
        <div>
            <Typography>
                
            </Typography>


        </div>
    )

}// end searchbyauthor function

export default SearchByAuthor;