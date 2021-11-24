//------------------BLACKJACK BRAINIAC---------------//
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
const orderedDeck = buildOrderedDeck();

/*----- app's state (variables) -----*/
let dealerHand, playerHand, readyDeck, shuffledDeckArr

/*----- cached element references -----*/
const dealerCards = document.getElementById('dealerSpot');
const playerCards = document.getElementById('playerSpot');

/*----- event listeners -----*/
document.getElementById('deal').addEventListener('click', () => {
    console.log(readyDeck[0], readyDeck[1])
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
    readyDeck = getShuffledDeck();
    console.log(readyDeck);
    render();
}

function buildOrderedDeck() {
    const builtDeck = [];
    suits.forEach(function (suit) {
        values.forEach(function (value) {
            builtDeck.push({
                face: `${suit}${value}`,
                numberedValue: Number(value) || (value === 'A' ? 11 : 10)
            })
        })
    })
    return builtDeck;
}

function getShuffledDeck() {
    copiedDeck = [...orderedDeck]
    shuffledDeckArr = [];
    while (copiedDeck.length) {
        const grabCard = Math.floor(Math.random() * copiedDeck.length);
        shuffledDeckArr.push(copiedDeck.splice(grabCard, 1)[0]);
    }
    return shuffledDeckArr;
}

function render() {

}

init();