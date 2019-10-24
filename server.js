const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use('/nba', require('./routes/nba'));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

  app.use('/nba', require('./routes/nba'));
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
