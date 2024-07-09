document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const yOffset = -80; // Adjust offset as needed
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    });

    const researchersList = document.getElementById("researchersList");
    const loadingIndicator = document.getElementById("loadingIndicator");

    // Simulated API call to fetch researchers' data
    function fetchResearchers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { name: "Dr. Alice Johnson", affiliation: "University A", expertise: "3D Reconstruction" },
                    { name: "Dr. Bob Smith", affiliation: "Institute B", expertise: "Object Detection" }
                ]);
            }, 2000); // Simulated delay
        });
    }

    // Function to display researchers
    function displayResearchers(researchers) {
        researchersList.innerHTML = "";
        researchers.forEach((researcher) => {
            const researcherDiv = document.createElement("div");
            researcherDiv.className = "researcher";
            researcherDiv.innerHTML = `<h3>${researcher.name}</h3>
                                       <p><strong>Affiliation:</strong> ${researcher.affiliation}</p>
                                       <p><strong>Expertise:</strong> ${researcher.expertise}</p>`;
            researchersList.appendChild(researcherDiv);
        });
    }

    // Fetch and display researchers with loading indicator
    async function loadResearchers() {
        loadingIndicator.style.display = "block";
        try {
            const researchers = await fetchResearchers();
            displayResearchers(researchers);
        } catch (error) {
            researchersList.innerHTML = "<p>Error loading researchers. Please try again later.</p>";
        } finally {
            loadingIndicator.style.display = "none";
        }
    }

    // Load researchers on page load
    loadResearchers();
});
