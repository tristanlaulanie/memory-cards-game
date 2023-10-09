// Mélange aléatoire des cartes à chaque chargement de la page.

// Fonction permettant de mélanger aléatoirement les éléments d'un tableau. Cette fonction est nécessaire pour obtenir un ordre aléatoire des cartes à chaque chargement de la page.
function shuffle(array) {
  // On commence par obtenir le nombre d'éléments dans le tableau, ce qui nous indique combien de cartes doivent être mélangées.
  let currentIndex = array.length;
  
  // Ces deux variables seront utilisées pour échanger les positions de deux cartes dans le tableau.
  let temporaryValue;
  let randomIndex;

  // On continuera à mélanger tant qu'il y aura des cartes non traitées.
  while (currentIndex !== 0) {
      // On génère un index aléatoire pour sélectionner une carte à échanger. Cela assure que chaque carte a une chance égale d'occuper n'importe quelle position.
      randomIndex = Math.floor(Math.random() * currentIndex);

      // On prépare à traiter la prochaine carte dans la prochaine itération.
      currentIndex--;

      // On stocke temporairement la carte actuelle pour pouvoir effectuer un échange.
      temporaryValue = array[currentIndex];

      // On remplace la carte actuelle par la carte aléatoirement choisie.
      array[currentIndex] = array[randomIndex];

      // On insère la carte temporairement stockée à la position de la carte aléatoirement choisie, complétant ainsi l'échange.
      array[randomIndex] = temporaryValue;
  }

  // Après avoir mélangé toutes les cartes, on renvoie le tableau pour qu'il puisse être utilisé pour réorganiser les éléments dans la page.
  return array;
}

// On attend que tout le contenu de la page soit chargé. C'est essentiel pour s'assurer que toutes les cartes sont prêtes à être mélangées.
document.addEventListener("DOMContentLoaded", function() {
  // On récupère toutes les cartes du jeu. Ces cartes seront mélangées pour créer un nouvel agencement à chaque chargement de la page.
  const cards = document.querySelectorAll('.card');
  
  // Pour pouvoir utiliser notre fonction de mélange, on convertit la collection d'éléments en tableau.
  const shuffledCards = shuffle(Array.from(cards));
  
  // On récupère la grille où les cartes seront insérées. Cela nous permet de repositionner les cartes mélangées.
  const grid = document.querySelector('.grid');
  
  // Pour chaque carte mélangée, nous l'ajoutons de nouveau à la grille. Comme les cartes sont déjà présentes, cela les replace simplement dans un nouvel ordre.
  shuffledCards.forEach(card => {
      grid.appendChild(card);
  });
});

// On retourne les cartes au clic

// Attente du chargement complet du document HTML
document.addEventListener("DOMContentLoaded", function() {

  // Sélection de toutes les cartes du document
  const cards = document.querySelectorAll('.card');
  
  // Ajout d'un événement d'écoute de clic à chaque carte
  cards.forEach(card => {
      card.addEventListener('click', function() {
          // Sélection du div .double-face à l'intérieur de la carte cliquée
          const doubleFace = card.querySelector('.double-face');

          // Basculement de la classe .active sur le div .double-face
          doubleFace.classList.toggle('active');
      });
  });
});

// On retourne les cartes au clic et lorsque deux cartes sont cliquées; on les retourne après 1 seconde.

// Attente du chargement complet du document HTML
document.addEventListener("DOMContentLoaded", function() {

  // Sélection de toutes les cartes du document
  const cards = document.querySelectorAll('.card');
  
  let flippedCards = []; // Pour stocker les cartes retournées

  // Ajout d'un événement d'écoute de clic à chaque carte
  cards.forEach(card => {
      card.addEventListener('click', function() {
          // Sélection du div .double-face à l'intérieur de la carte cliquée
          const doubleFace = card.querySelector('.double-face');

          // Basculement de la classe .active sur le div .double-face
          doubleFace.classList.add('active');

          // Ajout de la carte à la liste des cartes retournées
          flippedCards.push(doubleFace);

          // Si 2 cartes ont été retournées
          if (flippedCards.length === 2) {
              // Attente d'1 seconde avant de retourner les cartes
              setTimeout(function() {
                  flippedCards.forEach(df => df.classList.remove('active'));
                  flippedCards.forEach(c => c.querySelector('.double-face').classList.remove('active'));
                  flippedCards = []; // Réinitialisation de la liste des cartes retournées
              }, 1000);
          }
      });
  });
});

