let gridSize = 4;
let board = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
let gameOver = false;
let score = 0; // Current score
let bestScore = 0; // Best score
let username = "Guest"; // Default username (Guest)
let timerExpired = false;
let highestValueReached =2;//initialize the highest value as 
let timerInterval;


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
// Fetch and display leaderboard based on the mode
function fetchLeaderboard() {
    const mode =getGameMode();
    fetch(`get_leaderboard.php?mode=${mode}`)
        .then(response => response.json())
        .then(data => {
            const leaderboardElement = document.getElementById("leaderboard");
            leaderboardElement.innerHTML = ""; // Clear the leaderboard

            data.forEach((entry, index) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${index + 1}. ${entry.username}: ${entry.score}`;
                leaderboardElement.appendChild(listItem);
            });

            // Update leaderboard title
            document.getElementById("leaderboard-title").textContent = `${capitalize(mode)} Mode Leaderboard`;
        })
        .catch(err => console.error("Error fetching leaderboard:", err));
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function fetchBestScore() {
    const mode = getGameMode();
    return fetch(`get_best_score.php?mode=${mode}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' && typeof data.best_score === 'number') {
                bestScore = data.best_score; // Update the best score variable
                document.getElementById('best-score').textContent = bestScore; // Display it on the page
                console.log(`Fetched best score for ${mode} mode: ${bestScore}`);
            } else if (data.status === 'guest') {
                // For guest users, set the best score to 0
                document.getElementById('best-score').textContent = 0; 
                console.log("Guest user, best score set to 0.");
            } else {
                console.error("Unexpected data format when fetching best score:", data);
            }
        })
        .catch(error => {
            console.error('Error fetching best score:', error);
        });
}

function getGameMode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('mode') || 'normal'; // Default to 'normal' mode
}


// Initialize the board with two random tiles
function initGame() {
    const mode = getGameMode();
    gameOver = false;
    board = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    score = 0; // Reset score
    highestValueReached = 2;

    stopTimer(); // Ensure any running timer is cleared

    if (mode === 'challenge') {
        startChallengeMode();
        document.getElementById('status').innerText = 'Time Left: 60s';
    } else if (mode === 'cartoon') {
        startCartoonMode();
    } else {
        startNormalMode();
        document.getElementById('status').innerText = '';
    }

    fetchBestScore().then(() => {
        addRandomTile();
        addRandomTile();
        if (mode === 'cartoon') {
            updateCartoonAgenda();
        }
        updateBoard();
        fetchLeaderboard();
    });
}


function startNormalMode(){
    console.log("Starting Normal Mode...");
}


// Start Challenge Mode with Timer
function startChallengeMode() {
    console.log("Starting 1-Minute Challenge Mode...");
    let timer = 60; // 60 seconds
    timerExpired = false; // Reset timer status

    clearInterval(timerInterval); // Clear any existing timer interval

    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('status').innerText = `Time Left: ${timer}s`;

        if (timer <= 0) {
            console.log("Time is up!");
            timerExpired = true;
            clearInterval(timerInterval);
            handleGameOver(); // Handle game over due to timer
        }
    }, 1000);
}

// Stop and Clear Timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null; // Reset timer reference
        console.log("Timer stopped and cleared.");
    }
}

// Game Over Handler
function handleGameOver() {
    gameOver = true;
    stopTimer(); // Ensure timer is stopped
    document.getElementById("GameStatus").innerText = "Game Over!";
    // Additional game-over logic
    submitScore(score);
    console.log('Game over, saving score:', score);
    showGameOverModal();
    
}


function startCartoonMode() {
    console.log("Starting Cartoon Mode...");
    toggleCartoonAgenda();
    
    // Customize grid and animations for cartoon mode
   //document.getElementById('grid').style.backgroundImage = "url('images/cartoon-background.png')";
}

// Update score submission to include the mode
function submitScore(score) {
    const mode = getGameMode();

    fetch('submit_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mode: mode, score: score })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
           // alert("Score submitted successfully!");
        } else {
            alert("Failed to submit score.");
        }
    })
    .catch(err => console.error("Error submitting score:", err));
}

// Update the game board and score display
function updateBoard() {
    const mode = getGameMode();
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    board.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement("div");
            tile.classList.add("tile");

            if (value !== 0) {
                tile.innerText = value;

                //tile.setAttribute("data-value", value);

                if (mode === 'cartoon') {
                    // Add cartoon mode styling
                    tile.innerText = ""; // Clear text to display an image or emoji
                    tile.style.backgroundImage = `url('${getCartoonImage(value)}')`;
                    tile.style.backgroundSize = "cover";
                    
                } else {
                    // Default mode: use colors
                    tile.style.backgroundColor = getTileColor(value);
                }
            }
            grid.appendChild(tile);
        });
    });

    // Display the score
    document.getElementById('score').textContent = score;
    document.getElementById('best-score').textContent = bestScore;
    // Check for game over
    if (isGameOver()) {
        document.getElementById("GameStatus").innerText = "Game Over!";
        gameOver = true;
        console.log("game is over and the time is over");
        //submitScore(score);
        if(mode === 'challenge'){
            clearInterval(timerInterval);
        }
        gameOverHandler();  // Call the game over handler to save the score
        //timerExpired = false;
    } else {
        document.getElementById("GameStatus").innerText = " ";
    }
}

function getTileColor(value) {
    const colors = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e"
    };
    return colors[value] || "#ccc";
}  

function getCartoonImage(value) {
    const images = {
        2: "images/cartoon_2.png",
        4: "images/cartoon_4.png",
        8: "images/cartoon_8.png",
        16: "images/cartoon_16.png",
        32: "images/cartoon_32.png",
        64: "images/cartoon_64.png",
        128: "images/cartoon_128.png",
        256: "images/cartoon_256.png",
        512: "images/cartoon_512.png",
        1024: "images/cartoon_1024.png",
        2048: "images/cartoon_2048.png"
    };
    return images[value] || "images/default_cartoon.png";
}

