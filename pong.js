// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Paddle properties
const paddleHeight = 100;
const paddleWidth = 10;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // Draw the player paddle
    ctx.fillRect(10, playerY, paddleWidth, paddleHeight);

    // Draw the AI paddle
    ctx.fillRect(canvas.width - paddleWidth - 10, aiY, paddleWidth, paddleHeight);

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Handle ball collision with walls
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Handle ball collision with paddles
    if (ballX - ballRadius < paddleWidth + 10) {
        // Player paddle collision
        if (ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            // Player loses
            alert('You lose!');
            resetGame();
        }
    } else if (ballX + ballRadius > canvas.width - paddleWidth - 10) {
        // AI paddle collision
        if (ballY > aiY && ballY < aiY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            // AI loses
            alert('You win!');
            resetGame();
        }
    }

    // Move the AI paddle
    aiY = ballY - paddleHeight / 2;

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

// Handle player paddle movement
document.addEventListener('mousemove', (event) => {
    playerY = event.clientY - paddleHeight / 2;
    playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));
});

// Reset the game
function resetGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    playerY = (canvas.height - paddleHeight) / 2;
    aiY = (canvas.height - paddleHeight) / 2;
}

// Start the game loop
gameLoop();