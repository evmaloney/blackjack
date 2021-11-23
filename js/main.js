/*----- constants -----*/
// const players = {
//     dealer:
//         player
// }

// if (hand > 21) {
//     bust
// }

const suits = ['h', 'd', 's', 'c']
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']

/*----- app's state (variables) -----*/
let dealerHand, playerHand

/*----- cached element references -----*/
const dealerCards = document.getElementById('dealerSpot');
const playerCards = document.getElementById('playerSpot');

/*----- event listeners -----*/
document.getElementById('deal').addEventListener('click', () => {
    shuffleDeck();
});

document.getElementById('hit').addEventListener('click', () => {

});

document.getElementById('stand').addEventListener('click', () => {

});

document.getElementById('restart').addEventListener('click', () => {
    init();
});

/*----- functions -----*/
function init() {
    document.getElementById('messageBox').remove();
    render();
}

function shuffleDeck() {

}

function render() {

}

init();