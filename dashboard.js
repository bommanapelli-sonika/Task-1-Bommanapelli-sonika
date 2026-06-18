const jobs = [
    {
        title: "Frontend Developer",
        company: "Infosys",
        location: "Hyderabad",
        category: "Frontend"
    },
    {
        title: "Java Developer",
        company: "TCS",
        location: "Bangalore",
        category: "Java"
    },
    {
        title: "Python Developer",
        company: "Wipro",
        location: "Chennai",
        category: "Python"
    },
    {
        title: "Software Engineer",
        company: "Accenture",
        location: "Pune",
        category: "Java"
    },
    {
        title: "Full Stack Developer",
        company: "Cognizant",
        location: "Hyderabad",
        category: "FullStack"
    }
];

loadTheme();
loadProfile();
displayJobs();
loadAppliedJobs();

function loadProfile() {

    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("profileData").innerHTML = `
        <p><b>Name:</b> ${student.username}</p>
        <p><b>Branch:</b> ${student.branch}</p>
        <p><b>Skills:</b> ${student.skills}</p>
    `;
}

function displayJobs() {

    const container = document.getElementById("jobsContainer");

    const applied = JSON.parse(localStorage.getItem("applied")) || [];

    container.innerHTML = "";

    jobs.forEach(job => {

        const isApplied = applied.some(item => item.title === job.title);

        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>

                <p><b>Company:</b> ${job.company}</p>

                <p><b>Location:</b> ${job.location}</p>

                <p><b>Category:</b> ${job.category}</p>

                <button
                    onclick="applyJob('${job.title}')"
                    ${isApplied ? "disabled" : ""}>
                    ${isApplied ? "Applied" : "Apply"}
                </button>
            </div>
        `;
    });
}

function applyJob(title) {

    let applied = JSON.parse(localStorage.getItem("applied")) || [];

    if (applied.some(item => item.title === title)) {
        alert("Already Applied");
        return;
    }

    applied.push({
        title: title,
        appliedOn: new Date().toLocaleString()
    });

    localStorage.setItem("applied", JSON.stringify(applied));

    displayJobs();
    loadAppliedJobs();

    alert("Application Submitted");
}

function loadAppliedJobs() {

    const applied = JSON.parse(localStorage.getItem("applied")) || [];

    const list = document.getElementById("appliedJobs");

    list.innerHTML = "";

    applied.forEach(job => {
        list.innerHTML += `
            <li>
                ${job.title} - Applied on ${job.appliedOn}
            </li>
        `;
    });
}

function searchJobs() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".job-card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        card.style.display = text.includes(keyword)
            ? "block"
            : "none";
    });
}

function filterJobs() {

    const selected = document.getElementById("filter").value;

    const cards = document.querySelectorAll(".job-card");

    cards.forEach(card => {

        if (selected === "all") {
            card.style.display = "block";
        } else {
            card.style.display = card.innerText.includes(selected)
                ? "block"
                : "none";
        }
    });
}

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );
}

function loadTheme() {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
    }
}

function logout() {

    localStorage.removeItem("student");

    window.location.href = "index.html";
}