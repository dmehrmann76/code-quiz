
//HTML elements
var quizDiv = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizCounter = document.getElementById("timer");
var beginQuizButton = document.getElementById("beginbtn");
var beginQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");


// Quiz questions 
var quizQuestions = [{
    question: "Which one of these is not a building block of the web?",
    A: "HTML",
    B: "MIDI",
    C: "CSS",
    D: "JavaScript",
    correctAnswer: "b"},
    {
    question: "What is an example of a Node?",
    A: "Parent",
    B: "Child",
    C: "Sibling",
    D: "All of the above",
    correctAnswer: "d"},
    {
    question: "What JavaScript variable includes quotes?",
    A: "booleans",
    B: "strings",
    C: "numbers",
    D: "A and C",
    correctAnswer: "b"},  
    {
    question: "What type of variables are considered collections?",
    A: "strings",
    B: "numbers",
    C: "booleans",
    D: "arrays",
    correctAnswer: "d"},
    {
    question: "Which of these diplays discreetly to the debugger?",
    A: "console.log",
    B: "alert",
    C: "prompt",
    D: "redhat",
    correctAnswer: "a"},
        
    ];
// global variables
var finalQuestionIndex = quizQuestions.length;
var questionIndex = 0;
var counter = 30;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (questionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[questionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.A;
    buttonB.innerHTML = currentQuestion.B;
    buttonC.innerHTML = currentQuestion.C;
    buttonD.innerHTML = currentQuestion.D;
};

// Begin Quiz function starts the timer and displays the first quiz question.
function beginQuiz(){
    gameoverDiv.style.display = "none";
    beginQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Counter
    timerInterval = setInterval(function() {
        counter--;
        quizCounter.textContent = "Time: " + counter;
    
        if(counter === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizDiv.style.display = "block";
}

// This function checks each answer 
function checkAnswer(answer){
    correct = quizQuestions[questionIndex].correctAnswer;
        //display in the results div that the answer is correct or incorrect.
    if (answer === correct && questionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        questionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && questionIndex !== finalQuestionIndex){
        alert("Incorrect.")
        questionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

// This function is the end page that shows your score after completeing the quiz
function showScore(){
    quizDiv.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of submit button, the function highscore saves 
// and stringifies the array of high scores already saved in local stoage
// it also pushes the new user name and score into the array we are saving in local storage.
submitScoreBtn.addEventListener("click", function highscore(){
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function sets the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreName.innerHTML = "";
    highScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreName.appendChild(newNameSpan);
        highScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages 
function showHighscore(){
    beginQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    beginQuizDiv.style.display = "flex";
    timeLeft = 30;
    score = 0;
    questionIndex = 0;
}

// begins the quiz!
beginQuizButton.addEventListener("click",beginQuiz);