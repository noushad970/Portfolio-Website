document.getElementById("sendButton").addEventListener("click", function () {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("messageInput").value;

    if (name && email && message) {
        // Sending Email
        emailjs.send("service_n3qqwbu", "template_h7vitzj", {
            from_name: name,
            from_email: email,
            message: message
        }).then(() => {
            alert("Message sent successfully!");

            // Adding feedback to the page
            const feedbackList = document.getElementById("feedbackList");
            const feedbackItem = document.createElement("div");
            feedbackItem.innerHTML = `
                <strong>${name}</strong>: ${message}
            `;
            feedbackList.appendChild(feedbackItem);

            // Clearing form fields
            document.getElementById("contactForm").reset();
        }).catch((error) => {
            alert("Failed to send message. Please try again.");
            console.error("Error sending email:", error);
        });
    } else {
        alert("Please fill in all fields.");
    }
});
// Gmail Compose Button
document.getElementById("composeMailButton").addEventListener("click", function () {
    window.open("mailto:bmdnoushad@gmail.com", "_blank");
});
