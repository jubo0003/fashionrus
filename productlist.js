const urlcategory = new URLSearchParams(window.location.search).get("category");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${urlcategory}&limit=50`;

const container = document.querySelector("#productcontainer");

let allData; //erklær variabel til alle produkter
let udsnit; //erklær variabel til et udsnit

document
  .querySelectorAll("#filtrer button")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll("#sorter button")
  .forEach((knap) => knap.addEventListener("click", sorter));

function getData() {
  fetch(endpoint)
    .then((res) => res.json()) // -> new promise
    .then((data) => {
      allData = udsnit = data; //gem alle produkter
      // ^ samme som at skrive
      // allData = data
      // udsnit = data
      showProducts(allData); //vis alle produkter
    });
}

getData();

function filter(e) {
  const valgt = e.target.textContent;
  console.log(valgt);
  //console.table(allData);
  if (valgt == "All") {
    udsnit = allData; //sæt udsnit = alle produkter
    showProducts(allData);
  } else {
    udsnit = allData.filter((element) => element.gender == valgt); //filtrer produkter
    showProducts(udsnit); //vis filtrerede produkter
  }
}

function sorter(e) {
  if (!udsnit) return;
  if (e.target.dataset.price) {
    const dir = e.target.dataset.price;
    if (dir == "acc") {
      udsnit.sort((a, b) => a.price - b.price);
    } else {
      udsnit.sort((a, b) => b.price - a.price);
    }
  } else {
    //ellers sorter alfabetisk
    const dir = e.target.dataset.text; //læs retning "az" eller "za"
    if (dir == "az") {
      udsnit.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      udsnit.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }
  showProducts(udsnit);
}

function showProducts(json) {
  if (!json) return;

  let markup = "";

  console.log({ json });
  json.forEach((element) => {
    console.log(element);
    markup += `
    <a href="product.html?id=${element.id}">
            <article class="smallproduct" >
              <div class="${element.soldout && "soldout"}">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="Product image" />
                ${element.soldout ? `<p class="soldout-text"}">Sold Out</p>` : ""}
              </div>
              <div class="cardtext">
                <h3>${element.productdisplayname}</h3>
                <p class="subtle">${element.articletype} | ${element.brandname}</p>
                <div class="flex-discount">
                  <div>
                    <p class="price">
                      DKK
                      <span class="${element.discount && "strike"}">${element.price}</span>
                      ,-
                    </p>
                  </div>

                  ${
                    element.discount
                      ? `<div class="discounted">
                    <p>
                      Now DKK
                      <span>${Math.round(element.price - (element.price * element.discount) / 100)}</span>
                      ,-
                    </p>
                    <p class="percentage">
                      <span>${element.discount}</span>
                      %
                    </p>`
                      : ""
                  }
                  </div>
                </div>
              </div>
            </article>
          </a>`;
  });

  container.innerHTML = markup;
}
