
let divProductos = document.getElementById("animes")

//▼Fetch a pagina Anime Naruto ►primer API con método GET

fetch('https://animechan.vercel.app/api/quotes/anime?title=naruto&page=2')
    .then(response => response.json())
    .then((quotes) => {
        console.log(quotes)
        for (let anime of quotes) {
            let divAnimes = document.createElement("div")
            divAnimes.innerHTML = `<div id="animes">
                <div class="card-body">
                    <h5 class="card-title">${anime.character}</h5>
                    <p class="">${anime.quote}</p>
                    <p class="">Anime: ${anime.anime}</p>
                </div>
            </div>`
            divProductos.appendChild(divAnimes)
        }
    });
