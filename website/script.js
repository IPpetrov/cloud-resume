document.addEventListener('DOMContentLoaded', () => {

  const counterElement = document.getElementById('visitorCount');

  if (!counterElement) {
    console.error("Error: HTML element with ID 'visitorCount' not found.");
    return; 
  }

  async function updateCounter() {

    const apiUrl = '/api/counter';

    try {
      console.log(`Fetching visitor count from: ${apiUrl}`);
      let response = await fetch(apiUrl);

      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`);
        counterElement.textContent = 'Error';
        try {
            const errorBody = await response.text();
            console.error("Error Response Body:", errorBody.substring(0, 500)); 
        } catch (readError) {
            console.error("Could not read error response body:", readError);
        }
        return; 
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

//testv2