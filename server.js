const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

app.use('/api', require('./routes/nba'));

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
  //app.use(express.static(path.join(__dirname, 'client/build')));
  app.use(express.static('client/build'));
  // Anything that doesn't match the above, send back index.html
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname + '/client/build/index.html'));
  // });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
