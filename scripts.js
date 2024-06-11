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

    // Fetch and display researcher information
    fetch('researchers.json')
        .then(response => response.json())
        .then(data => {
            const researchersList = document.getElementById('researchersList');
            
            data.forEach(researcher => {
                const researcherDiv = document.createElement('div');
                researcherDiv.classList.add('researcher');

                researcherDiv.innerHTML = `
                    <h3>${researcher.name}</h3>
                    <p><strong>Email:</strong> ${researcher.email}</p>
                    <p><strong>Affiliation:</strong> ${researcher.affiliation}</p>
                    <p><strong>Publication:</strong> ${researcher.publication}</p>
                `;

                researchersList.appendChild(researcherDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching researcher data:', error);
        });

    // Form validation and submission
    const form = document.getElementById('researcherForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const affiliation = document.getElementById('affiliation').value.trim();
        const publication = document.getElementById('publication').value.trim();

        if (!validateName(name) || !validateEmail(email)) {
            return false;
        }

        // Proceed with form submission
        submitForm(name, email, affiliation, publication);
    });

    function validateName(name) {
        if (name === '') {
            alert('Please enter your name.');
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        return true;
    }

    function submitForm(name, email, affiliation, publication) {
        // Create a JSON object with the researcher details
        const researcher = {
            name: name,
            email: email,
            affiliation: affiliation,
            publication: publication
        };

        // Simulate form submission (optional)
        alert('Form submitted successfully! Researcher details saved.');

        // You can add additional logic here if needed
    }
});
