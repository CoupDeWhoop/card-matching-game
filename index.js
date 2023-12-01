const grid = document.querySelector('.grid');
let gridSize = 12

// const calculateGridSize = () => {
//     const windowWidth = window.innerWidth;
//     const windowHeight = window.innerHeight;
//     if (windowWidth < 600 || windowHeight < 600) {
//         gridSize = 12;
//     } else {
//         gridSize = 16;
//     }
// }
// calculateGridSize()

const imageArray = [
    { name: 'Seaman', class: 'Seaman', src: "assets/stickers-from-Old-School--Seaman.webp" },
    { name: 'Robson', class: 'Robson', src:  "assets/espana-82-world-cup-bryan-robson-england-246.webp"},
    { name: 'Cantona', class: 'Cantona', src: "assets/stickers-from-Old-School--Cantona.webp" },
    { name: 'Platt', class: 'Platt', src: "assets/stickers-from-Old-School--Platt.webp"},
    { name: 'Pele', class: 'Pele', src: "assets/argentina-78-world-cup-pele-bra-history-wc-1970-027.webp"},
    { name: 'Neville', class: 'Neville', src: "assets/Euro-96-Gary-Neville34.jpg"},
    { name: 'Valderrama', class: 'Valderrama', src: "assets/france-98-carlos-alberto-valderrama-col-456.webp"},
    { name: 'Maradona', class: 'Maradona', src: "assets/Old-School-Panini-sticker-Maradona.webp"},
    { name: 'Mourinho', class: 'Mourinho', src: "assets/stickers-from-Old-School- Mourinho.webp"},
    { name: 'Ancelotti', class: 'Ancelotti', src: "assets/stickers-from-Old-School--Ancelotti.webp"},
    { name: 'Ferguson', class: 'Ferguson', src: "assets/stickers-from-Old-School--Ferguson.webp"},
    { name: 'Tissier', class: 'Tissier', src: "assets/stickers-from-Old-School--Tissier.webp"},
    { name: 'Zidane', class: 'Zidane', src: "assets/stickers-from-Old-School--Zidane.webp"},
    { name: 'Chimenti', class: 'Chimenti', src: "assets/Chimenti.jpeg"},
    { name: 'Mihajlovic', class: 'Mihajlovic', src: "assets/jugo.jpeg"},
    { name: 'Ginola', class: 'Ginola', src: "assets/stickers-from-Old-School--Ginola.webp"},
    { name: 'Anderson', class: 'Anderson', src: "assets/stickers-from-Old-School-- Anderson.webp"},
    { name: 'Lineker', class: 'Lineker', src: "assets/stickers-from-Old-School--Lineker.webp"},
    { name: 'Jones', class: 'Jones', src: "assets/stickers-from-Old-School--Jones.webp"},
    { name: 'Bergkamp', class: 'Bergkamp', src: "assets/stickers-from-Old-School--Bergkamp.webp"},
    { name: 'Power', class: 'Power', src: "assets/stickers-from-Old-School--Power.webp"},
];

function revealPlayers() {
    isShowingAllPlayers = true;
    document.querySelectorAll('.card').forEach(function (card) {
        card.firstElementChild.classList.add('is-revealed');
    });
}

function setBoard() {
    const winModal = document.getElementById('winModal');
    winModal.style.display = 'none';

    // Reset the board
    grid.classList.remove('grey-out');
    grid.innerHTML = '';
    let isShowingAllPlayers = false;
    const selectedCards = [];

    //pick random cards
    while (selectedCards.length < gridSize/2) { 
        const randomIndex = Math.floor(Math.random() * imageArray.length);
        const selectedCard = imageArray[randomIndex];
        if (!selectedCards.includes(selectedCard)) {
            selectedCards.push(selectedCard);
        }
    }

    const cardsArray = [...selectedCards, ...selectedCards] // Duplicate each player to create two pairs

    //Fisher-Yates shuffle algorithm
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]]; //swaps these in place using destructuring
    }

    cardsArray.forEach((image, index)=>{
        const newDiv = document.createElement('div')
        newDiv.classList.add('card')
        newDiv.classList.add('img-container')
        const newImg = document.createElement('img')
        newImg.id = `card${index}`;
        newImg.playerName = image.name;
        newImg.classList.add(image.class); // the players name is added to img as a class. This is needed for the matching check.
        newImg.src = image.src;
        newDiv.appendChild(newImg)
        grid.appendChild(newDiv)
    })

    //you can't use array methods on a html collection, it needs to be spread into an array
    const cards = [...document.getElementsByClassName('card')];
    const chosenCard = []; // todo - make this an object instead
    let isWaiting = false; 
    let matchedCount = 0;




    cards.forEach((card)=>{
        card.addEventListener('click', (event)=>{
            console.log(card.querySelector('img').playerName)
            const cardId = card.querySelector('img').id

            if (card.querySelector('.is-matched') || isWaiting || isShowingAllPlayers) { 
                return
            }
            if (chosenCard[1] === cardId){ // deals with reclicking the same card
                return
            }

            card.firstElementChild.classList.toggle('is-revealed')
            const playerPicked = card.querySelector('img').playerName; //todo - change playerPicked to cardPicked, playername to cardname
            
            if (chosenCard.length === 0){ // first pick
                chosenCard.push(playerPicked)
                chosenCard.push(cardId)
            } else {
                if (chosenCard[0] === playerPicked){ 
                    const matchingCards = document.querySelectorAll(`.card .${playerPicked}`);
                    matchingCards.forEach(matchingCard => {
                        matchingCard.classList.toggle('is-matched');
                    });
                    matchedCount += 2;
                    setTimeout(() => {
                        if (matchedCount === gridSize) {
                            const winModal = document.getElementById('winModal');
                            winModal.style.display = 'block';
                            grid.classList.add('grey-out');
                        }
                    }, 1000);
                } else {
                    isWaiting = true;
                    setTimeout(()=>{
                        cards.forEach((card)=>{
                            if (!card.firstElementChild.classList.contains('is-matched')){
                                card.firstElementChild.classList.remove('is-revealed');
                                isWaiting = false;
                            }
                        })
                    }, 750)
                } 
                chosenCard.pop();
                chosenCard.pop();
            }
        })

    })



}

setBoard();