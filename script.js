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



function timeUpate(){
    
    $("#currentDay").text(mfull)
    styleMe()
    
    interval = setInterval(function(){
        mfull = moment().format('dddd MMMM Do YYYY, h:mm:ssa');
        $("#currentDay").text(mfull)
        styleMe()
}, 1000)
}



for (let [key, value] of Object.entries(timeblocks)) {
    
    time = ("<div class='col-md-1 hour p-0'>"+key+"</div>")
    
    planner_data = ("<div class='col-md-10 p-0'><textarea class='description' type='text' id='"+key+"'></textarea></div>")
    
    button = ("<div class='col-md-1 p-0'><button class='saveBtn' time-attr='"+key+"'>Save</button></div>")
    
    $(".container").append("<div class='row'>"+time+planner_data+button+ "</div>")
}

$(".saveBtn").on("click", function(){
    
    item = $(this).attr("time-attr")
    
    pdata = $("#"+item).val()
    
    timeblocks[item] = pdata
    
    save_data()
})



function load_data(){
    
    today = localStorage.getItem(mdate)
    
    if(today){
        timeblocks = JSON.parse(today)
        
        for (let [key, value] of Object.entries(timeblocks)) {
            $("#"+key).val(value)
        }
    
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


function save_data(){
   
    localStorage.setItem(mdate, JSON.stringify(timeblocks))
}


function styleMe(){
    
    htime = moment().format('HH')
    for (let [key, value] of Object.entries(timeblocks)) {
        
        hkey = moment(key, ["ha"]).format("HH")
        
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



timeUpate()
load_data()
