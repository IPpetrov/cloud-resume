function formToApi(event) {
    event.preventDefault();
    var hiddenMessage = document.getElementById("hiddenMessage");
    var data = {
        email: document.getElementsByName('email')[0].value,
        message: document.getElementsByName('message')[0].value
    }
    fetch( "https://sntf0qp0lk.execute-api.eu-central-1.amazonaws.com/sendStage/sending" , {
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