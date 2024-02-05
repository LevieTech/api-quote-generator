import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Card, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

//Fav Quotes function 
function FavoriteQuotes() {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false); // State for dialog visibility
  const [quoteToRemove, setQuoteToRemove] = useState(null); //State to store the quote to be removed

  const favoriteQuotes = useSelector((store) => store.quotes.favorites);
  const dispatch = useDispatch();

  const openConfirmationDialog = (quote) => {
    console.log("Opening confirmation dialog for quote:", quote);
    setQuoteToRemove(quote); //Set the quote to be removed
    setConfirmationDialogOpen(true); // Open the confirmation dialog
  }

  //Function to close the confirmation dialong and clear the selected quote
  const closeConfirmationDialog = () => {
    console.log("Closing confirmation dialog");
    setConfirmationDialogOpen(false); // Close the confirmation
    setQuoteToRemove(null); // Clear the selected quote
  };

  const removeFromFavorites = () => {
    if (quoteToRemove) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quoteToRemove });
      setQuoteToRemove(null);// Clear the selected quote after removal
    }
    closeConfirmationDialog(); // Close conf. dialog
  }

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_FAVORITES' }); // Dispatch action to initialize favorites
  }, [dispatch]);

  const isInFavorites = (quote) => {
    return favoriteQuotes.some((favQuote) => favQuote._id === quote._id);
  };

  const authorDetails = (author) => {
    dispatch({ type: 'SET_AUTHOR', payload: author });
}

  //?Sams alert
  // const removeFromFavorites = (quote) => {
  //   alert('Are you sure you want to remove this quote from Favorites?');
  //   dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
  // };


  return (
    <center>

      <h2>Favorite Quotes</h2>
      {favoriteQuotes.length === 0 ? (
        <p>No favorite quotes added yet.</p>
      ) : (
        favoriteQuotes.map(quote => (
          <div className="favQuotesDisplay" key={quote._id}>
            <Container fixed>
              <center>
                <Grid>
                  <br />
                  <Card
                    key={quote._id}
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
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1">
                        "{quote.content}"
                      </Typography>
                      <br />
                      <Typography variant="h8" onClick={() => authorDetails(quote.author)}>- {quote.author}</Typography>
                      <Typography variant="h8">
                                    <Link to={`/author/${quote.author}`} onClick={() => authorDetails(quote.author)}>
                                        - {quote.author}
                                    </Link>
                                </Typography>
                      
                      <IconButton onClick={() => openConfirmationDialog(quote)}>
                        <FavoriteIcon color={isInFavorites(quote) ? 'primary' : 'secondary'} />
                      </IconButton>
                    </CardContent>
                  </Card>
                  <br /><br />
                </Grid>
              </center>
            </Container>
          </div>
        ))
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onClose={closeConfirmationDialog}>
        <DialogContent>
          <Typography>Are you sure you want to remove this quote from Favorites?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeConfirmationDialog} color="primary">
            Cancel
          </Button>

          <Button variant="contained" onClick={removeFromFavorites} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </center>
  );
}

export default FavoriteQuotes;
