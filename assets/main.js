const playerA = { symbol: "X" }
const playerB = { symbol: "O" }

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
    const player = game.turn;
    const cell = game.tabuleiro[linha][coluna];
    
    if (!cell) {
        game.tabuleiro[linha][coluna] = player.symbol;
        game.turn = player.next;
    
        renderizarTabuleiro();   
        atualizarPlayer(player.next); 
    }

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
    const element = document.getElementById(`turn`);
    element.innerHTML = player.symbol;
}

function restart() {
    game.turn = playerA;
    game.tabuleiro = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    renderizarTabuleiro();
    atualizarPlayer(game.turn);
}

start();