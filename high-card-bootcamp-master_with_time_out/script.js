// global varible

let playerTurn = 1;
let player1card;
let cardContainer;
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
const gameInfo = document.createElement('div');
let canClick = true;

// player action buttons methods

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === 'hearts') {
      currentSymbol = '♥️';
    } else if (currentSuit === 'spades') {
      currentSymbol = '♠️';
    } else if (currentSuit === 'clubs') {
      currentSymbol = '♣️';
    } else {
      currentSymbol = '♦️';
    }

    // set the color of the card (used later to determine the css class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === '♥️' || currentSymbol === '♦️') {
      cardColor = 'red';
    } else {
      cardColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // Create a new card with the current name, suit, suit symbol, display name colour and rank
      const cardInfo = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        color: cardColor,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};
const deck = shuffleCards(makeDeck());

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.name, cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const output = (message) => {
  gameInfo.innerText = message;
};

const player1Click = () => {
  if (playerTurn === 1 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      player1card = deck.pop();

      const cardElement = createCard(player1card);

      // in case this is not the 1st time
      // in the entire app,
      // empty the card container
      cardContainer.innerHTML = '';

      cardContainer.appendChild(cardElement);
      playerTurn = 2;
      canClick = true;
    }, 2000);
  }
};

const player2Click = () => {
  if (playerTurn === 2 && canClick === true) {
    canClick = false;

    setTimeout(() => {
      const player2Card = deck.pop();
      const cardElement = createCard(player2Card);

      cardContainer.appendChild(cardElement);

      playerTurn = 1;
      canClick = true;

      if (player1card.rank > player2Card.rank) {
        output('player 1 wins');
      } else if (player1card.rank < player2Card.rank) {
        output('player 2 wins');
      } else {
        output('tie');
      }
    }, 2000);
  }
};

/* #######################
## GAME INITIALISATION ##
####################### */
const initGame = () => {
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);
  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player2Button.innerText = 'Player 2 Draw';
  document.body.appendChild(player2Button);

  player1Button.addEventListener('click', player1Click);
  player2Button.addEventListener('click', player2Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  document.body.appendChild(gameInfo);
};

initGame();

// const deck = shuffleCards(makeDeck());

// // Player 1 starts first
// let playersTurn = 1;

// // Use let for player1Card object because player1Card will be reassigned
// let player1Card;

// // create two buttons
// const player1Button = document.createElement('button');
// player1Button.innerText = 'Player 1 Draw';
// document.body.appendChild(player1Button);

// const player2Button = document.createElement('button');
// player2Button.innerText = 'Player 2 Draw';
// document.body.appendChild(player2Button);

// // Create game info div as global value
// // fill game info div with starting instructions
// const gameInfo = document.createElement('div');
// gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
// document.body.appendChild(gameInfo);

// // Create a helper function for output to abstract complexity
// // of DOM manipulation away from game logic
// const output = (message) => {
//   gameInfo.innerText = message;
// };

// // Add an event listener on player 1's button to draw card and switch
// // to player 2's turn
// player1Button.addEventListener('click', () => {
//   if (playersTurn === 1) {
//     player1Card = deck.pop();
//     playersTurn = 2;
//   }
// });

// // Add event listener on player 2's button to draw card and determine winner
// // Switch back to player 1's turn to repeat game
// player2Button.addEventListener('click', () => {
//   if (playersTurn === 2) {
//     const player2Card = deck.pop();
//     playersTurn = 1;

//     if (player1Card.rank > player2Card.rank) {
//       output('player 1 wins');
//     } else if (player1Card.rank < player2Card.rank) {
//       output('player 2 wins');
//     } else {
//       output('tie');
//     }
//   }
// });
