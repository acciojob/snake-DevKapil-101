document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");

  let score = 0;
  let snake = [{ x: 1, y: 20 }];
  let food = { x: 10, y: 10 };
  let direction = "right";
  let intervalId;

  function renderGame() {
    gameContainer.innerHTML = "";
    snake.forEach((segment) => {
      const snakePixel = document.createElement("div");
      snakePixel.className = "snakeBodyPixel";
      snakePixel.id = `pixel${segment.y * 20 + segment.x}`;
      gameContainer.appendChild(snakePixel);
    });

    const foodPixel = document.createElement("div");
    foodPixel.className = "food";
    foodPixel.id = `pixel${food.y * 20 + food.x}`;
    gameContainer.appendChild(foodPixel);
  }

  function moveSnake() {
    const head = snake[0];
    let newHead;
    switch (direction) {
      case "right":
        newHead = { x: head.x + 1, y: head.y };
        break;
      case "left":
        newHead = { x: head.x - 1, y: head.y };
        break;
      case "up":
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case "down":
        newHead = { x: head.x, y: head.y + 1 };
        break;
    }

    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
      score++;
      scoreElement.textContent = score;
      spawnFood();
    } else {
      snake.pop();
    }

    checkCollision();
    renderGame();
  }

  function checkCollision() {
    const head = snake[0];
    // Check collision with the walls
    if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
      gameOver();
    }
    // Check collision with the snake body
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        gameOver();
      }
    }
  }

  function spawnFood() {
    food.x = Math.floor(Math.random() * 20) + 1;
    food.y = Math.floor(Math.random() * 20) + 1;
  }

  function startGame() {
    spawnFood();
    intervalId = setInterval(moveSnake, 100);
  }

  function gameOver() {
    clearInterval(intervalId);
    alert("Game Over! Your score: " + score);
    resetGame();
  }

  function resetGame() {
    score = 0;
    snake = [{ x: 1, y: 20 }];
    direction = "right";
    startGame();
  }

  startGame();
});
