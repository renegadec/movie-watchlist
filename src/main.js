const searchBtn = document.getElementById('search-btn')
const searchList = document.getElementById('search-list')
const apiKey = `93fc3d84`;

searchBtn.addEventListener('click', handleFetch)

function handleFetch(){
    
    const userInputValue = document.getElementById('user-input').value
    const formattedInput = userInputValue.split(' ').join('+')

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${formattedInput}`)
    .then(res => res.json())
    .then(data => {
        
        const movieIds = data.Search.map(movieId => movieId.imdbID)
        
        // Clear the search list first and remove placeholder content
        searchList.innerHTML = ''

        movieIds.forEach(movieId => {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
                .then(res => res.json())
                .then(movie => { 
                    // Create HTML for this single movie
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
                                    <div class="watch-list-btn">
                                        <i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p>
                                    </div>
                                    
                                </div>
                                <div class="movie-plot">
                                    <p>${movie.Plot}</p>
                                </div>
                            </div>    
                        </div>`
                    
                    searchList.innerHTML += movieHTML
                })
        });
        
    })
    
}





            