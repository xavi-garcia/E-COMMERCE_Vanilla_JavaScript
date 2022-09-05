//Crear función para mostrar productos en carrito
const cartContainer = document.getElementById('cart-container');
const counter = document.getElementById('counter');
const totalPrice = document.getElementById('totalPrice');
const shoppingCart = [];



function addToCart(prodId){
    const inCart = shoppingCart.some((prod) => prod.id === prodId); // some is better than filter since it returns true or false
    if(inCart){
        let prod = products.find(prod =>{
            if(prod.id === prodId){
                prod.quantity++
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
                        <p>Price: ${product.price}</p> 
                        <button onclick= "addFromCart(${product.id})">+</button><p id="paragraphQuantity">${product.quantity}</p><button>-</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProd(${product.id})">x</button>
                        `
       cartContainer.appendChild(div);
       counter.innerText = shoppingCart.reduce((accum, item)=> accum + item.quantity , 0);
       product.quantity = 1
    //    let quantParagraph = document.getElementById(`quantity${product.id}`);
    //    quantParagraph.addEventListener('click', () =>{
    //     addFromCart()
    //    })
   
    })
    totalPrice.innerText = shoppingCart.reduce((accum, item) => accum + item.quantity * item.price , 0);
    localStorage.setItem("products",JSON.stringify(shoppingCart));
}



function deleteProd(prodId){
    let prod = shoppingCart.filter((prod) => prod.id === prodId);
    let index = shoppingCart.indexOf(prod);
    shoppingCart.splice(index, 1);
    updateCart()
}

function addFromCart(prodID){
    let quantity = document.getElementById('paragraphQuantity');
    quantity.innerText = ""
    const isInCart = shoppingCart.some((prod) => prod.id === prodID); // some is better than filter since it returns true or false
    if(isInCart){
        let p = shoppingCart.map(p =>{
            if(p.id === prodID){
                quantity.innerText = p.quantity++
            } 
        })
        
    } 
    updateCart()
}

// function addFromCart(){
//     let quantity = document.getElementById('paragraphQuantity');
//     quantity.innerText = "";
//     shoppingCart.map(prod => {
//         prod.quantity ++
//     })
//     updateCart()
// }