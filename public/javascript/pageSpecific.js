////Main Page JS//////

////Fucntion to add new user////
class user {
    constructor(firstname, lastname, username, newpassword, passwordcheck, email, birthday, phonenumber, exampleFormControlFile1) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.newpassword = newpassword;
        this.passwordcheck = passwordcheck;
        this.email = email;
        this.birthday = birthday;
        this.phonenumber = phonenumber;
        this.exampleFormControlFile1 = exampleFormControlFile1;
    }
}

var firstname = "";
var lastname = "";
var username = "";
var newpassword = "";
var passwordcheck = "";
var email = "";
var birthday = "";
var phonenumber = "";
var exampleFormControlFile1 = "";


$("#createUser").on("click", function (event) {
    event.preventDefault();
    $("#createError").html('');
    
    function validateForm() {
        var isValid = true;
        $('.form-control').each(function() {
          if ( $(this).val() === '' ){
            isValid = false;
          }
        });
      return isValid;
    };
    if(validateForm()){
        firstname = $("#firstName").val().trim();
        lastname = $("#lastName").val().trim();
        username = $("#userName").val().trim();
        newpassword = $("#newPassword").val().trim();
        passwordcheck = $("#passwordCheck").val().trim();
        email = $("#email").val().trim();
        birthday = $("#birthday").val().trim();
        phonenumber = $("#phoneNumber").val().trim();
        exampleFormControlFile1 = $("#profilePic").val().trim();
    
        if(newpassword != passwordcheck) {
            $("#createError").html("Password and Confirm Password do not match.");
        } else{
            $.ajax({
                method: "POST",
                url: "/api/users",
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    newpassword: newpassword,
                    passwordcheck: passwordcheck,
                    email: email,
                    birthday: birthday,
                    phonenumber: phonenumber,
                    exampleFormControlFile1: exampleFormControlFile1
                }
            }).done(function (data) {
                //window.location.href = '/';
               
                if(!data.success){
                $("#createError").html(data.message);
                } else{
                    $("#createError").html(data.message);
                    $("#userForm")[0].reset();
                    window.location.href = '/';
                };
            });
        };   
    } else{
        $("#createError").html("Please complete all fields of form.");
    };

});



///Function to grab value from new group form & store in db///
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

    $.ajax({
        method: "POST",
        url: "/api/groups",
        data: {
            name: name,
            type: type,
            friends: friends//[{
            //     id: 5
            // }, {
            //     id: 1
            // }]
        }
    }).done(function (data) {

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

    $.ajax({
        method: "POST",
        url: "/api/events",
        dataType: "json",
        data: {
            eventadmin: "jdoe",
            eventname: eventName,
            eventgroup: eventGroup,
            username: "jdoe",
            eventdate: eventDate,
            ongoingevent: false
        }
    }).done(function (data) {

        var newEvent = new nEvent(eventName, eventGroup, eventDate);
        $("#eventRow").append(
            '<div class="row m-2 no-gutters event">' +
            '<div class="col-3 eventName">' + '<p>' + eventName + '<p>' + '</div>' +
            '<div class="col-3 eventGroup">' + '<p>' + eventGroup + '</p>' + '</div>' +
            '<div class="col-3 eventDate">' + '<small><p>' + eventDate + '</p></small>' + '</div>' +
            '<button type="button" class="btn btn-link">' + '<a><small> Delete <small></a>' + '</button>' +
            '</div'
        );

        $("#eventForm")[0].reset();
    });
});

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