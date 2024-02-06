import { useSelector, useDispatch } from 'react-redux';
import { Card, IconButton, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthorDetails from '../Quotes/AuthorDetails';
import FavoriteIcon from '@mui/icons-material/Favorite';

function RandomQuotes() {
    const quotes = useSelector((store) => store.quotes.quotes);
    const favorites = useSelector((store) => store.quotes.favorites);
    const authorDetailsData = useSelector((store) => store.authorDetails); 

    const axios = require('axios');
    const dispatch = useDispatch();
    const [showAuthorDetails, setShowAuthorDetails] = useState(false); // Initialize showAuthorDetails state

 // Define the authorDetails function
 const authorDetails = async (authorName) => {
    try {
        const response = await axios.get(`/api/authors/${authorName}`);
        dispatch({ type: 'SET_AUTHOR_DETAILS', payload: response.data });
        setShowAuthorDetails(true);
    } catch (error) {
        console.error('Error fetching author details:', error);
    }
};



    useEffect(() => {
        dispatch({ type: 'GET_RANDOM' }); // Dispatch action to fetch random quotes
        dispatch({ type: 'INITIALIZE_FAVORITES' }); // Dispatch action to initialize favorites
    }, [dispatch]);

    useEffect(() => {
        if (authorDetailsData && Object.keys(authorDetailsData).length > 0) {
            setShowAuthorDetails(true);
        }
    }, [authorDetailsData]);


    
    const addToFavorites = (quote) => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: quote });
    };

    const removeFromFavorites = (quote) => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
    };

    const isInFavorites = (quote) => {
        return favorites.some((favQuote) => favQuote._id === quote._id);
    };

    return (
        <div className="randomQuoteDiv">
            <br />
            {quotes.length === 0 ? (
                <h3>Display a random quote!</h3>
            ) : (
                quotes.map((quote) => (
                    <div key={quote._id}>
                        <Card
                            sx={{
                                boxShadow: 4,
                                width: '350px',
                                height: '225px',
                                fontSize: 16,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '15px',
                                outlineWidth: 3,
                            }}
                        >
                            <CardContent>
                                <Typography variant="body1">
                                    "{quote.content}"
                                </Typography>
                                <br />
                                <Typography variant="h8">- {quote.author}</Typography>
                                <Typography variant="h8">
                                    <Link to={`/author/${quote.author}`} onClick={() => authorDetails(quote.author)}>
                                        - {quote.author}
                                    </Link>
                                </Typography>
                                <IconButton
                                    onClick={() => {
                                        if (!isInFavorites(quote)) {
                                            addToFavorites(quote);
                                        } else {
                                            removeFromFavorites(quote);
                                        }
                                    }}
                                >
                                    <FavoriteIcon
                                        color={isInFavorites(quote) ? 'primary' : 'secondary'}
                                    />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </div>
                ))
            )}
            <br />
          
        </div>
    );
}

export default RandomQuotes;

//npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
