const searchResultDisplay = document.querySelector('.search-results');
const searchForm = document.querySelector('#theForm');
const keywords = document.querySelector('#keywords');
const searchBtn = document.querySelector('#searchBtn');

let searchQuery = "";

searchForm.addEventListener('submit', searchKeyword);
searchBtn.addEventListener('click', searchKeyword);


async function searchKeyword(e) {
    e.preventDefault();

    (keywords.value !== "") ?
        searchQuery = keywords.value.trim() :
        alert('Try some keywords in the search area before submitting.')

    const URL_SEARCH = `${URL_BASE}search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

    try {
        const res = await (await fetch(URL_SEARCH)).json();

        if (res.total_results === 0) {
            let err = document.querySelector('.error-message');
            err.style.display = "unset"
        }

        const DomElements = document.querySelectorAll('.hero, #playing_now, #upcoming, #top_rated');
        for (let div of DomElements) div.style.display = "none";

        searchResultDisplay.innerHTML = "";

        for (let movie of res.results) {
            let thePosterUrl = "";

            movie.poster_path === null ?
                thePosterUrl = "https://via.placeholder.com/185/000000/FFFFFF/?text=NO-IMAGE" :
                thePosterUrl = URL_IMG + movie.poster_path;

            let temp = `<div><img 
                        data-movieId="${movie.id}"
                        data-title="${movie.title}"
                        data-popularity="${movie.popularity}"
                        data-img="${thePosterUrl}" 
                        data-overview="${movie.overview}" 
                        data-vote_average="${movie.vote_average}" 
                        data-vote_count="${movie.vote_count}" 
                        data-release_date="${movie.release_date}" 
                        class="poster" src=${thePosterUrl} alt=""></div>`;

            searchResultDisplay.innerHTML += temp;
        }
    } catch (err) { console.log(err) }

    getModalData()
}