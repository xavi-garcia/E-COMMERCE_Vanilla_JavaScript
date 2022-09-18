const productsContainer = document.getElementById('product-container');
const searchInput = document.getElementById('mySearch');

const showProducts = async (products) =>{
    products.forEach( product =>{
        const card = document.createElement('card');
        card.innerHTML =""
        card.innerHTML += `<div class="card" style="width: 18rem;">
                            <img src="${product.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text"><strong>${product.author}</strong></p>
                                <p class="card-text">Price: $${product.price}</p>
                                <button class="btn btn-warning" id="button${product.id}">Add to Cart</button>
                            </div>
                        </div>`

        productsContainer.appendChild(card);
        const button = document.getElementById(`button${product.id}`);

        button.addEventListener('click', ()  =>{
            addToCart(`${product.id}`);
            Toastify({
                text: `"You added ${product.name}"`,
                duration: 2000,
                className: "info",
                style: {
                  background: "linear-gradient(to right, #ffd700, #ffff00)",
                  color: "black"
                }
              }).showToast();
        })
    })
}

const getProducts = async () =>{
    let response = await fetch('src/data/products.json');
    let items = await response.json();
    showProducts(items);
    return items
}

getProducts()

async function filterByAlphabeticalOrder(){
    let response = await fetch('src/data/products.json');
    let items = await response.json()
    items.sort(function (x, y) {
        let a = x.name.toUpperCase(),
            b = y.name.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
    });
    productsContainer.innerHTML = ""
    showProducts(items)
    
};

async function filterByShonen(){
    let response = await fetch('src/data/products.json');
    let items = await response.json();
    let category = items.filter(item => item.category === "Shonen");
    productsContainer.innerHTML = ""
    showProducts(category)
};


async function filterByShojo(){
    let response = await fetch('src/data/products.json');
    let items = await response.json();
    let category = items.filter(item => item.category === "Shojo");
    productsContainer.innerHTML = ""
    showProducts(category)
};

async function filterByNovel(){
    let response = await fetch('src/data/products.json');
    let items = await response.json();
    let category = items.filter(item => item.category === "Novel");
    productsContainer.innerHTML = ""
    showProducts(category)
};

async function filterByHighToLow(){
    let response = await fetch('src/data/products.json');
    let items = await response.json()
    items.sort(function (a, b) {return b.price -  a.price } )
    productsContainer.innerHTML = ""
    showProducts(items)
};

async function filterByLowToHigh(){
    let response = await fetch('src/data/products.json');
    let items = await response.json()
    items.sort(function (a, b) {return a.price -  b.price } )
    productsContainer.innerHTML = ""
    showProducts(items)
};

async function filterProducts(){
    let response = await fetch('src/data/products.json');
    let items = await response.json()
    switch(searchInput.value){
        case "Masashi Kishimoto":
            const authorNaruto = items.filter(item => item.author == "Masashi Kishimoto");
            productsContainer.innerHTML = ""
            showProducts(authorNaruto)
            break;
        case "Tatsuki Fujimoto":
            let authorChainsaw = items.filter(item => item.author == "Tatsuki Fujimoto");
            productsContainer.innerHTML = ""
            showProducts(authorChainsaw)
            break;
        case "CLAMP":
            let authorClamp = items.filter(item => item.author == "CLAMP");
            productsContainer.innerHTML = ""
            showProducts(authorClamp)
            break;
        case "Junji Ito":
            let authorJunjiIto = items.filter(item => item.author == "Junji Ito");
            productsContainer.innerHTML = ""
            showProducts(authorJunjiIto)
            break;
        case "Ai Yazawa":
            let authorNana = items.filter(item => item.author == "Ai Yazawa");
            productsContainer.innerHTML = ""
            showProducts(authorNana)
            break;
        default:
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No reasults were found for your search',
              })
    }

};
