const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const playAgainButton = document.getElementById('playAgain');
const pauseMenu = document.getElementById('pauseMenu');
const resumeGameButton = document.getElementById('resumeGame');
const newGameButton = document.getElementById('newGame');

const jumpSound = new Audio('sounds/mario-pulando.mp3');
const collisionSound = new Audio('sounds/mario-colidindo.mp3');
const gameOverSound = new Audio('sounds/mario-gameover.mp3');

let score = 0;
let isGameOver = false;
let isPaused = false;
let loop;

const updateScore = () => {
    score += 10;
    scoreElement.innerText = `Score: ${score}`;
}

const showGameOver = () => {
    finalScoreElement.innerText = `Score Final: ${score}`;
    gameOverElement.style.display = 'flex';
    gameOverSound.play();
}

const jump = () => {
    if (isGameOver || isPaused) return; 

    mario.classList.add('jump');
    jumpSound.play();

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const gameLoop = () => {
    if (isPaused || isGameOver) return; 

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '60px';
        mario.classList.add('collision');

        collisionSound.play();
        showGameOver();

        isGameOver = true;
        clearInterval(loop);
    } else if (pipePosition < 120 && pipePosition > 100) {
        updateScore();
    }
}

const startGameLoop = () => {
    loop = setInterval(gameLoop, 10);
}

const pauseGame = () => {
    isPaused = true;
    clearInterval(loop);
    pauseMenu.style.display = 'flex';
}

const resumeGame = () => {
    isPaused = false;
    pauseMenu.style.display = 'none';
    startGameLoop();
}

const restartGame = () => {
    location.reload(); 
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (!isPaused) {
            pauseGame();
        } else {
            resumeGame();
        }
    } else if (event.key === ' ' || event.key === 'ArrowUp') { 
        jump();
    }
});

playAgainButton.addEventListener('click', restartGame);
resumeGameButton.addEventListener('click', resumeGame);
newGameButton.addEventListener('click', restartGame);

startGameLoop();
