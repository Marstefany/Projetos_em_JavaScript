// Seleciona os elementos do DOM
let movieNameRef = document.getElementById("movie-name"); // Campo de entrada para o nome do filme
let searchBtn = document.getElementById("search-btn"); // Botão de busca
let result = document.getElementById("result"); // Contêiner onde os resultados serão exibidos

// Função para buscar dados do filme da API
let getMovie = () => {
    let movieName = movieNameRef.value; // Obtém o valor do campo de entrada
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`; // URL da API com o nome do filme

    // Verifica se o campo de entrada está vazio
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`; // Mensagem se o campo estiver vazio
    }
    // Se o campo não estiver vazio
    else {
        fetch(url) // Faz a requisição para a API
            .then((resp) => resp.json()) // Converte a resposta em JSON
            .then((data) => {
                // Verifica se o filme existe no banco de dados
                if (data.Response == "True") {
                    result.innerHTML = `
                        <div class="info">
                            <img src=${data.Poster} class="poster"> <!-- Pôster do filme -->
                            <div>
                                <h2>${data.Title}</h2> <!-- Título do filme -->
                                <div class="rating">
                                    <img src="img/star.png"> <!-- Imagem de estrela para a classificação -->
                                    <h4>${data.imdbRating}</h4> <!-- Classificação IMDb -->
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span> <!-- Classificação do filme -->
                                    <span>${data.Year}</span> <!-- Ano de lançamento -->
                                    <span>${data.Runtime}</span> <!-- Duração do filme -->
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div> <!-- Gêneros do filme -->
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p> <!-- Sinopse do filme -->
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p> <!-- Elenco do filme -->
                    `;
                }
                // Se o filme não existir no banco de dados
                else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`; // Mensagem de erro
                }
            })
            // Se ocorrer um erro na requisição
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`; // Mensagem de erro
            });
    }
};

// Adiciona um evento de clique ao botão de busca
searchBtn.addEventListener("click", getMovie);
// Adiciona um evento de carregamento da janela para buscar o filme
window.addEventListener("load", getMovie);
