// While this comment syntax will still work in JS files. It's an uncommon practice and
// you should generally stick to the `//` or `/*  */` syntax.
<!-- Random integer Number generation given max and min values-->
function getRandomInt(min, max){ 
	return Math.floor(Math.random()* (max - min +1)) +min; 
}

//document ready block.
$( document ).ready(function() {
  // console.log's are awesome for validating your work when developing a program
  // but it's generally best practice to remove them from production code
  // console.log( "ready!" );
  var targetNumber = 0; 
  var wins =0; 
  var loses =0;
  var counter =0;

  gameUI();
	targetNumber = targetNum(); // creating Target number.
  
  randomCrystalNum();
  $(".winsBody").text(wins)
  $(".losesBody").text(loses)
	// This time, our click event applies to every single crystal on the page. Not just one.
	$(".crystal-image").on("click", function() {
	    // Determining the crystal's value requires us to extract the value from the data attribute.
	    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
	    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
	    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
	    var crystalValue = ($(this).attr("data-crystalvalue"));
	    crystalValue = parseInt(crystalValue);
	    // console.log(crystalValue);
	    // We then add the crystalValue to the user's "counter" which is a global variable.
	    // Every click, from every crystal adds to the global counter.
	    counter += crystalValue;
	    // All of the same game win-lose logic applies. So the rest remains unchanged.
	    $(".userGuessNum").empty();
	    $(".userGuessNum").text(counter);
	    if (counter === targetNumber) {
        wins++;
	      // console.log("You win!");
        reset();
        alert("You Win!");
        targetNumber = targetNum();
        randomCrystalNum();
        $(".winsBody").text(wins)
        $(".losesBody").text(loses)
        counter =0;
	    }
	    else if (counter >= targetNumber) {
        loses++;
	      // console.log("You lose!!");
        alert("You Lose!!");
        reset();
        targetNumber = targetNum();
        randomCrystalNum();
        $(".winsBody").text(wins)
        $(".losesBody").text(loses)
        counter =0;
	    }
	});
});

// I really like that you broke up your game logic into functions.
// I would suggest that you move all of these into the document ready 
// block above though so that they aren't living on the global scope.

// function to reset.
function reset(){
  // In this case, since you aren't declaring counter as a variable here
  // it ends up being placed on the global scope and will always remain at 0
  // while some of your other game logic updates the counter variable you 
  // declared in the document ready block above.
  counter =0;
 
  $('.randomTarget').empty();
  $(".userGuessNum").empty();
  $(".winsBody").empty();
  $(".losesBody").empty();
  $(".userGuessNum").text(counter);
  $(".randomTarget").text(targetNumber);
}

// Function to create a target number.
function targetNum(){
   // reset();
   // this targetNumber is living on the global scope which is why you're having to
   // also return the value and assign it to the targetNumber you've declared within
   // the document ready block. 
    targetNumber = getRandomInt(19,120);
   	return targetNumber;
}
// Function to create and assign a random crystal number.
function randomCrystalNum(){
  reset();
  // We begin by expanding our array to include four options.

  // Going this route for assigning random number values to the crystals will result
  // in only ever having the below 4 values assigned to the crystals (albeit in a random order).
  // A somewhat simpler approach would be to use your `getRandomInt` function
  // to assign a random value to each of your four crystal elements.

  var numberOptions = [9, 5, 3, 2];
  numberOptions = shuffle(numberOptions);
 
  // Next we create a for loop to create crystals for every numberOption.
  for (var i = 0; i < numberOptions.length; i++) {
    // For each iteration, we will update image crystal with a number
    var img = '#img' + i
    var imageCrystal = $(img)
    // each crystal is given a data attribute and added the value to the attribute.
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);
  }
  // console.log(numberOptions)
}
function addCrystals(){
  var crystals = ['assets/images/Blue.jpg','assets/images/Emerald.jpg','assets/images/Yellow.jpg','assets/images/Ruby.jpg']
  for (var i = 0; i < crystals.length; i++) {
    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");
    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");
    imageCrystal.attr('id', ('img'+ i));
    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", crystals[i]);
    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $(".crystalImgBody").append(imageCrystal);
    
  }
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
  addCrystals();
  var GameDescription = "You will be Given a random Number at the start of the game. There are four crystals below. By clicking on a crystal you will add a specific amount of points to your total score. You win the game by matching your total score to random number, you lose the game if your total score goes above the random number. The value of each crystal is hidden from you until you click on it. Each time when the game starts, the game will change the values of each crystal."
  $('.crystalGameDescription').text(GameDescription)
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
