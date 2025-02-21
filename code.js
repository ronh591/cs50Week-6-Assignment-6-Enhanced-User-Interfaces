$(document).ready(function() {
    // Quiz Data
    const questions = [
        {
            question: "What is the capital of France?",
            answers: ["London", "Paris", "Berlin", "Rome"],
            correctAnswer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correctAnswer: "4"
        },
        {
            question: "What is the largest planet in our solar system?",
            answers: ["Earth", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Jupiter"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let attempts = 0;
    let currentDraggable = null; // Store the current draggable element

    // Function to display a question
    function displayQuestion() {
        const questionData = questions[currentQuestionIndex];
        $("#question-text").text(questionData.question);

        $("#answers").empty(); // Clear previous answers

        for (let i = 0; i < questionData.answers.length; i++) {
            const answerText = questionData.answers[i];
            const answerDiv = $("<div>", {
                text: answerText,
                class: "answer-option ui-widget-content",
                id: "answer-" + i
            });

            $("#answers").append(answerDiv);

            // Make answers draggable
            answerDiv.draggable({
                revert: true, // Return to original position if not dropped on target
                start: function() {
                    currentDraggable = $(this).text(); // Store the text of the dragged element
                }
            });
        }

        $("#current-question").text(currentQuestionIndex + 1);
        $("#total-questions").text(questions.length);

        $("#feedback").text(""); // Clear feedback
        $("#droppable").removeClass("ui-state-highlight").text("Drop your answer here!");
        attempts = 0; // Reset attempts for the new question
    }

    // Initialize droppable
    $("#droppable").droppable({
        accept: ".answer-option",
        drop: function(event, ui) {
            $(this).addClass("ui-state-highlight").text("Dropped!");
            checkAnswer(currentDraggable); // Check the answer when dropped
        }
    });

    // Function to check the answer
    function checkAnswer(selectedAnswer) {
        const questionData = questions[currentQuestionIndex];
        let feedbackText = "";

        if (selectedAnswer === questionData.correctAnswer) {
            score++;
            feedbackText = "Correct!";

        } else {
            attempts++;
            feedbackText = "Incorrect. Try again.";
        }
        $("#dialog-text").text(feedbackText);
        $("#dialog").dialog("open");

        console.log("Current Score:", score);
        setTimeout(nextQuestion, 1000);
    }

    // Function to move to the next question
    function nextQuestion() {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            // Quiz is over
            $("#question-counter").hide();
            $("#question-text").hide();
            $("#answers").hide();
            $("#droppable").hide();
            $("#feedback").hide();
            $("#final-message").text("Quiz complete! Your score: " + score + " / " + questions.length);
            console.log("Final Score:", score, "/", questions.length);
        }
    }

    // Initialize Dialog Widget
    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: function() {
                $(this).dialog("close");
            }
        }
    });

    // Initialize Accordion Widget
    $("#accordion").accordion({
        collapsible: true,
        active: false
    });

    // Initial display
    displayQuestion();
});