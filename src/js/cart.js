const cartContainer = document.getElementById('cart-container');
const counter = document.getElementById('counter');
const totalPrice = document.getElementById('totalPrice');
const buttonDeleteAll = document.getElementById('emptyCart');
const confirmPurchaseButton = document.getElementById('confirmPurchase')
const shoppingCart = [];

const getProds = async () =>{
    let response = await fetch('src/data/products.json');
    let items = await response.json();
    return items
};

const addToCart = async (prodId) => {
    const inCart = shoppingCart.some((prod) => parseInt(prod.id) === parseInt(prodId));
    if(inCart){
        let prod = shoppingCart.map(prod =>{
            if(parseInt(prod.id) === parseInt(prodId)){
                prod.quantity++
            } 
        })  
    } else {
        let items = await getProds();
        items.map(prod => {
            if(parseInt(prod.id) === parseInt(prodId)){
                prod.quantity = 1
                shoppingCart.push(prod)
            }
        });
    }
    updateCart()
};

function addFromCart(prodId){
    const inCart = shoppingCart.some((prod) => parseInt(prod.id) === parseInt(prodId)); 
    if(inCart){
        let prod = shoppingCart.map(prod =>{
            if(parseInt(prod.id) === parseInt(prodId)){
                prod.quantity++
            } 
        })
    }
    updateCart()
};

function updateCart (){
    cartContainer.innerHTML = "";
    counter.innerText = ""
    shoppingCart.forEach(product => {
    let div = document.createElement('div')
        div.classList.add('productInCart')
        div.setAttribute(
            'style',
            'background-color: yellow; margin: 10px; padding: 20px;border: solid 10px; border-radius: 10px 40px 40px 10px',

        )
        div.innerHTML = `<p style="word-wrap: break-word; font-weight: bold;" >${product.name}</p>
                        <p>$${product.price}</p> 
                        <button class="btn btn-dark" id="quantity${product.id}">+</button><p id="paragraphQuantity">${product.quantity}</p><button class="btn btn-dark" id="deleteQuantity${product.id}">-</button>
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
};

function deleteProd(prodId){
    let prod = shoppingCart.find((prod) =>parseInt(prod.id) === parseInt(prodId));
    let index = shoppingCart.indexOf(prod);
    shoppingCart.splice(index, 1);
    updateCart()
};

function deleteProdFromCart(prodId){
    const inCart = shoppingCart.some((prod) =>parseInt(prod.id) === parseInt(prodId));
    if(inCart){
        let prod = shoppingCart.map(prod =>{
            if(parseInt(prod.id) === parseInt(prodId) && parseInt(prod.quantity) > 0){
                prod.quantity--
        }})
    }
    updateCart()
};

buttonDeleteAll.addEventListener('click', ()=>{
    deleteAll()
});

function deleteAll(){
    shoppingCart.length = 0;
    updateCart()
};

confirmPurchaseButton.addEventListener('click', (e) =>{
    e.preventDefault
    confirmPurchase()
});

async function confirmPurchase(){ 
    if(shoppingCart.length === 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is nothing to buy',
          })
    } else {
    const modalBody = document.getElementById('modal-form');
    modalBody.innerHTML = ""
    const form = document.createElement('formCard');
    form.innerHTML += `<form id="form-1">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputName14" id="modalText">Name</label>
                                        <input type="name" class="form-control" id="inputName14" placeholder="Name" required>
                                    </div>                                    
                                    <div class="form-group col-md-6">
                                        <label for="inputlastName14" id="modalText">Last Name</label>
                                        <input type="last-name" class="form-control" id="inputLastName14" placeholder="Last Name" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4" id="modalText">Email</label>
                                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputAddress" id="modalText">Address</label>
                                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputState" id="modalText">State</label>
                                        <input id="inputState" class="form-control" required>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputZip" id="modalText">Zip</label>
                                        <input type="text" class="form-control" id="inputZip" required>
                                    </div>
                                </div>
                                <div id="finishPurchase">
                                    <button class="btn btn-primary" id="finishP">Finish Purchase</button>
                                </div>
                            </form>`
    modalBody.appendChild(form);
    const buttonFinishPurchase = document.getElementById('finishP');
    buttonFinishPurchase.addEventListener('click', (e)=>{
        e.preventDefault();
        finishPurchase()
    });
   
    async function finishPurchase(){
        const inputName = document.getElementById('inputName14');
        const inputLastName = document.getElementById('inputLastName14');
        const inputEmail = document.getElementById('inputEmail4');
        const inputAddress = document.getElementById('inputAddress')
        const inputState = document.getElementById('inputState');
        const inputZip = document.getElementById('inputZip');
        const userName = document.getElementById('inputName14').value;
    
        if(inputName.value === "" || inputLastName.value === ""|| inputEmail.value === ""||
         inputAddress.value === "" || inputState.value === ""|| inputZip.value === "" ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must complete all input fields',
              })
        } else {
            const orderId = Math.floor(Math.random() * 7000)
                Swal.fire({
                icon: 'success',
                title:`Thanks for the purchase ${userName}!`,
                text:`Your order id is ${orderId}`,
              });
              return shoppingCart.length = 0, cartContainer.innerHTML = "", counter.innerText = "",
              totalPrice.innerText = "",  form.innerHTML = "";    
        }
    }
    }  
};


