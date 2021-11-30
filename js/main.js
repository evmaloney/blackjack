//------------------BLACKJACK BRAINIAC---------------//
/*----- constants -----*/
const dealer = {
    hand: []
}
const player = {
    hand: []
}

// if (hand > 21) {
//     bust
// }

const suits = ['h', 'd', 's', 'c']
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const orderedDeck = buildOrderedDeck();

/*----- app's state (variables) -----*/
let readyDeck, shuffledDeckArr, playerScore, dealerScore;
let bust = false
let win = false


/*----- cached element references -----*/
const dealerCards = document.getElementById('dealerSpot');
const playerCards = document.getElementById('playerSpot');
const dealBtn = document.getElementById('deal')
const hitBtn = document.getElementById('hit')
const standBtn = document.getElementById('stand')
const restartBtn = document.getElementById('restart')
const message = document.getElementById('messageBox')

/*----- event listeners -----*/
dealBtn.addEventListener('click', deal)
hitBtn.addEventListener('click', hit)
standBtn.addEventListener('click', stand)
restartBtn.addEventListener('click', init)

/*----- functions -----*/
function init() {
    // message.remove();
    readyDeck = getShuffledDeck();
}

function buildOrderedDeck() {
    const builtDeck = [];
    suits.forEach(function (suit) {
        values.forEach(function (value) {
            builtDeck.push({
                face: `${suit}${value}`,
                numberValue: Number(value) || (value === 'A' ? 11 : 10)
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

function deal() {
    const cardsForPlayer = readyDeck.splice(0, 2)
    const cardsForDealer = readyDeck.splice(0, 2)
    cardsForPlayer.forEach(card => player.hand.push(card))
    cardsForDealer.forEach(card => dealer.hand.push(card))
    getPlayerScore();
    getDealerScore();
    checkBlackjack();
    checkWin();
    render();
}

function hit() {
    // hit func should just add one more card to the players hand
    // in state and then immediately check if the player busted
    // Render function will check the state of the player's hand and
    // update DOM
    player.hand.push(readyDeck.splice(0, 1)[0])
    getPlayerScore()
    checkWin()
    render()
}

function stand() {
    // stand = true
    while (dealerScore < 17) {
        dealer.hand.push(readyDeck.splice(0, 1)[0])
        getDealerScore()
    }
    checkWin()
    render()
}

function getPlayerScore() {
    let score = player.hand.reduce((acc, newCard) => acc + newCard.numberValue, 0)
    playerScore = score;
}

function getDealerScore() {
    let score = dealer.hand.reduce((acc, newCard) => acc + newCard.numberValue, 0)
    dealerScore = score;
}

function render() {
    playerCards.innerHTML = ''
    dealerCards.innerHTML = ''
    // check the dealers hand and players hand and render cards
    // create a div and assign it the attributes relevant to the
    // current card in the iteration
    // check if there's a winner and render appropriate message

    player.hand.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.classList.add('card', card.face);
        playerCards.append(cardEl)
    })

    dealer.hand.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.classList.add('card', card.face);
        dealerCards.append(cardEl)
    })

    if (bust) {
        showBustScreen()
    }

    // if (win) {
    //     showWinScreen()
    // }
}

function checkBlackjack() {
    if (playerScore === 21) {
        showBlackjackScreen();
    }
}

function checkWin() {
    if (checkBust()) {
        bust = true
    }
}

function checkBust() {
    if (playerScore > 21) {
        return true
    } else if (dealerScore > 21) {

    }
}

function showBlackjackScreen() {
    message.innerText = 'Congrats! You hit Blackjack. You win!'
}

function showBustScreen() {
    message.innerText = 'Sorry, you busted!'
}

function showTieScreen() {
    message.innerText = "Ah, well. You tied with the dealer."
}

function showWinScreen() {
    message.innerText = 'Congrats! You win beat the dealer!'
}

function showLoseScreen() {
    message.innerText = 'Sorry, you lose to the dealer.'
}

init();