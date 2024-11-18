"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var searchForm = document.getElementById('searchForm');
  var resultDiv = document.getElementById('result'); // Adds event listener to the submit button 

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    var inputValue = document.getElementById('searchInput').value.trim();
    var sanitizedInput = encodeURIComponent(inputValue); // Sanitize user input
    // Show a loading message as the data is being fetched

    resultDiv.innerHTML = '<p>Loading...</p>'; // Use Fetch API to get data

    fetch("http://localhost/info2180-lab4/superheroes.php?query=".concat(sanitizedInput)).then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }).then(function (data) {
      displayResult(data); // Call the function to display the results searched for
    })["catch"](function (error) {
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
      response.forEach(function (superhero) {
        resultDiv.innerHTML += "\n                    <div>\n                        <h3>".concat(superhero.alias, "</h3>\n                        <h4>Also known by ").concat(superhero.name, "</h4>\n                        <p>").concat(superhero.biography, "</p>\n                    </div>\n                ");
      });
    }
  }
});
//# sourceMappingURL=script.dev.js.map
