const board = document.getElementById("board")
const statusText = document.getElementById("status")
const restartBtn = document.getElementById("restart")

let cells = []
let currentPlayer = "X"
let gameActive = true

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

// Créer la grille
function createBoard() {
  board.innerHTML = ""
  cells = []

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cell.dataset.index = i

    cell.addEventListener("click", handleClick)

    board.appendChild(cell)
    cells.push(cell)
  }

  statusText.textContent = `Player ${currentPlayer}'s turn`
}

// Gestion du clic
function handleClick(e) {
  const cell = e.target
  const index = cell.dataset.index

  if (!gameActive || cell.textContent !== "") return

  cell.textContent = currentPlayer

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`
    gameActive = false
    return
  }

  if (isDraw()) {
    statusText.textContent = "Draw!"
    gameActive = false
    return
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X"
  statusText.textContent = `Player ${currentPlayer}'s turn`
}

// Vérifier victoire
function checkWin() {
  return winPatterns.some(pattern => {
    return pattern.every(i => {
      return cells[i].textContent === currentPlayer
    })
  })
}

// Vérifier match nul
function isDraw() {
  return cells.every(cell => cell.textContent !== "")
}

// Reset
restartBtn.addEventListener("click", () => {
  currentPlayer = "X"
  gameActive = true
  createBoard()
})

// Initialisation
createBoard()

