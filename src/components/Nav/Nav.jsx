import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <center>
        <div className="nav">
          <Link to="/home">
            <img src="./api-quote-generator-header.png" alt="API Quote Generator" width="75%" height="75%" style={{ maxWidth: 1100, }} />
          </Link>
        </div>
      </center>

      <div className="navLink">
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }


        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/quotes">Quotes</Link>
            <Link className="navLink" to="/favoritequotes">
  Favorite Quotes
</Link>


           
            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </>
  );
}

export default Nav;
