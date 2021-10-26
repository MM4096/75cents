window.addEventListener("load", function () { document.getElementById("newCartItems").style.display = "none"; });

var allowCookies = 0;
var itemCost;
var numberItems = 0;
var totalCost;
var currentTotal;
var added;
function accepted() {
    allowCookies = 1;
    document.getElementById("cookieFooter").style.visibility = "hidden";
    hardSetCookie("cookiesEnabled", 1, 365);
}
function notAccepted() {
    allowCookies = 0;
    document.getElementById("cookieFooter").style.visibility = "hidden";
    hardSetCookie("cookiesEnabled", 0, 365);
}
function setCookie(cookieName, cookieValue, cookieValidDays) {
    let allowCookie = getCookie('cookiesEnabled')
    if (allowCookie == "1") {
        const day = new Date();
        day.setTime(day.getTime() + (cookieValidDays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + day.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

}
function hardSetCookie(cookieName, cookieValue, cookieValidDays) {

    const day = new Date();
    day.setTime(day.getTime() + (cookieValidDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + day.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";

}
function getCookie(cookieName) {
    let name = cookieName + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie() {
    allowCookies = getCookie("cookiesEnabled");
}
function getCookieValue(cookieName) {
    let value = getCookie(cookieName);
    window.alert(value);
    document.getElementById("returnCookieValue").innerHTML = value;
}
function calculateCost(itemNumber) {
    const costs = [
        0,
        //cost of item 1 init 1
        1, //lolly scramble
        //cost of item 2
        1, //licorice allsorts
        //cost of item 3
        0.5, // Chocolate favorates init 0.5
        //cost of item 4
        0.5, //chupa chups
        //cost of item 5
        0.5, //Sour candy
        //cost of item 6
        5, //mystery box
    ]
    itemCost = costs[itemNumber];
    numberItems = 0;
    numberItems = parseInt(document.getElementById("qty").value);
    totalCost = itemCost * numberItems;
    document.getElementById("cost").innerHTML = "Add " + numberItems + " to cart for $" + totalCost;
}
function updateCookie(cookieName) {
    var cookies = getCookie("cookiesEnabled");
    if (cookies == "1") {
        if (numberItems > -1 && Math.round(numberItems) == numberItems) {
            var addedItems = parseInt(getCookie(cookieName));

            setCookie(cookieName, numberItems + addedItems, 365);
            added = 1;
        } else {
            window.alert("Unable to update cart. Reason #0011 - Updated invalid value")
            added = 0;
        }
    } else {
        window.alert("Unable to update cart. Reason #0100 - Cookies not enabled.")
        added = 0;
    }
    var currentNewCartItems = parseInt(getCookie("newItems"));
    var newCartItems = currentNewCartItems + numberItems;
    if (newCartItems > 0) {
        document.getElementById("newCartItems").style.display = "inline-block";
        document.getElementById("newCartItems").innerText = newCartItems + " new items";
        setCookie("newItems", newCartItems, 7);
    }
}
    
    

function cookieFooterToggle() {
    let x = getCookie("cookiesEnabled");
    if (x == 1) {
        document.getElementById("cookieFooter").style.visibility = "hidden"
    } else {
        document.getElementById("cookieFooter").style.visibility = "visible"
    }
}
function fillIn() {
    for (var i = 1; i < 7; i++) {
        var itemName = "item" + i;
        var redirectDestination = "option" + i;
        getCookiePush(itemName, redirectDestination)
    }
    document.getElementById("newCartItems").style.display = "none"
    setCookie("newItems", 0, 7)
}
function getCookiePush(cookieName, redirectDestination) {

    var x = Number(getCookie(cookieName));
    document.getElementById(redirectDestination).value = x;
}
function updateAllCookies() {
    for (var i = 1; i < 7; i++) {
        var cookieUpdate = "item" + i;
        var cookieUpdateValue = document.getElementById("option" + i).value;
        setCookie(cookieUpdate, cookieUpdateValue, 365);
    }
    calculateCostRedirect();
    
}
function calculateCostRedirect() {
    let qty = []
    for (var i = 1; i < 7; i++) {
        var getID = "option" + i;
        qty[i] = +document.getElementById(getID).value
    }
    const costs = [
        0,
        //cost of item 1 init 1
        1, //lolly scramble init 1
        //cost of item 2
        1, //licorice allsorts init 1
        //cost of item 3
        0.5, // Chocolate favorates init 0.5
        //cost of item 4
        0.5, //chupa chups init 0.5
        //cost of item 5
        0.5, //Sour candy init 0.5
        //cost of item 6
        5, //mystery box init 5
    ]
    let eachOrderCost = [];
    for (var a = 1; a < 7; a++) {
        itemCost = costs[a];
        numberItems = +document.getElementById("option" + a).value;
        eachOrderCost[a] = itemCost * numberItems;
    }
    currentTotal = 0;
    var add;
    for (var b = 1; b < 7; b++) {
        add = eachOrderCost[b];
        currentTotal += add;
    }
    document.getElementById("total").innerHTML = "$" + currentTotal;
}
function sendOrder() {
    let itemQuantity = [];
    var sendString;
    //boolean
    var ableToSend = 1;
    for (var i = 1; i < 7; i++) {
        itemQuantity[i] = document.getElementById("option" + i).value;
        if (itemQuantity[i] < 0 || Math.round(itemQuantity[i]) == itemQuantity[i]) {
            ableToSend = 0;
        }
    }
    sendString = itemQuantity.join();
    var name = prompt("Please enter your name", getCookie("savedName"))
    var formClass = prompt("Please enter your form class", getCookie('formClass'));
    if (name != null && formClass != null) {
        if (name != "" || formClass != "" || ableToSend != 0) {
            if (sendString != ",0,0,0,0,0") {
                setCookie("formClass", formClass, 365);
                setCookie("savedName", name, 365);
                //Sends the email
                var link = "mailto:leo.xu@kingsway.school.nz"
                    + "?cc=enoch.wu@kingsway.school.nz"
                    + "&subject=" + encodeURIComponent("Order")
                    + "&body=" + encodeURIComponent("Please press <SEND>\r\r\r\r" + sendString + "," + name + "," + formClass)
                    ;

                window.location.href = link;
            } else {
                window.alert("Your Order was cancelled. Reason: #0010 - Order was blank")
            }
        }
        else {
            window.alert("Your Order was cancelled. Reason: #0001 - Unexpected Answer")
        }
    } else {
        window.alert("Your Order was cancelled. Reason: #0101 - Order Canceled.")
    }
    
}
//thanks to w3schools.com for the countdown code
// Set the date we're counting down to
var countDownDate = new Date("October 20, 2021 13:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    

    // If the count down is over, write some text 
    //Run the following code only if it is index.html
    var p = window.location.pathname;
    if (p.length === 0 || p === "/" || p.match(/^\/?index/)) {
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("salesCountdown").style.display = "none";
        } else {
            document.getElementById("salesCountdown").style.display = "block";
            document.getElementById("timeLeft").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";
        }
    }
    
}, 1000);
