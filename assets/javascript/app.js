
var questions = [
{
	question: "The title of which Pink Floyd album is also a chapter in 'The Wind In The Willows'?",
	choices: ["Wish you were here", "The piper at the gates of dawn", "Meddle", "Animals"],
	answerInd: 1
},
{
	question: "What is the name of the man servant in 'Around the world in 80 days'?",
	choices: ["Pas Partout", "Cato", "Giles", "Machu Picchu"],
	answerInd: 0
},
{
	question: "Which NHL hockey team has won the most Stanley Cups?",
	choices: ["Toronto Maple Leafs", "Boston Bruins", "Montreal Canadiens", "New York Rangers"],
	answerInd: 2
},
{   question: "How many earths would fit inside the sun?",
	choices: ["circa 100", "circa 1,000,000", "circa 10,000", "circa 100,000"],
	answerInd: 1
},
{   question: "Who wrote 'don't count your chickens before they are hatched'?",
	choices: ["Shakespeare", "Ben  Franklin", "Aesop", "Chaucer"],
	answerInd: 2
},
{
	question: "A 'Miller' is a move in which sport?",
	choices: ["Ice Hockey",	"Trampolining",	"Diving", "Chess"],
	answerInd: 1
},
{
	question: "Anemophobia is the fear of what?",
	choices: ["Spiders", "The Dark", "Fire", "Wind"],
	answerInd: 3
}
];

$(document).ready(function () {
   var wins = 0;
   var losses = 0;
   var unAnswered =0; 
   var whichQ = 0;
   var start = true;
   var noAnswer = true;
   var isTiming = false;
   var time;
   var intervalId;

   $("#start_button").on("click", doQuiz);

   function doQuiz() {
   	  if(start) {
   	  	$("#start").hide();
   	  	start = false;
   	  }
   	  else {
   	  	$("#imgDiv").hide();
   	  }

   	  noAnswer = true;
      displayQ();
      timing();
   }

   function displayQ() {
   	  time = 30;
   	  $("#timer").text("Time Remaining: " + time + " Seconds");
   	  var quest = questions[whichQ].question;
      var opts = questions[whichQ].choices;
      var radioOpts = "";
      $("#question").html("<h2>" + quest + "</h2>");
      for(var j=0; j<opts.length;j++)
         radioOpts += "<input type='radio' name='choice' value='" + j + "'/>" + opts[j] + "<br>";

      $("#choices").html(radioOpts);
   }

   function timing() {
   	   if(!isTiming) {
   	   	intervalId = setInterval(showTime, 1000);
   	   	isTiming = true;
   	   }
   }

   function showTime() {
       time--;
       $("#timer").text("Time Remaining: " + time + " Seconds");
       if(time==0) {
   	   	clearInterval(intervalId);
   	   	isTiming = false;
   	   	noAnswer = true;
   	   	checkAnswer();
   	   }
   }

   $("#choices").on("change", "input[name=choice]:radio", function() {
   	  clearInterval(intervalId);
   	  isTiming = false;
      noAnswer = false;
      checkAnswer();      
   });

   function checkAnswer() {
   	 if(!noAnswer) {
   	   var userSelect = $('input[name=choice]:checked').val();
       if(parseInt(userSelect) === questions[whichQ].answerInd) {
         wins++;
         $("#question").html("<h2>Correct!</h2>");       
       }
       else {
         losses++;
         $("#question").html("<h2>Nope!</h2><h3>The correct Answer is " + questions[whichQ].choices[questions[whichQ].answerInd] + "</h3>");
       }
     }
     else {
     	 clearInterval(intervalId);
     	 isTiming = false;
     	 unAnswered++;
         $("#question").html("<h2>Not Answered!</h2><h3>The Answer is " + questions[whichQ].choices[questions[whichQ].answerInd] + "</h3>");
     }
     $("#imgDiv").html("<img src='assets/images/question" + whichQ + ".gif'>");
     $("#imgDiv").show();
     whichQ++;
     if(whichQ < questions.length) {
     	setTimeout(doQuiz, 3000);
     }
     else {
        setTimeout(summarize, 3000);
     }
  }

   function summarize() {

    $("#quiz_section").hide();
   	$("#summary").show();
    $("#summary").html("<h2>All Done!</h2><br>" +
    	"<h2>Here is how you did: </h2><br>" +
    	"<h3>Correct Answers: " + wins + "</h3>" +
    	"<h3>Incorrect Answers: " + losses + "</h3>" +
        "<h3>Not Answered: " + unAnswered + "</h3><br>" +
        "<button id='restart_button'>Start Over</button>");
   }

   $("#summary").on("click", "#restart_button", function() {
   	whichQ = 0;
   	wins = 0;
   	losses = 0;
   	unAnswered = 0;
   	$("#summary").hide();
   	$("#quiz_section").show();
   	doQuiz();
   });

});	