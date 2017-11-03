var correctAnsw = 0;
var incorrectAnsw = 0;
var unanswered = 0;
function getArray() {
    var TRIVIA = [
        {
            question: "What is Your Favorite Pet?",
            asnwersOptions: ["Answer 1", "Answer 2", "Answer 3"],
            correctAnsw: "Answer 1"
        },
        {
            question: "Are you nuts?",
            asnwersOptions: ["Answer 1", "Answer 2", "Answer 3"],
            correctAnsw: "Answer 1"
        },
        {
            question: "Will you go there?",
            asnwersOptions: ["Answer 1", "Answer 2", "Answer 3"],
            correctAnsw: "Answer 1"
        },
        {
            question: "What is Your Favorite Pet?",
            asnwersOptions: ["Answer 1", "Answer 2", "Answer 3"],
            correctAnsw: "Answer 1"
        },
        {
            question: "Are you nuts?",
            asnwersOptions: ["Answer 1", "Answer 2", "Answer 3"],
            correctAnsw: "Answer 1"
        },
        {
            question: "Will you go there?",
            asnwersOptions: ["Answer 1", "Answer 2", "Answer 3"],
            correctAnsw: "Answer 1"
        },
        
    ]
    return TRIVIA;
}

var newTrivia = getArray();

var legend = "";
var answers = "";

for (i = 0; i < newTrivia.length; i++) {
    legend += "<legend>" + newTrivia[i].question + "</legend>";
    for (idx = 0; idx < newTrivia[i].asnwersOptions.length; idx++) {
        legend += "<label class='radio-inline'><input type='radio' name='question" + i + "'" + ">" + newTrivia[i].asnwersOptions[idx] + "</label>";

    };
};
$("#questions").html(legend);

function startGame() {
    var sec = 5;
    var clock = setInterval(function () {
        sec--;
        $("#time").html("<b>Time: " + sec + "</b>");
        if (sec === 0) {
            clearInterval(clock);
            displayResults();
        }
    }, 1000);
}

function displayResults() {
    $("#results").attr("style", "display:block")
    $("#questions").attr("style", "display:none")

    for (i = 0; i < newTrivia.length; i++) {
        var nameOfRbn = "question" + i;
        console.log($('input[name=' + nameOfRbn + ']:checked'))
        if ($('input[name=' + nameOfRbn + ']:checked').parent().text() == newTrivia[i].correctAnsw) {
            correctAnsw++;
            // console.log("correctAnsw", correctAnsw);
            $()
        };
        if ($('input[name=' + nameOfRbn + ']:checked').parent().text() != newTrivia[i].correctAnsw) {
            incorrectAnsw++;
            console.log(incorrectAnsw);
        };
        

        // console.log("InCorrect: ", incorrectAnsw);

    };
    console.log("correctAnsw", correctAnsw);
    console.log("InCorrect: ", incorrectAnsw)
};
    startGame();