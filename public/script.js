// Mess Feedback Portal - Developed by Jaspreet
document.getElementById("feedbackForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("reg_no", document.getElementById("reg_no").value);
    formData.append("student_name", document.getElementById("student_name").value);
    formData.append("block_room", document.getElementById("block_room").value);
    formData.append("mess_name", document.getElementById("mess_name").value);
    formData.append("mess_type", document.getElementById("mess_type").value);
    formData.append("category", document.getElementById("category").value);
    formData.append("feedback_type", document.getElementById("feedback_type").value);
    formData.append("comments", document.getElementById("comments").value);
    formData.append("proof", document.getElementById("proof").files[0]);

    try {
        const response = await fetch("http://localhost:5000/submit-feedback", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = "success.html"; // Redirect to success page
        } else {
            alert(result.error || "Failed to submit feedback. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback. Please try again.");
    }
});
