// Initialize Firebase
var config = {
    apiKey: "AIzaSyA3bmrbK-YMU6bu3X7wi3Lg9-b13qIj1xc",
    authDomain: "first-project-ab6df.firebaseapp.com",
    databaseURL: "https://first-project-ab6df.firebaseio.com",
    projectId: "first-project-ab6df",
    storageBucket: "first-project-ab6df.appspot.com",
    messagingSenderId: "17897878542"
  };
  firebase.initializeApp(config);

//  variable to reference the database
var database = firebase.database();
var nextArrival;
var tMinutesTillTrain;

// Live Time of The Day 

var updateTime = function(){
	var now = moment().format('hh:mm');
	$('#currentTime').html(now);
}

$(document).ready(function(){
	updateTime();
	setInterval(updateTime, 1000);
});

/*******************************************/

$('#submit').on('click', function(event){
event.preventDefault();

// Retrieve user inputs from form
var trainName = $('#trainName').val().trim();
var destination = $('#destination').val().trim();
var firstTrain = $('#firstTrain').val().trim();
var frequency = $('#frequency').val().trim();

// var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);
// var tRemainder = diffTime % frequency;
// console.log(tRemainder);
// var tMinutesTillTrain = frequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
// getNextTrain(firstTrain, frequency);


// Create an object for new train to be added
var newTrain = {
	trainName: trainName,
	destination: destination,
	firstTrain: firstTrain,
	frequency: frequency
}


database.ref().push(newTrain);

$('#trainName').val('');
$('#destination').val('');
$('#firstTrain').val('');
$('#frequency').val('');



return false;

});

function getNextTrain (firstTrain, frequency) {
var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);
var tRemainder = diffTime % frequency;
console.log(tRemainder);
tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
nextArrival = moment(nextTrain).format("hh:mm");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

}

database.ref().on('child_added', function(childSnapshot, prevChildKey) {
// console.log(childSnapshot.val());
var trainName = childSnapshot.val().trainName;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().frequency;
getNextTrain(firstTrain, frequency);



$('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
	+ frequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
