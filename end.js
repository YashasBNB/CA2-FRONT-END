document.addEventListener('DOMContentLoaded', function () {
    // Extract the score from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');

    // Display the score on the 'end.html' page
    document.getElementById('score').textContent = 'Your score is: ' + score;
});
