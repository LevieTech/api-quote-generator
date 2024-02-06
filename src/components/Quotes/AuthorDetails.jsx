import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';


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
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card 
        sx={{
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
        }}
      >
        <CardContent>
          <Typography variant="h5">Author Details</Typography>
          <br />
          <Typography variant="body1">Name: {authorDetails.name}</Typography>
          <Typography variant="body1">Bio: {authorDetails.bio}</Typography>
          <Typography variant="body1">Link: {authorDetails.link}</Typography>
          <Typography variant="body1">Description: {authorDetails.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthorDetails;