const urlcategory = new URLSearchParams(window.location.search).get("category");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${urlcategory}`;

const container = document.querySelector("#productcontainer");

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(json) {
  let markup = "";

  console.log(json);
  json.forEach((element) => {
    console.log(element);
    markup += `
    <a href="product.html">
            <article class="smallproduct">
              <div class="soldout">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="Product image" />
                <p class="soldout-text">Sold Out</p>
              </div>
              <div class="cardtext">
                <h3>${element.productdisplayname}</h3>
                <p class="subtle">Tshirts | Nike</p>
                <div class="flex-discount">
                  <div>
                    <p class="price">
                      DKK
                      <span>${element.price}</span>
                      ,-
                    </p>
                  </div>

                  <div class="discounted">
                    <p>
                      Now DKK
                      <span>795</span>
                      ,-
                    </p>
                    <p class="percentage">
                      <span>10</span>
                      %
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </a>`;
  });

  container.innerHTML = markup;
}

getData();
