function formToApi(event) {
    event.preventDefault();
    var hiddenMessage = document.getElementById("hiddenMessage");
    var data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }
    fetch("https://0e9npwdhn8.execute-api.eu-central-1.amazonaws.com/prod/fwEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: "no-cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        clearForm();
        hiddenMessage.innerHTML = "Email sent!";
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        hiddenMessage.innerHTML = "Something went wrong..";
        hiddenMessage.classList.replace("text-success", "text-danger")
    });

    
}

function clearForm(){
    var contactName = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    contactName.value = "";
    email.value = "";
    message.value = "";
}