import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import RandomQuotes from '../Quotes/RandomQuotes';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const randomQuote = () => {
    dispatch({ type: 'GET_RANDOM' });
  }

  return (
    <div className="container">
      <center>
        <h2>Welcome, {user.username}!</h2>
        <div>
          <Button variant="contained" className="btn" onClick={randomQuote}> Generate Random Quote</Button>
        </div>
        <RandomQuotes />
      </center>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
