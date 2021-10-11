// ready
$(() => preventForm());

let result = [];

function preventForm() {
  $("#formBusqueda").submit((e) => {
    $(".container__img").empty();

    e.preventDefault();

    getAPI();

    $("input").val("");
  });
}

function getAPI() {
  let input = $("input").val();

  console.log(input);

  const URL = `https://api.unsplash.com/search/photos?query=${input}&per_page=30&client_id=QmrcJpawWYemWpTniO6pqBzZDMwa0NAeRYTNzSbTFPE`;

  $.get(URL, (request, state) => {
    if (state === "success") {
      // console.log(request.results);
      result = [];

      request.results.forEach((r) => result.push(r));

      console.log(result);
      console.log(result[0].urls);

      render();
    }
  });
}

function render() {
  // borra el texto de bienvenida
  $(".bienvenida__container").remove();

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
