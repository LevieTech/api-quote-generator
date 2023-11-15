import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function Quotes() {

    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSubmit = () => {
        dispatch({ type: 'SET_SEARCH', payload: search })
    }

    return (
        <center>
            <div className="quotesDiv">
                <h2>Hello! This is where the quotes will be</h2>
                <form onSubmit={handleSubmit}>
                    <input type="search" value={search} onChange={handleChange}/>
                    <input type="submit" />
                </form>
                </div> 
        </center>
    )
} //! End Quotes ()

export default Quotes;