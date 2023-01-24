// on document ready
$(document).ready(() => {
    // Load the header.html into the header div, once it's loaded execute callback to add class to headerHome div
    $("#header").load("template/header/header.html");

    // Load the footer.html into the footer div, once it's loaded execute callback to add class to footerHome div
    $("#footer").load("template/footer/footer.html");
    // Load shopping cart
    $("#shoppingCart").load("template/shoppingCart/shoppingCart.html");
});