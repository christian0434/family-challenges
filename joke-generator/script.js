// Joke Generator App - Using JokeAPI

// Global Variables
let currentJoke = null;
let favorites = [];
let history = [];
let jokeStats = {
    loaded: 0,
    favorited: 0,
    ratings: [],
    shared: 0
};
let selectedType = 'all';

// API Configuration
const API_URL = 'https://v2.jokeapi.dev/joke';
const JOKE_TYPES = {
    all: 'Any',
    general: 'General',
    programming: 'Programming',
    'knock-knock': 'Knock-knock'
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    updateStats();
    updateFavoritesList();
    updateHistoryList();
});

// Get Random Joke
async function getRandomJoke() {
    showLoading(true);
    hideError();

    try {
        const jokeType = selectedType === 'all' ? 'Any' : JOKE_TYPES[selectedType];
        const url = `${API_URL}/${jokeType}?format=json&safe-mode`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch joke');

        const data = await response.json();

        if (data.error) throw new Error('No joke found');

        // Format the joke
        let jokeText = '';
        if (data.type === 'single') {
            jokeText = data.joke;
        } else {
            jokeText = `${data.setup}\n\n${data.delivery}`;
        }

        currentJoke = {
            text: jokeText,
            type: data.category,
            id: data.id,
            rating: 0,
            timestamp: new Date().toLocaleString()
        };

        displayJoke();
        addToHistory();
        jokeStats.loaded++;
        updateStats();
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to load joke. Please try again!');
    } finally {
        showLoading(false);
    }
}

// Display Joke
function displayJoke() {
    if (!currentJoke) return;

    document.getElementById('jokeText').textContent = currentJoke.text;
    document.getElementById('jokeType').textContent = `Category: ${currentJoke.type}`;

    // Reset ratings
    updateStarRating();

    // Animate
    const card = document.getElementById('jokeCard');
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'slideDown 0.5s ease';
    }, 10);
}

// Rate Joke
function rateJoke(stars) {
    if (!currentJoke) return;

    currentJoke.rating = stars;
    jokeStats.ratings.push(stars);
    updateStarRating();
    updateStats();
    saveToStorage();
    showToast(`Rated ${stars}/5 stars! 😊`);
}

