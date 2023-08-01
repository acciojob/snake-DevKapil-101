//your code here
document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('gameContainer');
  const scoreBoard = document.getElementById('score');
  let snake = [{ row: 20, col: 1 }];
  let direction = 'right';
  let food = { row: 10, col: 10 };
  let score = 0;

  function draw() {
    // Clear the game container
    gameContainer.innerHTML = '';

    // Draw snake body
    snake.forEach(segment => {
      const snakePixel = document.createElement('div');
      snakePixel.className = 'snakeBodyPixel';
      snakePixel.style.gridColumn = segment.col;
      snakePixel.style.gridRow = segment.row;
      gameContainer.appendChild(snakePixel);
    });

    // Draw food
    const foodPixel = document.createElement('div');
    foodPixel.className = 'food';
    foodPixel.style.gridColumn = food.col;
    foodPixel.style.gridRow = food.row;
    gameContainer.appendChild(foodPixel);
  }

  function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
      case 'up':
        head.row--;
        break;
      case 'down':
        head.row++;
        break;
      case 'left':
        head.col--;
        break;
      case 'right':
        head.col++;
        break;
    }

    // Check if the snake eats the food
    if (head.row === food.row && head.col === food.col) {
      score++;
      scoreBoard.textContent = score;
      generateFood();
    } else {
      snake.pop(); // Remove the last segment if not eating food
    }

    snake.unshift(head); // Add new head
    draw();
  }

  function generateFood() {
    food.row = Math.floor(Math.random() * 20) + 1;
    food.col = Math.floor(Math.random() * 20) + 1;
  }

  function handleKeyPress(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
    else if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
    else if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    else if (key === 'ArrowRight' && direction !== 'left') direction = 'right';
  }

  function startGame() {
    setInterval(moveSnake, 100);
  }

  // Event listeners
  document.addEventListener('keydown', handleKeyPress);

  // Start the game
  generateFood();
  startGame();
});
