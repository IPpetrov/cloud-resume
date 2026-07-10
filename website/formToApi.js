async function formToApi(event) {
    if (event) event.preventDefault();
    
    const btn = document.getElementById('contactSubmit') || 
                (event && event.currentTarget) || 
                document.querySelector('button[type="submit"]');

    const hiddenMessage = document.getElementById("hiddenMessage");
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (btn) {
        btn.disabled = true;
        btn.oldHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    }

    try {
        const response = await fetch("https://0e9npwdhn8.execute-api.eu-central-1.amazonaws.com/prod/fwEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            })
        });

        if (response.ok) {
            hiddenMessage.style.color = "#33D17A";
            hiddenMessage.textContent = "Success! I'll get back to you soon.";
            nameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        hiddenMessage.style.color = "#ff5f56";
        hiddenMessage.textContent = "Error: Couldn't send message. Please try LinkedIn.";
        console.error("Mail Error:", error);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = btn.oldHtml || "Send Message";
        }
    }
}