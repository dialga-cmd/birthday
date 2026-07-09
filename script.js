document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');

    // Handle intro animation sequence
    // The animation on the text takes 5 seconds (defined in CSS).
    setTimeout(() => {
        // Fade out the intro screen container
        introScreen.style.opacity = '0';
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            createPetals();
        }, 1000); // Wait for the 1s fade-out transition of introScreen
        
    }, 5000); // Wait for the 5s text animation

    // Music Player Logic
    let isPlaying = false;
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '🎵 Play Music';
        } else {
            // Attempt to play music
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '⏸️ Pause Music';
            }).catch(e => {
                console.log("Music play blocked or file not found.", e);
                alert("Please add 'music.mp3' in the root directory to play music!");
            });
        }
        isPlaying = !isPlaying;
    });

    // Falling Petals/Hearts Logic
    function createPetals() {
        const container = document.getElementById('petals-container');
        const emojis = ['🌸', '💖', '✨', '🌹', '❤️', '🤍'];
        
        // Create a new petal every 300ms
        setInterval(() => {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random horizontal position
            petal.style.left = Math.random() * 100 + 'vw';
            
            // Random animation duration between 5s and 15s
            const duration = Math.random() * 10 + 5;
            petal.style.animationDuration = duration + 's';
            
            // Random size factor
            const size = Math.random() * 0.8 + 0.6;
            petal.style.setProperty('--s', size);
            
            container.appendChild(petal);
            
            // Remove petal after it falls to prevent memory leak
            setTimeout(() => {
                petal.remove();
            }, duration * 1000);
            
        }, 400); // slightly less dense
    }
});
