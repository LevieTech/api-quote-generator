import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    
    <form className="formPanel" onSubmit={registerUser}>
      <Typography variant="h4" sx={{textAlign:'center', paddingBottom:2,}}> 
      Register 
      </Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <center>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </center>
      <center>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </center>
      <center>
        <input className="btn" type="submit" name="submit" value="Register" />
      </center>
    </form>
  );
}

export default RegisterForm;