function updateCartoonAgenda() {
    const agendaContainer = document.getElementById("agenda-container");
    agendaContainer.innerHTML = ""; // Clear previous content

    const images = {
        2: "images/cartoon_2.png",
        4: "images/cartoon_4.png",
        8: "images/cartoon_8.png",
        16: "images/cartoon_16.png",
        32: "images/cartoon_32.png",
        64: "images/cartoon_64.png",
        128: "images/cartoon_128.png",
        256: "images/cartoon_256.png",
        512: "images/cartoon_512.png",
        1024: "images/cartoon_1024.png",
        2048: "images/cartoon_2048.png"
    };

    for (const [value, imagePath] of Object.entries(images)) {
        const agendaItem = document.createElement("div");
        agendaItem.classList.add("agenda-item");

        const img = document.createElement("img");
        if (parseInt(value) <= highestValueReached) {
            img.src = imagePath; // Show the unlocked image
        } else {
            img.src = "images/question.png"; // Show the locked placeholder
        }
        img.alt = `Tile ${value}`;

        const label = document.createElement("span");
        label.textContent = value;

        agendaItem.appendChild(img);
        agendaItem.appendChild(label);
        agendaContainer.appendChild(agendaItem);
    }
}



function populateCartoonAgenda() {
    const agendaContainer = document.getElementById("agenda-container");
    agendaContainer.innerHTML = ""; // Clear previous content

    const images = {
        2: "images/cartoon_2.png",
        4: "images/cartoon_4.png",
        8: "images/cartoon_8.png",
        16: "images/cartoon_16.png",
        32: "images/cartoon_32.png",
        64: "images/cartoon_64.png",
        128: "images/cartoon_128.png",
        256: "images/cartoon_256.png",
        512: "images/cartoon_512.png",
        1024: "images/cartoon_1024.png",
        2048: "images/cartoon_2048.png"
    };

    for (const [value, imagePath] of Object.entries(images)) {
        const agendaItem = document.createElement("div");
        agendaItem.classList.add("agenda-item");

        const img = document.createElement("img");
        img.src = imagePath;
       
        img.alt = `Tile ${value}`;

        const label = document.createElement("span");
        label.textContent = value;

        agendaItem.appendChild(img);
        agendaItem.appendChild(label);

        agendaContainer.appendChild(agendaItem);
    }
}

function toggleCartoonAgenda() {
    const mode = getGameMode();
    const agenda = document.getElementById("cartoon-agenda");

    if (mode === "cartoon") {
        agenda.style.display = "block"; // Show the agenda for cartoon mode
        populateCartoonAgenda(); // Populate the agenda
    } else {
        agenda.style.display = "none"; // Hide the agenda for other modes
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
        let row = board[r].filter(v => v); // Get non-zero tile


        //Loop through the row to check for merge
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2; //Merge tiles and double the value
                updateScore(row[i]); // Update the score when tiles merge

                if (row[i] > highestValueReached) {
                    highestValueReached = row[i];
                    console.log("New highest value reached: " + highestValueReached);
                }

                row[i + 1] = 0;
                console.log("Tiles merged, new value: " + row[i]);
            }
            
        }
        row = row.filter(v => v); // Remove zeros after combining
        while (row.length < gridSize) row.push(0);//fill the remaining space with zeros

        if (!arraysEqual(board[r], row)) moved = true;
        board[r] = row;
    }
  
   updateCartoonAgenda();

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

                if (row[i] > highestValueReached) {
                    highestValueReached = row[i];
                    console.log("New highest value reached: " + highestValueReached);
                }

                row[i - 1] = 0;
            }
        }
        row = row.filter(v => v); // Remove zeros after combining
        while (row.length < gridSize) row.unshift(0); // Fill with zeros at the start
        if (!arraysEqual(board[r], row)) moved = true;
        board[r] = row;
    }
    updateCartoonAgenda();
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

                if (column[i] > highestValueReached) {
                    highestValueReached = column[i];
                    console.log("New highest value reached: " + highestValueReached);
                }


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
    updateCartoonAgenda();
    
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

                if (column[i] > highestValueReached) {
                    highestValueReached = column[i];
                    console.log("New highest value reached: " + highestValueReached);
                }


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
    //updateCartoonAgenda(currentValues);
    updateCartoonAgenda();
    return moved;
}

function isGameOver() {
    const mode = getGameMode();
    //console.log(timerExpired);

    if(mode === 'challenge' && timerExpired)
    {
        showGameOverModal();
        return true;
    }

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
    timerExpired = false;
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

function confirmGoToMenu() {
    const score = parseInt(document.getElementById("score").textContent, 10);

    // Fetch the username from the server or frontend
    fetch('get_username.php')
        .then(response => response.json())
        .then(data => {
            const username = data.username;

            if (score > 0 && gameOver===false) {
                if (confirm("Are you sure you want to go to the menu? The current score will not be saved.")) {
                    if (username === "Guest") {
                        window.location.href = "index.html";
                    } else {
                        window.location.href = "menu.php";
                    }
                }
            } else {
                if (username === "Guest") {
                    window.location.href = "index.html";
                } else {
                    window.location.href = "menu.php";
                }
            }
        })
        .catch(error => {
            console.error("Error fetching username:", error);
        });
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
        //saveScore(score);
        submitScore(score);
        //timerExpired=false;
    }
    console.log('Game over, saving score:', score);

}

// Start the game after fetching user data
fetchUsername().then(() => {
    initGame();
});

// Start the game initially
initGame();
