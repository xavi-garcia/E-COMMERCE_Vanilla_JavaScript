const cartContainer = document.getElementById('cart-container');
const counter = document.getElementById('counter');
const totalPrice = document.getElementById('totalPrice');
const buttonDeleteAll = document.getElementById('emptyCart');
const shoppingCart = [];


function addToCart(prodId){
    const inCart = shoppingCart.some((prod) => prod.id === prodId); // some is better than filter since it returns true or false
    if(inCart){
        let prod = shoppingCart.map(prod =>{
            if(prod.id === prodId){
                prod.quantity++
            } 
        })  
    } else {
        let product = products.find(product => product.id === prodId);
        product.quantity = 1
        shoppingCart.push(product);
    }
    updateCart()
}

function addFromCart(prodId){
    const inCart = shoppingCart.some((prod) => prod.id === prodId); // some is better than filter since it returns true or false
    if(inCart){
        let prod = shoppingCart.map(prod =>{
            if(prod.id === prodId){
                prod.quantity++
            } 
        })
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
                        <button id="quantity${product.id}">+</button><p id="paragraphQuantity">${product.quantity}</p><button id="deleteQuantity${product.id}">-</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProd(${product.id})">x</button>
                        `
       cartContainer.appendChild(div);
       counter.innerText = shoppingCart.reduce((accum, item)=> accum + item.quantity , 0);
       
       const addProdCart = document.getElementById(`quantity${product.id}`);
       addProdCart.addEventListener('click', () =>{
        addFromCart(`${product.id}`)
       })

       const deleteFromCart = document.getElementById(`deleteQuantity${product.id}`);
       deleteFromCart.addEventListener('click', () =>{
        deleteProdFromCart(`${product.id}`)
       })
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

function deleteProdFromCart(prodId){
    const inCart = shoppingCart.some((prod) => prod.id === prodId); // some is better than filter since it returns true or false
    if(inCart){
        let prod = shoppingCart.map(prod =>{
            if(prod.id === prodId && prod.quantity > 0){
                prod.quantity--
            
        }})
    }
    updateCart()
}

buttonDeleteAll.addEventListener('click', ()=>{
    deleteAll()
})

function deleteAll(){
    shoppingCart.length = 0;
    updateCart()
}

