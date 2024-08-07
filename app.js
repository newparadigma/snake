const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const scale = 10
const rows = canvas.height / scale
const cols = canvas.width / scale

let snake = [{
    x: 0,
    y: 0
}]

let direction = "Right"
let newDirection = "Right"

let apple = {}

function setAppleLocation() {
  let cossilion = true
  while (cossilion) {
    apple = {
        x: Math.floor(Math.random() * cols) * scale,
        y: Math.floor(Math.random() * rows) * scale
    }
    cossilion = false

    snake.forEach(function(item) {
      if (item.x == apple.x, item.y == apple.y) {
        cossilion = true
      }
    })
  }
}

function drawApple() {
    ctx.fillStyle = "red"
    ctx.fillRect(apple.x, apple.y, scale, scale)
}

function drawSnake() {
    snake.forEach(function(item, index) {
        ctx.fillStyle = index === 0? "green":"lightgreen"
        ctx.fillRect(item.x, item.y, scale, scale)
    })
}

function moveSnake() {
    const newHeadLocation = getNewSnakeHeadLocation()

    if (checkCollisionWithApple(newHeadLocation.x, newHeadLocation.y)) {
        setAppleLocation()
    } else {
        snake.pop()
    }

    checkCollisionWithWalls(newHeadLocation.x, newHeadLocation.y)
    checkCollisionWithTail(newHeadLocation.x, newHeadLocation.y)

    snake.unshift(newHeadLocation)
}

function getNewSnakeHeadLocation() {
    const object = {
        'Up': {
            x: 0, y: -1
        },
        'Down': {
            x: 0, y: 1
        },
        'Left': {
            x: -1, y: 0
        },
        'Right': {
            x: 1, y: 0
        }
    }

    return {
        x: snake[0].x + object[direction].x * scale,
        y: snake[0].y + object[direction].y * scale,
    }
}

function checkCollisionWithApple(x, y) {
    if (x === apple.x && y === apple.y) {
        return true
    }
    return false
}

(function setup() {
    setAppleLocation()

    myInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        changeDirection()
        drawApple()
        drawSnake()
        moveSnake()
    }, 200)
}())

function checkCollisionWithTail(x, y) {
    snake.forEach(function(item) {
        if (item.x === x && item.y == y) {
            gameOver()
        }
    })
}

function checkCollisionWithWalls(x, y) {
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
        gameOver()
    }
}

function gameOver() {
    clearInterval(myInterval)
}

document.addEventListener('keydown', logKey)

function logKey(event) {
    if (event.code.search("Arrow") === 0) {
        newDirection = event.code.replace('Arrow', '')
    }
}

function changeDirection() {
    const object = {
        'Up': 'Down',
        'Down': 'Up',
        'Left': 'Right',
        'Right': 'Left',
    }

    if (object[direction] !== newDirection) {
        direction = newDirection
    }
}
