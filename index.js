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

const getFetch = async () => {
    let response = await fetch('src/data/products.json');
    let items = await response.json();
    return items
}

const getProducts = async () =>{
    let items = await getFetch();
    showProducts(items);
    return items
}

setTimeout(() => {
    getProducts()
}, 3000);


async function filterByAlphabeticalOrder(){
    let items = await getFetch();
    items.sort(function (x, y) {
        let a = x.name.toUpperCase(),
            b = y.name.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
    });
    productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
    setTimeout(() => {
        productsContainer.innerHTML = ""
        showProducts(items)
    }, 3000);
    
};

async function filterByShonen(){
    let items = await getFetch();
    let category = items.filter(item => item.category === "Shonen");
    productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
    setTimeout(() => {
        productsContainer.innerHTML = ""
        showProducts(category)
    }, 3000);
};


async function filterByShojo(){
    let items = await getFetch();
    let category = items.filter(item => item.category === "Shojo");
    productsContainer.innerHTML =`<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
    setTimeout(() => {
        productsContainer.innerHTML = ""
        showProducts(category)
    }, 3000);
};

async function filterByNovel(){
    let items = await getFetch();
    let category = items.filter(item => item.category === "Novel");
    productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
    setTimeout(() => {
        productsContainer.innerHTML = ""
        showProducts(category)
    }, 3000);
};

async function filterByHighToLow(){
    let items = await getFetch();
    items.sort(function (a, b) {return b.price -  a.price } )
    productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
    setTimeout(() => {
        productsContainer.innerHTML = ""
        showProducts(items)
    }, 3000);
};

async function filterByLowToHigh(){
    let items = await getFetch();
    items.sort(function (a, b) {return a.price -  b.price } )
    productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
    setTimeout(() => {
        productsContainer.innerHTML = ""
        showProducts(items)
    }, 3000);
};

async function filterProducts(){
    let items = await getFetch();
    switch(searchInput.value){
        case "Masashi Kishimoto":
            const authorNaruto = items.filter(item => item.author == "Masashi Kishimoto");
            productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
            setTimeout(() => {
                productsContainer.innerHTML = ""
                showProducts(authorNaruto)
            }, 3000);
            break;
        case "Tatsuki Fujimoto":
            let authorChainsaw = items.filter(item => item.author == "Tatsuki Fujimoto");
            productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
            setTimeout(() => {
                productsContainer.innerHTML = ""
                showProducts(authorChainsaw)
            }, 3000);
            break;
        case "CLAMP":
            let authorClamp = items.filter(item => item.author == "CLAMP");
            productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
            setTimeout(() => {
                productsContainer.innerHTML = ""
                showProducts(authorClamp)
            }, 3000);
            break;
        case "Junji Ito":
            let authorJunjiIto = items.filter(item => item.author == "Junji Ito");
            productsContainer.innerHTML = `<img id="spinner" src="https://images.gamebanana.com/img/ico/sprays/sasuke_2.gif" alt="">`
            setTimeout(() => {
                productsContainer.innerHTML = ""
                showProducts(authorJunjiIto)
            }, 3000);
            break;
        case "Ai Yazawa":
            let authorNana = items.filter(item => item.author == "Ai Yazawa");
            productsContainer.innerHTML = `<img id="spinner" src="https://thumbs.gfycat.com/PointedAnxiousAngwantibo-max-1mb.gif" alt="">`
            setTimeout(() => {
                productsContainer.innerHTML = ""
                showProducts(authorNana)
            }, 3000);
            break;
        default:
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No reasults were found for your search',
              })
    }

};
