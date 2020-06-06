const NUM_VISITS_URL = '/visits';

fetch(NUM_VISITS_URL)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const visits = response;

    const visitsDiv = document.getElementById('visits');
    visitsDiv.innerHTML = `Total visits: ${visits}`;
  });
