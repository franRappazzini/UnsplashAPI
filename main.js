// ready
$(() => {
  preventForm();
  darkMode();
});

// -----var para
let result = [];

// -----detiene el envio del form-----
function preventForm() {
  $("#formBusqueda").submit((e) => {
    e.preventDefault();

    if ($("input").val() != "") {
      // borra el contenido del contenedor de las img
      $(".container__img").empty();

      // borra el texto de bienvenida
      $(".bienvenida__container").empty();

      // muestra el loader
      $(".bienvenida__container").append(
        `<h2 class="loader__text">Cargando...</h2>`
      );

      getAPI();

      darkMode();
    }

    $("input").val("");
  });
}

// -----obtengo datos de api-----
function getAPI() {
  let input = $("input").val();

  console.log(input);

  const URL = `https://api.unsplash.com/search/photos?query=${input}&per_page=30&client_id=QmrcJpawWYemWpTniO6pqBzZDMwa0NAeRYTNzSbTFPE`;

  $.get(URL, (request, state) => {
    if (state === "success") {
      $(".bienvenida__container").empty();

      result = [];

      // pusheo datos a 'result'
      request.results.forEach((r) => result.push(r));

      console.log(result);
      console.log(result[0].urls);

      render();

      // para sacar el loader
      $(".bienvenida__container").empty();
    }
  });
}

// -----renderiza las img-----
function render() {
  result.forEach((e) => {
    $(".container__img").append(
      `<img src="${e.urls.regular}" alt="${e.alt_description}" />`
    );

    // para abrir la img en otra ventana
    $("img").click(() => {
      window.open(e.links.download, "_blank");
    });
  });
}

function darkMode() {
  // para que aplique automaticamente el dark mode si lo dejo asi el user
  localStorage.getItem("DarkMode") === "on" ? darkModeON() : darkModeOFF();

  $("#darkMode").click(() => darkModeON());

  $("#lightMode").click(() => darkModeOFF());
}

// -----funciones del dark mode encendido-----
function darkModeON() {
  $("#darkMode").hide();
  $("#lightMode").show();

  $("body").addClass("dark-mode-intenso");
  $("header").addClass("dark-mode-suave");
  $("header").css("box-shadow", "none");
  $("p, a, h1, h2, h6").addClass("dark-mode-light");
  $("#svgSearch").css("fill", "white");

  // guardo en el localStorage asi queda activado hasta que sea desactivado manualmente
  localStorage.setItem("DarkMode", "on");
}

// -----funciones del dark mode apagado-----
function darkModeOFF() {
  $("#lightMode").hide();
  $("#darkMode").show();

  $("body").removeClass("dark-mode-intenso");
  $("header").removeClass("dark-mode-suave");
  $("header").css("box-shadow", "0px 0px 3px grey");
  $("p, a, h1, h2, h6").removeClass("dark-mode-light");
  $("#svgSearch").css("fill", "black");

  // lo elimino del localStorage
  localStorage.removeItem("DarkMode");
}
