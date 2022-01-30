var currentTime = moment().format('MMMM Do YYYY');

//load the current day when the document is ready
$(document).ready(function(){
    $("#currentDay").text(currentTime);        
});

//checkTime and assign colors to hours
var checkTime = function() {
    for (var i = 9; i < 18; i++) {
    
        var hour = $("[data-time="+i+"]")
        var time = moment().set("hour", i)

        if (moment().isAfter(time, "hour")) {
            $(hour).siblings(".description").addClass("past");
        } else if (moment().isSame(time, "hour")) {
            $(hour).siblings(".description").addClass("present");
        } else if (moment().isBefore(time, "hour")) {
            $(hour).siblings(".description").addClass("future");
        };
    }
};

//run checkTime on page load
$(document).ready(checkTime);

//run checkTime every 5 seconds
setInterval(function() {
    checkTime();
}, 5000);


//send task to local storage
$(".saveBtn").on("click", function(){

    // get content from previous container
    var task = $(this)
    .prev()
    .val();

    console.log(task);

    //get time-data
    var time = $(this).siblings("div").data("time");

    console.log(time)

    localStorage.setItem(time, task);
    
});

//task content placed in textarea
var loadTasks = function() {
    for (var i = 9; i < 18; i++) {
        $("[data-time="+i+"]").siblings("textarea").val(localStorage.getItem(i))
    };
};

//load task on page load
$(document).ready(loadTasks);