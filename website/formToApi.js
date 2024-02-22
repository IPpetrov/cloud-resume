function formToApi(event) {
    event.preventDefault();
    var hiddenMessage = document.getElementById("hiddenMessage");
    var data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }
    fetch("https://0s7g5eahel.execute-api.eu-central-1.amazonaws.com/prod/send", {
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: "no-cors"
    })
    clearForm();
    hiddenMessage.innerHTML = "Email sent!"
}

function clearForm(){
    var contactName = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');

    contactName.value = "";
    email.value = "";
    message.value = "";
}