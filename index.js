document.addEventListener('DOMContentLoaded', () => {
    const wallet = document.getElementById('wallet');
    let coins = 100;
    const buyPackButton = document.getElementById('buyPack');
    const showCollectionButton = document.getElementById('showCollection');
    const addCoinsButton = document.getElementById('addCoins');
    const cardContainer = document.getElementById('cardContainer');
    let collection = []; // Store collected cards
    let showingCollection = false; // Track if the collection is being shown

    // Define 52 unique cards
    const uniqueCards = [];
    for (let i = 1; i <= 52; i++) {
        uniqueCards.push(`Card ${i}`);
    }

    buyPackButton.addEventListener('click', () => {
        if (coins >= 20) {
            coins -= 20;
            wallet.textContent = `Coins: ${coins}`;
            if (showingCollection) {
                showingCollection = false;
                cardContainer.innerHTML = '';
            }
            generateCards();
        } else {
            alert("Not enough coins!");
        }
    });

    showCollectionButton.addEventListener('click', () => {
        if (showingCollection) {
            showingCollection = false;
            cardContainer.innerHTML = '';
        } else {
            showingCollection = true;
            displayCollection();
        }
    });

    addCoinsButton.addEventListener('click', () => {
        coins += 10;
        wallet.textContent = `Coins: ${coins}`;
    });

    function generateCards() {
        for (let i = 0; i < 5; i++) {
            // Draw a random card from the unique cards
            const cardText = uniqueCards[Math.floor(Math.random() * uniqueCards.length)];
            const card = createCard(cardText);
            collection.push(card);
            cardContainer.appendChild(card);
        }
    }

    function displayCollection() {
        cardContainer.innerHTML = ''; // Clear current view
    
        // Sort the collection by rarity first and then by card number
        const sortedCollection = collection.slice().sort((a, b) => {
            const rarityWeightA = getRarityWeight(a.classList[1]); // assuming the second class is the rarity class
            const rarityWeightB = getRarityWeight(b.classList[1]);
            const cardNumberA = parseInt(a.textContent.match(/\d+/)[0], 10);
            const cardNumberB = parseInt(b.textContent.match(/\d+/)[0], 10);
    
            if (rarityWeightA === rarityWeightB) {
                // If rarities are the same, sort by card number
                return cardNumberA - cardNumberB;
            }
            return rarityWeightA - rarityWeightB;
        });
    
        // Display the sorted collection
        sortedCollection.forEach(card => {
            const cardClone = card.cloneNode(true);
            cardClone.classList.add('flipped');
            cardContainer.appendChild(cardClone);
        });
    }
    
    function getRarityWeight(rarityClass) {
        // Assign weights according to the rarity
        const rarityWeights = {
            'common': 1,      // most common
            'uncommon': 2,
            'rare': 3,
            'epic': 4,
            'legendary': 5,
            'miracle': 6       // most rare
        };
        return rarityWeights[rarityClass];
    }

    function createCard(text) {
        const card = document.createElement('div');
        card.classList.add('card');
    
        // Determine the rarity and color of the card
        const rarity = getCardRarity();
        card.classList.add(rarity.color); // Add class based on rarity to set the color
    
        const cardInner = document.createElement('div');
        cardInner.classList.add('cardInner');
    
        const cardFront = document.createElement('div');
        cardFront.classList.add('cardFront');
        cardFront.textContent = text; // Set the card text to include its number and rarity
    
        const cardBack = document.createElement('div');
        cardBack.classList.add('cardBack');
        cardBack.style.backgroundColor = rarity.colorCode; // Set the card color
        cardBack.textContent = `${text} - ${rarity.name}`;
    
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
    
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    
        return card;
    }
    
    function getCardRarity() {
        const rarityChance = Math.random() * 100;
        if (rarityChance < 0.5) {
            return { name: 'Miracle', color: 'miracle', colorCode: 'crimson' };
        } else if (rarityChance < 1.5) {
            return { name: 'Legendary', color: 'legendary', colorCode: 'orange' };
        } else if (rarityChance < 6.5) {
            return { name: 'Epic', color: 'epic', colorCode: 'purple' };
        } else if (rarityChance < 16.5) {
            return { name: 'Rare', color: 'rare', colorCode: 'blue' };
        } else if (rarityChance < 46.5) {
            return { name: 'Uncommon', color: 'uncommon', colorCode: 'grey' };
        } else {
            return { name: 'Common', color: 'common', colorCode: 'white' };
        }
    }
});