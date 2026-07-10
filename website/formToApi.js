async function formToApi(event) {
    event.preventDefault();
    
    const btn = event.target.querySelector('button');
    const hiddenMessage = document.getElementById("hiddenMessage");
    
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    btn.disabled = true;
    const originalBtnText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    try {
        const response = await fetch("https://0e9npwdhn8.execute-api.eu-central-1.amazonaws.com/prod/fwEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            hiddenMessage.style.color = "#33D17A";
            hiddenMessage.innerHTML = "Success! I'll get back to you soon.";
            clearForm();
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        hiddenMessage.style.color = "#ff5f56";
        hiddenMessage.innerHTML = "Error: Couldn't send message. Please try LinkedIn.";
        console.error("Mail Error:", error);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
    }
}