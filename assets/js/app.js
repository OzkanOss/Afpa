const form = document.querySelector('form');
const ajouter = document.querySelector('#ajouter');
const sauvegarder = document.querySelector("#sauvegarder");
const tri = document.querySelector("#tri");

// let btnTitle = document.getElementById("btnTitle");
// let btnYear = document.getElementById("btnYear");

const afficher = () => {
  form.classList.toggle('d-none');
  ajouter.classList.toggle('ajouter')
}

ajouter.addEventListener('click', afficher)

const films = [{
    name: "Deadpool",
    years: 2016,
    authors: "Tim Miller"
  },
  {
    name: "Spiderman",
    years: 2002,
    authors: "Sam Raimi"
  },
  {
    name: "Scream",
    years: 1996,
    authors: "Wes Craven"
  },
  {
    name: "It: chapter 1",
    years: 2019,
    authors: "Andy Muschietti"
  }
];

const displayFilms = () => {
  const table = document.getElementById("films-table");
  let tableBody = "";
  films.forEach((film) => {
    tableBody += `<tr>
      <td>${film.name}</td>
      <td>${film.years}</td>
      <td>${film.authors}</td>
      <td><input type="button" class="remove-button" value="❌">
    </tr>`;
  });
  table.innerHTML = tableBody;
};

displayFilms();

let btnSupprimer = document.querySelectorAll('.remove-button')
btnSupprimer.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log("Supprimer");
  })

})

const addFilm = () => {
  const titleInput = document.getElementById("title-input");
  const yearInput = document.getElementById("year-input");
  const authorInput = document.getElementById("author-input");
  const title = titleInput.value.trim();
  const year = yearInput.value.trim();
  const author = authorInput.value.trim();
  if (!validateForm(title, year, author)) {
    return;
  }

  films.push({
    name: title[0].toUpperCase() + title.slice(1),
    years: parseInt(year),
    authors: author[0].toUpperCase() + author.slice(1),
  });


  //form.reset()
  titleInput.value = "";
  yearInput.value = "";
  authorInput.value = "";

  displayFilms()
  showAlert("Film ajouté avec succès", 3000);
};
sauvegarder.addEventListener('click', addFilm)

const validateForm = (title, year, author) => {
  let isValid = true
  let message = ""

  if (title.length < 2) {
    message += "Erreur dans le formulaire: Titre doit avoir au moins 2 caractères <br>";
    isValid = false;
  }
  if (year.length !== 4 || year < 1900 || year > new Date().getFullYear()) {
    message += "Erreur dans le formulaire: Année doit être un format 4 chiffres compris entre 1900 et l'année en cours <br>";
    isValid = false;
  }
  if (author.length < 5) {
    message += "Erreur dans le formulaire: Auteur doit avoir au moins 5 caractères <br>";
    isValid = false;
  }

  if (!isValid) {
    showAlert(message, 5000)
  }

  return isValid;
};

const showAlert = (message, duration) => {
  const alertBox = document.getElementById("alert");
  alertBox.innerHTML = message;
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
  }, duration);
};

tri.addEventListener('change', function (e) {
  if (this.value === 'year') {
    films.sort((a, b) => {
      return a.years - b.years
    })
  } else if (this.value === 'alpha') {
    films.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
  }
  displayFilms()
})