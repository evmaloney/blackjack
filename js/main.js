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
let readyDeck, shuffledDeckArr, dealtCards

/*----- cached element references -----*/
const dealerCards = document.getElementById('dealerSpot');
const playerCards = document.getElementById('playerSpot');
const dealBtn = document.getElementById('deal')
const hitBtn = document.getElementById('hit')
const standBtn = document.getElementById('stand')
const restartBtn = document.getElementById('restart')
const message = document.getElementById('messageBox')
let firstCard = document.getElementById('playerCard1');
let secondCard = document.getElementById('dealerCard1');
let thirdCard = document.getElementById('playerCard2');
let fourthCard = document.getElementById('dealerCard2');

/*----- event listeners -----*/
dealBtn.addEventListener('click', deal)
hitBtn.addEventListener('click', hit)
standBtn.addEventListener('click', stand)
restartBtn.addEventListener('click', init)

/*----- functions -----*/
function init() {
    // message.remove();
    readyDeck = getShuffledDeck();
    // dealtCards = [];
    // dealtCards.push(readyDeck.splice(0, 10));
    render();
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
    // Deal function should update the player and dealers hands with
    // the card objects in an array. The render function will check
    // this array and update the DOM
    player.hand.push(readyDeck.splice(0, 10)[0])
    // dealer.hand.push(readyDeck.splice(0, 2)[0])
    // message.append()
    checkWin();
    render();
}

function hit() {
    // hit func should just add one more card to the players hand
    // in state and then immediately check if the player busted
    // Render function will check the state of the player's hand and
    // update DOM
    let hitCard = dealtCards[0][i].face;
    let card6 = dealtCards[0][5].face;
    let card7 = dealtCards[0][6].face;
    let fifthCard = document.getElementById('playerCard3');
    let sixthCard = document.getElementById('playerCard4');
    let seventhCard = document.getElementById('playerCard5');
    fifthCard.classList.add("card", hitCard);
    sixthCard.classList.add("card", card6);
    seventhCard.classList.add("card", card7);
}

function stand() {
    // Initiate dealer's turn (check if he's at 17, if not keep hitting)
    // Once dealer is done, compare scores, update if win, tie, or loss
    // Render function will check the state of dealer's hand as well
    // as state of winner and render appropriate cards and message to
    // the DOM
    let card2 = dealtCards[0][1].face;
    let secondCard = document.getElementById('dealerCard1');
    secondCard.classList.replace("back", card2);
}

function checkWin() {
    // instead of updating DOM, update the state of the winner based on
    // the state of the dealer's hand and player's hand
    //     if (pHand === 21) {
    //         message.innerText = "You hit Blackjack! You won!!!"
    //     } else {
    //         message.innerText = "You have not hit Blackjack. You have yet to win."
    //     }
}

function render() {
    // check the dealers hand and players hand and render cards
    // check if there's a winner and render appropriate message
    // firstCard.classList.add("card", card1);
    // secondCard.classList.add("card", "back");
    // thirdCard.classList.add("card", card3);
    // fourthCard.classList.add("card", card4);
}

init();