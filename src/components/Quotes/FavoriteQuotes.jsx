
import React from 'react';
import { useSelector } from 'react-redux';

function FavoriteQuotes() {
    const favoriteQuotes = useSelector((store) => store.quotes.favorites);

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