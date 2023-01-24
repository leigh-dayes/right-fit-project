$(document).ready(function () {
    let products = [];
    let itemNumber = 0;
    

    if (localStorage.getItem("items")) {
        products = JSON.parse(localStorage.getItem("items"));
        itemNumber = products.length;
    }
    $(".numberOfItems").text(itemNumber);

    // when the user clicks the shopping cart button, update .modal-body with the items in the cart
    $(".buttonWrapper").click(function () {
        let total = 0;
        if (JSON.parse(localStorage.getItem("items")).length) {
            products = JSON.parse(localStorage.getItem("items"));
            $("#checkoutButton").text("Proceed to checkout")
            let modalBody = $(".modal-body");
            modalBody.empty(); // empty the initial contents of modal body before adding new items
    
            // render products name, price, and quantity
            products.map((product) => {
            modalBody.append(
                `<div class="productWrapper" id="${product.name}">
                    <img src="${product.img}" class="shoppingCartImg" alt="product image">
                    <div id="productInfo">
                        <div class="name">${product.name} - $${product.price}/item</div>
                        <div class="quantity">x ${product.quantity}</div>
                    </div>
                    <div id="actions">
                        <button class="btn btn-primary increaseQuantity" id="${product.name}">
                        +
                        </button>
                        <button class="btn btn-danger decreaseQuantity" id="${product.name}">
                        -
                        </button>               
                    </div>
                    `
            );
            });
            // get total cost
            products.forEach(element => {
                let itemTotal = 0;
                itemTotal = element.quantity * element.price;
                total += itemTotal;
            });
            console.log(total);
            modalBody.append(
                `<div class="pt-10 justify-content-end" id="shoppingCartTotal">Total Price: $${total}</div>`
            )
            // plus button functionality
            $(".increaseQuantity").click(function () {
                // get the id attribute of the button
                let productName = $(this).attr("id");
                // match the productName to the selected item inside products array
                let product = products.find((product) => product.name === productName);
                // then increase the selected item quantity by 1
                product.quantity++;
        
                // update the quantity div's text - go up to productWrapper level, and then find the div with .quantity class
                $(this)
                .closest(".productWrapper") // get the closest productWrapper div
                .find(".quantity") // get the quantity div
                .text(`x ${product.quantity}`); // update the text of the quantity
                // update total
                let adjustTotal = parseInt(product.price);
                total += adjustTotal;
                console.log(total);
                $("#shoppingCartTotal").empty();
                $("#shoppingCartTotal").text(`Total Price: $${total}`);
                // update the items in localStorage
                localStorage.setItem("items", JSON.stringify(products));
            });
            // minus button functionality
            $(".decreaseQuantity").click(function (){
                // get the id attribute of the button
                let productName = $(this).attr("id");
                // match the productName to the selected item inside products array
                let product = products.find((product) => product.name === productName);
                // then decrease the selected item quantity by 1 if greater than zero
                if (product.quantity > 0) {
                    product.quantity--;
                }
                // update the quantity div's text - go up to productWrapper level, and then find the div with .quantity class
                $(this)
                .closest(".productWrapper") // get the closest productWrapper div
                .find(".quantity") // get the quantity div
                .text(`x ${product.quantity}`); // update the text of the quantity

                // we want to remove items that have zero quantity
                if (product.quantity === 0) {
                    let index = products.indexOf(product);
                    products.splice(index, 1);
                }

                //decrease total
                let adjustTotal = parseInt(product.price);
                total -= adjustTotal;
                $("#shoppingCartTotal").empty();
                $("#shoppingCartTotal").text(`Total Price: $${total}`);
                $(".numberOfItems").text(products.length);
                localStorage.setItem("items", JSON.stringify(products));
            })
        }
        else {
            $("#checkoutButton").text("Continue shopping")
            let modalBody = $(".modal-body");
            modalBody.empty();
            modalBody.text("Your shopping cart is empty")
            console.log("no items")
        }
    });
    $("#checkoutButton").click(function () {
        if ($("#checkoutButton").text() === "Continue shopping") {
            // if continue shopping hide modal
            $("#shoppingModal").modal("toggle");
        }
        else {
            // else proceed to the checkout page
            $(location).prop('href', './checkout.html');
        }
    });
  });