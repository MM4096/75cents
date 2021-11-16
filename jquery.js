$(document).ready(function () {
    $(':input[type="number"]').attr({
        "min": 0,
        "step": 1
    })
    
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

    $("#search").change(function () { search() });

})
function search() {
    const items = ["", "chocolate favourites", "chupa chups", "licorice allsorts", "lolly scramble", "mystery box", "sour candy"];
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
