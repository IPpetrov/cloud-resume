function formToApi(event) {
    event.preventDefault();
    var hiddenMessage = document.getElementById("hiddenMessage");
    var data = {
        name: document.getElementsById('name').value,
        email: document.getElementsById('email').value,
        message: document.getElementsById('message').value
    }
    fetch( "https://4qwmba7004.execute-api.eu-central-1.amazonaws.com/prod/sending" , {
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


function invokeAWSAPI(e) {
    e.preventDefault();           
    var name = $("#form-name").val();
    var phone = $("#form-phone").val();
    var email = $("#form-email").val();
    var msg = $("#form-message").val();
    var data = {
       name : name,
       phone : phone,
       email : email,
       msg : msg
     };$.ajax({
      type: "POST",
      url : "https://*************.us-east-1.amazonaws.com/dev/contact-us",
      dataType: "json",
      crossDomain: "true",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      success: function () {
        alert("Successful");
        document.getElementById("contact-form").reset();
    location.reload();
      },
      error: function () {
        alert("unsuccessful");
      }});
  }