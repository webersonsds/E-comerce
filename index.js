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
    var removecartButtons = document.getElementsByClassName('cart-remove')
    console.log(removecartButtons)

    for (var i = 0; i < removecartButtons.length; i++) {
        var button = removecartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //quantidade alteraçoes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    // add no carrinho
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    // botao comprar
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButonClicked)
}
function buyButonClicked(){
    alert('Sua compra foi Prossesada')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while( cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal()
}
//remove intem do carrinho
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal()
}
//quantidade de alteraçoes
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal()
}
// add ao carrinho
function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('produt-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductTocart(title, price, productImg)
    updatetotal()
}
function addProductTocart(title, price, productImg) {
    var cartShopBox = document.createElement('div')
     cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItensNames = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItensNames.length; i++) {
        if(cartItensNames[i].innerText == title){
        alert('Esse item já foi adicionado no carrinho')
        return
    }
 
}
var cartBoxContent = `
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
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
        //tirando casaas decmais deixando apenas 2
        total = Math.round(total * 100) / 100

        document.getElementsByClassName('total-price')[0].innerText = "$" + total
    
}