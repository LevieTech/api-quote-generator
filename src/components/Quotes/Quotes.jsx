import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function Quotes() {

    const quotes = useSelector(store => store.searchQuotes);
    const dispatch = useDispatch();

    console.log('Checking quotes', quotes);

    return (
        <center>
            <div className="quotesDiv">
                {
                    quotes.length === 0 ? (
                        <h3>Please search for some quotes!</h3>
                    ) : (
                        quotes.map(quote =>
                            <div key={quote._id}>
                                <h4>"{quote.content}"</h4>
                                <br />
                                <p>-{quote.author}</p>
                            </div>
                        )
                    )
                }
            </div>
        </center>

    )
} //! End Quotes ()

export default Quotes;