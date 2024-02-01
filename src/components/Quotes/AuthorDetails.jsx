import React from 'react';
import { useSelector } from 'react-redux';

// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { TextField, Button } from '@mui/material';

function AuthorDetails() {
  const authorDetails = useSelector((state) => state.authorDetails); // Make sure to use "state" here
  console.log('Author details from Redux store:', authorDetails);
 
  if (!authorDetails || Object.keys(authorDetails).length === 0) {
    console.log("Author details not available or empty:", authorDetails);
    return (
      <div className="author-details">
        <h2>Author Details</h2>
        <p>No author details available.</p>
      </div>
    );
  }

  //?Tried this 
  // const [search, setSearch] = useState('');
  // const dispatch = useDispatch();


  // const handleSubmit = () => {
  //     dispatch({ type: 'SET_SEARCH', payload: search })
  //     dispatch({ type: 'SET_AUTHOR', payload: search }) // This is a dispatch to search by authors
  // }

  return (
    <div className="author-details">
//? tried this out 
{/* <form onSubmit={handleSubmit}>
                    <TextField fullWidth variant="standard" style={{ maxWidth: '25%', }} type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
                    <Button variant="contained" className="btn" type="submit">Submit</Button>
                </form> */}

      {/* <h2>Author Details</h2> */}
     
      {/* <p>Name: {authorDetails.name}</p>
      <p>Bio: {authorDetails.bio}</p>
      <p>Link: {authorDetails.link}</p>
      <p>Description: {authorDetails.description}</p>

      Add more author details here */}
    </div>
  );
}

export default AuthorDetails;