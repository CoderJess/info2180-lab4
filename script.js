document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const resultDiv = document.getElementById('result');

    // Adds event listener to the submit button 
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const inputValue = document.getElementById('searchInput').value.trim();
        const sanitizedInput = encodeURIComponent(inputValue); // Sanitize user input

        // Show a loading message as the data is being fetched
        resultDiv.innerHTML = '<p>Loading...</p>';

        // Use Fetch API to get data
        fetch(`http://localhost/info2180-lab4/superheroes.php?query=${sanitizedInput}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(data => {
                displayResult(data); // Call the function to display the results searched for
            })
            .catch(error => {
                resultDiv.style.color = "red";
                resultDiv.innerHTML = 'Superhero not Found';
            });
    });

    function displayResult(response) {
        resultDiv.innerHTML = ''; // Clear previous results
        if (response.length === 0) {
            resultDiv.style.color = "red";
            resultDiv.innerHTML = '<p>Superhero not found.</p>';
        } else {
            response.forEach(superhero => {
                resultDiv.innerHTML += `
                    <div>
                        <h3>${superhero.alias}</h3>
                        <h4>Also known by ${superhero.name}</h4>
                        <p>${superhero.biography}</p>
                    </div>
                `;
            });
        }
    }
});
