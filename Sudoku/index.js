document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9; // Tamanho da grade do Sudoku
    const solveButton = document.getElementById("solve-btn"); // Botão para resolver o Sudoku
    solveButton.addEventListener('click', solveSudoku); // Adiciona evento de clique ao botão

    const sudokuGrid = document.getElementById("sudoku-grid"); // Obtém o elemento da grade do Sudoku
    // Cria a grade do Sudoku e células de entrada
    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr"); // Cria uma nova linha
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td"); // Cria uma nova célula
            const input = document.createElement("input"); // Cria um campo de entrada
            input.type = "number"; // Define o tipo de entrada como número
            input.className = "cell"; // Classe da célula
            input.id = `cell-${row}-${col}`; // ID da célula
            cell.appendChild(input); // Adiciona o input à célula
            newRow.appendChild(cell); // Adiciona a célula à linha
        }
        sudokuGrid.appendChild(newRow); // Adiciona a linha à grade
    }
});

async function solveSudoku() {
    const gridSize = 9; // Tamanho da grade
    const sudokuArray = []; // Array para armazenar os valores do Sudoku

    // Preenche o sudokuArray com os valores de entrada da grade
    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = []; // Inicializa a linha do array
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`; // ID da célula
            const cellValue = document.getElementById(cellId).value; // Obtém o valor da célula
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0; // Armazena o valor ou 0 se vazio
        }
    }

    // Identifica células de entrada do usuário e marca
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`; // ID da célula
            const cell = document.getElementById(cellId); // Obtém a célula

            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input"); // Adiciona classe para indicar entrada do usuário
            }
        }
    }

    // Resolve o Sudoku e exibe a solução
    if (solveSudokuHelper(sudokuArray)) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cellId = `cell-${row}-${col}`; // ID da célula
                const cell = document.getElementById(cellId); // Obtém a célula

                // Preenche os valores resolvidos e aplica animação
                if (!cell.classList.contains("user-input")) {
                    cell.value = sudokuArray[row][col]; // Preenche a célula com o valor resolvido
                    cell.classList.add("solved"); // Adiciona classe para indicar que a célula foi resolvida
                    await sleep(20); // Adiciona um atraso para visualização
                }
            }
        }
    } else {
        alert("Não existe solução para o quebra-cabeça de Sudoku dado."); // Alerta se não houver solução
    }
}

function solveSudokuHelper(board) {
    const gridSize = 9; // Tamanho da grade

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) { // Verifica células vazias
                for (let num = 1; num <= 9; num++) { // Tenta números de 1 a 9
                    if (isValidMove(board, row, col, num)) { // Verifica se o movimento é válido
                        board[row][col] = num; // Coloca o número na célula

                        // Tenta resolver o Sudoku recursivamente
                        if (solveSudokuHelper(board)) {
                            return true; // Puzzle resolvido
                        }

                        board[row][col] = 0; // Retrocede
                    }
                }
                return false; // Nenhum número válido encontrado
            }
        }
    }

    return true; // Todas as células preenchidas
}

function isValidMove(board, row, col, num) {
    const gridSize = 9; // Tamanho da grade

    // Verifica conflitos na linha e na coluna
    for (let i = 0; i < gridSize; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false; // Conflito encontrado
        }
    }

    // Verifica o subgrid 3x3 para conflitos
    const startRow = Math.floor(row / 3) * 3; // Início da linha do subgrid
    const startCol = Math.floor(col / 3) * 3; // Início da coluna do subgrid

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false; // Conflito encontrado
            }
        }
    }

    return true; // Nenhum conflito encontrado
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // Função para criar atraso
}
