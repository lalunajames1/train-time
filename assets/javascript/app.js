$(document).ready(function(){
 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTtuVc3xAMT2xaD6xkEcULVLOdLz83KuY",
    authDomain: "train-project-cf419.firebaseapp.com",
    databaseURL: "https://train-project-cf419.firebaseio.com",
    projectId: "train-project-cf419",
    storageBucket: "train-project-cf419.appspot.com",
    messagingSenderId: "442561677452"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  let trainName;
  let destination;
  let trainTime = 0;
  let frequency = 0;

  $("#form-btn").on("click", function(event){
            event.preventDefault();
            console.log("hello");
            trainName = $("#train-name").val().trim();
            destination = $("#destination").val().trim();
            trainTime = $("#train-time").val().trim();
            frequency = $("#frequency").val().trim();

            database.ref().push({
            train: trainName,
            destination: destination,
            time: trainTime,
            frequency: frequency
            });
  });

  
  database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
    let body = $("tbody");
    let time = "Time";
    body.append(
        `<tr>` + 
            `<td>` +  snapshot.val().train + `</td>` +
            `<td>` +  snapshot.val().destination + `</td>` +
            `<td>` +  snapshot.val().time + `</td>` +
            `<td>` +  snapshot.val().frequency + `</td>` +
            `<td>` +  time + `</td>` +
        `</tr>`
    );
  

})

})
