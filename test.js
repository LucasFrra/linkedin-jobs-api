const fs = require('fs');
const linkedIn = require('./index'); // Assurez-vous que le chemin est correct pour accéder à index.js

const queryOptions = {
  keyword: 'Communication',
  location: 'Amiens, France',
  dateSincePosted: 'past month',
  jobType: 'full time',
  remoteFilter: '',
  salary: '',
  experienceLevel: '',
  limit: '1',
  sortBy: 'recent'
};

linkedIn.query(queryOptions).then(response => {
  // Convert the response to a JSON string
  const jsonString = JSON.stringify(response, null, 2);

  // Write the JSON string to a file named "jobs.json"
  fs.writeFile('jobs.json', jsonString, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to jobs.json:', err);
    } else {
      console.log('Job data has been written to jobs.json successfully.');
    }
  });
});
