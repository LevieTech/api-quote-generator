import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteTwoTone';

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
    <>
      <div className="favQuotes">
        <h2>Favorite Quotes</h2>
        {favoriteQuotes.length === 0 ? (
          <p>No favorite quotes added yet.</p>
        ) : (
          <div>
            {favoriteQuotes.map((quote) => (
              <Card
                key={quote._id}
                sx={{
                  boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  width: '350px',
                  margin: '10px',
                }}
              >
                <CardContent>
                  <Typography variant="body1">
                    "{quote.content}" - {quote.author}
                  </Typography>
                  <IconButton onClick={() => removeFromFavorites(quote)} style={{ color: 'grey' }}>
                    <FavoriteBorderOutlinedIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FavoriteQuotes;
