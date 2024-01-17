import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Card } from '@mui/material';

function Quotes() {

    const searchQuotes = useSelector(store => store.searchQuotes);
    const dispatch = useDispatch();

    console.log('Checking the searched quotes', searchQuotes.results)

    return (
        <center>
            <div className="quotesDiv">
                {
                    searchQuotes.length === 0 ? (
                        <h3>Please search for some quotes!</h3>
                    ) : (
                        searchQuotes.results.map(quote =>
                            <div key={quote._id}>
                                <Card sx={{
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
                            }}>
                                    <h4>"{quote.content}"</h4>
                                    <br />
                                    <p>-{quote.author}</p>
                                </Card>
                                <br />
                            </div>
                        )
                        // <></>
                    )
                }
            </div>
        </center>
    )
} //! End Quotes ()

export default Quotes;