import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Container, Grid, Card, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Quotes() {

    const searchQuotes = useSelector(store => store.searchQuotes);
    const favorites = useSelector((store) => store.quotes.favorites);
    const dispatch = useDispatch();

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
        <center>
            <div className="quotesDiv">
                {
                    searchQuotes.length === 0 ? (
                        <h3>Please search for some quotes!</h3>
                    ) : (
                        searchQuotes.results.map(quote =>
                            <div className="quotesDisplay" key={quote._id}>
                                <Container fixed>
                                    <center>
                                        <Grid >
                                            <br />
                                            <Card sx={{
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
                                                transition: 'transform 0.2s',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                            }}>
                                                <h4>"{quote.content}"</h4>
                                                <br />
                                                <p>-{quote.author}</p>
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
                                                        color={isInFavorites(quote) ? 'primary' : 'secondayr'}
                                                    />
                                                </IconButton>
                                            </Card>
                                            <br />
                                        </Grid>

                                    </center>
                                </Container>
                            </div>
                        )
                    )
                }
            </div>
        </center>
    )
} //! End Quotes ()

export default Quotes;