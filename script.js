document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");

  let score = 0;
  let snakeX = 1;
  let snakeY = 20;
  let foodX = 10;
  let foodY = 10;
  let direction = "right";
  let intervalId;

  function renderSnake() {
    const snakePixel = document.createElement("div");
    snakePixel.className = "snakeBodyPixel";
    snakePixel.style.left = `${snakeX * 40}px`;
    snakePixel.style.top = `${snakeY * 40}px`;
    gameContainer.appendChild(snakePixel);
  }

  function renderFood() {
    const foodPixel = document.createElement("div");
    foodPixel.className = "food";
    foodPixel.style.left = `${foodX * 40}px`;
    foodPixel.style.top = `${foodY * 40}px`;
    gameContainer.appendChild(foodPixel);
  }

  function removeSnake() {
    const snakePixels = document.querySelectorAll(".snakeBodyPixel");
    snakePixels.forEach((pixel) => pixel.remove());
  }

  function removeFood() {
    const foodPixel = document.querySelector(".food");
    foodPixel.remove();
  }

  function moveSnake() {
    removeSnake();
    switch (direction) {
      case "right":
        snakeX++;
        break;
      case "left":
        snakeX--;
        break;
      case "up":
        snakeY--;
        break;
      case "down":
        snakeY++;
        break;
    }
    checkCollision();
    renderSnake();
  }

  function checkCollision() {
    if (snakeX === foodX && snakeY === foodY) {
      score++;
      scoreElement.textContent = score;
      removeFood();
      spawnFood();
    }
  }

  function spawnFood() {
    foodX = Math.floor(Math.random() * 10);
    foodY = Math.floor(Math.random() * 10);
    renderFood();
  }

  function startGame() {
    spawnFood();
    renderSnake();
    intervalId = setInterval(moveSnake, 100);
  }

  startGame();
});
