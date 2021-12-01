//------------------BLACKJACK BRAINIAC---------------//
/*----- constants -----*/
const dealer = {
    hand: []
}
const player = {
    hand: []
}

const suits = ['h', 'd', 's', 'c']
const values = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const orderedDeck = buildOrderedDeck();

/*----- app's state (variables) -----*/
let readyDeck, shuffledDeckArr, playerScore, dealerScore, winner, loser;
let bust = false

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

/*----- functions -----*/
function init() {
    hitBtn.disabled = true;
    standBtn.disabled = true;
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
    dealBtn.disabled = true;
    hitBtn.disabled = false;
    standBtn.disabled = false;
    const cardsForPlayer = readyDeck.splice(0, 2)
    const cardsForDealer = readyDeck.splice(0, 2)
    cardsForPlayer.forEach(card => player.hand.push(card))
    cardsForDealer.forEach(card => dealer.hand.push(card))
    playerScore = getScore(player.hand);
    dealerScore = getScore(dealer.hand);
    checkBlackjack();
    render();
}

function hit() {
    player.hand.push(readyDeck.splice(0, 1)[0])
    playerScore = getScore(player.hand)
    checkBust()
    render()
}

function stand() {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    while (dealerScore < 17) {
        dealer.hand.push(readyDeck.splice(0, 1)[0])
        dealerScore = getScore(dealer.hand)
        render()
    }
    checkWin()
}

function getScore(hand) {
    let score = 0
    let aces = 0
    hand.forEach(card => {
        score += card.numberValue
        if (card.numberValue === 11) {
            aces++;
        }
    })
    while (score > 21 && aces) {
        score -= 10;
        aces--;
    }
    return score;
}

function render() {
    playerCards.innerHTML = ''
    dealerCards.innerHTML = ''

    player.hand.forEach(card => {
        const cardWrapperEl = document.createElement('div')
        cardWrapperEl.classList.add('cardWrapperEl')
        const cardEl = document.createElement('div')
        cardEl.classList.add('card', card.face);
        cardWrapperEl.append(cardEl)
        playerCards.append(cardWrapperEl)
    })


    dealer.hand.forEach(card => {
        const cardWrapperEl = document.createElement('div')
        cardWrapperEl.classList.add('cardWrapperEl')
        const cardEl = document.createElement('div')
        cardEl.classList.add('card', card.face);
        cardWrapperEl.append(cardEl)
        dealerCards.append(cardWrapperEl)
    })
}

function checkBlackjack() {
    if (playerScore === 21) {
        showBlackjackScreen();
        endgame();
    }
}

function checkWin() {
    checkBust();
    if (bust === false) {
        compareHands();
    }
}

function checkBust() {
    if (playerScore > 21) {
        bust = true
        winner = "dealer"
        loser = "player"
        showBustScreen();
        endgame();
    } else if (dealerScore > 21) {
        bust = true
        winner = "player"
        loser = "dealer"
        showBustScreen();
    }
}

function compareHands() {
    if (playerScore === dealerScore) {
        winner = "tie"
        showTieScreen()
    } else if (playerScore > dealerScore) {
        winner = "player"
        loser = "dealer"
        showWinScreen()
    } else {
        winner = "dealer"
        loser = "player"
        showLoseScreen()
    }
}

function endgame() {
    hitBtn.disabled = true;
    standBtn.disabled = true;
}
function showBlackjackScreen() {
    message.innerText = 'Congrats! You hit Blackjack. You win!'
}

function showBustScreen() {
    message.innerText = `The ${loser} busted! The ${winner} wins!`
}

function showTieScreen() {
    message.innerText = `It's a ${winner}!`
}

function showWinScreen() {
    message.innerText = `Congrats! The ${winner} beat the ${loser}!`
}

function showLoseScreen() {
    message.innerText = `Sorry, the ${winner} beat the ${loser}.`
}

init();