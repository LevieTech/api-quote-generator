import { useSelector, useDispatch } from 'react-redux';
import { Card, IconButton, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AuthorDetails from './AuthorDetails';

function RandomQuotes() {
const dispatch = useDispatch();
  const quotes = useSelector((store) => store.quotes.quotes);
  const favorites = useSelector((store) => store.quotes.favorites);
  const authorDetailsData = useSelector((store) => store.authorDetails);
  
  
  const [showAuthorDetails, setShowAuthorDetails] = useState(false);

  const addToFavorites = (quote) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: quote });
  };

  const removeFromFavorites = (quote) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
  };

  const isInFavorites = (quote) => {
    return favorites.some((favQuote) => favQuote._id === quote._id);
  };

  useEffect(() => {
    dispatch({ type: 'GET_RANDOM' }); // Dispatch action to fetch random quotes
    dispatch({ type: 'INITIALIZE_FAVORITES' }); // Dispatch action to initialize favorites
  }, [dispatch]);

  useEffect(() => {
    if (authorDetailsData && Object.keys(authorDetailsData).length > 0) {
      setShowAuthorDetails(true);
    }
  }, [authorDetailsData]);

  return (
    <div className="randomQuoteDiv">
      <br />
      {quotes.length === 0 ? (
        <h3>Display a random quote!</h3>
      ) : (
        quotes.map((quote) => (
          <div key={quote._id}>
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
                <Typography variant="body1">
                  "{quote.content}"
                </Typography>
                <br />
                <Typography variant="h8">- {quote.author}</Typography>
                <Typography variant="h8">
                  <Link to={`/author/${quote.author}`}>
                    - {quote.author}
                  </Link>
                </Typography>
                <IconButton
                  onClick={() => {
                    if (!isInFavorites(quote)) {
                      addToFavorites(quote);
                    } else {
                      removeFromFavorites(quote);
                    }
                  }}
                >
                  <FavoriteIcon
                    color={isInFavorites(quote) ? 'primary' : 'secondary'}
                  />
                </IconButton>
              </CardContent>
            </Card>
            {showAuthorDetails && <AuthorDetails authorName={quote.author} />}
          </div>
        ))
      )}
      <br />
    </div>
  );
}

export default RandomQuotes;



// import { useSelector, useDispatch } from 'react-redux';
// import { Card, IconButton, CardContent, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import AuthorDetails from './AuthorDetails';
// import { put } from 'redux-saga/effects';
// function RandomQuotes() {
//     const quotes = useSelector((store) => store.quotes.quotes);
//     const favorites = useSelector((store) => store.quotes.favorites);
//     const authorDetailsData = useSelector((store) => store.authorDetails); 

//     const axios = require('axios');
//     const dispatch = useDispatch();
//     const [showAuthorDetails, setShowAuthorDetails] = useState(false);

// //   const authorDetails = async (authorName) => {
// //     try {
// //       const response = await axios.get(`/api/authors/${authorName}`);
      
// //       const authorDetailsData = {
// //         name: response.data.name,
// //         bio: response.data.bio,
// //         link: response.data.link,
// //         description: response.data.description,
// //       };
      
// //       // Dispatch the action here to update Redux state
// //     //   dispatch({ type: 'SET_AUTHOR_DETAILS', payload: authorDetailsData });
// //     //   setShowAuthorDetails(true);
// //     } catch (error) {
// //       console.error('Error fetching author details:', error);
// //     }
// //   };
// function* getAuthor(action) {
//     try {
//       console.log('Fetching author details for:', action.payload); // Log the authorName you are fetching
//       const response = yield axios.get(`/api/authors/${action.payload}`);
  
//       // Ensure the response contains the expected author details
//       if (response.data) {
//         const authorDetails = {
//           name: response.data.name,
//           bio: response.data.bio,
//           link: response.data.link,
//           description: response.data.description,
//         };
  
//         console.log('Author details response:', authorDetails); // Log the response data
  
//         // Check if authorDetails is not null or undefined
//         if (authorDetails.name) {
//           yield put({ type: 'SET_AUTHOR_DETAILS', payload: authorDetails });
//         } else {
//           console.log('Author details not found or empty.');
//           // Handle the case where authorDetails is not found or empty
//           // You can dispatch an action or set some state to handle this situation.
//         }
//       } else {
//         console.log('Author details response is empty or undefined.');
//         // Handle the case where the response data is empty or undefined.
//         // You can dispatch an action or set some state to handle this situation.
//       }
//     } catch (error) {
//       console.error('Error in getAuthor:', error);
//       // Handle the error, you can dispatch an error action or set some error state here.
//     }
//   }
  
//     useEffect(() => {
//         dispatch({ type: 'GET_RANDOM' }); // Dispatch action to fetch random quotes
//         dispatch({ type: 'INITIALIZE_FAVORITES' }); // Dispatch action to initialize favorites
//     }, [dispatch]);

//     useEffect(() => {
//         if (authorDetailsData && Object.keys(authorDetailsData).length > 0) {
//             setShowAuthorDetails(true);
//         }
//     }, [authorDetailsData]);


    
//     const addToFavorites = (quote) => {
//         dispatch({ type: 'ADD_TO_FAVORITES', payload: quote });
//     };

//     const removeFromFavorites = (quote) => {
//         dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: quote });
//     };

//     const isInFavorites = (quote) => {
//         return favorites.some((favQuote) => favQuote._id === quote._id);
//     };

//     return (
//         <div className="randomQuoteDiv">
//             <br />
//             {quotes.length === 0 ? (
//                 <h3>Display a random quote!</h3>
//             ) : (
//                 quotes.map((quote) => (
//                     <div key={quote._id}>
//                         <Card
//                             sx={{
//                                 boxShadow: 4,
//                                 width: '350px',
//                                 height: '225px',
//                                 fontSize: 16,
//                                 display: 'flex',
//                                 flexWrap: 'wrap',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 padding: '15px',
//                                 outlineWidth: 3,
//                             }}
//                         >
//                             <CardContent>
//                                 <Typography variant="body1">
//                                     "{quote.content}"
//                                 </Typography>
//                                 <br />
//                                 <Typography variant="h8">- {quote.author}</Typography>
//                                 <Typography variant="h8">
//                                     <Link to={`/author/${quote.author}`} onClick={() => authorDetails(quote.author)}>
//                                         - {quote.author}
//                                     </Link>
//                                 </Typography>
//                                 <AuthorDetails authorName={quote.author} />
//                                 <IconButton
//                                     onClick={() => {
//                                         if (!isInFavorites(quote)) {
//                                             addToFavorites(quote);
//                                         } else {
//                                             removeFromFavorites(quote);
//                                         }
//                                     }}
//                                 >
//                                     <FavoriteIcon
//                                         color={isInFavorites(quote) ? 'primary' : 'secondary'}
//                                     />
//                                 </IconButton>
//                             </CardContent>
//                         </Card>

                       
//                     </div>
//                 ))
//             )}
//             <br />
          
//         </div>
//     );
// }

// export default RandomQuotes;

//npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
