var QUESTION_COUNT = 6;
var TRIVIA_SERVICE_URL = "https://opentdb.com/api.php?amount=" + QUESTION_COUNT + "&category=18&difficulty=easy&type=multiple";
var ROUND_DURATION = 30;

$(document).ready(function () {
    var trivia = newTrivia();
    var questions = "";
    for (i = 0; i < trivia.length; i++) {
        questions += "<legend>" + trivia[i].question + "</legend>";
        for (idx = 0; idx < trivia[i].asnwersOptions.length; idx++) {
            questions += "<label class='radio-inline'>" +
                         "<input type='radio' name='question" + i + "'" + ">" +
                         trivia[i].asnwersOptions[idx] + "</label>";
        };
    };
    $("#questions").html(questions);
    $("#startButton").on("click", function () {    
        startGame(trivia);
    })        
});

function newTrivia() {
    var trivia = [];
    //     {
    //         question: "Question 1?",
    //         asnwersOptions: ["Answer 1", "Answer 2", "Answer 3"],
    //         correctAnsw: "Answer 1"
    //     }, ...

    $.ajax({
        url: TRIVIA_SERVICE_URL,
        method: "GET",
        async: false,
    }).done(function (response) {
        for (i = 0; i < response.results.length; i++) {
            trivia.push({
                question: response.results[i].question,
                asnwersOptions: shuffle(response.results[i].incorrect_answers.concat([response.results[i].correct_answer])),
                correctAnsw: response.results[i].correct_answer
            });
        }
    });
    return trivia;
}

// shuffle any array in place
function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

function startGame(trivia) {
    $("#time").attr("style", 'display:block');
    $("#questions").attr("style", 'display:block');
    $("#startButton").attr("style", 'display:none');

    var clock = setInterval(function () {
        ROUND_DURATION--;
        $("#time").html("<b>Time: " + ROUND_DURATION + "</b>");
        if (ROUND_DURATION === 0) {
            clearInterval(clock);
            displayResults(trivia);
        }
    }, 1000);
}

function displayResults(trivia) {
    $("#results").attr("style", "display:block")
    $("#questions").attr("style", "display:none")

    var correctAnsw = 0;
    var incorrectAnsw = 0;
    var unanswered = 0;
    for (i = 0; i < trivia.length; i++) {
        var $selectedRadioButton = $('input[name=question' + i + ']:checked');
        if ($selectedRadioButton.parent().text() == trivia[i].correctAnsw) {
            correctAnsw++;
        };
        if ($selectedRadioButton[0] === undefined) {
            unanswered++;
        };
    };
    incorrectAnsw = trivia.length - correctAnsw - unanswered;

    $("#correctAnswers").text(correctAnsw);
    $("#inCorrectAnswers").text(incorrectAnsw);
    $("#unAnswered").text(unanswered);
};
