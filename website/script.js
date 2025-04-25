document.addEventListener('DOMContentLoaded', () => {

  const counterElement = document.getElementById('visitorCount'); 

  if (!counterElement) {
    console.error("Error: HTML element with ID 'visitorCount' not found.");
    return; 
  }

  async function updateCounter() {

    const apiUrl = '/visitor-count-api';

    try {
      console.log(`Fetching visitor count from: ${apiUrl}`);
      let response = await fetch(apiUrl);

      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`);
        counterElement.textContent = 'Error';
      }

      let data = await response.json();

      counterElement.textContent = data;
      console.log('Visitor count updated to:', data);

    } catch (error) {
      console.error('Failed to fetch or process visitor count:', error);
      counterElement.textContent = 'Error';
    }
  }

  updateCounter();

});