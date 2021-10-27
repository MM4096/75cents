$(document).ready(function () {
    
    
    $("#cost").click(function () {
        var txt = $("#cost").text();
        if (added == 1) {
            $("#cost").text("Added!");
        } else {
            $("#cost").text("Failed");
        }
        setTimeout(function () { $("#cost").text(txt);}, 1000);
        
    })
    //search function
    //Made by me!

    $("#search").on("keypress", function (e) {
        if (e.which == 13) {
            search();                     
            }
    })
})
function search() {
    const items = ["", "chocolate favorates", "chupa chups", "licorice allsorts", "lolly scramble", "mystery box", "sour candy"];
    var searchVal = $("#search").val();
    var searchValue = searchVal.toLowerCase();
    $("#result").show();
    $("#result").text("Search results for " + searchVal + ":");
    for (let i = 1; i < 7; i++) {
        var id = "o" + i;
        if (items[i].includes(searchValue)) {
            $("#" + id).show();
        } else {
            $("#" + id).hide();
        }
    }
}
