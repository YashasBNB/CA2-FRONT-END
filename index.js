document.addEventListener('DOMContentLoaded', function () {
    const ball = document.getElementById('ball');
    const rectangle = document.querySelector('.rectangle');
    const scoreElement = document.getElementById('score');

    let ballTop = 0;
    let ballSpeedY = 15; 
    let score = 0;
    let scoreIncreased = false; 
    let gameStarted = false; 
    let ballColorChanged = false; 
    let clickCount = 0;
    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            ballSpeedY = 5; 
            gameLoop();
        }
    }

    function update() {
        const ballRect = ball.getBoundingClientRect();
        const rectangleRect = rectangle.getBoundingClientRect();

        if (ballTop + ballSpeedY < 0) {
            ballSpeedY = -ballSpeedY;
            resetFlags();
            if (!ballColorChanged) {
                changeBallColor();
                ballColorChanged = true; 
            }
        }

        if (
            ballRect.bottom + ballSpeedY >= rectangleRect.top &&
            ballRect.top + ballSpeedY <= rectangleRect.bottom &&
            ballRect.right >= rectangleRect.left &&
            ballRect.left <= rectangleRect.right
        ) {
            if (!scoreIncreased) {
                incrementScore();
                scoreIncreased = true;
            }
            if (getComputedStyle(ball).backgroundColor !== getComputedStyle(rectangle).backgroundColor) {
                gameOver();
            }

            ballSpeedY = -ballSpeedY; 
            if (score >= 10 && score % 10 === 0) {
                ballSpeedY += 2; 
            }
        }

        ballTop += ballSpeedY;
        ball.style.top = ballTop + 'px';
    }

    function incrementScore() {
        score++;
        scoreElement.textContent = 'Score: ' + score;

        if (score >= 10 && score % 10 === 0) {
            ballSpeedY += 3; 
        }
    }

    function changeBallColor() {
        const colors = ['#e74c3c', '#f1c40f', '#70e000']; 
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        ball.style.backgroundColor = randomColor;
    }

    function resetFlags() {
        scoreIncreased = false;
        ballColorChanged = false;
    }

    function gameOver() {
        window.location.href = 'end.html?score=' + score;
    }

    document.addEventListener('click', function () {
        startGame();
        changeRectangleColor();
    });

    function changeRectangleColor() {
        const rectangleColors = ['#e74c3c', '#f1c40f', '#70e000']; 
        rectangle.style.backgroundColor = rectangleColors[clickCount % rectangleColors.length];

        clickCount++;
    }

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }
});

var storedActualName = localStorage.getItem("actname");
var actualNameElement = document.querySelector(".actualname");
actualNameElement.textContent = actualName;



