import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';

function AuthorDetails() {
  const authorDetails = useSelector((state) => state.authorDetails);
  // const authorDetails = useSelector((store) => store.authorDetails); 

  console.log('Author details from Redux store:', authorDetails);
  console.log('Author Name:', authorDetails.authorName);
  console.log('Author Name:', authorDetails.name || 'N/A');

  if (!authorDetails || Object.keys(authorDetails).length === 0) {
    return (
      <div className="author-details">
        <h2>Author Details</h2>
        <p>No author details available.</p>
      </div>
    );
  } else {

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
            <Typography variant="body1">Author Name: {authorDetails.name || 'N/A'}</Typography>
            
            <Typography variant="body1">Bio: {authorDetails.bio || 'N/A'}</Typography>
            <Typography variant="body1">Link: {authorDetails.link || 'N/A'}</Typography>
            <Typography variant="body1">Description: {authorDetails.description || 'N/A'}</Typography>


          </CardContent>
        </Card>
      </div>
    );
  }
}
export default AuthorDetails;
