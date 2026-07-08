// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Expand earlier career stages
const showEarlier = document.getElementById('showEarlier');
const earlierStages = document.getElementById('earlierStages');
if (showEarlier) {
  showEarlier.addEventListener('click', () => {
    const isOpen = earlierStages.classList.toggle('open');
    showEarlier.setAttribute('aria-expanded', isOpen);
    showEarlier.innerHTML = isOpen
      ? '<i class="fa-solid fa-chevron-up"></i> hide earlier stages'
      : '<i class="fa-solid fa-chevron-down"></i> show earlier stages';
  });
}

// Visitor counter
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