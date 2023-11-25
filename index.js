document.addEventListener('DOMContentLoaded', function () {
    const ball = document.getElementById('ball');
    const rectangle = document.querySelector('.rectangle');
    const scoreElement = document.getElementById('score');

    let ballTop = 0; // Initial top position of the ball
    let ballSpeedY = 15; // Initial vertical speed of the ball
    let score = 0;
    let scoreIncreased = false; // Flag to track if the score has been increased in the current bounce
    let gameStarted = false; // Flag to track if the game has started
    let ballColorChanged = false; // Flag to track if the color of the ball has been changed
    let clickCount = 0; // Counter to track the number of clicks

    function startGame() {
        if (!gameStarted) {
            // Initialize the game loop only once
            gameStarted = true;
            ballSpeedY = 5; // Initial vertical speed of the ball
            gameLoop();
        }
    }

    function update() {
        const ballRect = ball.getBoundingClientRect();
        const rectangleRect = rectangle.getBoundingClientRect();

        // Check if the ball hits the top edge of the screen
        if (ballTop + ballSpeedY < 0) {
            ballSpeedY = -ballSpeedY; // Reverse the vertical direction
            resetFlags(); // Reset flags for the new bounce

            // Change the color of the ball only once when it reaches the topmost position
            if (!ballColorChanged) {
                changeBallColor();
                ballColorChanged = true; // Set color change flag to true for the current bounce
            }
        }

        // Check if the ball hits the bottom edge of the rectangle
        if (
            ballRect.bottom + ballSpeedY >= rectangleRect.top &&
            ballRect.top + ballSpeedY <= rectangleRect.bottom &&
            ballRect.right >= rectangleRect.left &&
            ballRect.left <= rectangleRect.right
        ) {
            if (!scoreIncreased) {
                incrementScore();
                scoreIncreased = true; // Set score increase flag to true for the current bounce
            }

            // Check if the color of the ball matches the color of the rectangle
            if (getComputedStyle(ball).backgroundColor !== getComputedStyle(rectangle).backgroundColor) {
                // If the colors don't match, it's Game Over
                gameOver();
            }

            ballSpeedY = -ballSpeedY; // Reverse the vertical direction

            // Adjust ball speed based on the score
            if (score >= 10 && score % 10 === 0) {
                ballSpeedY += 2; // Increase speed by 2 after every 10 points
            }
        }

        // Move the ball vertically
        ballTop += ballSpeedY;
        ball.style.top = ballTop + 'px';
    }

    function incrementScore() {
        score++;
        scoreElement.textContent = 'Score: ' + score;

        // Adjust ball speed based on the score
        if (score >= 10 && score % 10 === 0) {
            ballSpeedY += 2; // Increase speed by 2 after every 10 points
        }
    }

    function changeBallColor() {
        const colors = ['#e74c3c', '#f1c40f', '#70e000']; // Red, Yellow, Parrot Pink
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        ball.style.backgroundColor = randomColor;
    }

    function resetFlags() {
        scoreIncreased = false;
        ballColorChanged = false;
    }

    function gameOver() {
        // Redirect to the 'end.html' file with the score as a query parameter
        window.location.href = 'end.html?score=' + score;
    }

    // Add an event listener for clicks on the document
    document.addEventListener('click', function () {
        startGame();
        changeRectangleColor();
    });

    function changeRectangleColor() {
        const rectangleColors = ['#e74c3c', '#f1c40f', '#70e000']; // Example colors for the rectangle

        // Change the color of the rectangle based on the click count
        rectangle.style.backgroundColor = rectangleColors[clickCount % rectangleColors.length];

        clickCount++; // Increment the click count for the next color
    }

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }
});

var storedActualName = localStorage.getItem("actname");
var actualNameElement = document.querySelector(".actualname");
actualNameElement.textContent = actualName;



