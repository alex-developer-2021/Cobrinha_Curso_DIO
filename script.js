let canvas = document.getElementById("snake")
let context = canvas.getContext("2d") // Contexto renderizao espaço do canvas
let box = 32
let snake = []  // Declarando um Array com nome SNAKE
snake[0] = {  // Dando o tamanho para ele
    x: 8 * box,
    y: 8 * box
}
let direction = "right" // Criando a variável de movimentação da cobra
let food = { // Criando um elemento diferente para a comida
    x: Math.floor(Math.random() * 15 + 1) * box, // Gera o posicionamento aleatório da comida, sem permitir sair do box
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criaBG() {
    context.fillStyle = "lightgreen"
    context.fillRect(0,0,16 * box, 16 * box) // Desenha o BOX do jogo. Tem 4 parâmetros. Posição: X, Y, Altura e Largura
}

function criarCobrinha() { // O FOR vai percorrer todo o tamanho do Array e incrementar
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)

    }
}

function drawFood() { // Criando a função que criará a comida da cobrinha
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update) // O EVENTLISTENER recebe KEYDOWN (função de CLICK) e chama a função UPDATE (criada)

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left" // O código 37 é a seta da DIREITA e vejo se a direção não faz a cabeça voltar para a trás e bater no corpo
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "up") direction = "down"
}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0 // Verifico se está no limite da direita e volto para a posição 0(zero) da esquerda
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box

    for(i = 1;i < snake.length; i++) { // Verificando se a cabeça bate no corpo (i = 0 é a cabeça e i = 1 é o corpo. Comparo i com o tamanho do meu array que é a cobra)
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) { // Se a cabeça [0] bater no corpo [i] eu encerro o jogo
            clearInterval(jogo) // Eu paro o jogo
            alert('Fim do Jogo  :(')
        }
    }

    criaBG()
    criarCobrinha()
    drawFood()

    let snakeX = snake[0].x // Definindo a posição X e Y inicial da Cobrinha
    let snakeY = snake[0].y

    // Ajustando o posicionamento da cobra conforme a direção e o plano cartesiano
    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY -= box
    if(direction == "down") snakeY += box

    if(snakeX != food.x || snakeY != food.y) { // Verifico se a posição da cobra é diferente da comida e se for eu movo ela
        snake.pop() // Remove o último lugar da Array
    }
    else { // Se a posição for igual a comida some, a cobra aumenta e a comida troca de lugar
        food.x = Math.floor(Math.random() * 15 + 1) * box // Novo lugar aleatório da comida
        food.y = Math.floor(Math.random() * 15 + 1) * box // Novo lugar aleatório da comida

    }

    let newHead = { // Criando a nova cabeça da cobra ou extensão caso coma a comida
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead) // Adiciona um novo elemento no início do Array, que gera o movimento

}

let jogo = setInterval(iniciarJogo, 100) // Definindo 100 milisegundo para renovar o jogo
