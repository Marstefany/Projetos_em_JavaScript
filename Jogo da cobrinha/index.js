const playBoard = document.querySelector(".play-board"); // Seleciona a área de jogo
const scoreElement = document.querySelector(".score"); // Seleciona o elemento de pontuação
const highScoreElement = document.querySelector(".high-score"); // Seleciona o elemento de pontuação mais alta
const controls = document.querySelectorAll(".controls i"); // Seleciona os botões de controle

let gameOver = false; // Variável que indica se o jogo acabou
let foodX, foodY; // Coordenadas da comida
let snakeX = 5, snakeY = 5; // Posição inicial da cobra
let velocityX = 0, velocityY = 0; // Velocidade da cobra
let snakeBody = []; // Array que armazena o corpo da cobra
let setIntervalId; // ID do intervalo para controle do jogo
let score = 0; // Pontuação atual

// Recupera a pontuação mais alta do armazenamento local
let highScore = localStorage.getItem("high-score") || 0; // Define a pontuação mais alta como 0 se não existir
highScoreElement.innerText = `High Score: ${highScore}`; // Atualiza a pontuação mais alta exibida

// Função para atualizar a posição da comida
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1; // Define a posição X da comida aleatoriamente
    foodY = Math.floor(Math.random() * 30) + 1; // Define a posição Y da comida aleatoriamente
}

// Função para tratar o final do jogo
const handleGameOver = () => {
    clearInterval(setIntervalId); // Para o jogo
    alert("Game Over! Pressione OK para jogar novamente..."); // Exibe uma mensagem de final de jogo
    location.reload(); // Recarrega a página
}

// Altera a direção com base na tecla pressionada
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0; // Define a velocidade X como 0
        velocityY = -1; // Move para cima
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0; // Define a velocidade X como 0
        velocityY = 1; // Move para baixo
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1; // Move para a esquerda
        velocityY = 0; // Define a velocidade Y como 0
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1; // Move para a direita
        velocityY = 0; // Define a velocidade Y como 0
    }
}

// Altera a direção ao clicar em cada botão
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if (gameOver) return handleGameOver(); // Verifica se o jogo acabou e trata o final do jogo
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // Adiciona a comida à grade

    // Quando a cobra come a comida
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition(); // Atualiza a posição da comida
        snakeBody.push([foodY, foodX]); // Adiciona a comida ao corpo da cobra
        score++; // Aumenta a pontuação
        highScore = score >= highScore ? score : highScore; // Atualiza a pontuação mais alta se necessário

        localStorage.setItem("high-score", highScore); // Armazena a nova pontuação mais alta
        scoreElement.innerText = `Score: ${score}`; // Atualiza a pontuação exibida
        highScoreElement.innerText = `High Score: ${highScore}`; // Atualiza a pontuação mais alta exibida
    }

    // Atualiza a cabeça da cobra
    snakeX += velocityX; // Atualiza a posição X da cobra
    snakeY += velocityY; // Atualiza a posição Y da cobra

    // Move o corpo da cobra para frente
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]; // Copia a posição anterior do corpo
    }

    snakeBody[0] = [snakeX, snakeY]; // Atualiza a posição da cabeça da cobra

    // Verifica se a cobra saiu da parede
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true; // Marca o jogo como terminado se a cobra sair da parede
    }

    // Adiciona um div para cada parte do corpo da cobra
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; // Adiciona cada parte do corpo
        // Verifica se a cabeça da cobra colidiu com o corpo
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true; // Marca o jogo como terminado se houver colisão
        }
    }
    playBoard.innerHTML = html; // Atualiza a área de jogo com o HTML gerado
}

updateFoodPosition(); // Atualiza a posição inicial da comida
setIntervalId = setInterval(initGame, 100); // Inicia o jogo a cada 100ms
document.addEventListener("keyup", changeDirection); // Adiciona um listener para teclas pressionadas
