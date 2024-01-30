import React from 'react';
import { useSelector } from 'react-redux';

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
    <div className="author-details">
      <h2>Author Details</h2>
     
      <p>Name: {authorDetails.name}</p>
      <p>Bio: {authorDetails.bio}</p>
      <p>Link: {authorDetails.link}</p>
      <p>Description: {authorDetails.description}</p>

      {/* Add more author details here */}
    </div>
  );
}

export default AuthorDetails;