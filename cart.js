//Crear función para mostrar productos en carrito
const cartContainer = document.getElementById('cart-container');
const counter = document.getElementById('counter');
const totalPrice = document.getElementById('totalPrice');
const shoppingCart = [];
const fakeCart = []


function addToCart(prodId){
    
    const inCart = shoppingCart.some((prod) => prod.id === prodId); // some is better than filter since it returns true or false
    if(inCart){
        let prod = shoppingCart.map(prod =>{
            if(prod.id === prodId){
                prod.quantity++
                // counter.innerText = JSON.stringify(prod.quantity +1)
                localStorage.setItem("products",JSON.stringify(shoppingCart));
            } 
        })
        
    } else {
        let product = products.find(product => product.id === prodId);
        shoppingCart.push(product);
    }
    updateCart()
}


function updateCart (){
    cartContainer.innerHTML = "";
    counter.innerText = ""
    shoppingCart.forEach(product => {
    let div = document.createElement('div')
        div.classList.add('productInCart')
        div.innerHTML = `<p>${product.name}</p>
                        <p>Precio: ${product.price}</p> 
                        <p id="quantity${product.id}"> Quantity: ${product.quantity}</p><button>+</button>-<button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProd(${product.id})">x</button>
                        `
       cartContainer.appendChild(div);
    
       counter.innerText = shoppingCart.reduce((accum, item)=> accum + item.quantity , 0)
   
    })

    localStorage.setItem("products",JSON.stringify(shoppingCart));
    totalPrice.innerText = shoppingCart.reduce((accum, item) => accum + item.quantity * item.price , 0)
}



function deleteProd(prodId){
    let prod = shoppingCart.filter((prod) => prod.id === prodId);
    let index = shoppingCart.indexOf(prod);
    shoppingCart.splice(index, 1);
    updateCart()
}

