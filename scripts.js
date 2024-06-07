const researchers = [
    {
        "name": "Dr. Alice Smith",
        "affiliation": "Tech University",
        "profile": "https://techuniversity.edu/alicesmith",
        "publications": [
            { "title": "Point Cloud Segmentation", "link": "https://example.com/point-cloud-segmentation" }
        ],
        "social": { "twitter": "https://twitter.com/alicesmith", "linkedin": "https://linkedin.com/in/alicesmith" }
    },
    // More researcher data
];

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

displayResearchers(researchers);

document.getElementById('search-input').addEventListener('input', function () {
    const input = this.value.toLowerCase();
    const filtered = researchers.filter(researcher => researcher.name.toLowerCase().includes(input));
    displayResearchers(filtered);
});
