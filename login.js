function login() {

    const username = document.getElementById("username").value.trim();
    const branch = document.getElementById("branch").value.trim();
    const skills = document.getElementById("skills").value.trim();

    if (!username || !branch || !skills) {
        alert("Please fill all fields");
        return;
    }

    const student = {
        username,
        branch,
        skills
    };

    localStorage.setItem("student", JSON.stringify(student));

    window.location.href = "dashboard.html";
}