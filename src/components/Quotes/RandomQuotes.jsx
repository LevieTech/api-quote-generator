import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from '@mui/material';

function RandomQuotes() {
  const quotes = useSelector((store) => store.quotes.quotes);
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
              <h4>"{quote.content}"</h4>
              <br />
              <p>-{quote.author}</p>
              <Button
                onClick={() => {
                  if (!isInFavorites(quote)) {
                    addToFavorites(quote);
                  } else {
                    removeFromFavorites(quote);
                  }
                }}
              >
                {isInFavorites(quote) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </Card>
          </div>
        ))
      )}
      <br />
    </div>
  );
}

export default RandomQuotes;
