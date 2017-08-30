<!-- Random integer Number generation given max and min values-->
function getRandomInt(min, max){ 
	return Math.floor(Math.random()* (max - min +1)) +min; 
}

//document ready block.
$( document ).ready(function() {
  console.log( "ready!" );
  var targetNumber = 0; 
  var wins =0; 
  var loses =0;
  var counter =0;

  gameUI();
	targetNumber = targetNum(); // creating Target number.
  console.log('document ready' + targetNumber)
  
  randomCrystalNum();
  $(".winsBody").text(wins)
  $(".losesBody").text(loses)
	// This time, our click event applies to every single crystal on the page. Not just one.
	$(".crystal-image").on("click", function() {
	    // Determining the crystal's value requires us to extract the value from the data attribute.
	    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
	    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
	    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
	    console.log('onClick function')
	    var crystalValue = ($(this).attr("data-crystalvalue"));
	    crystalValue = parseInt(crystalValue);
	    console.log(crystalValue);
	    // We then add the crystalValue to the user's "counter" which is a global variable.
	    // Every click, from every crystal adds to the global counter.
	    counter += crystalValue;
	    // All of the same game win-lose logic applies. So the rest remains unchanged.
	    console.log("New score: " + counter);
	    console.log('targetNumber: ' + targetNumber)
	    $(".userGuessNum").empty();
	    $(".userGuessNum").text(counter);
	    if (counter === targetNumber) {
        wins++;
	      console.log("You win!");
        reset();
        alert("You Win!");
        targetNumber = targetNum();
        randomCrystalNum();
        $(".winsBody").text(wins)
        $(".losesBody").text(loses)
	    }
	    else if (counter >= targetNumber) {
        loses++;
	      console.log("You lose!!");
        alert("You Lose!!");
        reset();
        targetNumber = targetNum();
        randomCrystalNum();
        $(".winsBody").text(wins)
        $(".losesBody").text(loses)
	    }
	});
  // reset();

});

function reset(){
  counter =0;
  $(".crystalImgBody").empty();
  $('.randomTarget').empty();
  $(".userGuessNum").empty();
  $(".winsBody").empty();
  $(".losesBody").empty();
  $(".userGuessNum").text(counter);
  $(".randomTarget").text(targetNumber);
  
//  randomCrystalNum();
}

// Function to create a target number.
function targetNum(){
   // reset();
    targetNumber = getRandomInt(19,120);
    
    console.log('targetNum' + targetNumber)
   	return targetNumber;
}
// Function to create a random crystal number.
function randomCrystalNum(){
  reset();
  // We begin by expanding our array to include four options.
  var numberOptions = [9, 5, 3, 2];
  //numberOptions.sort(function() { return 0.5 - Math.random() });
  numberOptions = shuffle(numberOptions);
  // $(".container").append("<div id = \"crystals\">");
  // Next we create a for loop to create crystals for every numberOption.
  var crystals = ['assets/images/Blue.jpg','assets/images/Emerald.jpg','assets/images/Yellow.jpg','assets/images/Ruby.jpg']
  for (var i = 0; i < numberOptions.length; i++) {
    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");
    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");
    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", crystals[i]);
    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);
    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $(".crystalImgBody").append(imageCrystal);
    console.log('in randomCrystalNum')
    
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



// ==========================================================
function gameUI(){
  
  // Creating needed Panels for the UI.
  createPanel('Crystals-Collector', 'crystalGameDescription','col-sm-12')
  createPanel('Target','randomTarget','col-sm-4');
  createPanel('YourScore','userGuessNum','col-sm-4');
  createPanel('Wins','winsBody','col-sm-2')
  createPanel('Loses','losesBody','col-sm-2')
  createPanel('Crystal-Images', 'crystalImgBody','col-sm-12')
}
  
function createPanel(headType,bodyType, colType){
  //creating a Panel with three parameters
  //1st parameter : Panel Identification class
  //2nd Parameter : Panel body identification class for updating the values.
  //3rd parameter giving the panel column width.
  var container = $(".container");    
  var column = $("<div class =" + colType + ">");
  var panel = $("<div class='panel panel\-default'>");
  var panelHeader = $("<div class='panel\-heading'>");
  var panelBody = $("<div class='panel\-body'>");
  panelHeader.addClass(headType);
  panelBody.addClass(bodyType);
  panelHeader.addClass('text-center');
  panelBody.addClass('text-center');

    //container.append(colsm12);
    container.append(column);
    column.append(panel);
    panel.append(panelHeader);
    panel.append(panelBody);
    panelHeader.append ("<h3 class='panel\-title'>" + headType + "</h3>")
    panelBody.text ('');
}
