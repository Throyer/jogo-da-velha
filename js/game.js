const randon = (min, max) => {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);
    return (Math.floor(Math.random() * (_max - _min + 1)) + _min);
}

const CONDICOES_VITORIA = {
    VITORIA: 1,
    EMPATE: 0,
}

const playerA = { symbol: "X", computer: false, name: "Você" }
const playerB = { symbol: "O", computer: true, name: "O Computador" }

playerA.next = playerB;
playerB.next = playerA;

const game = {
    running: true,
    turn: playerA,
    tabuleiro: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
}

function start() {
    restart();
}

function tacada(linha, coluna) {

    if (game.running) {

        const player = game.turn;
        const cell = game.tabuleiro[linha][coluna];

        if (!cell) {
            game.tabuleiro[linha][coluna] = player.symbol;
            game.turn = player.next;
            renderizarTabuleiro();
            atualizarPlayer(player.next);
            const vitoria = hasVitoria();

            if (vitoria) {
                atualizarVitoria(vitoria);
                document.getElementById("row_turn").style.display = "none";
                game.running = false;
                return;
            }

            if (game.turn.computer) {
                tacadaIA();
            }
        }
    }
}

function tacadaIA() {
    const tabuleiro = game.tabuleiro;
    let tentativa = "tentativa"; 
    let jogada = { row: 0, col: 0 };
    while (tentativa) {
        jogada.row = randon(0,2);
        jogada.col = randon(0,2);
        tentativa = tabuleiro[jogada.row][jogada.col];
    }
    setTimeout(() => tacada(jogada.row,jogada.col), 300);
}

function renderizarTabuleiro() {
    for (let linha = 0; linha < game.tabuleiro.length; linha++) {
        for (let coluna = 0; coluna < game.tabuleiro[linha].length; coluna++) {
            const element = document.getElementById(`${linha}-${coluna}`);
            element.innerHTML = game.tabuleiro[linha][coluna];
        }
    }
}

function atualizarPlayer(player) {
    const element = document.getElementById("turn");
    element.innerHTML = player.symbol;
}

function atualizarVitoria(mensagem) {
    const alert = document.getElementById("alert");
    if (mensagem) {
        alert.style.display = "block";
        const vitoria = document.getElementById("vitoria");
        vitoria.innerHTML = mensagem;
    } else {
        alert.style.display = "none";
    }
}

function restart() {
    game.turn = playerA;
    game.tabuleiro = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    game.running = true;

    renderizarTabuleiro();
    atualizarPlayer(game.turn);
    atualizarVitoria();
    remvoeWins();
    document.getElementById("row_turn").style.display = "block";
}

function hasVitoria() {

    const TABULEIRO = game.tabuleiro

    const VITORIA_X = "XXX";
    const VITORIA_O = "OOO";

    const win = (condition) => {
        if (condition === VITORIA_X) {
            return `${[playerA, playerB].find(p => p.symbol === "X").name} ganhou.`
        }

        if (condition === VITORIA_O) {
            return `${[playerA, playerB].find(p => p.symbol === "O").name} ganhou.`
        }
        return null;
    }

    const LINHA_1 = win(TABULEIRO[0].join(""));
    if (LINHA_1) {
        addWin(0, 0);
        addWin(0, 1);
        addWin(0, 2);
        return LINHA_1;
    }

    const LINHA_2 = win(TABULEIRO[1].join(""));
    if (LINHA_2) {
        addWin(1, 0);
        addWin(1, 1);
        addWin(1, 2);
        return LINHA_2;
    }

    const LINHA_3 = win(TABULEIRO[2].join(""))
    if (LINHA_3) {
        addWin(2, 0);
        addWin(2, 1);
        addWin(2, 2);
        return LINHA_3;
    }

    const COLUNA_1 = win(TABULEIRO.map(row => row[0]).join(""));
    if (COLUNA_1) {
        addWin(0, 0);
        addWin(1, 0);
        addWin(2, 0);
        return COLUNA_1;
    }

    const COLUNA_2 = win(TABULEIRO.map(row => row[1]).join(""));
    if (COLUNA_2) {
        addWin(0, 1);
        addWin(1, 1);
        addWin(2, 1);
        return COLUNA_2;
    }

    const COLUNA_3 = win(TABULEIRO.map(row => row[2]).join(""));
    if (COLUNA_3) {
        addWin(0, 2);
        addWin(1, 2);
        addWin(2, 2);
        return COLUNA_3;
    }

    const DIAGONAL_1 = win([TABULEIRO[0][0], TABULEIRO[1][1], TABULEIRO[2][2]].join(""));
    if (DIAGONAL_1) {
        addWin(0, 0);
        addWin(1, 1);
        addWin(2, 2);
        return DIAGONAL_1;
    }

    const DIAGONAL_2 = win([TABULEIRO[2][0], TABULEIRO[1][1], TABULEIRO[0][2]].join(""));
    if (DIAGONAL_2) {
        addWin(2, 0);
        addWin(1, 1);
        addWin(0, 2);
        return DIAGONAL_2;
    }

    if (TABULEIRO.every(row => row.every(col => !!col))) {
        return "Empate."
    }

    return null;
}

function addWin(linha, coluna) {
    document.querySelector(`[onclick="tacada(${linha}, ${coluna})"]`)
        .classList.toggle("win");
}

function remvoeWins() {
    document.querySelectorAll(".cell")
        .forEach(cell => cell.classList.remove("win"));
}

start();