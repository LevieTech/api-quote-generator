
import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';

function FavoriteQuotes() {
    const favoriteQuotes = useSelector((store) => store.quotes.favorites);
    const dispatch = useDispatch();
   
    useEffect(() => {
      dispatch({ type: 'INITIALIZE_FAVORITES' }); // Dispatch action to initialize favorites
    }, [dispatch]);

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
            </li>
          ))}
        </ul>
      )}
        </div>
        </>
    )
}

export default FavoriteQuotes;