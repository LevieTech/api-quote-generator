const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const axios = require('axios');
// Route includes
const userRouter = require('./routes/user.router');
const pool = require('./modules/pool'); 


// Body parser middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get(`/api/random/`, (req, res) => {
  axios.get(`https://api.quotable.io/quotes/random`).then((response) => {
    console.log('Checking the response', response.data)
    res.send(response.data);
  }).catch((error) => {
    console.log('Error in server.js', error);
    res.sendStatus(500);
  })
})


app.get(`/api/quotes/:id`, (req, res) => {
  axios.get(`https://api.quotable.io/search/quotes?query=${req.params.id}`).then((response) => {
    console.log('Checking the response', response.data)
    res.send(response.data);
  }).catch((error) => {
    console.log('Error in server.js', error);
    res.sendStatus(500);
  })
})


// ! This is an api route to retrieve author searches
// app.get(`/api/authors/:id`, (req, res) => {
//   axios.get(`https://api.quotable.io/search/authors?query=${req.params.id}`).then((response) => {
//     console.log('Checking the response', response.data)
//     res.send(response.data);
//   }).catch((error) => {
//     console.log('Error in server.js', error);
//     res.sendStatus(500);
//   })
// })

/* CRUD Endpoints for Quotes */

// Create a new quote
app.post('/api/quotes', (req, res) => {
  const { content, author } = req.body;
  pool.query(
    'INSERT INTO quotes (content, author) VALUES ($1, $2) RETURNING *',
    [content, author],
    (err, result) => {
      if (err) {
        console.error('Error creating quote:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json(result.rows[0]);
      }
    }
  );
});



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
