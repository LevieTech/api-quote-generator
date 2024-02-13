import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Typography } from '@mui/material';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <Typography variant="h2" sx={{ textAlign: 'center', }}>{heading}</Typography>

      <div>
        <div className="textContent">
          <p>
            In the next installment of Levie Tech projects, we present to
            you a contemporary quote generator app. This app utilizes
            an API created by -name here- in order to display a variety of
            quotes that inspire awe and provide wisdom. Users can generate
            a random quote and see what fate has in store, or search for
            specific keywords if you have something in mind.

          </p>

          <p>
            For those special quotes that really resonate, add them to your
            favorites and with one click, you can revisit anytime you want.
            With each quote, users can view additional information about the
            author in order to connect further.
          </p>

          <p>
            Log in or register a new account to get started.
          </p>
        </div>
        <div>
          <LoginForm />

          <center>
            <h4>New user?</h4>
            <button className="btn btn_sizeSm" onClick={onRegister}>
              Register
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
