import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Container, Grid, Card, IconButton, CardContent, Typography, Button, Modal } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AuthorDetails from '../AuthorDetails/AuthorDetails';

function Quotes(search) {


    const searchQuotes = useSelector(store => store.searchQuotes);
    const favorites = useSelector((store) => store.quotes.favorites);
    const [open, setOpen] = useState(false);

    let page = 2;
    const dispatch = useDispatch();

    const addToFavorites = (quote) => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: quote });
    };

    const removeFromFavorites = (quote) => {
        alert('Are you sure you want to remove this quote from Favorites?')
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
    };

    const isInFavorites = (quote) => {
        return favorites.some((favQuote) => favQuote._id === quote._id);
    };

    const nextPage = () => {
        let newPage = page++;
        console.log('this is the new page', newPage);
        dispatch({ type: 'NEXT_PAGE', payload: { search: search, page: newPage } })
    }

    const showAuthorDetails = (author) => {
        dispatch({ type: 'SET_AUTHOR', payload: author });
        handleOpen();
    }

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    //?Sams alert
    // const removeFromFavorites = (quote) => {
    //   alert('Are you sure you want to remove this quote from Favorites?');
    //   dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
    // };

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
        <center>
            <div className="quotesDiv">
                {
                    searchQuotes.length === 0 ? (
                        <h4>Please search for quotes using the search bar above.
                            Results will display here.
                        </h4>
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
                                                <CardContent>
                                                    <Typography variant="body1">
                                                        "{quote.content}"
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="h8" id="authorDetail" onClick={() => showAuthorDetails(quote.author)}>{quote.author}</Typography>
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
                                            <br />
                                        </Grid>
                                    </center>
                                </Container>
                            </div>
                        )
                    )
                }
            </div>
            <Button onClick={nextPage}>Next Page</Button>
            <br />
        </center>
    )
} //! End Quotes ()

export default Quotes;