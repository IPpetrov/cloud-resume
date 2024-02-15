function formToApi(event) {

    event.preventDefault()

    var data = {
        destinationEmail: document.getElementsByName('email')[0].value,
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
}