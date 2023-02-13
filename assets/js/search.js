document.addEventListener("DOMContentLoaded", function () {
  let apikey = "dc41fd53";

  let confetti = new Confetti('search');
  confetti.setCount(500);
  confetti.setSize(1);
  confetti.setPower(100);
  confetti.setFade(false);
  confetti.destroyTarget(false);

  document.getElementById("movieForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const imagePath = 'assets/img/image-not-found-scaled.png'
    let movie = document.getElementById("movie").value;
    let year = document.getElementById("year").value;
    let result = "";
    let image = "";
    let url = "http://www.omdbapi.com/?apikey=" + apikey;
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url + "&s=" + movie + "&y=" + year);
    xhr.onload = function () {
      if (xhr.status === 200) {

        let data = JSON.parse(xhr.responseText);
        for (film of data.Search) {
          if ("${data.poster}") {
            image = `<img style="float:left" class=img-thumbnail width="200" height=200 src="${film.Poster}"/>`
          };
          result = `
              <img style="float:left" class=img-thumbnail width="200" height=200 src="${film.Poster ? film.Poster : imagePath }" />
              <h2>${film.Title}</h2>:
              <h2>${film.Year}</h2>
         <h2></h2>
        `;
          document.getElementById("result").innerHTML += result;
        }
      }
    };
    xhr.send();
  });
});