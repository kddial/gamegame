const NUM_VISITS_URL = '/visits';
const NEW_VISIT_URL = '/new-visit';
const SESSION_VISIT_ACKNOWLEDGED = 'SESSION_VISIT_ACKNOWLEDGED';

fetch(NUM_VISITS_URL)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const visits = response;

    const visitsDiv = document.getElementById('visits');
    visitsDiv.innerHTML = `Total visits: ${visits}`;
  });

if (!!sessionStorage.getItem(SESSION_VISIT_ACKNOWLEDGED) === false) {
  fetch(NEW_VISIT_URL, {
    method: 'POST',
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      console.log('new visit', response);
      sessionStorage.setItem(SESSION_VISIT_ACKNOWLEDGED, '1');
    });
}
