
var allowCookies = 0;
var itemCost;
var numberItems;
var totalCost;
var currentTotal
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
        //cost of item 1
        1, //lolly scramble
        //cost of item 2
        1, //licorice allsorts
        //cost of item 3
        0.5, // Chocolate favorates
        //cost of item 4
        0.5, //chupa chups
        //cost of item 5
        0.5, //Sour candy
    ]
    itemCost = costs[itemNumber];
    numberItems = +document.getElementById("qty").value;
    totalCost = itemCost * numberItems;
    document.getElementById("cost").innerHTML = "Add " + numberItems + " to cart for $" + totalCost;
}
function updateCookie(cookieName) {
    setCookie(cookieName, numberItems, 365);

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
    for (var i = 1; i < 6; i++) {
        var itemName = "item" + i;
        var redirectDestination = "option" + i;
        getCookiePush(itemName, redirectDestination)

    }
}
function getCookiePush(cookieName, redirectDestination) {

    var x = Number(getCookie(cookieName));
    document.getElementById(redirectDestination).value = x;
}
function updateAllCookies() {
    for (var i = 1; i < 6; i++) {
        var cookieUpdate = "item" + i;
        var cookieUpdateValue = document.getElementById("option" + i).value;
        setCookie(cookieUpdate, cookieUpdateValue, 365);
    }
    calculateCostRedirect();
    
}
function calculateCostRedirect() {
    let qty = []
    for (var i = 1; i < 6; i++) {
        var getID = "option" + i;
        qty[i] = +document.getElementById(getID).value
    }
    const costs = [
        0,
        //cost of item 1
        1, //lolly scramble
        //cost of item 2
        1, //licorice allsorts
        //cost of item 3
        0.5, // Chocolate favorates
        //cost of item 4
        0.5, //chupa chups
        //cost of item 5
        0.5, //Sour candy
    ]
    let eachOrderCost = [];
    for (var a = 1; a < 6; a++) {
        itemCost = costs[a];
        numberItems = +document.getElementById("option" + a).value;
        eachOrderCost[a] = itemCost * numberItems;
    }
    currentTotal = 0;
    var add;
    for (var b = 1; b < 6; b++) {
        add = eachOrderCost[b];
        currentTotal += add;
    }
    document.getElementById("total").innerHTML = "$" + currentTotal;
}
function sendOrder() {
    let itemQuantity = [];
    var sendString;
    for (var i = 1; i < 6; i++) {
        itemQuantity[i] = document.getElementById("option" + i).value;
    }
    sendString = itemQuantity.join();
    var name = prompt("Please enter your name", getCookie("savedName"))
    var formClass = prompt("Please enter your form class", getCookie('formClass'));
    if (name != "" && formClass != "") {
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
        window.alert("Your Order was cancelled. Reason: #0001 - Expected answer, recieved 'null'")
    }
    
}