// Update Star Rating Display
function updateStarRating() {
    const stars = document.querySelectorAll('#ratingStars i');
    const rating = currentJoke?.rating || 0;

    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Add to Favorites
function addToFavorites() {
    if (!currentJoke) return;

    const exists = favorites.some(j => j.id === currentJoke.id);
    if (!exists) {
        favorites.push(currentJoke);
        jokeStats.favorited++;
        showToast('Added to favorites! ❤️');
    } else {
        showToast('Already in favorites!');
    }

    updateStats();
    updateFavoritesList();
    saveToStorage();
}

// Remove from Favorites
function removeFromFavorites(id) {
    favorites = favorites.filter(j => j.id !== id);
    jokeStats.favorited = favorites.length;
    updateStats();
    updateFavoritesList();
    saveToStorage();
    showToast('Removed from favorites.');
}

// Update Favorites List Display
function updateFavoritesList() {
    const list = document.getElementById('favoritesList');
    if (favorites.length === 0) {
        list.innerHTML = '<p class="empty-message">No favorites yet. Click the heart to save jokes!</p>';
        return;
    }

    list.innerHTML = favorites.map(joke => `
        <div class="joke-item">
            <p class="joke-item-text">${joke.text}</p>
            <div class="joke-item-actions">
                <button class="joke-item-btn liked" onclick="removeFromFavorites(${joke.id})" title="Remove from favorites">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="joke-item-btn" onclick="copyToClipboard('${joke.text.replace(/'/g, "\\'")}')">" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Add to History
function addToHistory() {
    if (!currentJoke) return;

    // Avoid duplicates
    history = history.filter(j => j.id !== currentJoke.id);
    history.unshift(currentJoke);

    // Keep only last 10
    if (history.length > 10) {
        history = history.slice(0, 10);
    }

    updateHistoryList();
    saveToStorage();
}

// Update History List Display
function updateHistoryList() {
    const list = document.getElementById('historyList');
    if (history.length === 0) {
        list.innerHTML = '<p class="empty-message">No jokes loaded yet.</p>';
        return;
    }

    list.innerHTML = history.map((joke, index) => `
        <div class="joke-item">
            <div class="joke-item-text">
                <p>${joke.text}</p>
                <small style="color: #999;">${joke.timestamp}</small>
            </div>
            <div class="joke-item-actions">
                <button class="joke-item-btn" onclick="addToFavorites()" title="Add to favorites">
                    <i class="far fa-heart"></i>
                </button>
                <button class="joke-item-btn" onclick="copyToClipboard('${joke.text.replace(/'/g, "\\'")}')">" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Filter Jokes
function filterJokes(type) {
    selectedType = type;
    updateFilterButtons();
    getRandomJoke();
}

// Toggle Filter Menu
function toggleJokeType() {
    const menu = document.getElementById('filterMenu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

// Update Filter Buttons
function updateFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const typeMap = {
        'all': 0,
        'general': 1,
        'programming': 2,
        'knock-knock': 3
    };

    const activeBtn = document.querySelectorAll('.filter-btn')[typeMap[selectedType]];
    if (activeBtn) activeBtn.classList.add('active');

    document.getElementById('typeFilter').textContent = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
}

// Share Joke
function shareJoke() {
    if (!currentJoke) {
        showToast('No joke to share!');
        return;
    }

    const text = `Check out this joke: "${currentJoke.text}" 😂`;

    if (navigator.share) {
        navigator.share({
            title: 'Funny Joke',
            text: text
        }).catch(err => console.log('Share failed:', err));
    } else {
        copyToClipboard(text);
    }

    jokeStats.shared++;
    updateStats();
    saveToStorage();
    showToast('Joke copied to clipboard! 📋');
}

// Copy Joke
function copyJoke() {
    if (!currentJoke) {
        showToast('No joke to copy!');
        return;
    }

    copyToClipboard(currentJoke.text);
    showToast('Joke copied to clipboard! 📋');
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Update Statistics
function updateStats() {
    document.getElementById('jokeCount').textContent = jokeStats.loaded;
    document.getElementById('favoriteCount').textContent = jokeStats.favorited;

    // Calculate average rating
    const avgRating = jokeStats.ratings.length > 0
        ? (jokeStats.ratings.reduce((a, b) => a + b, 0) / jokeStats.ratings.length).toFixed(1)
        : 0.0;
    document.getElementById('avgRating').textContent = avgRating;

    document.getElementById('shareCount').textContent = jokeStats.shared;
}

// Clear Favorites
function clearFavorites() {
    if (favorites.length === 0) {
        showToast('No favorites to clear!');
        return;
    }

    if (confirm('Are you sure you want to clear all favorites?')) {
        favorites = [];
        jokeStats.favorited = 0;
        updateStats();
        updateFavoritesList();
        saveToStorage();
        showToast('Favorites cleared!');
    }
}

// Clear History
function clearHistory() {
    if (history.length === 0) {
        showToast('No history to clear!');
        return;
    }

    if (confirm('Are you sure you want to clear all history?')) {
        history = [];
        updateHistoryList();
        saveToStorage();
        showToast('History cleared!');
    }
}

// Show Loading Spinner
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    const card = document.getElementById('jokeCard');
    if (show) {
        spinner.style.display = 'block';
        card.style.display = 'none';
    } else {
        spinner.style.display = 'none';
        card.style.display = 'flex';
    }
}

// Show Error Message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorDiv.style.display = 'flex';
}

// Hide Error Message
function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Save to LocalStorage
function saveToStorage() {
    localStorage.setItem('jokeGeneratorData', JSON.stringify({
        favorites,
        history,
        jokeStats
    }));
}

// Load from LocalStorage
function loadFromStorage() {
    const data = localStorage.getItem('jokeGeneratorData');
    if (data) {
        const parsed = JSON.parse(data);
        favorites = parsed.favorites || [];
        history = parsed.history || [];
        jokeStats = parsed.jokeStats || jokeStats;
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(event) {
    // Press spacebar to get new joke
    if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        getRandomJoke();
    }
    // Press 'F' to favorite
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        addToFavorites();
    }
});

// Initialize with first joke
window.addEventListener('load', function() {
    getRandomJoke();
});