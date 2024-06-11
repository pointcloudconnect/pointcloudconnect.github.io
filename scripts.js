// Handle form submission
document.getElementById('researcher-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const newResearcher = {
        name: document.getElementById('name').value,
        affiliation: document.getElementById('affiliation').value,
        profile: document.getElementById('profile').value,
        publications: document.getElementById('publications').value.split(',').map(pub => {
            const [title, link] = pub.split('|').map(item => item.trim());
            return { title, link };
        }),
        social: {
            twitter: document.getElementById('social-twitter').value,
            linkedin: document.getElementById('social-linkedin').value
        }
    };

    // Send the new researcher data to the GitHub Actions endpoint
    fetch('https://api.github.com/repos/your-username/point-cloud-connect/actions/workflows/add-researcher.yml/dispatches', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${your_github_token}`
        },
        body: JSON.stringify({
            event_type: 'add-researcher',
            client_payload: newResearcher
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Submission received. Please wait for approval.');
            document.getElementById('researcher-form').reset();
        } else {
            alert('There was a problem submitting your information.');
            console.error('Error:', response.statusText);
        }
    })
    .catch(error => {
        alert('There was a problem submitting your information.');
        console.error('Error:', error);
    });
});
