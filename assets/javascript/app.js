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

  //This listens to the button in the form and gets the values from the fields
  $("#form-btn").on("click", function(event){
            event.preventDefault();
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

 //This listens to the database and gets the values from the fields
  database.ref().on("child_added", function(snapshot){
        console.log(snapshot.val());
        // trainTime (pushed back 1 year to make sure it comes before current time)
        let time = moment(trainTime, "HH:mm").subtract(1, "years");
        console.log(time);
        // Current Time
        let currentTime = moment(); 
        console.log(currentTime);
        // Difference between the times
        var diffTime = moment().diff(moment(time), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var tRemainder = diffTime % parseInt(snapshot.val().frequency);
        console.log(tRemainder);
        // Minute Until Train
        let minAway = parseInt(snapshot.val().frequency) - tRemainder;
        // Next Train
        var nextTrain = moment().add(minAway, "minutes");
        var mainTime = moment(nextTrain).format("hh:mm");
        
      

    //This dynamically appends a tr and a tds to the tbody
        let body = $("tbody");
        body.append(
            `<tr>` + 
                `<td>` +  snapshot.val().train + `</td>` +
                `<td>` +  snapshot.val().destination + `</td>` +
                `<td>` +  snapshot.val().frequency + `</td>` +
                `<td>` +  mainTime  + `</td>` +
                `<td>` +  minAway + `</td>` +
            `</tr>`
    );
  

})

})
