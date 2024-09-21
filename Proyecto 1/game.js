const canvas= document.querySelector('canvas')
const ctx = canvas.getContext('2d') // Renderizado 2D
const $sprite = document.querySelector('#sprite')
const $bricks = document.querySelector('#bricks')

canvas.width = 448
canvas.height = 400

/** Variables del juego*/
let counter = 0

/** Variabels dela pelota*/

const ballRadius = 3;

//posicion de la pelota

let x = canvas.width / 2
let y = canvas.height - 30

//velocidad de la pelota

let dx= 3
let dy= -3

/* Variables de la paleta de colores */

const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = canvas.height - paddleHeight - 10

let rightPressed = false
let leftPressed = false

/* Variables de los ladrillos */

const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 30;
const brickHeight = 14;
const brickPadding = 2;
const brickOffSetTop = 80;
const brickOffsetLeft = 16;
const bricks = [];

const BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0
}

for  (let c = 0; c < brickColumnCount; c++){
    bricks[c] = [] //iniciamos con un array vacio
    for (let r = 0; r < brickRowCount; r++){
        
        //calculo de la posicion del ladrillo en la pantalla
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        const brickY = r * (brickHeight + brickPadding) + brickOffSetTop

        //Asignar un color aleatorio a cada ladrillo
        const random = Math.floor(Math.random() * 4)
        //Esta funcion da un numero aleatorio menor por 1 a la unidad que colocamos
        //guardamos la informacion de cada ladrillo
        bricks[c][r] = {
            x: brickX,
            y: brickY, 
            status: BRICK_STATUS.ACTIVE, 
            color: random
        }
    }
}

const PADDLE_SENSITIVITY = 8

//Elementos
function  drawBall(){
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){

    ctx.drawImage(
        $sprite,
        29, //Recorte en X
        174, // Recorte en Y
        paddleWidth, // tamaño recorte
        paddleHeight, // Ancho recorte
        paddleX, // posicion x del dibujo
        paddleY, // posicion y del dibujo
        paddleWidth, // ancho del dibujo
        paddleHeight // alto del dibujo
    )
}

function drawBricks(){
    const brickSourceWidth = 16;  // Ancho del ladrillo en la imagen
    const brickSourceHeight = 8; // Alto del ladrillo en la imagen

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r];
            if (currentBrick.status === BRICK_STATUS.DESTROYED)
                continue;

            // Dibujar el rectángulo de fondo para el ladrillo
            ctx.beginPath();
            ctx.fillStyle = 'yellow';
            ctx.rect(
                currentBrick.x,
                currentBrick.y,
                brickWidth,
                brickHeight
            );
            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            // Definir la coordenada X en la imagen para recortar el ladrillo correspondiente
            const clipX = currentBrick.color * brickSourceWidth;  // Cambiar currentBrick.color según la lógica de tus colores
            const clipY = 0;  // Suponiendo que los ladrillos están en la parte superior de la imagen

            // Dibujar la imagen del ladrillo
            ctx.drawImage(
                $bricks,             // Imagen cargada de ladrillos
                clipX,               // Coordenada X en la imagen para recortar
                clipY,               // Coordenada Y en la imagen para recortar
                brickSourceWidth,    // Ancho del recorte
                brickSourceHeight,   // Alto del recorte
                currentBrick.x,      // Coordenada X en el canvas
                currentBrick.y,      // Coordenada Y en el canvas
                brickWidth,          // Ancho del ladrillo a dibujar en el canvas
                brickHeight          // Alto del ladrillo a dibujar en el canvas
            );
        }
    }
}



function collisionDetection(){
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const currentBrick = bricks[c][r]
            if(currentBrick.status === BRICK_STATUS.DESTROYED) continue;
            
                const isBallSameXAsBrick = x > currentBrick.x && x < currentBrick.x + brickWidth
                const isBallSameYAsBrick = y > currentBrick.y && y < currentBrick.y + brickHeight

            if(isBallSameXAsBrick && isBallSameYAsBrick){
                dy = -dy
                currentBrick.status = BRICK_STATUS.DESTROYED
            }
        }
    }

}
function ballMovement(){
    //rebotar bola en los laterales
    if ( x + dx > canvas.width ||  x + dx < ballRadius) 
    {
        dx = -dx
    }

    // la pelota rebota arriba
    if (y + dy < ballRadius) 
    {
        dy = -dy
    }

    //La pelota toca la paleta
const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth
const isBallTouchingPaddle = y + dy > paddleY 
    if(isBallSameXAsPaddle && isBallTouchingPaddle) {
       dy = -dy 
    }

    //la pelota toca el suelo
    else if ( y + dy > canvas.height - ballRadius){
        console.log('Game Over')
        document.location.reload()
    }

    //mover la pelota
    x += dx
    y += dy
}

function paddleMovement(){
    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += PADDLE_SENSITIVITY
    } else if (leftPressed && paddleX > 0) {
        paddleX -= PADDLE_SENSITIVITY
    }
}

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function initEvents(){
    document.addEventListener('keydown', KeyDownHandler)
    document.addEventListener('keyup', KeyUpHandler)
    
    function KeyDownHandler (event) {
        const { key } = event
        if (key === 'ArrowRight' || key === 'd' || key === 'D') {
            rightPressed = true
        } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
            leftPressed = true
        }
    }

    function KeyUpHandler (event) {
        const { key } = event
        if (key === 'ArrowRight' || key === 'd' || key === 'D') {
            rightPressed = false
        } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
            leftPressed = false
        }
    }
}

//El juego se ejecuta en la funcion Draw
function draw(){
    console.log({rightPressed, leftPressed})
    cleanCanvas()

    //dibujado de funciones
    drawBall()
    drawPaddle()
    drawBricks()

    //Colisiones y movimientos
    collisionDetection()
    ballMovement()
    paddleMovement()


    // aqui ocurre el diseño de dibujos y colisiones
    window.requestAnimationFrame(draw)
}

draw()
initEvents()
