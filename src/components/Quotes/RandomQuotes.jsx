import { useSelector } from 'react-redux';
import { Card } from '@mui/material';

function RandomQuotes() {

    const quotes = useSelector(store => store.quotes);

    return (
        <div className="randomQuoteDiv">
            <br />
            {
                quotes.length === 0 ? (
                    <h3>Display a random quote!</h3>
                ) : (
                    quotes.map(quote =>
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
                        </div>
                    )
                )
            }
            <br />
        </div>
    )
}


export default RandomQuotes;