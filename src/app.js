document.addEventListener("init", function (event) {
  console.log(event);
  var page = event.target;

  if (page.id === "mainpage") {
    page.querySelector("#detaillist").onclick = function (event) {
      document
        .querySelector("#pageNav")
        .pushPage("nextpage", { data: { title: event.target.innerHTML } });
    };
  } else if (page.id === "nextpage") {
    async function getSecondApiData(url) {
      const receive = await fetch(url);
      const data = await receive.json();

      document.querySelector("#title").innerHTML = event.target.data.title;

      document.querySelector("#pokemonImages").src =
        data.sprites.other.dream_world.front_default;

      for (let i = 0; i < 6; i++) {
        document.querySelector("#effort" + (i + 1)).innerHTML =
          data.stats[i].effort;
        document.querySelector("#baseStat" + (i + 1)).innerHTML =
          data.stats[i].base_stat;
      }

      for (let i = 0; i < data.types.length; i++) {
        document.querySelector(
          "#type" + (i + 1)
        ).innerHTML += `<ons-list-item><p id="type" style="margin:0; text-transform: capitalize;">${data.types[i].type.name}</p></ons-list-item>`;
      }
    }

    async function getFirstApiData(url) {
      var pokeName = page.data.title;
      var pokeUrl;

      const receive = await fetch(url);
      const data = await receive.json();

      for (let i = 0; i < 100; i++) {
        if (pokeName === data.results[i].name) {
          pokeUrl = data.results[i].url;
          break;
        }
      }

      document.querySelector("#pokename").innerHTML += `<p id="pokename">${pokeName}</p>`;

      var sUrl = getSecondApiData(pokeUrl);
    }

    const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=100";
    var url = getFirstApiData(apiURL);
  }
});

ons.ready(() => {
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=100";
  const list = document.getElementById("pokemonList");

  async function getapi(url) {

    const receive = await fetch(url);

    const data = await receive.json();

    for (let i = 0; i < 100; i++) {
      show(data.results);
    }
  }

  getapi(apiURL);

  function show(data) {
    var dataList = [];

    // Loop for displaying the List of Pokemons
    for (let r of data) {
      dataList += `<ons-list-item modifier="chevron" tappable>${r.name}</ons-list-item>`;
    }

    // Setting innerHTML as tab variable
    document.getElementById("detaillist").innerHTML = dataList;
  }
});