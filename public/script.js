const form = document.getElementById('jobSearchForm');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const searchOptions = Object.fromEntries(formData.entries());

  try {
    // Afficher le loader et le fond flou avant d'envoyer la requête
    loaderContainer.style.display = 'flex';
    const response = await fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchOptions)
    });

    const data = await response.json();
    displayResults(data);
    loaderContainer.style.display = 'none'; // Cacher le loader et le fond flou
  } catch (error) {
    console.error('Error fetching search results:', error);
    resultsDiv.innerHTML = 'Error fetching search results.';
    loaderContainer.style.display = 'none'; // Cacher le loader et le fond flou
  }
});

function displayResults(jobs) {
  resultsDiv.innerHTML = ''; // Clear previous results

  if (jobs.length === 0) {
    resultsDiv.innerHTML = 'Aucun résultat trouvé pour cette recherche.';
    return;
  }

  // Loop through each job and create an HTML element for it
  jobs.forEach(job => {
    const jobDiv = document.createElement('div');
    jobDiv.classList.add('job');

    const title = document.createElement('h2');
    const linkk = job.jobUrl; // Assurez-vous que jobUrl est correctement défini

    const link = document.createElement('a');
    link.textContent = job.position;
    link.target = '_blank';
    link.href = linkk;

    title.appendChild(link);
    jobDiv.appendChild(title);

    const company = document.createElement('p');
    company.textContent = 'Entreprise: ' + job.company;
    jobDiv.appendChild(company);

    const location = document.createElement('p');
    location.textContent = 'Lieu: ' + job.location;
    jobDiv.appendChild(location);

    const date = document.createElement('p');
    date.textContent = 'Date: ' + job.date;
    jobDiv.appendChild(date);

    const salary = document.createElement('p');
    salary.textContent = 'Salaire: ' + job.salary;
    jobDiv.appendChild(salary);

    const jobUrl = document.createElement('a');
    jobUrl.textContent = 'Voir l\'offre';
    jobUrl.target = '_blank';
    jobUrl.href = job.jobUrl;
    jobDiv.appendChild(jobUrl);

    resultsDiv.appendChild(jobDiv);
  });
}
