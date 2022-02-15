window.addEventListener("load", function () { document.getElementById("newCartItems").style.display = "none"; });

var allowCookies = 0;
var itemCost;
var numberItems = 0;
var totalCost;
var currentTotal;
var added;
function getCost(itemNumber) {
	const costs = [
		1,
		//cost of item 1 init 1
		1, //lolly scramble init 1
		//cost of item 2
		1, //licorice allsorts init 1
		//cost of item 3
		1, // Chocolate favourites init 0.5
		//cost of item 4
		0.5, //chupa chups init 0.5
		//cost of item 5
		0.5, //Sour candy init 0.5
		//cost of item 6
		5, //mystery box init 5
	]
	var rCost = costs[itemNumber];
	return rCost;
}

function setCookie(cookieName, cookieValue, cookieValidDays) {
	let allowCookie = getCookie('cookiesEnabled');
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

function getCookieValue(cookieName) {
	let value = getCookie(cookieName);
	window.alert(value);
	document.getElementById("returnCookieValue").innerHTML = value;
}
function calculateCost(itemNumber) {

	itemCost = getCost(itemNumber);
	numberItems = 0;
	numberItems = parseInt(document.getElementById("qty").value);
	totalCost = itemCost * numberItems;
	document.getElementById("cost").innerHTML = "Add " + numberItems + " to cart for $" + totalCost;
}
function updateCookie(cookieName) {
	let uCNumberItems = $("#qty").val();
		if (uCNumberItems > -1 && Math.round(uCNumberItems) == uCNumberItems) {
			if (isNaN(parseInt(getCookie(cookieName)))) {
					setCookie(cookieName, uCNumberItems, 365);
					added = 1;
			} else {
				var addedItems = parseInt(getCookie(cookieName));
				console.log(addedItems);
				setCookie(cookieName, parseInt(uCNumberItems) + parseInt(addedItems), 365);
				added = 1;
			}

		} else {
			window.alert("Error. See console for reason (Ctrl + Shift + I)")
			console.error("Updated invalid value. This could be negative values or zero.")
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
	var url = window.location.href;
	if (url === "https://mm4096.github.io/75cents/") {
		window.location.href = "https://mm4096.github.io/75cents/index.html";
	}
	let x = getCookie("cookiesEnabled");
	if (x != 1) {
		while (!window.confirm("You must enable cookies!")) {
			window.confirm("You must enable cookies!");
		}
			hardSetCookie("cookiesEnabled", 1, 365);
	}
}
function fillIn() {
	for (var i = 1; i < 7; i++) {
		var itemName = "item" + i;
		var redirectDestination = "option" + i;
		getCookiePush(itemName, redirectDestination);
	}
	document.getElementById("newCartItems").style.display = "none"
	setCookie("newItems", 0, 7)
	calculateCostRedirect();

	$(".gridContainer").hide();
	$("#items").show();
	for (let j = 1; j < 7; j++) {
		var itemName = "item" + j;
		var destinationId = "cItem" + j;
		if (getCookie(itemName) != "" && getCookie(itemName) != null) {
			$("#" + destinationId).text(getCookie(itemName));
			$("#cContainerItem" + itemName).show();
			$("#cItemCost" + j).text("$" + getCost(j) * parseInt(getCookie(itemName)));
		} else {
			$("#" + destinationId).text("0");
			$("#cItemCost" + j).text("$0");
			$("#cContainerItem" + j).hide();
		}
	}
	var cCost = 0;
	for (let k = 1; k < 7; k++) {
			let str = $("#cItemCost" + k).text();
			str = str.substring(1);
			console.log(str);
			let iCost = parseFloat(str); //because parseInt() doesn't work
			console.log(iCost);
			cCost += iCost;
			console.log("cCost = " + cCost);
	}
	$("#cTotal").text("$" + cCost);
}

function getCookiePush(cookieName, redirectDestination) {
	if (parseInt(getCookie(cookieName))) {
		var x = parseInt(getCookie(cookieName));
		document.getElementById(redirectDestination).value = x;
	} else {
		document.getElementById(redirectDestination).value = 0;
	}
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

	let eachOrderCost = [];
	for (var a = 1; a < 7; a++) {
		itemCost = getCost(a);
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
				var outlook = window.prompt("This will require Outlook as an app. If you don't have Outlook app, please type 'N' below", "");
				if (outlook == "N" || outlook == "n") {
					window.alert("Please open your email. Send an email to leo.xu@kingsway.school.nz and cc enoch.wu@kingsway.school.nz. For subject, write 'order' for body, copy and paste this " + sendString + " and state your name and form class after.")
				} else {
					setCookie("formClass", formClass, 365);
					setCookie("savedName", name, 365);
					//Sends the email
					var link = "mailto:leo.xu@kingsway.school.nz"
						+ "?cc=enoch.wu@kingsway.school.nz"
						+ "&subject=" + encodeURIComponent("Order")
						+ "&body=" + encodeURIComponent("Please pres <SEND>\r\r\r\r" + sendString + "," + name + "," + formClass)
						;

					window.location.href = link;
				}

			} else {
				window.alert("Error. See console for reason (Ctrl + Shift + I)")
				console.error("Could not send order. Reason: order was blank. Please order something first.")
			}
		}
		else {
			window.alert("Error. See console for reason (Ctrl + Shift + I)")
			console.error("Could not send order. Reason: order had unexpected values. Check to see if there's any decimals, negative values or other things.")
		}
	} else {
		window.alert("Odrder cancelled.")
	}

}
//thanks to w3schools.com for the countdown code
// Set the date we're counting down to
var countDownDate = new Date("November 24, 2021 15:00:00").getTime();

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
