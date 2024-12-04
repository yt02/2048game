let gridSize = 4;
let board = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
let gameOver = false;
let score = 0; // Current score
let bestScore = 0; // Best score
let username = "Guest"; // Default username (Guest)

// Fetch the username from the server at the start
function fetchUsername() {
    return fetch('get_username.php')
        .then(response => response.json())
        .then(data => {
            username = data.username;
            console.log(`Username: ${username}`);
        })
        .catch(error => {
            console.error('Error fetching username:', error);
        });
}

// Fetch leaderboard data and display it
function fetchLeaderboard() {
    fetch('leaderboard.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const leaderboard = document.getElementById('leaderboard');
            leaderboard.innerHTML = data.data.map((entry, index) => 
                `<li>${index + 1}. ${entry.username}: ${entry.score}</li>`).join('');
        } else {
            console.error('Error fetching leaderboard:', data.message);
        }
    })
    .catch(error => console.error('Network error:', error));
}

function fetchBestScore() {
    return fetch('get_best_score.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' && typeof data.best_score === 'number') {
                bestScore = data.best_score; // Update the best score variable
                document.getElementById('best-score').textContent = bestScore; // Display it on the page
                console.log(`Fetched best score: ${bestScore}`);
            } else {
                console.error("Unexpected data format when fetching best score:", data);
            }
        })
        .catch(error => {
            console.error('Error fetching best score:', error);
        });
}

// Initialize the board with two random tiles
function initGame() {
    gameOver = false;
    board = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    score = 0; // Reset score
    fetchBestScore().then(() => {
        addRandomTile();
        addRandomTile();
        updateBoard();
        fetchLeaderboard();
    });
}

// Update the game board and score display
function updateBoard() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    board.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            if (value !== 0) {
                tile.innerText = value;
                tile.setAttribute("data-value", value);
            }
            grid.appendChild(tile);
        });
    });

    // Display the score
    document.getElementById('score').textContent = score;
    document.getElementById('best-score').textContent = bestScore;

    // Check for game over
    if (isGameOver()) {
        document.getElementById("status").innerText = "Game Over!";
        gameOver = true;
        gameOverHandler();  // Call the game over handler to save the score
    } else {
        document.getElementById("status").innerText = " ";
    }
}



// Add a random tile (2 or 4) to an empty spot
function addRandomTile() {
    let emptySpaces = [];
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (board[r][c] === 0) {
                emptySpaces.push({ r, c });
            }
        }
    }
    if (emptySpaces.length > 0) {
        const { r, c } = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Update the score when tiles merge
function updateScore(points) {
    score += points; // Add points to the current score
    if (score > bestScore) {
        bestScore = score; // Update the best score
    }
    document.getElementById('score').textContent = score; // Update the score on the page
    document.getElementById('best-score').textContent = bestScore; // Update the best score on the page
}


// Slide tiles in the specified direction
function slide(direction) {
    if (gameOver) return;

    let moved = false;

    // Implement logic for sliding and combining tiles based on direction
    if (direction === "left") moved = slideLeft();
    if (direction === "right") moved = slideRight();
    if (direction === "up") moved = slideUp();
    if (direction === "down") moved = slideDown();

    if (moved) {
        addRandomTile();
        updateBoard();
    }
}

function slideLeft() {
    let moved = false;
    for (let r = 0; r < gridSize; r++) {
        let row = board[r].filter(v => v); // Get non-zero tiles
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2;
                updateScore(row[i]); // Update the score when tiles merge
                row[i + 1] = 0;
                console.log("Tiles merged, new value: " + row[i]);
            }
            
        }
        row = row.filter(v => v); // Remove zeros after combining
        while (row.length < gridSize) row.push(0);
        if (!arraysEqual(board[r], row)) moved = true;
        board[r] = row;
    }
    return moved;
}

function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

// Similarly define slideRight(), slideUp(), slideDown() here
function slideRight() {
    let moved = false;
    for (let r = 0; r < gridSize; r++) {
        let row = board[r].filter(v => v); // Get non-zero tiles
        for (let i = row.length - 1; i > 0; i--) { // Traverse from right to left
            if (row[i] === row[i - 1]) {
                row[i] *= 2;
                updateScore(row[i]); // Update the score when tiles merge
                row[i - 1] = 0;
            }
        }
        row = row.filter(v => v); // Remove zeros after combining
        while (row.length < gridSize) row.unshift(0); // Fill with zeros at the start
        if (!arraysEqual(board[r], row)) moved = true;
        board[r] = row;
    }
    return moved;
}

