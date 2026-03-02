const id = new URLSearchParams(window.location.search).get("id");

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const productContainer = document.querySelector("#oneContainer");

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(renderProduct);
}

function renderProduct(json) {
  console.log(json);
  productContainer.innerHTML = `
      <section class="productview">
          <div>
            <img class="productimage" src="https://kea-alt-del.dk/t7/images/webp/640/${json.id}.webp" alt="Product image" />
            <span class="salelabel"></span>
          </div>
          <article class="productdetails">
            <h2>${json.productdisplayname}</h2>

            <p class="productcategory">Category: <span>${json.category}</span></p>
            <p class="articletype">Type: <span>${json.articletype}</span></p>
            <p class="productprice">DKK <span>${json.price}</span> ,-</p>

            <a class="buybutton" href="#">Buy Now</a>
          </article>
        </section>`;
}

getData();
