function animateNumber(element, start, end, duration) {
    let current = start;
    const increment = end > start ? Math.ceil((end - start) / (duration / 10)) : 0;

    const updateCounter = () => {
        current += increment;

        if (current >= end) {
            element.textContent = end + '+'; // Add the "+" at the end
        } else {
            element.textContent = current + '+';
            setTimeout(updateCounter, 30); // Updates every 30ms
        }
    };

    updateCounter();
}

// Function to handle when elements come into view
function startCounting() {
    const counters = document.querySelectorAll('.update');
    counters.forEach((counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            animateNumber(counter, 0, target, 2000); // Animates over 2 seconds
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(counter); // Stops observing after animating
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Initialize counting when DOM is fully loaded
window.addEventListener('DOMContentLoaded', startCounting);


function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Select all flip cards
const flipCards = document.querySelectorAll('.flip-card');

// Function to handle the flip effect
function flipCard() {
    this.classList.toggle('flipped');
}

// Adding event listeners to each flip card for hover effect
flipCards.forEach(card => {
    // Hover event
    card.addEventListener('mouseover', flipCard);
    card.addEventListener('mouseleave', flipCard);

    // Optional: Click to flip (uncomment if desired)
    // card.addEventListener('click', flipCard);
});

// Select the theme controller radio buttons
const themeControllers = document.querySelectorAll('.theme-controller');

// Function to switch theme
function switchTheme(event) {
  const selectedTheme = event.target.value; // Get the selected value ('light' or 'dark')

  // Apply the selected theme to the body
  if (selectedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
  } else if (selectedTheme === 'dark') {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
  }
}


// Add event listeners to each theme controller
  // Leaderboard data (can be fetched from an API as well)
  const leaderboardData = [
    { rank: 1, name: 'Player 1', score: 2500, stars: 5, medal: 'gold-medal.png' },
    { rank: 2, name: 'Player 2', score: 2449, stars: 4, medal: 'silver-medal.png' },
    { rank: 3, name: 'Player 3', score: 2400, stars: 3, medal: 'bronze-medal.png' },
    { rank: 4, name: 'Player 4', score: 1500, stars: 5, medal: 'gold-medal.png' },
    { rank: 5, name: 'Player 5', score: 1000, stars: 4, medal: 'silver-medal.png' }
  ];

  // Function to render stars
  function renderStars(stars) {
    let starHTML = '';
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starHTML += '<span class="star full">&#9733;</span>'; // Full star
      } else {
        starHTML += '<span class="star">&#9734;</span>'; // Empty star
      }
    }
    return starHTML;
  }

  // Function to render leaderboard items
  function renderLeaderboard() {
    const leaderboardContainer = document.querySelector('.leaderboard');
    
    // Clear any existing items in the leaderboard
    leaderboardContainer.innerHTML = '';
    
    leaderboardData.forEach(player => {
      const leaderboardItem = `
        <div class="leaderboard-item">
          <div class="rank">${player.rank}</div>
          <img src="${player.medal}" alt="Medal">
          <div class="name">${player.name}</div>
          <div class="stars">${renderStars(player.stars)}</div>
          <div class="score">${player.score}</div>
        </div>
      `;
      
      // Append the rendered item to the leaderboard container
      leaderboardContainer.innerHTML += leaderboardItem;
    });
  }