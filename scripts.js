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
    const searchBar = document.getElementById("searchBar");
    const sortOptions = document.getElementById("sortOptions");

    // Fetch researchers' data from external JSON file
    async function fetchResearchers() {
        const response = await fetch('https://your-github-username.github.io/your-repository-name/researchers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    // Function to display researchers
    function displayResearchers(researchers) {
        researchersList.innerHTML = "";
        researchers.forEach((researcher) => {
            const researcherDiv = document.createElement("div");
            researcherDiv.className = "researcher";
            researcherDiv.innerHTML = `<h3>${researcher.name}</h3>
                                       ${researcher.affiliation ? `<p><strong>Affiliation:</strong> ${researcher.affiliation}</p>` : ""}
                                       ${researcher.email ? `<p><strong>Email:</strong> <a href="mailto:${researcher.email}">${researcher.email}</a></p>` : ""}
                                       ${researcher.website ? `<p><strong>Website:</strong> <a href="${researcher.website}" target="_blank">${researcher.website}</a></p>` : ""}
                                       ${researcher.labels ? `<p><strong>Labels:</strong> ${researcher.labels.join(", ")}</p>` : ""}
                                       ${researcher.country ? `<p><strong>Country:</strong> ${researcher.country}</p>` : ""}`;
            researchersList.appendChild(researcherDiv);
        });
    }

    // Search and filter researchers
    function filterResearchers(researchers, query) {
        return researchers.filter(researcher => {
            return (
                researcher.name.toLowerCase().includes(query) ||
                (researcher.affiliation && researcher.affiliation.toLowerCase().includes(query)) ||
                (researcher.labels && researcher.labels.join(", ").toLowerCase().includes(query)) ||
                (researcher.country && researcher.country.toLowerCase().includes(query))
            );
        });
    }

    // Sort researchers
    function sortResearchers(researchers, criteria) {
        return researchers.sort((a, b) => {
            if (a[criteria] < b[criteria]) return -1;
            if (a[criteria] > b[criteria]) return 1;
            return 0;
        });
    }

    // Fetch and display researchers with loading indicator
    async function loadResearchers() {
        loadingIndicator.style.display = "block";
        try {
            let researchers = await fetchResearchers();
            
            // Event listener for search
            searchBar.addEventListener("input", () => {
                const query = searchBar.value.toLowerCase();
                const filteredResearchers = filterResearchers(researchers, query);
                displayResearchers(filteredResearchers);
            });

            // Event listener for sort
            sortOptions.addEventListener("change", () => {
                const criteria = sortOptions.value;
                const sortedResearchers = sortResearchers(researchers, criteria);
                displayResearchers(sortedResearchers);
            });

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
