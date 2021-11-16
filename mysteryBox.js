const contents = ["Chocolate Favorites", "Chupa Chups", "Lolly Scramble pack", "Licorice Allsorts pack", "Sour Candy pack"];
function go() {
    const output = [];
    var number = Math.round(Math.random() * 3) + 2;
    for (var i = 0; i < number; i++) {
        output[i] = (contents[Math.round(Math.random() * 4)]);
    }
    var html = "";
    for (var a = 0; a < output.length; a++) {
        html += "<p>" + output[a] + "</p>"
    }
    $("#output").html(html)
}