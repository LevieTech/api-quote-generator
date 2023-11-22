import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

function RandomQuotes() {

    const quotes = useSelector(store => store.quotes);

    return (
        <div className="randomQuoteDiv">
        <br />
        {
            quotes.length === 0 ? (
                <div>Display a random quote!</div>
            ) : (
                quotes.map(quote =>
                    <div key={quote._id}>
                        {quote.content} - {quote.author}
                    </div>
                )
            )
        }
        <br />
    </div>
    )
}


export default RandomQuotes;