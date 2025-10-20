const searchBtn = document.getElementById('search-btn')
const searchList = document.getElementById('search-list')
const exploreEl = document.getElementById('explore')
const apiKey = `93fc3d84`;

// Only attach search handler on pages that have the search button
if (searchBtn) {
    searchBtn.addEventListener('click', handleFetch)
}

// Use event delegation for dynamically created buttons
document.addEventListener('click', function(e){
    if(e.target.closest('.watch-list-btn')){
        const movieId = e.target.closest('.watch-list-btn').dataset.watchlist
        addToWatchlist(movieId)
    }
})

async function handleFetch(){
    
    const userInputValue = document.getElementById('user-input').value
    const formattedInput = userInputValue.split(' ').join('+')

    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${formattedInput}`)
    const data = await response.json()
        if(data.Response === 'True') {
            exploreEl.style.display = 'none'
            const movieIds = data.Search.map(movieId => movieId.imdbID)

        // Clear the search list first and remove placeholder content
            searchList.innerHTML = ''

            movieIds.forEach(movieId => {
                fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
                    .then(res => res.json())
                    .then(movie => { 
                        // Create HTML for this single movie
                        movieHTML = `
                            <div class="movie-container">
                                <div>
                                    <img src="${movie.Poster}">
                                </div>
                                <div class="movie-details">
                                    <div class="movie-title">
                                        <h2>${movie.Title}</h2>
                                        <i class="fa-solid fa-star"></i> 
                                        <p>${movie.imdbRating}</p>
                                    </div>
                                    <div class="movie-runtime">
                                        <p>${movie.Runtime}</p>
                                        <p>${movie.Genre}</p>
                                        <div class="watch-list-btn" role="button" id="watch-list" data-watchlist="${movie.imdbID}">
                                            <i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p>
                                        </div>
                                    </div>
                                    <div class="movie-plot">
                                        <p>${movie.Plot}</p>
                                    </div>
                                    
                                </div>
                            </div>
                            <hr>`
                        
                        searchList.innerHTML += movieHTML
                    })
            });
        } else {
            exploreEl.innerHTML = `<p>Unable to find what you’re looking for. Please try another search.</p>`
        }
        
        
}

function addToWatchlist(movieId) {
    console.log('Adding movie to watchlist:', movieId)
    
    // Get existing watchlist from localStorage or create empty array
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    
    // Check if movie is already in watchlist
    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        console.log('Movie added to watchlist!')
        
        // Update button to show it's been added
        const button = document.querySelector(`[data-watchlist="${movieId}"]`)
        if (button) {
            button.innerHTML = '<i class="fa-solid fa-check"></i> <p>Added</p>'
        }
    } else {
        console.log('Movie is already in watchlist')
    }
}

function renderWatchlist() {
    console.log('renderWatchlist function called')
    const watchlistContainer = document.getElementById('movies-to-watch')
    
    if (!watchlistContainer) {
        console.log('Not on watchlist page - container not found')
        return
    }
    
    console.log('Found watchlist container')
    
    // Get watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    console.log('Watchlist from localStorage:', watchlist)
    
    if (watchlist.length === 0) {
        console.log('Watchlist is empty, showing empty state')
        watchlistContainer.innerHTML = `
            <div class="empty-watchlist">
               
                <p>Your watchlist is looking a little empty...</p>
                <div>
                    <i class="fa-solid fa-circle-plus"></i>
                    <p>Let’s add some movies!</p>
                </div>
                
            </div>
        `
        return
    }
    
    // Clear existing content
    watchlistContainer.innerHTML = ''
    
    // Fetch and render each movie
    console.log('Starting to fetch movies for watchlist')
    watchlist.forEach((movieId, index) => {
        console.log(`Fetching movie ${index + 1}: ${movieId}`)
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
            .then(res => res.json())
            .then(movie => {
                console.log('Movie fetched successfully:', movie.Title)
                const movieHTML = `
                    <div class="movie-container">
                        <div>
                            <img src="${movie.Poster}">
                        </div>
                        <div class="movie-details">
                            <div class="movie-title">
                                <h2>${movie.Title}</h2>
                                <i class="fa-solid fa-star"></i> 
                                <p>${movie.imdbRating}</p>
                            </div>
                            <div class="movie-runtime">
                                <p>${movie.Runtime}</p>
                                <p>${movie.Genre}</p>
                                <div class="remove-btn" role="button" data-remove="${movie.imdbID}">
                                    <i class="fa-solid fa-circle-minus"></i> <p>Remove</p>
                                </div>
                            </div>
                            <div class="movie-plot">
                                <p>${movie.Plot}</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                `
                watchlistContainer.innerHTML += movieHTML
                console.log('Movie HTML added to container')
            })
            .catch(error => {
                console.error('Error fetching movie:', error)
            })
    })
}

// Add event listener for remove buttons
document.addEventListener('click', function(e){
    if(e.target.closest('.remove-btn')){
        const movieId = e.target.closest('.remove-btn').dataset.remove
        removeFromWatchlist(movieId)
    }
})

function removeFromWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    watchlist = watchlist.filter(id => id !== movieId)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    
    // Re-render the watchlist
    renderWatchlist()
    
    console.log('Movie removed from watchlist')
}

// Check if we're on the watchlist page and render movies
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the watchlist page by looking for the specific container
    const watchlistContainer = document.getElementById('movies-to-watch')
    if (watchlistContainer) {
        console.log('On watchlist page, rendering movies...')
        console.log('Current localStorage watchlist:', localStorage.getItem('watchlist'))
        renderWatchlist()
    } else {
        console.log('Not on watchlist page')
    }
})
    






            