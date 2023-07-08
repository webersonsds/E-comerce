// cart

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

//Abre o carrinho de compras
cartIcon.onclick = () => {
    cart.classList.add('active')
}

//fecha o carrinho de compras
closeCart.onclick = () => {
    cart.classList.remove('active')
}
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}
//marcaçao
//remove intem do carrinho
function ready() {
    let removecartButtons = document.getElementsByClassName('cart-remove')
    console.log(removecartButtons)

    for (let i = 0; i < removecartButtons.length; i++) {
        let button = removecartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //quantidade alteraçoes
    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    // add no carrinho
    let addCart = document.getElementsByClassName('add-cart')
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    // botao comprar
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButonClicked)
}
function buyButonClicked(){
    alert('Sua compra foi Prossesada')
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while( cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal()
}
//remove intem do carrinho
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal()
}
//quantidade de alteraçoes
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal()
}
// add ao carrinho
function addCartClicked(event) {
    let button = event.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName('produt-title')[0].innerText
    let price = shopProducts.getElementsByClassName('price')[0].innerText
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductTocart(title, price, productImg)
    updatetotal()
}
function addProductTocart(title, price, productImg) {
    let cartShopBox = document.createElement('div')
     cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0]
    let cartItensNames = cartItems.getElementsByClassName('cart-product-title')
    for (let i = 0; i < cartItensNames.length; i++) {
        if(cartItensNames[i].innerText == title){
        alert('Esse item já foi adicionado no carrinho')
        return
    }
 
}
let cartBoxContent = `
             <img src="${productImg}" alt="" class="cart-img">
              <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                  <div class="cart-price">${price}</div>
                  <input type="number" value="1" class="cart-quantity">
                 </div>
             <!--Remover do carrinho-->
             <i class='bx bxs-trash-alt cart-remove'></i> 
             `

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged)


}


//total

function updatetotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total = 0

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart-price')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace("$", ""))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
        //tirando casaas decmais deixando apenas 2
        total = Math.round(total * 100) / 100

        document.getElementsByClassName('total-price')[0].innerText = "$" + total
    
}