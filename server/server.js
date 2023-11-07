const express = require('express');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const axios = require('axios');
// Route includes
const userRouter = require('./routes/user.router');


// Body parser middleware
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get(`/api/quotes/:id`, (req, res) => {
  axios.get(`https://api.quotable.io/`).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    console.log('Error in server.js', error)
    res.sendStatus(500);
  })
})

/* Routes */
app.use('/api/user', userRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5050;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
