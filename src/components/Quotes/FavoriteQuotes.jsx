
import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from '@mui/material';

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
            <h2>
                Favorite Quotes
            </h2>
            {favoriteQuotes.length === 0 ? (
        <p>No favorite quotes added yet.</p>
      ) : (
        <ul>
          {favoriteQuotes.map((quote) => (
            <li key={quote._id}>
              "{quote.content}" - {quote.author}
              <Button onClick={() => removeFromFavorites(quote)}>
                  Remove from Favorites
                </Button>
            </li>
          ))}
        </ul>
      )}
        </div>
        </>
    )
}

export default FavoriteQuotes;