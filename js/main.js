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
let dealerHand, playerHand, readyDeck, shuffledDeckArr, dealtCards

/*----- cached element references -----*/
const dealerCards = document.getElementById('dealerSpot');
const playerCards = document.getElementById('playerSpot');

/*----- event listeners -----*/
const deal = document.getElementById('deal').addEventListener('click', () => {
    dealtCards = [];
    dealtCards.push(readyDeck.splice(0, 4));
    let card1 = dealtCards[0][0].face;
    let card2 = dealtCards[0][1].face;
    let card3 = dealtCards[0][2].face;
    let card4 = dealtCards[0][3].face;
    let firstCard = document.getElementById('playerCard1');
    let secondCard = document.getElementById('dealerCard1');
    let thirdCard = document.getElementById('playerCard2');
    let fourthCard = document.getElementById('dealerCard2');
    firstCard.classList.add("card", card1);
    secondCard.classList.add("card", "back");
    thirdCard.classList.add("card", card3);
    fourthCard.classList.add("card", card4);

});

document.getElementById('hit').addEventListener('click', () => {
    // let card5 = dealtCards[0][5].face;
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