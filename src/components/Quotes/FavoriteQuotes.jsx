import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Card, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

//Fav Quotes function 
function FavoriteQuotes() {
  const favoriteQuotes = useSelector((store) => store.quotes.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_FAVORITES' }); // Dispatch action to initialize favorites
  }, [dispatch]);

  const removeFromFavorites = (quote) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
  };

  return (
    <center>

      <h2>Favorite Quotes</h2>
      {favoriteQuotes.length === 0 ? (
        <p>No favorite quotes added yet.</p>
      ) : (
        favoriteQuotes.map(quote => (
          <div className="favQuotesDisplay">
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
                      <br/>
                      <Typography variant="h8">- {quote.author}</Typography>
                      <IconButton onClick={() => removeFromFavorites(quote)}>
                        <FavoriteIcon />
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
    </center>
  );
}

export default FavoriteQuotes;
