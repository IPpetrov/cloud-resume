function formToApi(event) {
    var hiddenMessage = document.getElementById("hiddenMessage");
    event.preventDefault();
    grecaptcha.execute();
    awswafCaptchaExecute();
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


// captcha 
function setError(error) {
    document.getElementById("error-container").innerHTML = error.message;
}

function onClickRenderCaptcha() {
    const container = document.getElementById('captcha-container');
    AwsWafCaptcha.renderCaptcha(container, {
        apiKey: "iUlPMK+GVklZRhCschlGknL2zhi5lYc64V2rtzBNd6U185GBXTXDxkiNASzkFvmEHyXlj0D+klPyZ88nqKmeRdctNwgpMOfwUJn4QdtNskumrwpI3H5n5/NRY3lx9NCf2CW6Ftf/wgbfx0t97egfF1Z6neW1KLPnd2oggmeYF3Jmsa+Ot+hCwxUjuy4yVU3UC6x38yDeyvoWBWfwZKbY7l5TRCA/kztl+I+oCKSrBN+aH4n7zfOkxI6ka12wUpjZQgeZO8d42viWun5IlszHpw849f/RfjNNQUNBEDKMYKMUJ/PC/gn6sKpsIM/CK9FC0efKOL8jQIfRy7QUp2xijhoUjVbwRrnMZASiSMAEfuva5y4M5c9qPU6tsnqzmTaUA2I8+N/qyTZ9G2eSRF8boyZhYNBvPgkRnLy/RMa6BCQ26VhM3TiL81V0PnnRz3RC/ztRWI1tgnUIkV0vcyoOKV+M8a6JkmMvCrJI2aeBHFIcff/q7j0SYsLQ/tmcliPFRPCpQxNKgB3z5eqaWcAbOR5sFVSmDqJ0DnOOQY1byFZjX54HbvlR0QAuyODfxqPkzEmd1j6rlrH3HDirGq09tlWukTFjHsMrhVD8y4siOSniRPaYgJdN7S8+jSJ3GQ8LIiAopglIvLnkWeLKeaH16ywdPiMTvUToIMTejcwDHgw=_0_1",
        onSuccess: () => {
            document.getElementById("fetch-data-btn").style.display = 'block';
        },
        onError: setError,
    });
}

function fetchProtectedData() {
    AwsWafIntegration.fetch('./pets', {
        method: 'GET'
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('pets-container').textContent = JSON.stringify(data);
        })
        .catch(setError);
}
