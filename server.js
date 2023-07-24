const express = require('express');
const app = express();
const fs = require('fs');
const linkedIn = require('./index');

app.use(express.static('public'));
app.use(express.json());

app.post('/search', (req, res) => {
  const queryOptions = req.body;
  linkedIn.query(queryOptions)
    .then(response => {
      // Convert the response to a JSON string
      const jsonString = JSON.stringify(response, null, 2);
  
      // Write the JSON string to a file named "jobs.json"
      fs.writeFile('jobs.json', jsonString, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to jobs.json:', err);
          res.status(500).json({ error: 'Error writing to jobs.json' });
        } else {
          console.log('Job data has been written to jobs.json successfully.');
          res.json(response);
        }
      });
    })
    .catch(error => {
      console.error('Error querying LinkedIn:', error);
      res.status(500).json({ error: 'Error querying LinkedIn' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
