////Main Page JS//////

///Function to grab value from new group form///
class group {
    constructor(name, type, friends) {
        this.name = name;
        this.type = type;
        this.friends = friends;
    }
}

var name = "";
var type = "";
var friends = "";

function newFunction() {
    console.log(name);
}

$("#createGroup").on("click", function (event) {
    event.preventDefault();
    name = $("#newGroupName").val().trim();
    type = $("#newGroupType").val().trim();
    friends = $("#addFriends").val().trim();
    var newGroup = new group(name, type, friends);
    $("#newGroupRow").append(
        '<div class="row m-2 group">' +
        '<div class="col-5 groupName">' + '<p>' + name + '</p>' + '</div>' +
        '<div class="col-5 groupType">' + '<p>' + type + '</p>' + '</div>' +
        '<button type="button" class="btn btn-link">' + '<a><small> Delete <small></a>' + '</button>' +
        '</div>'
    );
    newFunction();
    $("#groupForm")[0].reset();
});


///////Function to add new Event///////
class nEvent {
    constructor(eventName, eventGroup, eventDate) {
        this.eventName = eventName;
        this.eventGroup = eventGroup;
        this.eventDate = eventDate;
    }
}

var eventName = "";
var eventGroup = "";
var eventDate = "";


function newFunction2() {
    console.log(eventName);
}

$("#createEvent").on("click", function (event) {
    event.preventDefault();
    eventName = $("#newEventName").val().trim();
    eventGroup = $("#newEventGroup").val().trim();
    eventDate = $("#newEventDate").val().trim();

    var newEvent = new nEvent(eventName, eventGroup, eventDate);
    $("#eventRow").append(
        '<div class="row m-2 no-gutters group">' +
        '<div class="col-3 eventName">' + '<p>' + eventName + '<p>' + '</div>' +
        '<div class="col-3 eventGroup">' + '<p>' + eventGroup + '</p>' + '</div>' +
        '<div class="col-3 eventDate">' + '<small><p>' + eventDate + '</p></small>' + '</div>' +
        '<button type="button" class="btn btn-link">' + '<a><small> Delete <small></a>' + '</button>' +
        '</div'
    );

    newFunction2();
    $("#newEvent")[0].reset();
});