// Lorsque deux cartes sont identiques, on les laisse retournées. On ajoute 1 au score à chaque paire de cartes retournées.

// Attente du chargement complet du document HTML
document.addEventListener("DOMContentLoaded", function() {

  // Sélection de toutes les cartes du document
  const cards = document.querySelectorAll('.card');
  
  let flippedCards = []; // Pour stocker les cartes retournées

  // Sélection du compteur de coups (score)
  const scoreCounter = document.querySelector('.score-number');
  let score = 0; // Le score initial

  // Ajout d'un événement d'écoute de clic à chaque carte
  cards.forEach(card => {
      card.addEventListener('click', function() {
          // Sélection du div .double-face à l'intérieur de la carte cliquée
          const doubleFace = card.querySelector('.double-face');

          // Basculement de la classe .active sur le div .double-face
          doubleFace.classList.add('active');

          // Ajout de la carte à la liste des cartes retournées
          flippedCards.push(card);

          // Si 2 cartes ont été retournées
          if (flippedCards.length === 2) {

              // Augmentation du score
              score++;
              scoreCounter.textContent = score; // Mise à jour du compteur de coups

              // Obtenir la valeur de l'attribut data-attr pour chaque carte
              const attr1 = flippedCards[0].getAttribute('data-attr');
              const attr2 = flippedCards[1].getAttribute('data-attr');

              // Si les attributs des deux cartes ne sont pas identiques
              if (attr1 !== attr2) {
                  // Attente d'1 seconde avant de retourner les cartes
                  setTimeout(function() {
                      flippedCards.forEach(c => c.querySelector('.double-face').classList.remove('active'));
                      flippedCards = []; // Réinitialisation de la liste des cartes retournées
                  }, 1000);
              } else {
                  // Si elles sont identiques, simplement réinitialiser la liste
                  flippedCards = [];
              }
          }
      });
  });
});

// On affiche un message de victoire lorsque toutes les cartes sont retournées.

// On sélectionne toutes les cartes
const cards = document.querySelectorAll('.card');

// On ajoute des écouteurs d'événements à chaque carte
cards.forEach(card => card.addEventListener('click', handleCardClick));

// Fonction qui vérifie si toutes les cartes sont retournées
function checkAllFlipped() {

// On convertit la liste des éléments "cards" en un tableau
const cardArray = Array.from(cards);

// On vérifie si chaque carte a la classe "active" sur son élément avec la classe "double-face"

// Initialise la variable pour déterminer si toutes les cartes sont actives.
let allCardsActive = true;

// On utilise la méthode 'every' pour vérifier chaque carte de cardArray.
// La méthode 'every' renverra 'true' si chaque callback renvoie 'true' pour chaque élément de l'array.
allCardsActive = cardArray.every(card => {

    // On récupère l'élément 'double-face' de la carte actuelle.
    const doubleFaceElement = card.querySelector('.double-face');
    
    // Vérifie si cet élément contient la classe 'active'.
    // Si oui, il renvoie 'true', sinon il renvoie 'false'.
    return doubleFaceElement.classList.contains('active');
});

// À la fin de ce code, la variable 'allCardsActive' sera 'true' si toutes les cartes sont actives.
// Sinon, elle sera 'false'.


// Retourne la valeur booléenne de la vérification
return allCardsActive;
}

// Fonction qui gère le clic sur une carte
function handleCardClick(event) {
  // Retournez la carte
  event.currentTarget.querySelector('.double-face').classList.toggle('active');
  
  // Vérifiez si toutes les cartes sont retournées
  if (checkAllFlipped()) {
    // Si oui, affichez le message de victoire
    document.querySelector('.win-result').style.display = 'flex';
  }
}







