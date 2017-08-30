<!-- Random integer Number generation given max and min values-->
function getRandomInt(min, max){ 
	return Math.floor(Math.random()* (max - min +1)) +min; 
}

//document ready block.
$( document ).ready(function() {
    console.log( "ready!" );
  	var targetNumber = 0;
  	targetNumber = targetNum(); // creating Target number.
  	userScore();
  	var counter =0;
	randomCrystalNum();
	// This time, our click event applies to every single crystal on the page. Not just one.
	$(".crystal-image").on("click", function() {
	    // Determining the crystal's value requires us to extract the value from the data attribute.
	    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
	    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
	    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
	    
	    var crystalValue = ($(this).attr("data-crystalvalue"));
	    crystalValue = parseInt(crystalValue);
	    console.log(crystalValue);
	    // We then add the crystalValue to the user's "counter" which is a global variable.
	    // Every click, from every crystal adds to the global counter.
	    counter += crystalValue;
	    // All of the same game win-lose logic applies. So the rest remains unchanged.
	    console.log("New score: " + counter);
	    console.log('targetNumber: ' + targetNumber)
	    $("#YourGuess").empty();
	    userScore();
	    $("#YourGuess").append("<h1>" + counter + "</h1>");
	    if (counter === targetNumber) {
	      console.log("You win!");
	      counter =0;
	      $("#crystals").empty();
	      $('#target').empty();
	      $("#YourGuess").empty();
	      targetNumber = targetNum();
	      userScore();
	      $("#YourGuess").append("<h1>" + counter + "</h1>");
	      randomCrystalNum();
	    }
	    else if (counter >= targetNumber) {
	      console.log("You lose!!");
	    }
	});


});

// Function to create a target number.
function targetNum(){
	$(".container").append("<div id = \"target\">");
    targetNumber = getRandomInt(19,120);
    $("#target").append("<h1>Target Number</h1>");
    $("#target").append("<h1>" + targetNumber + "</h1>");
   	return targetNumber;
}
function userScore(){
	$(".container").append("<div id = \"YourGuess\">");
    $("#YourGuess").append("<h1>YourGuess</h1>");
    // $("#YourGuess").append("<h2></h2>");
   	return targetNumber;
}
// Function to create a random crystal number.
function randomCrystalNum(){

// We begin by expanding our array to include four options.
  var numberOptions = [9, 5, 3, 2];
  //numberOptions.sort(function() { return 0.5 - Math.random() });
  numberOptions = shuffle(numberOptions);
  $(".container").append("<div id = \"crystals\">");
  // Next we create a for loop to create crystals for every numberOption.
  for (var i = 0; i < numberOptions.length; i++) {
    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");
    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");
    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");
    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);
    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);
    
  }console.log(numberOptions)
}

//Shuffle the elements in the array.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

