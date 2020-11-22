//$(".currentDay")
let mfull = moment().format('dddd MMMM Do YYYY, h:mm:ssa');
let htime = moment().format('ha');
let mdate = moment().format('MMMM-Do-YYYY');


let timeblocks = {
    "12am": "",
    "1am": "",
    "2am": "",
    "3am": "",
    "4am": "",
    "5am": "",
    "6am": "",
    "7am": "",
    "8am": "",
    "9am": "",
    "10am": "",
    "11am": "",
    "12pm": "",
    "1pm": "",
    "2pm": "",
    "3pm": "",
    "4pm": "",
    "5pm": "",
    "6pm": "",
    "7pm": "",
    "8pm": "",
    "9pm": "",
    "10pm": "",
    "11pm": "",
}


// Method to update the date / time
function timeUpate(){
    // display current day / time and styles before time interval starts
    $("#currentDay").text(mfull)
    styleMe()
    // begin time interval to update time by the second, style on each update
    interval = setInterval(function(){
        mfull = moment().format('dddd MMMM Do YYYY, h:mm:ssa');
        $("#currentDay").text(mfull)
        styleMe()
}, 1000)
}

// For each key and value in timeblocks create a new row 
// with 3 columns to display the time, data, and save button.
for (let [key, value] of Object.entries(timeblocks)) {
    // Create a new div column to display the hour
    time = ("<div class='col-md-1 hour p-0'>"+key+"</div>")
    // Create a new div column to display textarea for the planner data with an ID that matches the key in time blocks
    planner_data = ("<div class='col-md-10 p-0'><textarea class='description' type='text' id='"+key+"'></textarea></div>")
    // Create a new div column to display the saveBtn button with a time-attr that matches the key in time blocks
    button = ("<div class='col-md-1 p-0'><button class='saveBtn' time-attr='"+key+"'>Save</button></div>")
    // Append the row and 3 columns to the conainter class
    $(".container").append("<div class='row'>"+time+planner_data+button+ "</div>")
}

$(".saveBtn").on("click", function(){
    // Item equalts the data attribute "time-attr" to read
    // the hour a particular button is tied to
    item = $(this).attr("time-attr")
    // Get vlaue of Input box item
    pdata = $("#"+item).val()
    // dynmaically set data to each Obj key
    timeblocks[item] = pdata
    // Save data function which stores the timeblocks Obj per day
    save_data()
})


// Method to load data from local storage if it exists
// if not then timeblocks object gets emptied
function load_data(){
    // Grab object name for the current day
    today = localStorage.getItem(mdate)
    // If data exists in local storage parse it
    if(today){
        timeblocks = JSON.parse(today)
        // For each key and value in array set the value of
        // each corresponding input field
        for (let [key, value] of Object.entries(timeblocks)) {
            $("#"+key).val(value)
        }
    // Else timeblocks is empty
    } else{
        timeblocks = {
            "12am": "",
            "1am": "",
            "2am": "",
            "3am": "",
            "4am": "",
            "5am": "",
            "6am": "",
            "7am": "",
            "8am": "",
            "9am": "",
            "10am": "",
            "11am": "",
            "12pm": "",
            "1pm": "",
            "2pm": "",
            "3pm": "",
            "4pm": "",
            "5pm": "",
            "6pm": "",
            "7pm": "",
            "8pm": "",
            "9pm": "",
            "10pm": "",
            "11pm": "",
        }
    }
}

// Method to save data to local stroage using the current date as the key
function save_data(){
    // Was planning to use this to add multi-day functionality
    // but decided to pick my battles and not continue to spend
    // more time on this assignment as I'm sure there will be
    // future assignments that can benefit from the additional
    // time, hehe. :)
    localStorage.setItem(mdate, JSON.stringify(timeblocks))
}

// Method to style the day planner based on time
function styleMe(){
    // Convert current hour to military time string
    htime = moment().format('HH')
    for (let [key, value] of Object.entries(timeblocks)) {
        //Convert Obj key value to military time string
        hkey = moment(key, ["ha"]).format("HH")
        // Conditionals to determine styling
        if (htime == hkey){
            $("#"+key).removeClass("past")
            $("#"+key).removeClass("future")
            $("#"+key).addClass("present")
        } else if (htime > hkey){
            $("#"+key).removeClass("present")
            $("#"+key).removeClass("future")
            $("#"+key).addClass("past")
        } else if (htime < hkey){
            $("#"+key).removeClass("present")
            $("#"+key).removeClass("past")
            $("#"+key).addClass("future")
        }
    }}

// Do all the things!!!!

timeUpate()
load_data()