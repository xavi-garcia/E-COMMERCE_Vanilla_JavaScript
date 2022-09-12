const productsContainer = document.getElementById('product-container');

class Productos {
    constructor(id, name, price, img, quantity){
        this.id = id,
        this.name = name,
        this.price = price,
        this.img = img,
        this.quantity = quantity
    }

}
const products = []
const prod1 = new Productos ("1", "Zelda", 1500, "src/img/blackparadox.jpg", 1);
const prod2 = new Productos ("2", "Fragmentos del Horror", 1500, 'src/img/fragmentosdelhorror.jpg', 1);
const prod3 = new Productos ("3", "Anime", 750, 'src/img/pokemon1.jpg', 1);
const prod4 = new Productos ("4", "Pokemon 2", 750, 'src/img/pokemon2.jpg', 1);
const prod5 = new Productos ("5", "Tomie 1", 1500, "src/img/tomie1.jpg", 1);
const prod6 = new Productos ("6", "Uzumaki", 1500, "src/img/uzumaki.jpg", 1);

products.push(prod1, prod2, prod3, prod4, prod5, prod6);


const showProducts = async (products) =>{
    products.forEach( product =>{
        const card = document.createElement('card');
        card.innerHTML =""
        card.innerHTML += `<div class="card" style="width: 18rem;">
                            <img src="${product.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">Price:$ ${product.price}</p>
                               
                                <button class="btn btn-warning" id="button${product.id}">Add to Cart</button>
                            </div>
                        </div>`

        productsContainer.appendChild(card);
        const button = document.getElementById(`button${product.id}`);

        button.addEventListener('click', ()=>{
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

showProducts(products);

function filterByAlphabeticalOrder(){
    products.sort(function (x, y) {
        let a = x.name.toUpperCase(),
            b = y.name.toUpperCase();
        return a == b ? 0 : a > b ? 1 : -1;
    });
    productsContainer.innerHTML = ""
    showProducts(products)
    
};

function filterByHighToLow(){
    products.sort(function (a, b) {return b.price -  a.price } )
    productsContainer.innerHTML = ""
    showProducts(products)
};

function filterByLowToHigh(){
    products.sort(function (a, b) {return a.price -  b.price } )
    productsContainer.innerHTML = ""
    showProducts(products)
};





