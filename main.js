// ready
$(() => preventForm());

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
