const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const axios = require('axios');
// Route includes
const userRouter = require('./routes/user.router');
const pool = require('./server/modules/pool.js'); 


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
