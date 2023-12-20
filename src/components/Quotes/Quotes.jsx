import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function Quotes() {

    const quotes = useSelector(store => store.quotes);
    const dispatch = useDispatch();
   


    return (
        <center>
            <div className="quotesDiv">
                
            </div>
        </center>
    )
} //! End Quotes ()

export default Quotes;