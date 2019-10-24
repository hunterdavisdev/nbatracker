const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/nba', require('./routes/nba'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
