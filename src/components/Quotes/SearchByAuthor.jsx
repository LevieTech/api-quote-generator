
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Quotes from './Quotes';


function SearchByAuthor() {

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const searchByAuthorResults = useSelector((state) => state.searchByAuthor); // Access data from the searchByAuthor reducer

    const handleSubmit = () => {
        dispatch({ type: 'SET_AUTHOR', payload: search })
    }

     // Use searchByAuthorData in component
     console.log(searchByAuthorResults);

useEffect(() => {
    //Fetch authors from Express server when component mounts
    fetch('/api/authors')
        .then((response) => response.json())
        .then((data) => {
            console.log('Authors data:', data);
            //Dispatch action to store author data in Redux state
            dispatch({ type: 'SET_AUTHOR', payload: data.results })
        })
        .catch((error) => {
            console.error('Error fetching authors:', error);
        })
}, [dispatch]);

    return (
        <center>
            <div className="quotesDiv">
                <h2>Search for a quote by AUTHOR!</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth variant="standard" 
                    style={{ 
                        maxWidth: '25%', 
                    }} 
                type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
                    <Button variant="contained" className="btn" type="submit">Submit</Button>
                </form>
                <br /><br />
                <Quotes />
            </div>
        </center>
    )
} //! End Quotes ()

export default SearchByAuthor


//// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { TextField, Button, Typography } from '@mui/material';

// function SearchByAuthor() {
//     const [author, setAuthor] = useState('');
//     const dispatch = useDispatch();

// const handleSubmit = () => {
//     // Dispatch an action to update the search query by author
//     console.log('Author being searched:', author);
//     dispatch({ type: 'SET_SEARCH_BY_AUTHOR', payload: author });
// };

// //Access results specifically by author from Redux state 
// const authorSearchResults = useSelector((state) => state.authorSearchResults);

//     return(
//         <div>
//             <Typography varient="h2">
//                 Search by Author
//             </Typography>
//                 <form onSubmit={handleSubmit}>
//             <TextField 
//             fullWidth
//             variant='standard'
//             type='text'
//             value={author}
//             onChange={(event) => setAuthor(event.target.value)}
//             placeholder= "Enter author's name">
//             </TextField>
//                 <Button
//                 type="submit">
//                     Search
//                 </Button>
//                 </form>

//             {authorSearchResults ? (
//                 authorSearchResults.map((quote) => (
//                     <div
//                     key={quote.id}>
//                         <Typography
//                             varient="body1">
//                                 {quote.content}
//                             </Typography>
//                         <Typography
//                             varient="body2">
//                                 {quote.author}
//                         </Typography>
//                     </div>
//                 ))
//             ) : (
//                 <Typography variant="body1">No results found.</Typography>
//             )}


//         </div>
//     )

// }// end searchbyauthor function

// export default SearchByAuthor;

// export default searchQuotes