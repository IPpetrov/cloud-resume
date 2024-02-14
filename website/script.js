const counter = document.getElementById('visitorCount');
async function updateCounter() {
    let response = await fetch("https://j0mmwoxgh6.execute-api.eu-central-1.amazonaws.com/prod/counter");
    let data = await response.json();
    counter.innerHTML = data
}

updateCounter();

function submitToAPI(e) {
    e.preventDefault();
    var URL = "https://qbrvrgv3m0.execute-api.eu-central-1.amazonaws.com/Prod/contact-us";

         var Namere = /[A-Za-z]{1}[A-Za-z]/;
         if (!Namere.test($("#name-input").val())) {
                      alert ("Name can not less than 2 char");
             return;
         }
         if ($("#email-input").val()=="") {
             alert ("Please enter your email id");
             return;
         }

         var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
         if (!reeamil.test($("#email-input").val())) {
             alert ("Please enter valid email address");
             return;
         }

    var name = $("#name-input").val();
    var email = $("#email-input").val();
    var desc = $("#description-input").val();
    var data = {
       name : name,
       email : email,
       desc : desc
     };

    $.ajax({
      type: "POST",
      url : "https://qbrvrgv3m0.execute-api.eu-central-1.amazonaws.com/Prod/contact-us",
      dataType: "json",
      crossDomain: "true",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),

      
      success: function () {
        // clear form and show a success message
        alert("Successfull");
        document.getElementById("contact-form").reset();
    location.reload();
      },
      error: function () {
        // show an error message
        alert("UnSuccessfull");
      }});
  }