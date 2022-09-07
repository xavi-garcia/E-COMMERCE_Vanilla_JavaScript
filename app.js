//Modal
const modalContainer = document.getElementById('modal_container');
const openCart = document.getElementById('open');
const closeCart = document.getElementById('close');
const modalCart = document.getElementById('modalCart');


openCart.addEventListener('click', ()=>{
    modalContainer.classList.toggle('modal-active')
});
closeCart.addEventListener('click', ()=>{
    modalContainer.classList.remove('modal-active')
});
modalContainer.addEventListener('click',() =>{
    closeCart.click();
});
modalCart.addEventListener('click', (e) =>{
    e.stopPropagation();
});


// Inventario de productos
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
const prod1 = new Productos ("1", "Black Paradox", 1500, "src/img/blackparadox.jpg", 1);
const prod2 = new Productos ("2", "Fragmentos del Horror", 1500, 'src/img/fragmentosdelhorror.jpg', 1);
const prod3 = new Productos ("3", "Pokemon 1", 750, 'src/img/pokemon1.jpg', 1);
const prod4 = new Productos ("4", "Pokemon 2", 750, 'src/img/pokemon2.jpg', 1);
const prod5 = new Productos ("5", "Tomie 1", 1500, "src/img/tomie1.jpg", 1);
const prod6 = new Productos ("6", "Uzumaki", 1500, "src/img/uzumaki.jpg", 1);

products.push(prod1, prod2, prod3, prod4, prod5, prod6);



//Crear una función para traer los productos

const mostrarProductos = async (products) =>{
    
    const productsContainer = document.getElementById('product-container');
    products.forEach( product =>{
        const card = document.createElement('card');
        card.innerHTML += `<div class="card" style="width: 18rem;">
                            <img src="${product.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">Price:$ ${product.price}</p>
                               
                                <button class="btn btn-primary" id="button${product.id}">Buy</button>
                            </div>
                        </div>`

        productsContainer.appendChild(card);
        const button = document.getElementById(`button${product.id}`);

        
        button.addEventListener('click', ()=>{
            addToCart(`${product.id}`);
            alert(`Agregaste ${product.name}`);
        })
    })
}

mostrarProductos(products);







