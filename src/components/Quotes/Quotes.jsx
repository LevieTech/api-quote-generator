import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Container, Grid, Card, IconButton, CardContent, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AuthorDetails from '../Quotes/AuthorDetails';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Quotes(search) {
    //*trying to display author details jgk
    const dispatch = useDispatch();
    const [showAuthorDetails, setShowAuthorDetails] = useState(false);
    const authorDetailsData = useSelector((store) => store.authorDetails);
    const { name, bio, link, description } = authorDetailsData.authorDetails;


    const axios = require('axios');
    const searchQuotes = useSelector(store => store.searchQuotes);
    const favorites = useSelector((store) => store.quotes.favorites);
    let page = 2;
    
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
    useEffect(() => {
        if (authorDetailsData && Object.keys(authorDetailsData).length > 0) {
            setShowAuthorDetails(true);
        }
    }, [authorDetailsData]);


    // const authorDetails = (author) => {
    //     console.log("authorDetails function called with author:", author);
    //     dispatch({ type: 'SET_AUTHOR', payload: author });
    //     setShowAuthorDetails(true);//* added this line
    // }

    const initialAuthorDetails = async (authorName) => {
        try {
          const response = await axios.get(`/api/authors/${authorName}`);
          const authorDetailsData = {
            name: response.data.name,
            bio: response.data.bio,
            link: response.data.link,
            description: response.data.description,
           
          };
          dispatch({ type: 'SET_AUTHOR_DETAILS', payload: authorDetailsData });
          setShowAuthorDetails(true);
        } catch (error) {
          console.error('Error fetching author details:', error);
        }
      };
    // const authorDetails = async (authorName) => {
    //     try {
    //         const response = await axios.get(`/api/authors/${authorName}`);
    //         dispatch({ type: 'SET_AUTHOR_DETAILS', payload: response.data });
    //         setShowAuthorDetails(true);
    //     } catch (error) {
    //         console.error('Error fetching author details:', error);
    //     }
    // };

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

                                                    <Link to={`/author/${quote.author}`} onClick={() => authorDetails(quote.author)}>
                                                        <Typography variant="h8">- {quote.author}</Typography>
                                                    </Link>


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
            <br />
            <Button onClick={nextPage}>Next Page</Button>
        </center>
    )
} //! End Quotes ()
export default Quotes;


// {showAuthorDetails && <AuthorDetails author={authorDetailsData} />}
