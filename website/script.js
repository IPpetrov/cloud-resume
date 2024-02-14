const counter = document.getElementById('visitorCount');
async function updateCounter() {
    let response = await fetch("https://j0mmwoxgh6.execute-api.eu-central-1.amazonaws.com/prod/counter");
    let data = await response.json();
    counter.innerHTML = data
}
updateCounter();