var time = 15;
var display = $("#quizArea")


var questions= [{
question: "Avocado grows on a tree.",
answers: ["ture", "false"],
correctA: "true",
image: "assets/images/avocado.gif"},
{
question:"Banana is a berry.",
answers: ["ture", "false"],
correctA: "true",
image: "assets/images/banana1.gif"},
{
question:"papaya grows under the soil.",
answers:["ture", "false"],
correctA: "false",
image: "assets/images/papaya.gif"},
{
question:"banana grows on a tree.",
answers: ["ture", "false"],
correctA:"true",
image: "assets/images/banana2.gif"}];



var timer;

var game = {

  questions: questions,
  currentQ: 0,
  counter: time,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counterN").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQ: function() {

    timer = setInterval(game.countdown, 1000);

    display.html("<h2>" + questions[this.currentQ].question + "</h2>");

    for (var i = 0; i < questions[this.currentQ].answers.length; i++) {
      display.append("<button class='answerButton' id='button' data-name='" + questions[this.currentQ].answers[i]
      + "'>" + questions[this.currentQ].answers[i] + "</button>");
    }
  },

  nextQ: function() {
    game.counter = time;
    $("#counterN").text(game.counter);
    game.currentQ++;
    game.loadQ();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counterN").html(game.counter);

    display.html("<h2>Out of Time!</h2>");
    display.append("<h3>The Correct Answer was: " + questions[this.currentQ].correctA);
    display.append("<img src='" + questions[this.currentQ].image + "' />");

    if (game.currentQ === questions.length - 1) {
      setTimeout(game.results, 1.5 * 1000);
    }
    else {
      setTimeout(game.nextQ, 1.5 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    display.html("<h2>THAT'S ALL!</h2>");

    $("#counterN").text(game.counter);

    display.append("<h3>Correct: " + game.correct + "</h3>");
    display.append("<h3>Incorrect: " + game.incorrect + "</h3>");
    display.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    display.append("<button id='tryAgain'>TrY aGaIn</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQ].correctA) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    
    display.append("<h3>AHHH OHHH Correct Answer was: " + questions[game.currentQ].correctA + "</h3>");
    display.append("<img src='" + questions[game.currentQ].image + "' />");

    if (game.currentQ === questions.length - 1) {
      setTimeout(game.results, 1.5 * 1000);
    }
    else {
      setTimeout(game.nextQ, 1.5 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    display.html("<h2>Correct!</h2>");
    display.append("<img src='" + questions[game.currentQ].image + "' />");

    if (game.currentQ === questions.length - 1) {
      setTimeout(game.results, 1.5 * 1000);
    }
    else {
      setTimeout(game.nextQ, 1.5 * 1000);
    }
  },

  reset: function() {
    this.currentQ = 0;
    this.counter = time;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQ();
  }
};


$(document).on("click", "#tryAgain", function() {
  game.reset();
});

$(document).on("click", ".answerButton", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#wrapper").prepend("<h2>Time Remaining: <span id='counterN'>15</span> Seconds</h2>");
  game.loadQ();
});
