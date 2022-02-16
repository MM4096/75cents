$(document).ready(function () {
    $('#qty').change(function () {
        var val = +document.getElementById("qty").value;
        if (val < 0 || val > 99 || Math.round(val) != val) {
            $("#qty").val(0);
        }
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
  $("#iViewItems").children().hide();
    //const items = ["", "chocolate favourites", "chupa chups", "licorice allsorts", "lolly scramble", "mystery box", "sour candy"];
    var items = ["", ["chocolate favourites", "favorite", "favourite", "50", "chocolate"],
      ["chupa chups", "lollipop", "50", "lolly", "lollies"],
      ["licorice allsorts", "licorice", "1", "lolly", "lollies"],
      ["lolly scramble", "lolly", "lollies", "1"],
      ["mystery box", "surprise", "box", "pack", "5", "random"],
      ["sour candy", "sour", "candy", "lollies", "lolly", "50"]

  ];
    var searchVal = $("#search").val();
    console.log(searchVal);
    searchVal = searchVal.toLowerCase();
    items.forEach(function(element, index, array) {
      console.log(element + ", " + index);
      let a = items[index].length;
      for (let i = 0; i <= a; i++) {
      let currentEvaluation = items[index][i];
      console.log(currentEvaluation);
      if (currentEvaluation !== undefined) {
        if (currentEvaluation.includes(searchVal, 0)) {
          $(".itemView").eq(index - 1).show();
          console.log("contains!");
        }
      }

    }
  });

}
