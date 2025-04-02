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
    
    // Handle optional proof file
    const proofFile = document.getElementById("proof").files[0];
    if (proofFile) {
        formData.append("proof", proofFile);
    }

    try {
        const response = await fetch("http://localhost:5000/submit-feedback", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            // Redirect to the success page after submission
            window.location.href = "/success";
        } else {
            alert(result.error || "Failed to submit feedback. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback. Please try again.");
    }
});


