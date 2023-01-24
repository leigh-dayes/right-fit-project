
import { database } from './firebase.js';
import { ref, set, getDatabase, get, child } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js';

$(document).ready(() => {
    // declare variables
    let products = [];
    let total = 0;
    let checkoutItems = $("#checkoutItems");
    checkoutItems.empty();
    let paymentInfo = $("#paymentInfo");
    let sameDayPostcodes = []
    const DBurl = "https://console.firebase.google.com/project/rightfit-138ca/database/rightfit-138ca-default-rtdb/data/~2F"
    // date object for credit card year month
    const d = new Date();
    let dArr = d.getFullYear().toString().split(0);
    const y = dArr[1];
    const m = d.getMonth() + 1;
    // Validation RegEx
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const nameRegEx = /[a-zA-Z]/;
    const postCodeRegex = /[0-9]{4}/;
    const ccNumberRegEx = /[0-9]{16}/;
    const ccvRegEx = /[0-9]{3}/;
    const dateRegEx = /[0-9]{2}/;
    // EmailJS
    emailjs.init('KdjwCDldQ48-iepkD');
    let emailMessage = "Items heading to you!\n";
    // add brisbane cbd postcodes
    for (let i = 4000; i < 4030; i++){
        sameDayPostcodes.push(i);
    }
    // add sydney cbd postcodes
    for (let i = 2000; i < 2037; i++){
        sameDayPostcodes.push(i);
    }
    // add melbourne cbd postcodes
    for (let i = 3000; i < 3211; i++){
        sameDayPostcodes.push(i);
    }

    if (JSON.parse(localStorage.getItem("items")).length) {
        products = JSON.parse(localStorage.getItem("items"));
        checkoutItems.append(
            `<h3 class="d-flex justify-content-center pb-5">Your shopping cart</h5>`
        )
        products.forEach(element => {
            let itemTotal = 0;
            itemTotal = element.quantity * element.price;
            total += itemTotal;
            checkoutItems.append(
                `
                <ul class="list-group list-group-horizontal d-flex justify-content-center">
                    <li class="list-group-item"><strong>${element.name}</strong></li>
                    <li class="list-group-item"><strong>$ ${element.price}</strong></li>
                    <li class="list-group-item"><strong>x ${element.quantity}</strong></li>
                </ul>
                `
            )
            // add items to email message
            emailMessage = emailMessage.concat(`${element.name} x${element.quantity} \n`)
        });
        checkoutItems.append(
            `<div class="d-flex justify-content-center pt-5 pb-5 fs-5" id="totalPrice"><strong>Your total is $${total}</strong></div>`
        )

    }
    else {
        checkoutItems.append(
            `<p>Go back to shopping to purchase items</p>`
        )
    }
    // Same day delivery
    // TODO: add functionality where the shipping fee is only added if the radio button is selected
    $("#sameDayBtn").click(function () {
        let postcode = parseInt($("#sameDay").val());
        if ($("#sameDayMessage").length) {
            $("#sameDayMessage").remove();
        }
        if (sameDayPostcodes.includes(postcode)) {
            $("#sameDayInput").append(
                `<p id="sameDayMessage">Congratulations, same day delivery available in your location!
                <strong>$14.95</strong></p>`
            )
            if ($("#sameDayDel").is(":checked")) {
                let total = parseInt($("#totalPrice").text().split("$")[1]);
                $("#totalPrice").empty();
                total += 14.95;
                $("#totalPrice").html(`<strong>Your total is $${total}</strong>`);
            }
        }
        else {
            $("#sameDayInput").append(
                `<p id="sameDayMessage">Sorry same day delivery not currently available in your location</p>`
            )
        }
    });
    // handle form submit
    $("#checkoutForm").submit(function(event) {
        event.preventDefault();
        let isValid = true;
        //set variables
        let ccFirstNameVal = $("#ccFirstName").val();
        let ccFirstName = $("#ccFirstName");
        let ccLastNameVal = $("#ccLastName").val();
        let ccLastName = $("#ccLastName");
        let ccEmailVal = $("#ccEmail").val();
        let ccEmail = $("#ccEmail");
        let ccPostCodeVal = $("#ccPostCode").val();
        let ccPostCode = $("#ccPostCode");
        let ccNumberVal = $("#ccNumber").val();
        let ccNumber = $("#ccNumber");
        let ccvVal = $("#ccCCV").val();
        let ccv = $("#ccCCV");
        let ccMonthVal = $("#ccMonth").val();
        let ccMonth = $("#ccMonth");
        let ccYearVal = $("#ccYear").val();
        let ccYear = $("#ccYear");
        let ccAddressVal = $("#ccPostalAddress").val();
        let ccStateVal = $("#ccState").val();
        // validation
        // the best way to validate a street address would be using and API, however, i was unable to find
        // a free one that didnt just have a trial period. if this site was ever to go into production, and 
        // API would be used to validate street address
        if (!checkValidity(ccEmail, ccEmailVal, "Invalid Email", emailRegEx) ||
        !checkValidity(ccFirstName, ccFirstNameVal, "Invalid First Name", nameRegEx) ||
        !checkValidity(ccLastName, ccLastNameVal, "Invalid Last Name", nameRegEx) ||
        !checkValidity(ccPostCode, ccPostCodeVal, "Invalid Australian Postcode", postCodeRegex) ||
        !checkValidity(ccNumber, ccNumberVal, "Invalid Credit Card Number", ccNumberRegEx) ||
        !checkValidity(ccv, ccvVal, "Invalid CCV", ccvRegEx)) {
            isValid = false;
        }
        if (checkValidity(ccMonth, ccMonthVal, "Invalid Month", dateRegEx)) {
            //if two ints check to see valid int combo
            if(ccMonthVal[0] > 1) {
                ccMonth.next().text("Invalid Month");
                ccMonth.addClass("invalid-input");
                isValid = false;
            }
            else if (ccMonthVal[0] == 1 && ccMonthVal[1] > 2) {
                ccMonth.next().text("Invalid Month");
                ccMonth.addClass("invalid-input");
                isValid = false;
            }
        }
        if (checkValidity(ccYear, ccYearVal, "Invalid Year", dateRegEx)) {
            // make sure valid year
            if (ccYearVal < y) {
                ccYear.next().text("Invalid Year");
                ccYear.addClass("invalid-input");
                isValid = false;
            }
            // if year is this year, make sure month is valid
            else if (ccYearVal == y && ccMonthVal <= m) {
                ccMonth.next().text("Invalid Month");
                ccMonth.addClass("invalid-input");
                isValid = false;
            }
        }
        // if all input correct send email
        if (isValid) {
            console.log("send email");
            var lastFour = ccNumberVal.slice(12);
            var emailParams = {
                to_email : ccEmailVal,
                to_name : ccFirstNameVal,
                credit_card_num : lastFour,
                message : emailMessage
            }
            emailjs.send('contact_service', 'confirmation_form', emailParams)
                .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                console.log('FAILED...', error);
                });
            // save data to DB
            $('#insertbtn').trigger('click');
           // Change the page to represent purchase complete
           $("#checkoutContainer").empty();
           $("#checkoutContainer").append(
               `<h1>Congratulations on your purchase!</h1>
                <h3>A confirmation email will be sent you soon</h3>`
           );
        }
        
    });
    /**
     * checkValidity a function for testing client side input 
     * 
     * @param {HTML element} formElement 
     * @param {String} formValue 
     * @param {String} invalidMessage 
     * @param {Regular Expression} re 
     * @returns True if valid input
     */
    let checkValidity = (formElement, formValue, invalidMessage, re) => {
        if (re.test(formValue)) {
            formElement.next().empty();
            formElement.removeClass("invalid-input");
            return true;
        }
        else {
            formElement.next().text(invalidMessage);
            formElement.addClass("invalid-input");
            return false;
        }
    }
});
