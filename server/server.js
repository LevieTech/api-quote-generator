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

//Search for Author
// app.get(`/api/search/author/:authorId`, (req, res) => {
//   const authorId = req.params.authorId; // Gets the author's ID from the URL
//   console.log('Received request for authorId:', authorId);
//   console.log('Author ID:', authorId);
  
//   axios.get(`https://api.quotable.io/authors/${authorId}`).then((response) => {
//     console.log('Quotable API Response:', response);
//     console.log('Checking the response', response.data)
//     res.send(response.data);
//   }).catch((error) => {
//     console.log('Quotable API Error:', error);
//     console.log('Error in server.js', error);
//     res.sendStatus(500);
//   })
// })




// const authorId = 'pablo-picasso';

// const options = {
//   method: 'GET',
//   url: `https://api.quotable.io/authors/${authorId}`, // Use the author's ID in the URL
//   headers: { Accept: 'application/json' }
// };

// try {
//   const { data } = await axios.request(options);
//   console.log(data);
// } catch (error) {
//   console.error(error);
// }

// const apiUrl = `https://api.quotable.io/authors/${authorId}`;
// console.log('Axios Request URL:', apiUrl);


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

// Read all quotes
app.get('/api/quotes', (req, res) => {
  pool.query('SELECT * FROM quotes', (err, result) => {
    if (err) {
      console.error('Error fetching quotes:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Update a quote by ID
app.put('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  const { content, author } = req.body;
  pool.query(
    'UPDATE quotes SET content = $1, author = $2 WHERE id = $3 RETURNING *',
    [content, author, id],
    (err, result) => {
      if (err) {
        console.error('Error updating quote:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rowCount === 0) {
        res.status(404).json({ error: 'Quote not found' });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});

// Delete a quote by ID
app.delete('/api/quotes/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    'DELETE FROM quotes WHERE id = $1 RETURNING *',
    [id],
    (err, result) => {
      if (err) {
        console.error('Error deleting quote:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rowCount === 0) {
        res.status(404).json({ error: 'Quote not found' });
      } else {
        res.json(result.rows[0]);
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
