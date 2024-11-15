document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search').addEventListener('click', function() {
        fetch('http://localhost/info2180-lab4/superheroes.php')
            .then(res => res.text())
            .then(data => alert(data))
    });
});
    