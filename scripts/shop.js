$(document).ready(() => {
    // click event for the shopping page
    $(".card-btn").click(function () {
        let products = [];

        if (localStorage.getItem("items")) {
            products = JSON.parse(localStorage.getItem("items"));
        }

        let itemElement = $(this).siblings().find(".card-text").text();
        let itemName = itemElement.split("$")[0];
        let itemPrice = itemElement.split("$")[1];
        let itemImage = $(this).siblings().find(".card-img-top").attr("src");

        let itemExists = false;
        products.forEach((item) => {
            if (item.name === itemName) {
                itemExists = true;
                item.quantity += 1;
            }
        });

        if (!itemExists) {
            products.push({
                name: itemName,
                price: itemPrice,
                img: itemImage,
                quantity: 1
            });
        }
        // update number of items
        localStorage.setItem("items", JSON.stringify(products));
        $(".numberOfItems").text(products.length);
        
        // TOAST
        let toastMessage = $(".toast-body");
        toastMessage.empty();
        toastMessage.append(`${itemName} has successfully been added to your cart`);
        let toast = $("#liveToast");
        let newToast = new bootstrap.Toast(toast);
        newToast.show();
    });
});