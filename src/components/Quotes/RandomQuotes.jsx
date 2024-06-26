import { useSelector, useDispatch } from 'react-redux';
import { Card, IconButton, CardContent, Typography, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AuthorDetails from '../AuthorDetails/AuthorDetails';

function RandomQuotes() {
    const quotes = useSelector((store) => store.quotes.quotes);
    const favorites = useSelector((store) => store.quotes.favorites);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch({ type: 'GET_RANDOM' }); // Dispatch action to fetch random quotes
        dispatch({ type: 'INITIALIZE_FAVORITES' }); // Dispatch action to initialize favorites
    }, [dispatch]);


    const addToFavorites = (quote) => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: quote });
    };

    const removeFromFavorites = (quote) => {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
    };

    const isInFavorites = (quote) => {
        return favorites.some((favQuote) => favQuote._id === quote._id);
    };

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const showAuthorDetails = (author) => {
        dispatch({ type: 'SET_AUTHOR', payload: author });
        handleOpen();

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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
                                <Typography id="authorDetail" variant="h8" onClick={() => showAuthorDetails(quote.author)}>{quote.author}</Typography>
                                <Modal open={open}
                                    onClose={handleClose}
                                >
                                    <Card sx={style}>
                                        <center>
                                            <AuthorDetails />
                                        </center>
                                    </Card>
                                </Modal>
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
