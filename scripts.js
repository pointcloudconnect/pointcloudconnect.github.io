// Fetch researcher data from JSON file
fetch('researchers.json')
    .then(response => response.json())
    .then(data => {
        displayResearchers(data); // Pass the fetched data to the displayResearchers function
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display researchers
function displayResearchers(data) {
    let output = '';
    data.forEach(researcher => {
        output += `<div class="researcher">
            <h2>${researcher.name}</h2>
            <p>Affiliation: ${researcher.affiliation}</p>
            <p><a href="${researcher.profile}">Profile</a></p>
            <p>Publications:</p>
            <ul>${researcher.publications.map(pub => `<li><a href="${pub.link}">${pub.title}</a></li>`).join('')}</ul>
            <p>Social Media: <a href="${researcher.social.twitter}">Twitter</a> | <a href="${researcher.social.linkedin}">LinkedIn</a></p>
        </div>`;
    });
    document.getElementById('researcher-list').innerHTML = output;
}

// Add event listener to search input
document.getElementById('search-input').addEventListener('input', function () {
    const input = this.value.toLowerCase();
    fetch('researchers.json')
        .then(response => response.json())
        .then(data => {
            const filtered = data.filter(researcher => researcher.name.toLowerCase().includes(input));
            displayResearchers(filtered);
        })
        .catch(error => console.error('Error fetching data:', error));
});
