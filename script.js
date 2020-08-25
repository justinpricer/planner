var date = moment().format("MMM Do YY");
// var currentTime = moment().format('H');
// console.log(currentTime);

//-------append date----------//
$("#currentDay").append(date);


//---------background Updater------------------------//

var timeOfday = ["9", "10", "11", "12", "13", "14", "15", "16", "17"]
updatetime();

function updatetime() {
  var currentTime = moment().format('H');
  for(var i = 0; i < timeOfday.length; i++) {

    if (parseInt(timeOfday[i]) > currentTime) {
      $("#" + timeOfday[i]).attr("style", "background-color: #58ce7b");


    }
    else if (parseInt(timeOfday[i]) < currentTime) {
      $("#" + timeOfday[i]).attr("style", "background-color: lightgray");

    }
    else if (parseInt(timeOfday[i]) == currentTime) {
      $("#" + timeOfday[i]).attr("style", "background-color: #fc665e");
    
    }
  }
}

//--onclick event to save user input to local storage---//
$(".rowBtn").on("click", function() {
    var timeOfday = $(this).parent().attr("id");
    var textContent = $("input").val().trim();

    localStorage.setItem(timeOfday, textContent);
    console.log(timeOfday, textContent);
});

//-------Getting individual childern and setting to parent-----//
  $("#9am").children("input").val(localStorage.getItem("9am"));

  $("#10am").children("input").val(localStorage.getItem("10am"));

  $("#11am").children("input").val(localStorage.getItem("11am"));

  $("#12pm").children("input").val(localStorage.getItem("12pm"));

  $("#1pm").children("input").val(localStorage.getItem("1pm"));

  $("#2pm").children("input").val(localStorage.getItem("2pm"));

  $("#3pm").children("input").val(localStorage.getItem("3pm"));

  $("#4pm").children("input").val(localStorage.getItem("4pm"));

  $("#5pm").children("input").val(localStorage.getItem("5pm"));