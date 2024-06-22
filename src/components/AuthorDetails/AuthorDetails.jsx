import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Card, IconButton, CardContent, Typography, Modal } from '@mui/material';



function AuthorDetails() {
    const authorDetails = useSelector(store => store.authorDetails);

    console.log('Author Details check', authorDetails);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="authorDetailsDiv">
            {
                authorDetails.results.map(author => {
                    return (
                        <p>{author.bio}</p>
                    )
                })
            }
        </div>
    )
}

export default AuthorDetails;