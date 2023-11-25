document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score');
    document.getElementById('score').textContent = 'Your score is: ' + score;
});
