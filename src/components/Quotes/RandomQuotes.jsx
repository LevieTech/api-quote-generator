import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from '@mui/material';

function RandomQuotes() {
    // Get quotes and favorites from the Redux store using useSelector
  const quotes = useSelector((store) => store.quotes.quotes);
  const favorites = useSelector((store) => store.quotes.favorites);

  // Dispatch to send actions to the Redux store
  const dispatch = useDispatch();

  const addToFavorites = (quote) => {
    // Dispatch an action to add the quote to favorites
    dispatch({ type: 'ADD_TO_FAVORITES', payload: quote });
  };

  const removeFromFavorites = (quote) => {
    // Dispatch an action to remove the quote from favorites
    console.log("Adding to favorites:", quote);
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
  };

  // Define the isInFavorites function to check if a quote is in favorites
  const isInFavorites = (quote) => {
    console.log("Checking if in favorites:", quote);
    return favorites.some((favQuote) => favQuote._id === quote._id);
  };

  console.log("Quotes:", quotes);
  console.log("Favorites:", favorites);

  return (
    <div className="randomQuoteDiv">
      <br />
      {quotes && quotes.length === 0 ? (
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
                    // Check if the quote is in favorites and toggle/switch its state
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
