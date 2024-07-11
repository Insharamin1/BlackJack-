let player = {
  name: "",
  chips: 100,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let bet = 20; // You can adjust this bet amount as needed
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let playerNameInput = document.getElementById("player-name");

function updatePlayerChips() {
  playerEl.textContent = player.name + ": $" + player.chips;
}

function setPlayerName() {
  player.name = playerNameInput.value;
  updatePlayerChips();
}

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  if (player.chips < bet) {
    message = "You're left with no chips! Game over.";
    messageEl.textContent = message;
    return;
  }
  if (player.name === "") {
    message = "Please set your name first.";
    messageEl.textContent = message;
    return;
  }
  isAlive = true;
  hasBlackJack = false;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    player.chips += bet * 1.5; // Win 1.5 times the bet
  } else {
    message = "You're out of the game!";
    isAlive = false;
    player.chips -= bet; // Lose the bet amount
  }
  messageEl.textContent = message;
  updatePlayerChips();
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}
