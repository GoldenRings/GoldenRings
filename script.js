// Sélectionne l'élément audio
const backgroundMusic = document.getElementById('background-music');

// Active le son au premier mouvement de souris
document.addEventListener('mousemove', () => {
    if (backgroundMusic.muted) {
        backgroundMusic.muted = false; // Active le son
    }
});

// Génère des anneaux au mouvement de la souris
const ringContainer = document.querySelector('.ring-container');
ringContainer.addEventListener('mousemove', (event) => {
    const ring = document.createElement('div');
    ring.classList.add('ring');

    // Positionne l'anneau à l'endroit du curseur
    const x = event.clientX;
    const y = event.clientY;

    ring.style.left = `${x - 25}px`; // Centre l'anneau horizontalement
    ring.style.top = `${y - 25}px`; // Centre l'anneau verticalement

    // Animation aléatoire
    const randomX1 = Math.random() * 100 - 50; // Déplacement horizontal
    const randomY1 = Math.random() * 100 - 50; // Déplacement vertical
    const randomDuration = Math.random() * 2 + 1; // Durée aléatoire (1 à 3 secondes)

    // Crée une animation CSS unique
    const animationName = `move-${Date.now()}`;
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        @keyframes ${animationName} {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(${randomX1}px, ${randomY1}px);
            }
        }
    `, styleSheet.cssRules.length);

    ring.style.animation = `${animationName} ${randomDuration}s ease-out`;

    // Ajoute l'anneau au conteneur
    ringContainer.appendChild(ring);

    // Supprime l'anneau et son animation après 2 secondes
    setTimeout(() => {
        ring.remove();
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
            if (styleSheet.cssRules[i].name === animationName) {
                styleSheet.deleteRule(i);
                break;
            }
        }
    }, 4500);
});