function slideUp() {
    let moved = false;
    for (let c = 0; c < gridSize; c++) {
        let column = [];
        for (let r = 0; r < gridSize; r++) {
            if (board[r][c] !== 0) column.push(board[r][c]); // Collect non-zero values
        }
        for (let i = 0; i < column.length - 1; i++) { // Combine tiles upwards
            if (column[i] === column[i + 1]) {
                column[i] *= 2;
                updateScore(column[i]); // Update the score when tiles merge
                column[i + 1] = 0;
            }
        }
        column = column.filter(v => v); // Remove zeros after combining
        while (column.length < gridSize) column.push(0); // Fill remaining spaces with zeros

        // Place the new column back in the board
        for (let r = 0; r < gridSize; r++) {
            if (board[r][c] !== column[r]) moved = true;
            board[r][c] = column[r];
        }
    }
    return moved;
}

function slideDown() {
    let moved = false;
    for (let c = 0; c < gridSize; c++) {
        let column = [];
        for (let r = 0; r < gridSize; r++) {
            if (board[r][c] !== 0) column.push(board[r][c]); // Collect non-zero values
        }
        for (let i = column.length - 1; i > 0; i--) { // Traverse from bottom to top
            if (column[i] === column[i - 1]) {
                column[i] *= 2;
                updateScore(column[i]); // Update the score when tiles merge
                column[i - 1] = 0;
            }
        }
        column = column.filter(v => v); // Remove zeros after combining
        while (column.length < gridSize) column.unshift(0); // Fill remaining spaces with zeros at the top

        // Place the new column back in the board
        for (let r = 0; r < gridSize; r++) {
            if (board[r][c] !== column[r]) moved = true;
            board[r][c] = column[r];
        }
    }
    return moved;
}

function isGameOver() {
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (board[r][c] === 0) return false;
            if (c < gridSize - 1 && board[r][c] === board[r][c + 1]) return false;
            if (r < gridSize - 1 && board[r][c] === board[r + 1][c]) return false;
        }
    }
    showGameOverModal();
    return true;
    
}

function showGameOverModal() {
    // Update scores in the modal
    document.getElementById('current-score').textContent = score;
    document.getElementById('modal-best-score').textContent = bestScore;

    // Display the modal
    const modal = document.getElementById('game-over-modal');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('game-over-modal');
    modal.style.display = 'none';
}

function goToMenu() {
    window.location.href = "menu.php"; // Redirect to the menu page
}



// Listen for arrow keys to control the game
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft": slide("left"); break;
        case "ArrowRight": slide("right"); break;
        case "ArrowUp": slide("up"); break;
        case "ArrowDown": slide("down"); break;
    }
});

// Confirmation for going to the menu
function confirmGoToMenu() {
    const score = parseInt(document.getElementById("score").textContent, 10);
    if (score > 0) {
        if (confirm("Are you sure you want to go to the menu? The current score will not be saved.")) {
            window.location.href = "menu.html";
        }
    } else {
        window.location.href = "index.html";
    }
}

// Confirmation for restarting the game
function confirmRestart() {
    const score = parseInt(document.getElementById("score").textContent, 10);
    if (score > 0 && gameOver==false) {
        if (confirm("Are you sure you want to restart? Your current progress will be lost.")) {
            restartGame();
        }
    } else {
        restartGame();
    }
}

// Restart Game
function restartGame() {
    // Implement your game restart logic here
    closeModal(); // Hide the modal
    console.log("Game restarted");
    initGame();
}

// Call this function when the game is over
function gameOverHandler() {
    if (username === "Guest") {
        alert("Please log in to save your score.");
    } else {
        // Save the score and update the leaderboard
        saveScore(score);
    }
    console.log('Game over, saving score:', score);

}


// Save score to the database and refresh leaderboard
function saveScore(score) {
    // Make sure the fetch request sends score correctly
    fetch('save_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'  // Make sure content type is set correctly
        },
        body: `score=${encodeURIComponent(score)}&username=${encodeURIComponent(username)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Score saved successfully');
        } else {
            console.error('Error saving score:', data.message);
        }
    })
    .catch(error => {
        console.error('Error with fetch request:', error);
    });

}

// Start the game after fetching user data
fetchUsername().then(() => {
    initGame();
});

// Start the game initially
initGame();
