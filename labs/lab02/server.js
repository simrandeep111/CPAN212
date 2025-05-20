const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3000;

// Use the routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});