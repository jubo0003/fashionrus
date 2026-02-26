const endpoint = "https://kea-alt-del.dk/t7/api/categories";
const container = document.querySelector("#linkcontainer");

function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showData);
}

//   -----^^hent data fra endpoint, vent på respons (må kaldes hvad man vil)  når vi så får respons, så vis dataen vha. json^^------

function showData(data) {
  console.log(data);
  data.forEach((category) => {
    container.innerHTML += `<a class="catcard" href="productlist.html">${category.category}</a>`;
  });
}

getData();

// -----^^vis dataen i console log og kald funktion^^--------
