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
        '<div class="row m-2 group" data-toggle="collapse" aria-expanded="false" href=".friendsList">' +

        '<div class="col-12">' +
        '<div class="row">' +
        '<div class="col-5 groupName">' + '<p>' + name + '</p>' + '</div>' +
        '<div class="col-5 groupType">' + '<p>' + type + '</p>' + '</div>' +
        '<div class=col-2>' + '<button type="button" class="btn btn-link delete">' + '<a><small> Delete <small></a>' + '</button>' + '</div>' +
        '</div>' +

        '<div class="collapse col-10-offset-1 mb-3 px-2 friendsList">' + '<div class="row">' + '<div class="col-12">' + friends + '</div>' + '</div>' + '</div>' +
        '</div>' +

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


$("#createEvent").on("click", function (event) {


    event.preventDefault();
    eventName = $("#newEventName").val().trim();
    eventGroup = $("#newEventGroup").val().trim();
    eventDate = $("#newEventDate").val().trim();

    var date = eventDate;
    var newDate = date.toString('dd-MM-yy');
    console.log(newDate);

    var newEvent = new nEvent(eventName, eventGroup, eventDate);
    $("#eventRow").append(
        '<div class="row m-2 group' + newEvent + '">' + '<div class="col-12" data-toggle="collapse" aria-expanded="false" href=".itinerary">' +

        '<div class="row">' +
        '<div class="col-3">' + eventName + '</div>' +
        '<div class="col-3 eventGroup">' + eventGroup + '</div>' +
        '<div class="col-3 eventDate">' + '<small>' + newDate + '</small>' + '</div>' +
        '<button type="button" class="btn btn-link" id="deleteEvent">' + '<a><small> Delete </small></a>' + '</button>' +
        '<button type="button" class="btn btn-link ' + newEvent + '" data-toggle="modal" data-target="#newEventItem">' + '<a><small> Add Event Item </small></a>' + '</button>' +
        '</div>' +

        '<div class="row collapse itinerary">' + '<div class="col-10-offset-1 mb-3 px-2">' + '<ul id="itRow" class=" ' + newEvent + '">' + '</ul>' + '</div>' + '</div>' + '</div>' +

        '</div>' + '</div>'
    );

    console.log(newEvent);

    $("#eventForm")[0].reset();
})

/////////Function to add Itinerary//////////

class itinerary {
    constructor(place, start, end) {
        this.place = place;
        this.start = start;
        this.end = end;
    }
}

// function createItinerary() {
//     this.innerHTML = '<div class="row">' +
//         '<div class="col-4">' + place + '</div>' +
//         '<div class="col-4">' + start + '</div>' +
//         '<div class="col-4">' + end + '</div>' +
//         '</div>';
//     this.className += eventName.replace(/\s/g, '');
// }

$("#createEventItem").on("click", function (event) {
    event.preventDefault();
    place = $("#place").val().trim();
    start = $("#start").val().trim();
    end = $("#end").val().trim();

    var newItinerary = new itinerary(place, start, end);

    // $("#itRow").append(
    //     createItinerary()
    // )

    $("#itRow").append(
        '<div class="row">' +
        '<div class="col-4">' + place + '</div>' +
        '<div class="col-4">' + start + '</div>' +
        '<div class="col-4">' + end + '</div>' +
        '</div>'
    );


    // var div = document.createElement('div')
    // div.className = eventName.replace(/\s/g, '');
    // div.innerHTML = createItinerary();
    // div.onClick = div.innerHTML;



    console.log(eventName)

    $("#newEventItForm")[0].reset();
})


///////// Delete Created User Input Button//////////

$("#deleteEvent").on("click", function () {
    $(".eventName.replace(/\s/g, '')").remove();

})