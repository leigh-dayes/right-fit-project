$(document).ready(() => {
    $("#fitForm").submit( function(event) {
        event.preventDefault();
        $(location).prop('href', './shop.html');
    })
});